from django.contrib import admin
from .models import Todo


@admin.register(Todo)
class TodoAdmin(admin.ModelAdmin):
    """
    Todo 모델을 Django 관리자 페이지에서 보다 편리하게 관리하기 위한 설정
    """

    list_display = ("id", "title", "priority", "is_done", "created_at")
    list_display_links = ("id", "title")
    list_filter = ("is_done", "created_at")
    search_fields = ("title", "description")
    readonly_fields = ("created_at",)

    fieldsets = (
        ("기본 정보", {"fields": ("title", "description")}),
        ("우선 순위", {"fields": ("priority",)}),
        ("상태 정보", {"fields": ("is_done", "created_at")}),
    )

    # 관리자 페이지에서 목록 정렬 기준 (최신 생성 항목이 위로 오도록 설정)
    ordering = ("-created_at",)
