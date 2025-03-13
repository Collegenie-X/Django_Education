from rest_framework import serializers
from .models import Car


class CarSerializer(serializers.ModelSerializer):
    class Meta:
        model = Car
        fields = "__all__"

    def to_internal_value(self, data):
        """입력 데이터를 내부적으로 변환"""
        data["brand"] = data["brand"].upper()  # 브랜드명을 대문자로 변환
        return super().to_internal_value(data)
