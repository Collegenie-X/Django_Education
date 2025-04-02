import requests
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, permissions
from django.conf import settings
from rest_framework_simplejwt.tokens import RefreshToken, AccessToken
import logging

from django.contrib.auth import get_user_model

User = get_user_model()
logger = logging.getLogger(__name__)


class KakaoSignInView(APIView):
    permission_classes = [permissions.AllowAny]
    authentication_classes = []

    def post(self, request):
        # 클라이언트에서 kakao_token을 받아옵니다.
        kakao_token = request.data.get("kakao_token")
        if not kakao_token:
            return Response(
                {"detail": "No kakao_token provided."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        # 1) 카카오 사용자 정보 조회
        kakao_user_info = self._get_kakao_user_info(kakao_token)
        if not kakao_user_info:
            return Response(
                {"detail": "Invalid Kakao token or Kakao API error."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        kakao_id = kakao_user_info.get("id")
        if not kakao_id:
            return Response(
                {"detail": "Kakao user ID not found."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        # 2) 내부 User 생성/조회
        user, created = self._get_or_create_user(kakao_user_info)

        # 3) JWT 토큰 생성
        refresh = RefreshToken.for_user(user)
        access = refresh.access_token

        # 4) 응답: JWT + 사용자 정보
        response_data = {
            "refresh": str(refresh),
            "access": str(access),
            "user": {
                "id": str(user.id),
                "email": user.email,
                "username": user.username,
            },
        }

        return Response(response_data, status=status.HTTP_200_OK)

    def _get_kakao_user_info(self, kakao_token):
        """
        Kakao REST API /v2/user/me를 호출하여 사용자 정보를 가져옵니다.
        """
        url = "https://kapi.kakao.com/v2/user/me"
        headers = {"Authorization": f"Bearer {kakao_token}"}

        try:
            response = requests.post(url, headers=headers)
            if response.status_code == 200:
                return response.json()
            else:
                logger.error(f"Kakao API error: {response.status_code}")
                return None
        except requests.exceptions.RequestException as e:
            logger.error(f"Kakao API request failed: {str(e)}")
            return None

    def _get_or_create_user(self, kakao_user_info):
        """
        카카오에서 가져온 정보를 바탕으로 User 모델 레코드 생성 또는 조회.
        """
        kakao_id = kakao_user_info["id"]
        kakao_account = kakao_user_info.get("kakao_account", {})
        email = kakao_account.get("email") or f"kakao_{kakao_id}@example.com"
        nickname = kakao_account.get("profile", {}).get("nickname", "kakao_user")

        # User 모델에 kakao_id를 저장할 필드가 있다면 재활용 (firebase_uid 등)
        # 여기서는 firebase_uid 대신 'kakao_{kakao_id}' 로 username을 구성
        defaults = {
            "username": f"{nickname}",
            "is_email_verified": True,  # SNS 로그인은 이메일 인증 생략 가능(선택)
        }

        # email 중복 시 로직이 필요할 수 있으나, 예시는 단순화
        user, created = User.objects.get_or_create(email=email, defaults=defaults)

        # 필요에 따라 nickname 업데이트
        user.username = nickname  # 닉네임에 맞게 업데이트
        user.save()

        return user, created
