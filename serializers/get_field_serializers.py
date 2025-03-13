from rest_framework import serializers
from .models import Car


class CarSerializer(serializers.ModelSerializer):
    class Meta:
        model = Car
        fields = "__all__"

    def get_fields(self):
        """관리자만 'secret_code' 필드를 볼 수 있도록 설정"""
        fields = super().get_fields()
        request = self.context.get("request")
        if request and not request.user.is_staff:
            fields.pop("secret_code", None)
        return fields
