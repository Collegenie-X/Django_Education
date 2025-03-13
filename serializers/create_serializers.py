from rest_framework import serializers
from .models import Car


class CarSerializer(serializers.ModelSerializer):
    class Meta:
        model = Car
        fields = "__all__"

    def create(self, validated_data):
        """새로운 Car 객체를 생성하는 함수"""
        return Car.objects.create(**validated_data)
