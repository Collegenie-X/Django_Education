from django.urls import path
from .views import PaymentsConfirmView, RefundRequestView, \
                   RefundListView, PaymentsListView, CheckPaymentView

urlpatterns = [
    path('orders/', PaymentsListView.as_view(), name='payment-list'),
    path('confirm/', PaymentsConfirmView.as_view(), name='pay-confirm'),
    path('check/', CheckPaymentView.as_view(), name='payment-check'),
    path('refunds/', RefundListView.as_view(), name='refund-list'),
    path('refunds/<str:order_id>/', RefundRequestView.as_view(), name='request-detail-refund'),
]
