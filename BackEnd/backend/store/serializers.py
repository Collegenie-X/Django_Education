# serializers.py

from rest_framework import serializers
from .models import Problem, Wishlist, PreviewImage
from django.contrib.auth import get_user_model
from .models import UnitType, SectionType
import os

User = get_user_model()

class PreviewImageSerializer(serializers.ModelSerializer):
    image_url = serializers.SerializerMethodField()
    tag_image_url = serializers.SerializerMethodField()

    class Meta:
        model = PreviewImage
        fields = ['id', 'image_url', 'tag_image_url', 'uploaded_at']
        read_only_fields = ['id', 'uploaded_image_url', 'uploaded_at']

    def get_image_url(self, obj):
        request = self.context.get('request')
        if obj.image and hasattr(obj.image, 'url'):
            return request.build_absolute_uri(obj.image.url) if request else obj.image.url
        return None

    def get_tag_image_url(self, obj):
        # base_url을 image_url에 붙여서 반환
        base_url = "https://studyola-main-dir.s3.us-east-2.amazonaws.com/"
        if obj.image_url:
            return base_url + obj.image_url
        return None

    def validate_image(self, value):
        # 파일 확장자 및 크기 검증
        ext = os.path.splitext(value.name)[1].lower()
        if ext not in ['.jpg', '.jpeg', '.png', '.svg']:
            raise serializers.ValidationError('지원되지 않는 파일 형식입니다. jpg, jpeg, png, svg만 가능합니다.')
        if value.size > 5 * 1024 * 1024:  # 5MB 제한
            raise serializers.ValidationError('파일 크기는 5MB를 초과할 수 없습니다.')
        return value

    def validate_image_url(self, value):
        # image_url에 접두사를 추가
        base_url = "https://studyola-main-dir.s3.us-east-2.amazonaws.com"
        if value and not value.startswith(base_url):
            value = base_url + value
        return value


class ProblemSerializer(serializers.ModelSerializer):
    write_user_name = serializers.SerializerMethodField()
    file_name = serializers.SerializerMethodField()
    file_url = serializers.SerializerMethodField()
    is_wished = serializers.SerializerMethodField()
    unit = serializers.SerializerMethodField()
    detailed_section = serializers.SerializerMethodField()
    is_purchased = serializers.SerializerMethodField()
    
    # 추가된 필드
    total_score = serializers.SerializerMethodField()
    total_comments = serializers.SerializerMethodField()

    # PreviewImage 관련 필드 (쓰기 가능하도록 수정)
    preview_images = PreviewImageSerializer(many=True, required=False)


    class Meta:
        model = Problem
        fields = [
            "id",
            "total_score",
            "total_comments",
            "write_user_name",
            "subject",
            "problem_type",
            "type",
            "grade",
            "unit",
            "detailed_section",
            "difficulty",
            "title",
            "description",
            "discounted_price",
            "price",
            "pages",
            "problems",
            "preview_images",
            "is_free",
            "is_wished",
            "is_purchased",
            "file_name",
            "file_url",
            "updated_date",
            "created_date",
        ]
        read_only_fields = ['user', 'problem_type']
    

    def get_total_score(self, obj):
        return obj.total_reviews_score()

    def get_total_comments(self, obj):
        return obj.total_comments()

    def get_write_user_name(self, obj):
        return obj.user.username

    def get_file_name(self, obj):
        if obj.file:
            return os.path.basename(obj.file.name).split('___', 1)[-1]
        return None
    

    
    def get_file_url(self, obj):
        # is_free가 True일 때만 file URL 반환
        if obj.is_free and obj.file:
            request = self.context.get('request')
            return request.build_absolute_uri(obj.file.url) if request else obj.file.url
        return None

    def get_is_wished(self, obj):
        request = self.context.get('request')
        if request and request.user.is_authenticated:
            return Wishlist.objects.filter(user=request.user, problem=obj).exists()
        return False

    def get_unit(self, obj):
        # UnitType 이름 목록 반환
        return [unit.name for unit in obj.unit.all()]

    def get_detailed_section(self, obj):
        # SectionType 이름 목록 반환
        return [section.name for section in obj.detailed_section.all()]

    def get_is_purchased(self, obj):
        request = self.context.get('request')
        if request and request.user.is_authenticated:
            # 'payments' 관계가 모델에 실제로 존재하는지 확인 필요
            return obj.payments.filter(creator=request.user).exists()
        return False

    def create(self, validated_data):
        preview_images_data = validated_data.pop('preview_images', [])
        problem = Problem.objects.create(**validated_data)
        for image_data in preview_images_data:
            PreviewImage.objects.create(problem=problem, **image_data)
        return problem

    def update(self, instance, validated_data):
        preview_images_data = validated_data.pop('preview_images', None)
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()

        if preview_images_data is not None:
            # 기존 이미지 삭제 (필요 시)
            instance.preview_images.all().delete()
            for image_data in preview_images_data:
                PreviewImage.objects.create(problem=instance, **image_data)
        
        return instance
    



class ProblemIsViewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Problem
        fields = ['id','is_view']  # 실제 필드명으로 수정

class SectionTypeSerializer(serializers.ModelSerializer):
    problem_units = serializers.SerializerMethodField()

    class Meta:
        model = SectionType
        fields = ['id', 'name', 'subject', 'problem_units']

    def get_problem_units(self, obj):
        # Prefetch를 통해 미리 가져온 문제들 사용
        related_problems = getattr(obj, 'filtered_problems', [])

        # UnitType과 문제들을 매핑
        units_dict = {}
        for problem in related_problems:
            for unit in problem.unit.all():
                if unit.id not in units_dict:
                    units_dict[unit.id] = {
                        'id': unit.id,
                        'name': unit.name,
                        'subject': unit.subject,
                        'problems': []
                    }
                units_dict[unit.id]['problems'].append({
                    'id': problem.id,                   
                    'is_view': problem.is_view
                })

        # 중복을 제거한 유닛 리스트 반환
        return list(units_dict.values())

class UnitTypeSerializer(serializers.ModelSerializer):
    problems = serializers.SerializerMethodField()

    class Meta:
        model = UnitType
        fields = ['id', 'name', 'subject', 'problems']

    def get_problems(self, obj):
        # Prefetch를 통해 미리 가져온 문제들 사용
        problems = getattr(obj, 'filtered_problems', [])
        return [
            {
                'id': p.id,              
                'is_view': p.is_view
            }
            for p in problems
        ]
