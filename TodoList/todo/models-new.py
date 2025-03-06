from django.db import models
from django.conf import settings
from django.utils import timezone
from django.db.models import Q


# 1) Category 모델 (예시)
class Category(models.Model):
    name = models.CharField(max_length=50, unique=True)
    description = models.TextField(blank=True)

    def __str__(self):
        return self.name


# 2) Priority 선택지 (IntegerChoices 예시)
class Priority(models.IntegerChoices):
    LOW = 1, "Low"
    NORMAL = 2, "Normal"
    HIGH = 3, "High"


# 3) 커스텀 매니저
class TodoManager(models.Manager):
    def incomplete(self):
        """
        완료되지 않은 (is_done=False) 할 일만 가져오기
        """
        return self.filter(is_done=False)

    def due_today(self):
        """
        오늘 마감인 Todo 목록만 조회
        """
        today = timezone.now().date()
        return self.filter(due_date__date=today)


# 4) Todo 모델
class Todo(models.Model):
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="todos",
        null=True,
        blank=True,
    )
    title = models.CharField(max_length=100)
    description = models.TextField(blank=True)

    # 우선순위
    priority = models.IntegerField(choices=Priority.choices, default=Priority.NORMAL)

    # 카테고리 (선택 필드)
    category = models.ForeignKey(
        Category,
        on_delete=models.SET_NULL,  # 카테고리가 삭제되어도 Todo는 남도록
        null=True,
        blank=True,
        related_name="todos",
    )

    is_done = models.BooleanField(default=False)

    # 날짜/시간
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    due_date = models.DateTimeField(null=True, blank=True)

    # 커스텀 매니저 등록
    objects = TodoManager()

    class Meta:
        # 정렬(최신순)
        ordering = ["-created_at"]
        # DB 수준에서 priority 범위를 제한하는 예시 (1~3 사이)
        constraints = [
            models.CheckConstraint(
                check=Q(priority__gte=1) & Q(priority__lte=3),
                name="check_priority_range",
            )
        ]

    def __str__(self):
        # 우선순위를 문자열로 표시: ex) "장보기 (High)"
        return f"{self.title} ({self.get_priority_display()})"

    def mark_done(self):
        """
        할 일을 완료처리하는 헬퍼 메서드
        """
        self.is_done = True
        self.save()

    def is_overdue(self):
        """
        마감일(due_date)을 경과했는지 여부
        """
        if self.due_date and timezone.now() > self.due_date:
            return True
        return False
