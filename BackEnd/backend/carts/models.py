from django.db import models
from accounts.models import User
from store.models import Problem

class Cart(models.Model):    
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="carts")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"Cart of {self.user.email}"

class CartItem(models.Model):
    cart = models.ForeignKey(Cart, on_delete=models.CASCADE, related_name="items")
    problem = models.ForeignKey(Problem, on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.problem.title}"

    class Meta:
        unique_together = ('cart', 'problem')  # 동일한 문제는 카트에 한 번만 추가
