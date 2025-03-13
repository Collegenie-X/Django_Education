from rest_framework import serializers
from .models import Car


class CarSerializer(serializers.ModelSerializer):
    class Meta:
        model = Car
        fields = "__all__"
        extra_kwargs = {
            "year": {"required": False},  # year 필드는 선택 입력
            "brand": {"validators": []},  # brand의 기본 유효성 검사 제거
        }
