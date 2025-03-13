from django.db import models
from django.contrib.auth import get_user_model
from django.contrib.postgres.fields import JSONField

User = get_user_model()


class Cart(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    items = models.JSONField(default=dict)  # {"product_id": quantity}

    def add_item(self, product_id, quantity=1):
        if str(product_id) in self.items:
            self.items[str(product_id)] += quantity
        else:
            self.items[str(product_id)] = quantity
        self.save()

    def remove_item(self, product_id):
        if str(product_id) in self.items:
            del self.items[str(product_id)]
            self.save()

    def clear_cart(self):
        self.items = {}
        self.save()

    def __str__(self):
        return f"{self.user.username}'s Cart"
