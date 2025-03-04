import os
import uuid
from django.core.exceptions import ValidationError
from django.db import models
from accounts.models import User
from django.utils import timezone
from multiselectfield import MultiSelectField
from .storage_backends import AttachmentS3Boto3Storage
from django.core.files.storage import FileSystemStorage


import json

# JSON 파일 경로
json_file_path = "./store/america_category_english.json"

# JSON 파일 읽기
with open(json_file_path, "r") as file:
    json_data = json.load(file)

# UNIT_CHOICES와 DETAIL_CHOICES 추출
unit_choices = set()
detail_choices = set()


def extract_choices(data):
    for key, value in data.items():
        if isinstance(value, dict):
            unit_choices.add(key)
            extract_choices(value)
        else:
            detail_choices.add(key)


# 데이터에서 선택지 추출
extract_choices(json_data)

# 정렬된 리스트로 변환
unit_choices_list = sorted(list(unit_choices))
detail_choices_list = sorted(list(detail_choices))


def get_image_upload_path(instance, filename):
    # 현재 날짜 가져오기
    now = timezone.now()
    year = now.strftime("%Y")
    month = now.strftime("%m")
    day = now.strftime("%d")

    # 날짜별 폴더 경로 생성
    return os.path.join("pre_image", year, month, day, filename)


def get_file_upload_path(instance, filename):
    # 현재 날짜 가져오기
    now = timezone.now()
    year = now.strftime("%Y")
    month = now.strftime("%m")
    day = now.strftime("%d")

    # UUID를 포함한 폴더 이름 생성
    folder = f"{uuid.uuid4().hex[:16]}"

    # 날짜별 폴더 경로 생성
    return os.path.join("uploads", year, month, day, folder, filename)


GRADE_CHOICES = [
    ("Kindergarten", "Kindergarten"),
    ("USA grade 1", "USA grade 1"),
    ("USA grade 2", "USA grade 2"),
    ("USA grade 3", "USA grade 3"),
    ("USA grade 4", "USA grade 4"),
    ("USA grade 5", "USA grade 5"),
    ("USA grade 6", "USA grade 6"),
    ("USA grade 7", "USA grade 7"),
    ("USA grade 8", "USA grade 8"),
    ("Algebra 1", "Algebra 1"),
    ("Geometry", "Geometry"),
    ("Algebra 2", "Algebra 2"),
    ("Trigonometry", "Trigonometry"),
    ("Precalculus", "Precalculus"),
    ("High school statistics", "High school statistics"),
    ("Statistics and probability", "Statistics and probability"),
    ("Linear algebra", "Linear algebra"),
    ("Differential equations", "Differential equations"),
    ("Multivariable calculus", "Multivariable calculus"),
    ("AP Calculus BC", "AP Calculus BC"),
    ("AP Calculus AB", "AP Calculus AB"),
    ("AP Statistics", "AP Statistics"),
]

DIFFICULTY_CHOICES = [
    (3, "High"),
    (2, "Medium"),
    (1, "Low"),
]

TYPE_CHOICES = [
    ("Multiple Choice", "Multiple Choice"),
    ("Short Answer", "Short Answer"),
    ("Mathematical Modeling", "Mathematical Modeling"),
    ("Learning Through Discussion", "Learning Through Discussion"),
    ("STEAM", "STEAM"),
    ("Math Puzzle", "Math Puzzle"),
    ("Math for Literacy", "Math for Literacy"),
    ("Physics", "Physics"),
    ("Chemistry", "Chemistry"),
    ("Biology", "Biology"),
    ("E.S.S", "E.S.S"),
    ("Sentence Completion", "Sentence Completion"),
    ("Text Completion", "Text Completion"),
    ("Reading Comprehension", "Reading Comprehension"),
    ("Homeschooling", "Homeschooling"),
    ("School Classes", "School Classes"),
    ("Math", "Math"),
    ("English", "English"),
]

SUBJECT_CHOICES = [
    ("Math", "Math"),
    ("Science", "Science"),
    ("Liberal Arts", "Liberal Arts"),
    ("English", "English"),
    ("STEM", "STEM"),
    ("SAT", "SAT"),
]

PROBLEM_TYPE = [("Normal", "Normal"), ("Premium", "Premium"), ("Best", "Best")]

# 추출한 UNIT_CHOICES와 DETAIL_CHOICES 적용
UNIT_CHOICES = [(unit, unit) for unit in unit_choices_list]
DETAIL_CHOICES = [(detail, detail) for detail in detail_choices_list]


class UnitType(models.Model):

    name = models.CharField(max_length=50, null=True, blank=True, default="")
    subject = models.CharField(
        max_length=50,
        help_text="* required",
        choices=SUBJECT_CHOICES,
        null=True,
        blank=True,
    )

    def __str__(self):
        return f"{self.name}__({self.subject})"


class SectionType(models.Model):

    name = models.CharField(max_length=50, null=True, blank=True, default="")
    subject = models.CharField(
        max_length=50,
        help_text="* required",
        choices=SUBJECT_CHOICES,
        null=True,
        blank=True,
    )

    def __str__(self):
        return f"{self.name}__({self.subject})"


class PreviewImage(models.Model):
    problem = models.ForeignKey(
        "Problem", on_delete=models.CASCADE, related_name="preview_images"
    )
    image = models.ImageField(
        # upload_to=get_image_upload_path,
        upload_to="images/",
        null=True,
        blank=True,
        help_text="600 X 800 jpg, png, SVG 이미지만 업로드 가능합니다.",
    )
    image_url = models.CharField(
        max_length=200, null=True, blank=True, help_text="이미지 URL을 입력하세요."
    )
    uploaded_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Preview Image for {self.problem.title}"

    def clean(self):
        if not self.image and not self.image_url:
            raise ValidationError("이미지를 업로드하거나 이미지 URL을 입력해야 합니다.")
        if self.image and self.image_url:
            raise ValidationError(
                "이미지를 업로드하거나 이미지 URL 중 하나만 선택해야 합니다."
            )
        if self.image:
            ext = os.path.splitext(self.image.name)[1].lower()
            if ext not in [".jpg", ".jpeg", ".png", ".svg"]:
                raise ValidationError(
                    "지원되지 않는 파일 형식입니다. jpg, jpeg, png, svg만 가능합니다."
                )
        if self.image_url:
            ext = os.path.splitext(self.image_url)[1].lower()
            if ext not in [".jpg", ".jpeg", ".png", ".svg"]:
                raise ValidationError(
                    "지원되지 않는 파일 형식입니다. jpg, jpeg, png, svg만 가능합니다."
                )


file_storage = FileSystemStorage(location="media/")


class Problem(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, help_text="* required")
    subject = models.CharField(
        max_length=50, help_text="* required", choices=SUBJECT_CHOICES, db_index=True
    )
    problem_type = models.CharField(
        max_length=20, choices=PROBLEM_TYPE, blank=True, null=True, default="Normal"
    )
    type = MultiSelectField(
        choices=TYPE_CHOICES,
        default="Short Answer",
        help_text="* select one or more types",
    )
    grade = models.CharField(
        max_length=100, choices=GRADE_CHOICES, blank=True, null=True, default=None
    )

    unit = models.ManyToManyField(UnitType, related_name="problems", blank=True)
    detailed_section = models.ManyToManyField(
        SectionType, related_name="DetailSection", blank=True
    )

    difficulty = models.IntegerField(
        choices=DIFFICULTY_CHOICES,
        default=1,
        help_text="* 상 중 하 등급으로 구분됩니다.",
    )

    title = models.CharField(
        max_length=100, db_index=True, help_text="* 100글자 이내 작성해 주세요."
    )
    description = models.TextField(
        db_index=True, help_text="* 300글자 이내로 작성해 주세요."
    )

    discounted_price = models.DecimalField(
        max_digits=7,
        decimal_places=2,
        blank=True,
        null=True,
        default=0,
        help_text="*달러 기준이며, $1 ~ $100 사이에서 입력해야 합니다.",
    )
    price = models.DecimalField(
        max_digits=7,
        decimal_places=2,
        default=5.00,
        help_text="*달러 기준이며, $1 ~ $100 사이에서 입력해야 합니다.",
    )
    is_free = models.BooleanField(
        default=False, help_text="공짜일 경우에는 선택해 주세요."
    )
    is_view = models.BooleanField(
        default=True, help_text="비공개일때는 체크를 제거해 주세요.", db_index=True
    )
    pages = models.PositiveSmallIntegerField(help_text="* PDF (Pages number)")
    problems = models.PositiveSmallIntegerField(help_text="* PDF (Problem Numbers)")

    file = models.FileField(
        upload_to=get_file_upload_path,
        # storage=file_storage,  # 로컬 파일 시스템 사용
        storage=AttachmentS3Boto3Storage(),  ### S3 샤용
        help_text="* required",
        null=True,
        blank=True,
        default="",
    )

    updated_date = models.DateTimeField(auto_now=True)
    created_date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title

    def clean(self):
        # 가격 유효성 검사 수정
        if not (1 <= self.price <= 3000):
            raise ValidationError("Price must be between $5 and $100.")

        if self.discounted_price is not None:
            if not (0 <= self.discounted_price < self.price):
                raise ValidationError(
                    "Discounted price must be between $1 and less than the original price."
                )

    class Meta:
        verbose_name = "Problem"
        verbose_name_plural = "Problems"
        ordering = ["-created_date"]

    def total_reviews_score(self):
        reviews = self.reviews.all()
        total_score = reviews.aggregate(models.Sum("rating"))["rating__sum"]

        # 평균값 계산
        if total_score and reviews.count() > 0:
            average_score = total_score / reviews.count()
            # 소수점 1자리로 제한
            return round(average_score, 1)
        return 0.0

    def total_comments(self):
        return self.reviews.count()


class Wishlist(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="wishlists")
    problem = models.ForeignKey(
        "Problem", on_delete=models.CASCADE, related_name="wishlisted_by"
    )
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ("user", "problem")
        ordering = ["-created_at"]

    def __str__(self):
        return f"{self.user.username} - {self.problem.title}"
