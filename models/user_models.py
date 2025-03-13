from django.db import models
from django.contrib.auth.models import (
    AbstractBaseUser,
    BaseUserManager,
    PermissionsMixin,
)
from django.dispatch import receiver
from django.db.models.signals import pre_save
import os


class UserManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError("이메일은 필수입니다.")
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password=None, **extra_fields):
        extra_fields.setdefault("is_staff", True)
        extra_fields.setdefault("is_superuser", True)
        return self.create_user(email, password, **extra_fields)


class User(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(unique=True)
    name = models.CharField(max_length=100)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)

    objects = UserManager()

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["name"]

    def __str__(self):
        return self.email


# 파일 업로드 경로 설정
def upload_to(instance, filename):
    return f"uploads/{instance.user.id}/{filename}"


class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    profile_image = models.ImageField(upload_to=upload_to, null=True, blank=True)

    def __str__(self):
        return f"{self.user.name}'s Profile"


# signals 활용하여 프로필 자동 생성
@receiver(pre_save, sender=Profile)
def delete_old_image(sender, instance, **kwargs):
    """프로필 이미지 변경 시 기존 파일 삭제"""
    if instance.pk:
        old_instance = Profile.objects.get(pk=instance.pk)
        if (
            old_instance.profile_image
            and old_instance.profile_image != instance.profile_image
        ):
            if os.path.isfile(old_instance.profile_image.path):
                os.remove(old_instance.profile_image.path)
