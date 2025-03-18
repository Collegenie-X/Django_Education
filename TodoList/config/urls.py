### config/urls.py

from django.contrib import admin
from django.urls import path, include
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
    TokenVerifyView,
)

urlpatterns = [
    path("admin/", admin.site.urls),
    # JWT 토큰 발급 (로그인 시)
    path("api/v1/token/", TokenObtainPairView.as_view(), name="token_obtain_pair"),
    # JWT 토큰 갱신
    path("api/v1/token/verify/", TokenVerifyView.as_view(), name="token_verify"),
    path("api/v1/token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
    path("api/v1/", include("todo.urls")),
    path("api/v1/", include("account.urls")),
]
