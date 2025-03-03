from django.db.models.signals import post_save, post_delete
from django.dispatch import receiver
from .models import Answer, Report

# Answer 생성 시, Report의 상태를 "Resolved"로 변경
@receiver(post_save, sender=Answer)
def update_report_status_on_create(sender, instance, created, **kwargs):
    if created:
        report = instance.report
        if report.processing_status != "Resolved":
            report.processing_status = "Resolved"
            report.save()

# Answer 삭제 시, Report의 상태를 "Processing"으로 변경
@receiver(post_delete, sender=Answer)
def update_report_status_on_delete(sender, instance, **kwargs):
    report = instance.report
    # 관련된 Answer가 남아있는지 확인
    if not report.comments.exists():  # 'comments'는 Answer 모델의 related_name
        report.processing_status = "Processing"
        report.save()
