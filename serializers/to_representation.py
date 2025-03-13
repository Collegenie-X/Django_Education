from rest_framework import serializers
from .models import Car


class CarSerializer(serializers.ModelSerializer):
    class Meta:
        model = Car
        fields = "__all__"

    def to_representation(self, instance):
        """출력 데이터를 변환"""
        data = super().to_representation(instance)
        data["year"] = f"{instance.year}년 출시"
        return data


class CarSerializer(serializers.ModelSerializer):
    class Meta:
        model = Car
        fields = "__all__"

    def to_representation(self, instance):
        data = super().to_representation(instance)
        data["year"] = f"{instance.year}년 출시"
        return data


class CarSerializer(serializers.ModelSerializer):
    class Meta:
        model = Car
        fields = "__all__"

    def to_internal_value(self, data):
        data["brand"] = data["brand"].upper()  # 브랜드명을 대문자로 변환
        return super().to_internal_value(data)
