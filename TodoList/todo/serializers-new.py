from rest_framework import serializers
from .models import Todo


class TodoSerializer(serializers.ModelSerializer):
    # 1) 추가적인 읽기 전용 필드 예시
    day_of_week = serializers.SerializerMethodField(read_only=True)

    # 2) title이나 description에 대한 유효성 검증 (필요 시)
    #   - ModelSerializer에서 자동 검증도 하지만, 추가 커스텀 검증 가능
    def validate_title(self, value):
        if len(value) < 3:
            raise serializers.ValidationError("제목은 최소 3자 이상이어야 합니다.")
        return value

    def validate_description(self, value):
        # 필요 시 description에 대한 제한 or 필수 조건 검증
        if len(value) > 1000:
            raise serializers.ValidationError("설명은 최대 1000자 이하로 작성하세요.")
        return value

    # 3) 객체 레벨 검증 예시 (title, description 동시 검증 등)
    def validate(self, attrs):
        title = attrs.get("title")
        description = attrs.get("description", "")
        # 예: 제목이 'TEST'로 시작하면서, description이 비어있으면 에러
        if title and title.startswith("TEST") and not description:
            raise serializers.ValidationError(
                "TEST로 시작하는 제목은 설명이 필수입니다."
            )
        return attrs

    class Meta:
        model = Todo
        fields = [
            "id",
            "title",
            "description",
            "is_done",
            "created_at",
            "day_of_week",
        ]
        read_only_fields = ("id", "created_at")

    def get_day_of_week(self, obj):
        """
        day_of_week: created_at 날짜를 기반으로 요일을 계산, 문자열로 반환
        """
        # created_at이 None이 아닐 때만 계산
        if obj.created_at:
            # 파이썬 datetime.weekday() → 월=0, 화=1, ...
            weekday_number = obj.created_at.weekday()
            weekdays = ["월", "화", "수", "목", "금", "토", "일"]
            return weekdays[weekday_number]
        return None
