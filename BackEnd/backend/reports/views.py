from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from .models import Report
from payments.models import Payment
from store.models import Problem
from .serializers import ReportSerializer
from accounts.models import User

class ReportListCreateAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        # related 객체를 미리 가져와 쿼리 최적화
        reports = Report.objects.filter(user=request.user).select_related('payment__problem').prefetch_related('comments__user')
        serializer = ReportSerializer(reports, many=True, context={'request': request})
        return Response(serializer.data)

    def post(self, request):
        serializer = ReportSerializer(data=request.data, context={'request': request})

        if serializer.is_valid():
            serializer.save()
            # Report 생성 후, 사용자에 따른 모든 Report를 다시 가져와 반환
            reports = Report.objects.filter(user=request.user).select_related('payment__problem').prefetch_related('comments__user')
            serialized_reports = ReportSerializer(reports, many=True, context={'request': request})
            return Response(serialized_reports.data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ReportDetailAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, pk):
        try:
            report = Report.objects.select_related('payment__problem').prefetch_related('comments__user').get(pk=pk, user=request.user)
        except Report.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        serializer = ReportSerializer(report, context={'request': request})
        return Response(serializer.data)

    def put(self, request, pk):
        try:
            report = Report.objects.get(pk=pk, user=request.user)
        except Report.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        serializer = ReportSerializer(report, data=request.data, partial=True, context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
