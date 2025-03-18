from rest_framework import serializers
from .models import Todo


class TodoSerializer(serializers.ModelSerializer):
    owner = serializers.PrimaryKeyRelatedField(read_only=True)
    # ↑ ① 명시적으로 read_only=True로 지정

    class Meta:
        model = Todo
        fields = [
            "id",
            "title",
            "description",
            "is_done",
            "priority",
            "created_at",
            "owner",
        ]
        # ↑ ② owner도 포함 (출력은 하되, 입력은 안 받음)

    def create(self, validated_data):
        # ③ 자동으로 owner를 현재 요청의 user로 지정
        owner = self.context["request"].user
        validated_data["owner"] = owner
        return super().create(validated_data)
