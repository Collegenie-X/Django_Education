from rest_framework import serializers
from .models import Car, Manufacturer


class ManufacturerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Manufacturer
        fields = "__all__"


class CarSerializer(serializers.ModelSerializer):
    manufacturer = ManufacturerSerializer(read_only=True)  # 제조사 정보를 포함

    class Meta:
        model = Car
        fields = ["brand", "model", "year", "manufacturer"]
