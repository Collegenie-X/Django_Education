from rest_framework import serializers
from .models import Car


class CarSerializer(serializers.ModelSerializer):
    class Meta:
        model = Car
        fields = "__all__"

    def update(self, instance, validated_data):
        """기존 Car 객체를 업데이트하는 함수"""
        instance.brand = validated_data.get("brand", instance.brand)
        instance.model = validated_data.get("model", instance.model)
        instance.year = validated_data.get("year", instance.year)
        instance.save()
        return instance
