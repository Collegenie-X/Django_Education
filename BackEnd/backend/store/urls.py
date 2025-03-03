# store/urls.py

from django.urls import path
from .views import (
    ProblemListCreate,
    ProblemDetail,
    ToggleWishlistAPIView,
    UserWishlistListAPIView,
    unit_type_list,
    section_type_list
)

urlpatterns = [
    path('problems/', ProblemListCreate.as_view(), name='problem-list-create'),
    path('problems/<int:pk>/', ProblemDetail.as_view(), name='problem-detail'),
    path('wishlist/toggle/<int:problem_id>/', ToggleWishlistAPIView.as_view(), name='wishlist-toggle'),
    path('wishlist/', UserWishlistListAPIView.as_view(), name='user-wishlist-list'),
    
    path('unit-types/', unit_type_list, name='unit_type_list'),
    path('section-types/', section_type_list, name='section_type_list'),
]
