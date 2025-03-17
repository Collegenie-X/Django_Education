from django.urls import path
from .views import RegisterUserView, LoginUserView

urlpatterns = [
    path("signup/", RegisterUserView.as_view(), name="signup"),  # 사용자 등록
    path("login/", LoginUserView.as_view(), name="login"),  # 사용자 로그인
]
