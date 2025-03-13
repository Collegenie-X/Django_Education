from rest_framework import serializers
from .models import Car


class CarModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = Car
        fields = "__all__"  # 모든 필드 직렬화
