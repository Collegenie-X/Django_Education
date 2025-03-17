# todo/models.py
from django.db import models
from django.contrib.auth import get_user_model


class Priority(models.IntegerChoices):
    LOW = 1, "Low"
    NORMAL = 2, "Normal"
    HIGH = 3, "High"


class Todo(models.Model):
    title = models.CharField(max_length=100)
    description = models.TextField(blank=True)
    is_done = models.BooleanField(default=False)
    priority = models.IntegerField(choices=Priority.choices, default=Priority.NORMAL)
    created_at = models.DateTimeField(auto_now_add=True)

    # 추가: 유저별로 연결 (외래키)
    owner = models.ForeignKey(
        get_user_model(),  # 혹은 settings.AUTH_USER_MODEL
        on_delete=models.CASCADE,
        related_name="todos",
    )

    def __str__(self):
        return self.title
