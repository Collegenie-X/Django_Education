# store/admin.py

from django import forms
from django.contrib import admin
from django.utils.safestring import mark_safe
from django.contrib import messages
from django.core.exceptions import ValidationError

from .models import Problem, UnitType, SectionType, PreviewImage
from django.contrib.admin import SimpleListFilter

from django.db import models
from django.forms import SelectMultiple
from django.conf import settings


class RelatedProblemSubjectFilter(SimpleListFilter):
    title = "Problem Subject"  # 필터 제목
    parameter_name = "problem_subject"

    def lookups(self, request, model_admin):
        # 문제의 subject 필드를 가져와 고유한 목록을 반환
        subjects = set([problem.subject for problem in Problem.objects.all()])
        return [(subject, subject) for subject in subjects]

    def queryset(self, request, queryset):
        # 필터가 선택되었을 때 queryset을 필터링
        if self.value():
            return queryset.filter(problem__subject=self.value())
        return queryset


class UnitTypeAdmin(admin.ModelAdmin):
    list_display = ["id", "name", "subject", "problem_subject", "problem_title"]
    list_filter = ["subject"]
    search_fields = ["name"]
    ordering = ["name", "subject"]

    # 문제와 연결된 subject들을 반환하는 메서드
    def problem_subject(self, obj):
        related_problems = obj.problems.all()  # 올바른 related_name 사용
        subjects = set(problem.subject for problem in related_problems)  # 중복 제거
        return ", ".join(subjects) if subjects else "No related subjects"

    problem_subject.short_description = "Problem Subjects"

    def problem_title(self, obj):
        related_problems = obj.problems.all()  # 올바른 related_name 사용
        if related_problems:
            titles = []
            for problem in related_problems:
                # 문제 제목을 클릭하면 admin 페이지로 연결
                link = f'<a href="/admin/store/problem/{problem.id}/change/" target="_blank">{problem.title}</a>'
                titles.append(link)
            return mark_safe("  ----(title): ".join(titles))  # 링크를 안전하게 처리
        else:
            return "No related titles"

    problem_title.short_description = "Problem Title"

    @admin.action(description="Update Unit subject by related Problems")
    def update_unit_subject_by_problems(self, request, queryset):
        updated_count = 0
        skipped_count = 0

        for unit in queryset:
            related_problems = unit.problems.all()  # 올바른 related_name 사용
            if related_problems.exists():
                # 가장 첫 번째 문제의 subject를 기준으로 설정 (다양한 문제의 subject가 있을 수 있음)
                unit.subject = related_problems.first().subject
                unit.save()
                updated_count += 1
            else:
                skipped_count += 1
                self.message_user(
                    request,
                    f"Unit '{unit.name}'은(는) 관련된 문제들이 없어 건너뛰었습니다.",
                    messages.WARNING,
                )

        message = f"{updated_count}개의 Unit의 subject가 업데이트되었습니다."
        if skipped_count > 0:
            message += f" {skipped_count}개의 Unit은 업데이트되지 않았습니다."

        self.message_user(request, message, messages.SUCCESS)

    actions = [update_unit_subject_by_problems]  # 새로운 액션 등록

    # 필드셋 정의
    fieldsets = ((None, {"fields": ("name", "subject", "problem_subject")}),)

    readonly_fields = ["problem_subject"]  # 문제 subjects 필드는 읽기 전용으로 설정


admin.site.register(UnitType, UnitTypeAdmin)


class SectionTypeAdmin(admin.ModelAdmin):
    list_display = [
        "id",
        "name",
        "subject",
        "problem_subject",
        "problem_units",
        "problem_title",
    ]
    list_filter = ["subject"]
    search_fields = ["name"]
    ordering = ["name", "subject"]

    # 문제와 연결된 subject들을 반환하는 메서드
    def problem_subject(self, obj):
        related_problems = (
            obj.DetailSection.all()
        )  # Many-to-Many 관계로 연결된 Problem 객체
        subjects = set(problem.subject for problem in related_problems)  # 중복 제거
        return ", ".join(subjects) if subjects else "No related subjects"

    problem_subject.short_description = "Problem Subjects"

    def problem_title(self, obj):
        related_problems = obj.DetailSection.all()  # 올바른 related_name 사용
        if related_problems:
            titles = []
            for problem in related_problems:
                # 문제 제목을 클릭하면 admin 페이지로 연결
                link = f'<a href="/admin/store/problem/{problem.id}/change/" target="_blank">{problem.title}</a>'
                titles.append(link)
            return mark_safe("  ----(title): ".join(titles))  # 링크를 안전하게 처리
        else:
            return "No related titles"

    # 문제와 연결된 Unit들을 반환하는 메서드
    def problem_units(self, obj):
        related_problems = (
            obj.DetailSection.all()
        )  # Many-to-Many 관계로 연결된 Problem 객체
        units = set(
            unit.name for problem in related_problems for unit in problem.unit.all()
        )  # 중복 제거
        return ", ".join(units) if units else "No related units"

    problem_units.short_description = "Problem Units"

    # subject 업데이트 액션
    @admin.action(description="Update Section subject by related Problems")
    def update_section_subject_by_problems(self, request, queryset):
        updated_count = 0
        skipped_count = 0

        for section in queryset:
            related_problems = (
                section.DetailSection.all()
            )  # Many-to-Many 관계로 연결된 Problem 객체
            if related_problems.exists():
                section.subject = (
                    related_problems.first().subject
                )  # 첫 번째 문제의 subject로 설정
                section.save()
                updated_count += 1
            else:
                skipped_count += 1

        message = f"{updated_count}개의 Section의 subject가 업데이트되었습니다."
        if skipped_count > 0:
            message += f" {skipped_count}개의 Section은 업데이트되지 않았습니다."
        self.message_user(request, message, messages.SUCCESS)

        updated_count = 0
        skipped_count = 0

        for section in queryset:
            related_problems = (
                section.DetailSection.all()
            )  # Many-to-Many 관계로 연결된 Problem 객체
            units = set(
                unit for problem in related_problems for unit in problem.unit.all()
            )  # 중복 제거
            if units:
                section.unit.set(units)  # SectionType의 unit 필드를 업데이트
                section.save()
                updated_count += 1
            else:
                skipped_count += 1

        message = f"{updated_count}개의 Section의 units가 업데이트되었습니다."
        if skipped_count > 0:
            message += f" {skipped_count}개의 Section은 업데이트되지 않았습니다."
        self.message_user(request, message, messages.SUCCESS)

    actions = [update_section_subject_by_problems]  # 새로운 액션 등록

    # 필드셋 정의
    fieldsets = (
        (None, {"fields": ("name", "subject", "problem_subject", "problem_units")}),
    )

    readonly_fields = [
        "problem_subject",
        "problem_units",
    ]  # 문제 subjects 및 units 필드는 읽기 전용으로 설정


admin.site.register(SectionType, SectionTypeAdmin)


class PreviewImageInline(admin.TabularInline):
    model = PreviewImage
    extra = 1  # 기본으로 표시할 폼 개수
    fields = (
        "image",
        "image_url",
        "image_tag",
    )
    readonly_fields = ("image_tag",)
    can_delete = True
    show_change_link = True

    def image_tag(self, obj):
        # 업로드된 이미지 URL이 우선
        if obj.image and hasattr(obj.image, "url"):
            img_url = obj.image.url
        else:
            # image 필드가 없을 때 image_url S3 사용
            # img_url = "https://studyola-main-dir.s3.us-east-2.amazonaws.com/" + obj.image_url if obj.image_url else None
            img_url = settings.MEDIA_URL + obj.image_url if obj.image_url else None

        # 이미지 URL이 있는 경우 태그 생성
        if img_url:
            return mark_safe(f'<img src="{img_url}" width="150" height="150" />')
        return "No Image"

    image_tag.short_description = "Image Preview"


class ProblemAdmin(admin.ModelAdmin):

    formfield_overrides = {
        models.ManyToManyField: {
            "widget": SelectMultiple(attrs={"size": "15"})
        },  # 높이를 15로 설정
    }
    inlines = [PreviewImageInline]

    def display_preview_images(self, obj):
        images = obj.preview_images.all()
        if images:
            image_tags = []
            for image in images:
                # 업로드된 이미지 URL이 우선
                if image.image and hasattr(image.image, "url"):
                    img_url = image.image.url  # 업로드된 이미지 URL 사용
                else:
                    # image 필드가 없을 때 image_url 사용
                    img_url = (
                        "https://studyola-main-dir.s3.us-east-2.amazonaws.com/"
                        + image.image_url
                    )

                # 이미지 URL이 있는 경우 태그 생성
                if img_url:
                    image_tags.append(
                        f'<img src="{img_url}" width="60" height="80" style="margin-right:5px;" />'
                    )
                else:
                    image_tags.append("No Image")

            return mark_safe(" ".join(image_tags))
        return "No Images"

    # Methods to display related units and sections    # Methods to display related units and sections
    def display_units(self, obj):
        # 알파벳 순으로 정렬하여 반환
        return ", ".join(
            [f"{unit.name} ({unit.subject})" for unit in obj.unit.order_by("name")]
        )

    def display_detailed_sections(self, obj):
        # 알파벳 순으로 정렬하여 반환
        return ", ".join(
            [
                f"{section.name} ({section.subject})"
                for section in obj.detailed_section.order_by("name")
            ]
        )

    display_units.short_description = "Units (Name - Subject)"
    display_detailed_sections.short_description = "Detailed Sections (Name - Subject)"

    display_units.short_description = "Unit"
    display_detailed_sections.short_description = "Detailed Section"

    fieldsets = (
        (
            "User Information",
            {
                "fields": ("user", "is_view"),
            },
        ),
        (
            "Problem Information",
            {
                "fields": ("problem_type",),
            },
        ),
        ("Subject", {"fields": ("subject", "type", "grade")}),
        ("Category", {"fields": ("unit", "detailed_section")}),
        ("Difficulty", {"fields": ("difficulty",)}),
        ("Contents", {"fields": ("title", "description")}),
        (
            "Etc(PDF)",
            {"fields": ("price", "discounted_price", "is_free", "pages", "problems")},
        ),
        (
            "Files",
            {
                "fields": ("file",),
            },
        ),
    )

    def formatted_price(self, obj):
        return f"${obj.price}"

    formatted_price.short_description = "Price"

    list_display = [
        "id",
        "display_preview_images",
        "is_view",
        "problem_type",
        "subject",
        "price",
        "discounted_price",
        "user",
        "title",
        "is_free",
        "grade",
        "type",
        "display_units",
        "display_detailed_sections",
        "formatted_price",
        "pages",
        "problems",
        "created_date",
        "updated_date",
        "file",
    ]

    search_fields = ["user__username", "title", "description"]

    list_filter = [
        "is_view",
        "grade",
        "subject",
        "problem_type",
        "price",
        "discounted_price",
        "type",
        "unit",
        "detailed_section",
        "difficulty",
        "pages",
        "problems",
    ]
    ordering = ["-created_date", "-updated_date"]

    # Mapping of subjects to S3 key paths
    subject_to_image_key = {
        "English": "images/english_title.jpg",
        "Liberal Arts": "images/LiberalArts_title.png",
        "Math": "images/Math_title.jpg",
        "Science": "images/Science_title.jpg",
        "STEM": "images/Stem_title.png",
        "Puzzle": "images/puzzle_title.jpg",
        "SAT-Math": "images/SAT_Math_title.jpg",
        "SAT-English": "images/SAT_English_title.jpg",
        "Multiple Choice": "images/Multiple_Choice.jpg",
        "Short Answer": "images/Short_Answer.jpg",
        "Mathematical Modeling": "images/Mathematical_Modeling.jpg",
        "Learning Through Discussion": "images/Learnin__Through_Discussion.jpg",
        "STEAM": "images/STEAM.jpg",
        "Math Puzzle": "images/Math_Puzzle.jpg",
        "Math for Literacy": "images/Math_for_Literacy.jpg",
    }

    # Define admin actions
    @admin.action(description="Mark selected problems as Best")
    def make_best(self, request, queryset):
        updated = queryset.update(problem_type="Best")
        self.message_user(
            request,
            f"{updated} problem(s) were successfully marked as Best.",
            messages.SUCCESS,
        )

    @admin.action(description="Mark selected problems as Premium")
    def make_premium(self, request, queryset):
        updated = queryset.update(problem_type="Premium")
        self.message_user(
            request,
            f"{updated} problem(s) were successfully marked as Premium.",
            messages.SUCCESS,
        )

    @admin.action(description="Mark selected problems as Normal")
    def make_normal(self, request, queryset):
        updated = queryset.update(problem_type="Normal")
        self.message_user(
            request,
            f"{updated} problem(s) were successfully marked as Normal.",
            messages.SUCCESS,
        )

    @admin.action(
        description="Update selected problems with subject-based preview images (Math)"
    )
    def update_preview_images_by_subject(self, request, queryset):
        updated_count = 0
        skipped_count = 0

        for problem in queryset:
            print(
                updated_count, "__problem.subject:", problem.subject, ",", problem.type
            )
            image_key = None
            if problem.subject == "Math":
                if problem.type in [
                    "Multiple Choice",
                    "Short Answer",
                    "Mathematical Modeling",
                    "Learning Through Discussion",
                    "STEAM",
                    "Math Puzzle",
                    "Math for Literacy",
                ]:
                    image_key = self.subject_to_image_key.get(problem.type)
                else:
                    # image_key = None
                    image_key = self.subject_to_image_key.get("Math")
            elif problem.subject == "SAT" and problem.type == "Math":
                image_key = self.subject_to_image_key.get("SAT-Math")
            elif problem.subject == "SAT" and problem.type == "English":
                image_key = self.subject_to_image_key.get("SAT-English")
            else:
                image_key = self.subject_to_image_key.get(problem.subject)

            if image_key:
                # 기존의 모든 PreviewImage 삭제
                problem.preview_images.all().delete()
                # 새 PreviewImage 생성
                PreviewImage.objects.create(problem=problem, image=image_key)
                updated_count += 1
            else:
                skipped_count += 1
                self.message_user(
                    request,
                    f"문제 '{problem}'은(는) 주제 '{problem.subject}'에 해당하는 이미지 키가 없어 건너뛰었습니다.",
                    messages.WARNING,
                )

        message = f"{updated_count}개의 문제가 주제 기반의 프리뷰 이미지로 업데이트되었습니다."
        if skipped_count > 0:
            message += (
                f" {skipped_count}개의 문제는 이미지 키가 없어 업데이트되지 않았습니다."
            )

        self.message_user(request, message, messages.SUCCESS)

    # Action to delete preview images
    @admin.action(description="Delete selected preview images")
    def delete_preview_images(self, request, queryset):
        deleted_count = 0
        for problem in queryset:
            preview_images = problem.preview_images.all()
            deleted_count += preview_images.count()
            preview_images.delete()

        self.message_user(
            request, f"{deleted_count} preview images deleted.", messages.SUCCESS
        )

    # Action to toggle is_free
    @admin.action(description="Toggle is_free status")
    def toggle_is_free(self, request, queryset):
        updated_count = 0
        for problem in queryset:
            # Toggle the is_free field
            problem.is_free = not problem.is_free
            problem.save()
            updated_count += 1

        self.message_user(
            request,
            f"{updated_count} problem(s) had their Free/Paid status toggled.",
            messages.SUCCESS,
        )

    @admin.action(description="Toggle is_view status")
    def toggle_is_view(self, request, queryset):
        updated_count = 0
        for problem in queryset:
            # Toggle the is_view field
            problem.is_view = not problem.is_view
            problem.save()
            updated_count += 1

        self.message_user(
            request,
            f"{updated_count} problem(s) had their visibility toggled.",
            messages.SUCCESS,
        )

    actions = [
        make_best,
        make_premium,
        make_normal,
        update_preview_images_by_subject,
        delete_preview_images,
        toggle_is_free,
        toggle_is_view,
    ]


admin.site.register(Problem, ProblemAdmin)
