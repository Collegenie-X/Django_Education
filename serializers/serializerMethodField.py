from rest_framework import serializers
from .models import Car


class CarSerializer(serializers.ModelSerializer):
    age = serializers.SerializerMethodField()

    class Meta:
        model = Car
        fields = ["brand", "model", "year", "age"]

    def get_age(self, obj):
        """자동차 나이 계산"""
        return 2025 - obj.year
