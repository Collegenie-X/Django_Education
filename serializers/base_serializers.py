from rest_framework import serializers


class CarSerializer(serializers.Serializer):
    brand = serializers.CharField(max_length=50)
    model = serializers.CharField(max_length=50)
    year = serializers.IntegerField()
