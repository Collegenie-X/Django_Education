from django.db import models

class Popup(models.Model):
    title = models.CharField(max_length=255)  # 팝업 제목
    description = models.TextField(blank=True, null=True)  # 팝업 설명
    image = models.ImageField(upload_to='popup_images/')  # 이미지 파일
    link_url = models.URLField(max_length=200, blank=True, null=True)  # '자세히 보기' 링크
    is_active = models.BooleanField(default=True)  # 팝업 활성화 여부
    start_date = models.DateTimeField()  # 팝업 시작일
    end_date = models.DateTimeField()  # 팝업 종료일

    def __str__(self):
        return self.title



