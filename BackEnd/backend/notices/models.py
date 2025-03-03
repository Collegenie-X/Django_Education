from django.db import models

class Notice(models.Model):
    title = models.CharField(max_length=200)  # 제목
    description = models.TextField()  # 설명
    created_at = models.DateTimeField(auto_now_add=True)  # 생성 날짜

    def __str__(self):
        return self.title
