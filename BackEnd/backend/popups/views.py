from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Popup
from .serializers import PopupSerializer
from django.utils import timezone

class PopupListView(APIView):
    def get(self, request, *args, **kwargs):
        # 현재 활성화된 팝업만 가져오기
        popups = Popup.objects.filter(is_active=True, start_date__lte=timezone.now(), end_date__gte=timezone.now())
        serializer = PopupSerializer(popups, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
