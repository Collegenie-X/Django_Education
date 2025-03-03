from django.forms import ValidationError
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, permissions
from .models import Problem,Wishlist,PreviewImage
from accounts.models import User
from .serializers import ProblemSerializer
from django.shortcuts import get_object_or_404



from store.models import Problem, UnitType, SectionType

from django_filters import rest_framework as filters

import csv 
import re
from math import ceil
from django.db.models import Count, Avg, Q, F, Value, IntegerField, Case, When, Sum
from django.core.exceptions import ValidationError
from django_filters import rest_framework as filters
from rest_framework import generics, permissions, status
from rest_framework.response import Response
from rest_framework.pagination import PageNumberPagination
from rest_framework import serializers
import logging


from functools import reduce
from operator import add
from rest_framework import generics
from rest_framework.permissions import AllowAny


from rest_framework.decorators import api_view, permission_classes
from .serializers import UnitTypeSerializer, SectionTypeSerializer

from decimal import Decimal
from django.db.models import Prefetch

# 로깅 설정
logger = logging.getLogger(__name__)
logging.basicConfig(level=logging.INFO)



# 모델 예시 (Problem, UnitType, SectionType 등)
# 실제 모델 필드에 맞게 수정하세요.

class ProblemFilter(filters.FilterSet):
    problem_type = filters.CharFilter(field_name='problem_type', lookup_expr='icontains')
    type = filters.CharFilter(field_name='type', lookup_expr='icontains')
    subject = filters.CharFilter(field_name='subject', lookup_expr='icontains')
    grade = filters.CharFilter(field_name='grade', lookup_expr='icontains')
    search = filters.CharFilter(method='filter_search')
    unit = filters.CharFilter(method='filter_unit')
    detailed_section = filters.CharFilter(method='filter_detailed_section')
    difficulty = filters.CharFilter(method='filter_difficulty')
    
     # Add the is_free filter
    is_free = filters.BooleanFilter(field_name='is_free')

    class Meta:
        model = Problem
        fields = ['problem_type', 'type', 'subject', 'grade', 'search', 'unit', 'detailed_section', 'difficulty', 'is_free']

    def filter_search(self, queryset, name, value):
        words = value.split()
        self.words = words  # Store the list of words in the filter_set instance

        if not words:
            return queryset

        # OR 조건으로 각 단어가 title 또는 description에 포함되는지 필터링
        filter_conditions = Q()
        for word in words:
            filter_conditions |= Q(title__icontains=word) 
        queryset = queryset.filter(filter_conditions)

        # 각 단어에 대한 일치 여부를 어노테이션으로 추가
        annotations = {}
        for i, word in enumerate(words):
            annotations[f'match_word_{i}'] = Case(
                When(Q(title__icontains=word) , then=Value(1)),
                default=Value(0),
                output_field=IntegerField()
            )
        queryset = queryset.annotate(**annotations)

        # 일치하는 단어의 수를 합산하여 search_rank 계산
        if len(words) > 0:
            search_rank_expression = reduce(add, [F(f'match_word_{i}') for i in range(len(words))], Value(0))
            queryset = queryset.annotate(search_rank=search_rank_expression).order_by('-search_rank')

            # 전체 단어의 50% 이상 일치해야 함
            min_matches = ceil(len(words) / 2)
            queryset = queryset.filter(search_rank__gte=min_matches)

        return queryset
    def filter_unit(self, queryset, name, value):
        # 콤마와 공백을 모두 구분자로 사용하여 유닛 리스트 생성
        unit_list = [u.strip() for u in re.split(r'[,\s]+', value) if u.strip()]
        unit_list = list(set(unit_list))  # 중복 제거

        if not unit_list:
            raise ValidationError("유효한 unit 값을 입력해 주세요.")

        # 유사한 유닛 찾기 (부분 일치)
        similar_units = UnitType.objects.none()
        for unit_name in unit_list:
            similar_units |= UnitType.objects.filter(name__icontains=unit_name)
        similar_units = similar_units.distinct()
        similar_unit_names = similar_units.values_list('name', flat=True)

        if not similar_unit_names:
            raise ValidationError(f"유사한 unit 값을 찾을 수 없습니다: {', '.join(unit_list)}")

        # 모든 지정된 유닛을 가진 문제만 필터링 (AND 조건)
        for unit_name in unit_list:
            queryset = queryset.filter(Q(unit__name__icontains=unit_name))

        return queryset

    def filter_detailed_section(self, queryset, name, value):
        # 콤마와 공백을 모두 구분자로 사용하여 상세 섹션 리스트 생성
        section_list = [s.strip() for s in re.split(r'[,\s]+', value) if s.strip()]
        section_list = list(set(section_list))  # 중복 제거

        if not section_list:
            raise ValidationError("유효한 detailed_section 값을 입력해 주세요.")

        # 유사한 상세 섹션 찾기 (부분 일치)
        similar_sections = SectionType.objects.none()
        for section in section_list:
            similar_sections |= SectionType.objects.filter(name__icontains=section)
        similar_sections = similar_sections.distinct()
        similar_section_names = similar_sections.values_list('name', flat=True)

        if not similar_section_names:
            raise ValidationError(f"유사한 detailed_section 값을 찾을 수 없습니다: {', '.join(section_list)}")

        # 모든 지정된 상세 섹션을 가진 문제만 필터링 (AND 조건)
        for section_name in section_list:
            queryset = queryset.filter(Q(detailed_section__name__icontains=section_name))

        return queryset

    def filter_difficulty(self, queryset, name, value):
        try:
            # 콤마와 공백을 모두 구분자로 사용하여 난이도 리스트 생성
            difficulty_list = [int(d.strip()) for d in re.split(r'[,\s]+', value) if d.strip().isdigit()]
            if not difficulty_list:
                raise ValueError
            return queryset.filter(difficulty__in=difficulty_list)
        except ValueError:
            raise ValidationError("유효하지 않은 difficulty 값이 있습니다. 숫자 형태로 입력해 주세요.")


class StandardResultsSetPagination(PageNumberPagination):
    page_size = 20  # 기본 페이지 크기
    page_size_query_param = 'page_size'  # 클라이언트가 요청할 때 사용할 페이지 크기 파라미터 이름
    max_page_size = 100  # 최대 페이지 크기


# 뷰 클래스 정의
class ProblemListCreate(generics.ListAPIView):
    serializer_class = ProblemSerializer
    permission_classes = [permissions.AllowAny]
    filter_backends = [filters.DjangoFilterBackend]
    filterset_class = ProblemFilter
    pagination_class = StandardResultsSetPagination

    def get_queryset(self):
        queryset = Problem.objects.filter(is_view=True).prefetch_related('payments').annotate(
            review_count=Count('reviews', distinct=True),
            average_score=Avg('reviews__rating')
        )

        # 요청에 'problem_type'이 있는지 확인
        problem_type = self.request.query_params.get('problem_type')
        if problem_type in ['Best', 'Premium']:
            return queryset.filter(problem_type=problem_type).order_by('?')  # 랜덤 정렬
        else:
            return queryset.order_by('-created_date')  # 최신순 정렬

    def get_permissions(self):
        if self.request.method in ['GET', 'PUT']:
            return [permissions.AllowAny()]
        return [permissions.IsAuthenticated()]
    
    def list(self, request, *args, **kwargs):
        try:
            # 필터 파라미터가 하나라도 있는지 확인
            filter_present = any(request.query_params.get(param) for param in [
                'problem_type', 'subject', 'grade', 'search', 'unit', 'detailed_section', 'difficulty', 'is_free', 'type'  # 'type' 추가
            ])

            
            # 페이지네이션 파라미터 확인
            page = request.query_params.get('page')
            page_size = request.query_params.get('page_size')

            if not filter_present and not page and not page_size:
                # 필터 파라미터와 페이지네이션 파라미터가 없을 경우 전체 데이터 반환 (페이징 없이)
                queryset = self.get_queryset()
                serializer = self.get_serializer(queryset, many=True)
                serialized_data = serializer.data

                # search_rank가 있는 경우 추가
                search = request.query_params.get('search')
                if search:
                    for idx, problem in enumerate(queryset):
                        serialized_data[idx]['search_rank'] = getattr(problem, 'search_rank', None)

                response_data = {   
                    'count': queryset.count(),
                    'results': serialized_data
                }

                return Response(response_data, status=status.HTTP_200_OK)
            
            # 필터 파라미터가 있거나 페이지네이션 파라미터가 있을 경우 페이징 적용
            queryset = self.filter_queryset(self.get_queryset())

            page = self.paginate_queryset(queryset)
            if page is not None:
                # 시리얼라이저에 matched_words 전달
                serializer = self.get_serializer(page, many=True)
                serialized_data = serializer.data

                # search_rank가 있는 경우 matched_words 추가
                search = request.GET.get('search')
                if search:
                    words = search.split()
                    for idx, problem in enumerate(page):
                        serialized_data[idx]['matched_words'] = [
                            word for i, word in enumerate(words) if getattr(problem, f'match_word_{i}', 0)
                        ]

                return self.get_paginated_response(serialized_data)

            # 페이징이 필요 없는 경우
            serializer = self.get_serializer(queryset, many=True)
            return Response(serializer.data)
        
        except ValidationError as ve:
            logger.error(f"Validation 오류: {ve}")
            return Response({"detail": ve.detail}, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            logger.error(f"예상치 못한 오류: {e}")
            return Response({"detail": "데이터 처리 중 오류가 발생했습니다."}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    
    def get_paginated_response(self, data):
        # page_size를 정확하게 반영하기 위해 `len(data)` 사용
        return Response({
            'parameters': {
                'problem_type': self.request.GET.get("problem_type"),
                'subject': self.request.GET.get('subject'),
                'grade': self.request.GET.get('grade'),
                'search': self.request.GET.get('search'),
                'unit': self.request.GET.get('unit'),
                'is_free': self.request.GET.get('is_free'),
                'detailed_section': self.request.GET.get('detailed_section'),
                'difficulty': self.request.GET.get('difficulty'),
                'type': self.request.GET.get('type'),  # 'type' 추가
            },
            'count': self.paginator.page.paginator.count,
            'num_pages': self.paginator.page.paginator.num_pages,
            'current_page': self.paginator.page.number,
            'page_size': len(data),  # 실제 페이지에 포함된 항목 수로 설정
            'results': data
        })

class ToggleWishlistAPIView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, problem_id):
        user = request.user
        problem = get_object_or_404(Problem, id=problem_id)

        wishlist_item, created = Wishlist.objects.get_or_create(user=user, problem=problem)

        if created:
            message = 'Added to wishlist.'
            is_wished = True
        else:
            wishlist_item.delete()
            message = 'Removed from wishlist.'
            is_wished = False

        return Response({'message': message, 'is_wished': is_wished}, status=status.HTTP_200_OK)

class UserWishlistListAPIView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, format=None):
        user = request.user
        wishlists = Wishlist.objects.filter(user=user).select_related('problem')
        problems = [wishlist.problem for wishlist in wishlists]
        serializer = ProblemSerializer(problems, many=True, context={'request': request})
        return Response(serializer.data, status=status.HTTP_200_OK)


# views.py (ProblemDetail 클래스 부분)

class ProblemDetail(APIView):
    def get_permissions(self):
        if self.request.method in ['PUT', 'DELETE']:
            return [permissions.IsAuthenticated()]
        return [permissions.AllowAny()]

    def get_object(self, pk):
        # 어노테이션 추가
        return get_object_or_404(
            Problem.objects.annotate(
                review_count=Count('reviews', distinct=True),
                average_score=Avg('reviews__rating')
            ),
            pk=pk
        )

    def get(self, request, pk, format=None):
        problem = self.get_object(pk)  # 특정 문제 하나만 조회
        serializer = ProblemSerializer(problem, context={'request': request})
        return Response(serializer.data)
        
    def put(self, request, pk, format=None):
        problem = self.get_object(pk)
        if problem.user != request.user:
            return Response({'detail': '권한이 없습니다.'}, status=status.HTTP_403_FORBIDDEN)
        serializer = ProblemSerializer(problem, data=request.data, partial=True, context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
@permission_classes([AllowAny])
def unit_type_list(request):
    """
    모든 UnitType 목록을 가져옵니다.
    """
    # is_view=True인 문제들만 미리 가져오고, 관련된 UnitType을 함께 Prefetch
    problems_prefetch = Prefetch(
        'problems',
        queryset=Problem.objects.filter(is_view=True).only('id', 'is_view'),
        to_attr='filtered_problems'
    )
    
    # 모든 UnitType과 관련된 문제들을 Prefetch
    unit_types = UnitType.objects.all().prefetch_related(problems_prefetch)
    
    serializer = UnitTypeSerializer(unit_types, many=True, context={'request': request})
    return Response(serializer.data, status=status.HTTP_200_OK)

@api_view(['GET'])
@permission_classes([AllowAny])
def section_type_list(request):
    """
    모든 SectionType 목록을 가져옵니다.
    """
    # is_view=True인 문제들만 미리 가져오고, 관련된 UnitType을 함께 Prefetch
    problems_prefetch = Prefetch(
        'DetailSection',
        queryset=Problem.objects.filter(is_view=True).only('id', 'is_view').prefetch_related(
            Prefetch('unit', queryset=UnitType.objects.only('id', 'name', 'subject'))
        ),
        to_attr='filtered_problems'
    )
    
    # 모든 SectionType과 관련된 문제들을 Prefetch
    section_types = SectionType.objects.all().prefetch_related(problems_prefetch)
    
    serializer = SectionTypeSerializer(section_types, many=True, context={'request': request})
    return Response(serializer.data, status=status.HTTP_200_OK)