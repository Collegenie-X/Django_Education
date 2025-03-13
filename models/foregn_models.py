from django.db import models


class Category(models.Model):
    name = models.CharField(max_length=50, unique=True, verbose_name="카테고리 이름")

    def __str__(self):
        return self.name


class Product(models.Model):
    CATEGORY_CHOICES = [
        ("E", "Electronics"),
        ("F", "Fashion"),
        ("H", "Home & Living"),
    ]

    name = models.CharField(max_length=100, verbose_name="제품명")
    price = models.DecimalField(max_digits=10, decimal_places=2, verbose_name="가격")
    stock = models.PositiveIntegerField(verbose_name="재고")
    category = models.ForeignKey(
        Category, on_delete=models.CASCADE, verbose_name="카테고리"
    )
    status = models.CharField(
        max_length=1, choices=CATEGORY_CHOICES, verbose_name="상태"
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def is_in_stock(self):
        """재고가 있으면 True 반환"""
        return self.stock > 0

    def __str__(self):
        return f"{self.name} - {self.category.name}"
