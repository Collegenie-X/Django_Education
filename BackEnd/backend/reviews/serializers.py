# serializers.py

from rest_framework import serializers
from .models import Review , Comment



class CommentSerializer(serializers.ModelSerializer):
    user = serializers.SerializerMethodField()
    review = serializers.SerializerMethodField()
    
    class Meta:
        model = Comment
        fields = ['id', 'user', 'review', 'content', 'created_at']

    def get_user(self, obj):
        return obj.user.username
    
    def get_review(self, obj):
        return obj.review.id

class ReviewSerializer(serializers.ModelSerializer):
    user = serializers.SerializerMethodField()
    email = serializers.SerializerMethodField()
    writer_comments = serializers.SerializerMethodField()  # SerializerMethodField로 변경

    class Meta:
        model = Review
        fields = ['id', 'user', 'email', 'problem', 'rating', 'comment', 'created_at', 'writer_comments']
        read_only_fields = ['id', 'user', 'created_at', 'problem']

    def create(self, validated_data):
        request = self.context.get('request', None)
        if request and request.user.is_authenticated:
            validated_data['user'] = request.user
        return super().create(validated_data)

    def get_user(self, obj):
        return obj.user.username

    def get_email(self, obj):
        return obj.user.email

    def get_writer_comments(self, obj):
        # 관련된 댓글만 필터링하여 직렬화
        related_comments = obj.comments.all()  # 필요에 따라 필터 추가 가능
        return CommentSerializer(related_comments, many=True).data