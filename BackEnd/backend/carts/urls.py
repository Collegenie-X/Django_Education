from django.urls import path
from .views import CartAPIView, CartItemDeleteAPIView, CartClearAPIView

urlpatterns = [
    path('', CartAPIView.as_view(), name='cart'),  # 조회 및 문제 추가
    path('item/<int:problem_id>/', CartItemDeleteAPIView.as_view(), name='cart-item-delete'),  # 특정 문제 삭제
    path('clear/', CartClearAPIView.as_view(), name='cart-clear'),  # 전체 비우기
]
