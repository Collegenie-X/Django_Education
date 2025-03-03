from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import Review, Problem
from .serializers import ReviewSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny
from django.http import Http404 
from payments.models import Payment
from .serializers import CommentSerializer

from rest_framework import generics, permissions, status
from rest_framework.response import Response
from rest_framework.exceptions import PermissionDenied, NotFound
from .models import Review, Comment
from .serializers import CommentSerializer

class CommentListCreateAPIView(generics.ListCreateAPIView):
    serializer_class = CommentSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def get_queryset(self):
        review_id = self.kwargs.get('review_id')
        return Comment.objects.filter(review__id=review_id).select_related('user')

    def perform_create(self, serializer):
        review_id = self.kwargs.get('review_id')
        try:
            review = Review.objects.get(id=review_id)
        except Review.DoesNotExist:
            raise NotFound("Review does not exist.")
        
        # 리뷰의 문제 작성자인지 확인
        if review.problem.user != self.request.user:
            raise PermissionDenied("You do not have permission to comment on this review.")
        
        serializer.save(user=self.request.user, review=review)

    def create(self, request, *args, **kwargs):
        # 기본 create 메서드 호출하여 댓글 생성
        response = super().create(request, *args, **kwargs)

        # 리뷰 객체 가져오기
        review_id = self.kwargs.get('review_id')
        try:
            review = Review.objects.get(id=review_id)
        except Review.DoesNotExist:
            raise NotFound("Review does not exist.")
        
        # ReviewSerializer를 사용하여 리뷰 데이터 직렬화
        review_serializer = ReviewSerializer(review, context={'request': request})
        
        return Response(review_serializer.data, status=status.HTTP_201_CREATED)
        
        
class CommentRetrieveUpdateDestroyAPIView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = CommentSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def get_queryset(self):
        review_id = self.kwargs.get('review_id')
        return Comment.objects.filter(review__id=review_id).select_related('user')

    def get_object(self):
        queryset = self.get_queryset()
        comment_id = self.kwargs.get('comment_id')
        try:
            comment = queryset.get(id=comment_id)
            return comment
        except Comment.DoesNotExist:
            raise NotFound("Comment does not exist.")

    def perform_update(self, serializer):
        comment = self.get_object()
        if comment.user != self.request.user:
            raise PermissionDenied("You do not have permission to edit this comment.")
        serializer.save()

    def perform_destroy(self, instance):
        if instance.user != self.request.user:
            raise PermissionDenied("You do not have permission to delete this comment.")
        # 저장해두기 전에 관련된 리뷰를 가져옵니다.
        self.review = instance.review
        instance.delete()

    def update(self, request, *args, **kwargs):
        """
        Override the default update method to return serialized review data.
        """
        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)
        
        # 관련된 리뷰 가져오기
        review = instance.review
        review_serializer = ReviewSerializer(review, context={'request': request})
        
        return Response(review_serializer.data, status=status.HTTP_200_OK)

    def destroy(self, request, *args, **kwargs):
        """
        Override the default destroy method to return serialized review data.
        """
        instance = self.get_object()
        # 삭제 전에 관련된 리뷰를 가져옵니다.
        review = instance.review
        self.perform_destroy(instance)
        
        # 리뷰 직렬화
        review_serializer = ReviewSerializer(review, context={'request': request})
        
        return Response(review_serializer.data, status=status.HTTP_200_OK)

    def retrieve(self, request, *args, **kwargs):
        """
        Optionally, override the retrieve method to include a custom message.
        """
        instance = self.get_object()
        serializer = self.get_serializer(instance)
        return Response({
            "message": "Comment retrieved successfully.",
            "comment": serializer.data
        }, status=status.HTTP_200_OK)
        
        
class ReviewListCreateAPIView(APIView):
    def get_permissions(self):
        if self.request.method == 'GET':
            return [AllowAny()]
        return [IsAuthenticated()]

    def get(self, request, problem_id):
        reviews = Review.objects.filter(problem_id=problem_id)
        serializer = ReviewSerializer(reviews, many=True)
        return Response(serializer.data)
    
    def post(self, request, problem_id):
        # 현재 유저가 이미 해당 문제에 리뷰를 남겼는지 확인
        if Review.objects.filter(user=request.user, problem_id=problem_id).exists():
            return Response({"detail": "You have already submitted a review for this problem."},
                            status=status.HTTP_400_BAD_REQUEST)
        
        # 사용자가 해당 문제를 구매했는지 또는 무료 문제인지 확인
        if not Payment.objects.filter(creator=request.user, problem_id=problem_id).exists() and \
            not Problem.objects.filter(is_free=True, id=problem_id).exists():
            return Response({"detail": "You need to purchase this problem to leave a review."},
                        status=status.HTTP_403_FORBIDDEN)

        serializer = ReviewSerializer(data=request.data)
        if serializer.is_valid():
            problem = Problem.objects.get(id=problem_id)
            serializer.save(user=request.user, problem=problem)
            
            reviews = Review.objects.filter(problem_id=problem_id)
            reviews_serializer = ReviewSerializer(reviews, many=True)

            return Response({
                "all_reviews": reviews_serializer.data
            }, status=status.HTTP_201_CREATED)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ReviewDetailAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get_object(self, pk):
        try:
            return Review.objects.get(pk=pk)
        except Review.DoesNotExist:
            raise Http404

    def get(self, request, pk):
        review = self.get_object(pk)
        serializer = ReviewSerializer(review)
        return Response(serializer.data)

    def put(self, request, pk):
        review = self.get_object(pk)
        
        if review.user != request.user:
            return Response({"detail": "You do not have permission to edit this review."},
                            status=status.HTTP_403_FORBIDDEN)
        
        # rating 또는 comment 중 하나라도 유효한 값이 있으면 업데이트 진행
        data = {}
        if 'rating' in request.data:
            data['rating'] = request.data.get('rating')
        if 'comment' in request.data:
            data['comment'] = request.data.get('comment')
        
        if not data:
            return Response({"detail": "At least one field (rating or comment) must be provided."},
                            status=status.HTTP_400_BAD_REQUEST)

        serializer = ReviewSerializer(review, data=data, partial=True)
        if serializer.is_valid():
            serializer.save()

            # 수정 후 해당 문제에 대한 모든 리뷰를 가져옵니다.
            reviews = Review.objects.filter(problem_id=review.problem.id)
            reviews_serializer = ReviewSerializer(reviews, many=True)
            
            return Response(reviews_serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        review = self.get_object(pk)

        if review.user != request.user:
            return Response({"detail": "You do not have permission to delete this review."},
                            status=status.HTTP_403_FORBIDDEN)
        
        problem_id = review.problem.id        
        review.delete()

        remaining_reviews = Review.objects.filter(problem_id=problem_id)
        serializer = ReviewSerializer(remaining_reviews, many=True)

        return Response({
            "message": "Review deleted successfully.",
            "remaining_reviews": serializer.data
        }, status=status.HTTP_200_OK)
