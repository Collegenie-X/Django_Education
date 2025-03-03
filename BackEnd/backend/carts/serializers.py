from rest_framework import serializers
from .models import Cart, CartItem
from store.models import Problem
from accounts.models import User  # User 모델 임포트 필요


class ProblemSerializer(serializers.ModelSerializer):
    class Meta:
        model = Problem
        fields = ['id', 'title', 'preview_image', 'price', 'grade', 'difficulty'] 

class CartItemSerializer(serializers.ModelSerializer):
    problem = ProblemSerializer() 

    class Meta:
        model = CartItem
        fields = ['problem']

class CartSerializer(serializers.ModelSerializer):
    user = serializers.SerializerMethodField()  # user 필드를 재정의

    items = CartItemSerializer(many=True)

    class Meta:
        model = Cart
        fields = ['id', 'user', 'items', 'created_at', 'updated_at']

    def get_user(self, obj):
        return obj.user.email  # user의 email을 반환
