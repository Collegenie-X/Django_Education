from rest_framework import serializers


class CarSerializer(serializers.ModelSerializer):
    class Meta:
        model = Car
        fields = "__all__"

    def validate_year(self, value):
        """연도가 2000 이상 2025 이하인지 검사"""
        if value < 2000 or value > 2025:
            raise serializers.ValidationError(
                "연도는 2000년에서 2025년 사이여야 합니다."
            )
        return value


class CarSerializer(serializers.ModelSerializer):
    class Meta:
        model = Car
        fields = "__all__"

    def validate(self, data):
        """Tesla 차량은 2012년 이후 모델만 허용"""
        if data["brand"] == "Tesla" and data["year"] < 2012:
            raise serializers.ValidationError(
                "Tesla 차량은 2012년 이후 모델만 가능합니다."
            )
        return data


class CarSerializer(serializers.ModelSerializer):
    class Meta:
        model = Car
        fields = "__all__"

    def validate_year(self, value):
        if value > 2025:
            raise serializers.ValidationError("연도는 2025년 이하여야 합니다.")
        return value


class CarSerializer(serializers.ModelSerializer):
    class Meta:
        model = Car
        fields = "__all__"

    def validate(self, data):
        if data["brand"] == "Tesla" and data["year"] < 2012:
            raise serializers.ValidationError(
                "Tesla 차량은 2012년 이후 모델만 가능합니다."
            )
        return data
