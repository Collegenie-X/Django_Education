from django.urls import path
from .views import ReportListCreateAPIView, ReportDetailAPIView

urlpatterns = [
    path('', ReportListCreateAPIView.as_view(), name='report-list-create'),
    path('<int:pk>/', ReportDetailAPIView.as_view(), name='report-detail'),
]
