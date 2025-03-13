from django.db import models
from django.core.exceptions import ValidationError


class Product(models.Model):
    name = models.CharField(max_length=100)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    stock = models.PositiveIntegerField()

    def clean(self):
        if self.stock < 0:
            raise ValidationError("재고 수량은 0 이상이어야 합니다.")
