# models.py
from django.db import models
from django.utils.timezone import now
from accounts.models import User
from store.models import Problem


class Payment(models.Model):
    PAYMENT_TYPE_CHOICES = [
        ('NORMAL', 'Normal'),
        ('null', 'Null'),
    ]

    creator = models.ForeignKey(User, on_delete=models.CASCADE, related_name='payments')
    problem = models.ForeignKey(Problem, on_delete=models.CASCADE, null=True, blank=True , related_name='payments')
    payment_key = models.CharField(max_length=200, default='')
    order_name = models.CharField(max_length=100, blank=True)
    order_id = models.CharField(max_length=64, unique=True, blank=True)
    amount = models.DecimalField(max_digits=10, decimal_places=2)  # Updated to integer field
    payment_type = models.CharField(max_length=50, choices=PAYMENT_TYPE_CHOICES, default='NORMAL')
    currency = models.CharField(max_length=10, null=True, blank=True)
    country = models.CharField(max_length=10, null=True, blank=True)
    method = models.CharField(max_length=50, blank=True)
    requested_at = models.DateTimeField(default=now, blank=True)
    approved_at = models.DateTimeField(null=True, blank=True)
    easy_pay = models.CharField(max_length=50, null=True, blank=True)  # Corrected field name
    is_report = models.BooleanField(default=False)
    is_paid = models.BooleanField(default=False)
    is_refundable = models.BooleanField(default=True)

    class Meta:
        indexes = [
            models.Index(fields=['payment_key']),
            models.Index(fields=['order_id']),
        ]

    def __str__(self):
        return self.order_id


class Refund(models.Model):
    """
    Refund 모델은 환불 정보를 저장하는 모델입니다.

    필드:
    - payment: 결제 정보와의 외래 키 관계를 나타내는 필드.
    - refund_amount: 환불 금액, 소수점 포함 숫자.
    - refund_reason: 환불 사유, 최대 길이 255자의 문자열 필드.
    - created_at: 객체 생성 시간을 자동으로 저장하는 날짜/시간 필드.
    - refund_type: 환불 타입, 최대 길이 50자의 문자열 필드.
    - refund_status: 환불 상태, 진행중, 완료, 반려됨 상태를 나타내는 최대 길이 50자의 문자열 필드. 기본값은 'in_progress'.
    """
    REFUND_TYPE_CHOICES = [
        ('full', 'Full'),
        ('partial', 'Partial'),
    ]

    REFUND_STATUS_CHOICES = [
        ('in_progress', 'In Progress'),
        ('completed', 'Completed'),
        ('rejected', 'Rejected'),
    ]

    payment = models.OneToOneField(Payment, on_delete=models.CASCADE, related_name='refund')
    creator = models.ForeignKey(User, on_delete=models.CASCADE, related_name='refund')
    order_id = models.CharField(max_length=64, unique=True, blank=True)
    refund_amount = models.DecimalField(max_digits=10, decimal_places=2)
    refund_reason = models.TextField(blank=True, default="")
    refund_order_name = models.CharField(max_length=100, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    processed_at = models.DateTimeField(auto_now=True)
    refund_type = models.CharField(max_length=50, choices=REFUND_TYPE_CHOICES)
    refund_status = models.CharField(max_length=50, choices=REFUND_STATUS_CHOICES, default='in_progress')

    class Meta:
        indexes = [
            models.Index(fields=['created_at']),
            models.Index(fields=['order_id']),
        ]
