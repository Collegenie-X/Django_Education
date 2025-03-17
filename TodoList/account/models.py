from django.contrib.auth.models import (
    AbstractBaseUser,
    BaseUserManager,
    PermissionsMixin,
)
from django.db import models


# CustomUserManager: 사용자 관리 클래스
class CustomUserManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        """
        일반 사용자를 생성하는 메서드
        이메일을 사용자명으로 사용하고, 비밀번호는 필수로 설정해야 합니다.
        """
        if not email:
            raise ValueError("이메일 주소는 필수입니다.")
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)  # 비밀번호는 해시로 저장
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password=None, **extra_fields):
        """
        슈퍼사용자를 생성하는 메서드
        슈퍼유저는 기본적으로 is_staff와 is_superuser를 True로 설정합니다.
        """
        extra_fields.setdefault("is_staff", True)
        extra_fields.setdefault("is_superuser", True)
        return self.create_user(email, password, **extra_fields)


# CustomUser: 사용자 모델
class CustomUser(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(unique=True)  # 이메일 필드
    password = models.CharField(max_length=255)  # 비밀번호 필드
    is_active = models.BooleanField(default=True)  # 활성화 여부
    is_staff = models.BooleanField(default=False)  # 관리자 여부
    date_joined = models.DateTimeField(auto_now_add=True)  # 가입 일자

    objects = CustomUserManager()  # 사용자 관리 객체 설정

    USERNAME_FIELD = "email"  # 이메일을 사용자명으로 설정
    REQUIRED_FIELDS = []  # 이메일만 있으면 되므로 필수 항목 없음

    def __str__(self):
        return self.email  # 이메일을 반환
