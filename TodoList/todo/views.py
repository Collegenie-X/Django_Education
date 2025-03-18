from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import get_object_or_404
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication

from .models import Todo
from .serializers import TodoSerializer


class TodoListCreateAPIView(APIView):
    """
    /todos/ (GET: 목록 조회, POST: 생성)
    """

    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request):
        todos = Todo.objects.filter(owner=request.user)

        # 1) 데이터가 없을 때 특별 메시지를 반환하고 싶다면:
        if not todos.exists():
            return Response(
                {"message": "등록된 Todo가 없습니다."}, status=status.HTTP_200_OK
            )

        # 2) 데이터가 있을 때는 기존대로 반환
        serializer = TodoSerializer(todos, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request):
        serializer = TodoSerializer(data=request.data, 
                                    context={"request": request})
        if serializer.is_valid():
            # 직접 owner를 지정하여 저장
            serializer.save(owner=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class TodoDetailAPIView(APIView):
    """
    /todos/<pk>/ (GET: 단일 조회, PATCH: 수정, DELETE: 삭제)
    """

    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def get_object_or_none(self, pk):
        try:
            return Todo.objects.get(pk=pk, owner=self.request.user)
        except Todo.DoesNotExist:
            return None

    def get(self, request, pk):
        todo = self.get_object_or_none(pk)
        if todo is None:
            return Response(
                {"message": f"ID {pk}에 해당하는 Todo가 없습니다."},
                status=status.HTTP_404_NOT_FOUND,
            )
        serializer = TodoSerializer(todo)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def patch(self, request, pk):
        todo = self.get_object_or_none(pk)
        if todo is None:
            return Response(
                {"message": f"ID {pk}에 해당하는 Todo가 없습니다."},
                status=status.HTTP_404_NOT_FOUND,
            )
        serializer = TodoSerializer(todo, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        todo = self.get_object_or_none(pk)
        if todo is None:
            return Response(
                {"message": f"ID {pk}에 해당하는 Todo가 없습니다."},
                status=status.HTTP_404_NOT_FOUND,
            )
        todo.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
