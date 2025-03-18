# account/views.py

from django.views import View
from django.http import JsonResponse
from django.contrib.auth import authenticate, login
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator

from rest_framework_simplejwt.tokens import RefreshToken  # 추가

from .models import CustomUser


@method_decorator(csrf_exempt, name="dispatch")
class RegisterUserView(View):
    """
    POST /api/v1/signup/ 에서
    email, password 로 회원가입을 진행하고
    access, refresh 토큰을 함께 반환합니다.
    """

    def post(self, request, *args, **kwargs):
        email = request.POST.get("email")
        password = request.POST.get("password")

        if email and password:
            # 1) 회원 생성
            user = CustomUser.objects.create_user(email=email, password=password)
            # 2) 생성된 유저로부터 토큰 발급
            refresh = RefreshToken.for_user(user)
            access_token = str(refresh.access_token)
            refresh_token = str(refresh)

            return JsonResponse(
                {
                    "message": "User created successfully",
                    "access": access_token,
                    "refresh": refresh_token,
                },
                status=201,
            )
        else:
            return JsonResponse(
                {"message": "Email and Password are required"}, status=400
            )


@method_decorator(csrf_exempt, name="dispatch")
class LoginUserView(View):
    """
    POST /api/v1/login/ 에서
    email, password 로 로그인 후
    access, refresh 토큰을 함께 반환합니다.
    """

    def post(self, request, *args, **kwargs):
        email = request.POST.get("email")
        password = request.POST.get("password")

        user_db = authenticate(request, email=email, password=password)
        if user_db is not None:
            # Django의 세션 기반 로그인(옵션)
            login(request, user_db)

            # Simple JWT의 토큰 생성
            refresh = RefreshToken.for_user(user_db)
            access_token = str(refresh.access_token)
            refresh_token = str(refresh)

            return JsonResponse(
                {
                    "message": "Login successful",
                    "access": access_token,
                    "refresh": refresh_token,
                },
                status=200,
            )
        else:
            return JsonResponse({"message": "Invalid credentials"}, status=401)
