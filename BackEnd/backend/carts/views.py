from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Cart, CartItem
from store.models import Problem
from .serializers import CartSerializer, CartItemSerializer
from django.shortcuts import get_object_or_404

# 카트 목록 조회 및 문제 추가 API
class CartAPIView(APIView):
    def get(self, request):
        cart, created = Cart.objects.get_or_create(user=request.user)
        serializer = CartSerializer(cart)
        return Response(serializer.data)

    def post(self, request):
        cart, created = Cart.objects.get_or_create(user=request.user)
        problem = get_object_or_404(Problem, id=request.data.get("problem_id"))
        cart_item, item_created = CartItem.objects.get_or_create(cart=cart, problem=problem)
        if not item_created:
            return Response({"message": "Problem is already in the cart."}, status=status.HTTP_200_OK)
        serializer = CartItemSerializer(cart_item)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
# 카트의 특정 문제 삭제 API
class CartItemDeleteAPIView(APIView):
    def delete(self, request, problem_id):
        cart = get_object_or_404(Cart, user=request.user)
        cart_item = get_object_or_404(CartItem, cart=cart, problem__id=problem_id)
        cart_item.delete()
        return Response({"message": "Problem removed from the cart."}, status=status.HTTP_204_NO_CONTENT)

# 카트 전체 비우기 API
class CartClearAPIView(APIView):
    def delete(self, request):
        cart = get_object_or_404(Cart, user=request.user)
        cart.items.all().delete()  # 모든 CartItem 삭제
        return Response({"message": "Cart is now empty."}, status=status.HTTP_204_NO_CONTENT)
