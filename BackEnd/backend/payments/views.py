import base64
import requests


from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from django.conf import settings
from django.db import transaction

from .serializers import PaymentConfirmSerializer, PaymentSerializer, RefundSerializer
from django.utils import timezone
from datetime import timedelta
from .models import Payment, Refund
from rest_framework.permissions import IsAuthenticated

from store.models import Problem


class CheckPaymentView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        problem_id = request.data.get('problem_id')

        if not problem_id:
            return Response({'error': 'problem_id is required'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            problem = Problem.objects.get(id=problem_id)
        except Problem.DoesNotExist:
            return Response({'error': 'Problem does not exist'}, status=status.HTTP_404_NOT_FOUND)

        if problem.is_free : 
            return Response({
                'is_free': True,
                'is_payment': False,
                'file_url': problem.file.url if problem.file else None
            }, status=status.HTTP_200_OK)

        # 현재 사용자가 해당 problem을 결제했는지 확인
        payment_exists = Payment.objects.filter(creator=request.user, problem=problem, is_paid=True).exists()

        if payment_exists:
            file_url = problem.file.url if problem.file else None
            return Response({
                'is_payment': True,
                'file_url': file_url
            }, status=status.HTTP_200_OK)
        else:
            return Response({
                'is_payment': False,
                'file_url': None
            }, status=status.HTTP_200_OK)


class PaymentsListView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        payments = Payment.objects.filter(creator=request.user)

        for payment in payments:
            if payment.requested_at and (timezone.now() - payment.requested_at) > timedelta(days=7):
                payment.is_refundable = False
                payment.save(update_fields=['is_refundable'])

        serializer = PaymentSerializer(payments, many=True)
        return Response({'payment_list': serializer.data})


class PaymentsConfirmView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        serializer = PaymentConfirmSerializer(data=request.data)
        if not serializer.is_valid():
            return Response({'error': 'Missing or invalid parameters', 'details': serializer.errors}, status=status.HTTP_400_BAD_REQUEST)

        validated_data = serializer.validated_data

        payment_key = validated_data['payment_key']
        order_id = validated_data['order_id']
        
        amount = validated_data['amount']
        payment_type = validated_data.get('payment_type', 'NORMAL')
        
        problem_id = order_id.split('___')[-1]

        payload = {
            "paymentKey": payment_key,
            "amount": float(amount),
            "orderId": order_id
        }

        headers = {
            'Authorization': f'Basic {base64.b64encode(f"{settings.TOSS_SECRET_KEY}:".encode()).decode()}',
            'Content-Type': "application/json"
        }

        response = requests.post('https://api.tosspayments.com/v1/payments/confirm', json=payload, headers=headers)
        if response.status_code != 200:
            error_details = response.json() if response.content else {'error': 'No detailed error message available'}
            return Response({'error': 'Payment confirmation failed', 'details': error_details}, status=response.status_code)

        payment_data = response.json()

        try:
            with transaction.atomic():
                problem_db = Problem.objects.get(id=problem_id)                

                Payment.objects.create(
                    creator= request.user,
                    problem= problem_db,                  
                    payment_key=payment_key,
                    order_id=order_id,
                    order_name= str(problem_db.title),
                    amount=amount,
                    payment_type=payment_type,
                    currency=payment_data.get('currency'),
                    country=payment_data.get('country'),
                    method=payment_data.get('method'),
                    requested_at=payment_data.get('requestedAt'),
                    approved_at=payment_data.get('approvedAt'),
                    easy_pay=payment_data.get('easyPay'),
                    is_paid=True,
                )

            return Response({'detail': "200 OK success 결제 성공"}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'error': f"payment failed: {e}"}, status=status.HTTP_400_BAD_REQUEST)


class RefundRequestView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, order_id, *args, **kwargs):
        user = request.user
        refund_reason = request.data.get('refund_reason')
        if not refund_reason:
            return Response({'error': 'Refund reason is required'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            payment = Payment.objects.get(order_id=order_id, creator=request.user)
        except Payment.DoesNotExist:
            return Response({'error': 'Payment not found or unauthorized'}, status=status.HTTP_404_NOT_FOUND)

        if not payment.is_refundable:
            return Response({'error': 'This payment is not refundable'}, status=status.HTTP_400_BAD_REQUEST)

        if hasattr(payment, 'refund'):
            return Response({'error': 'A refund request for this payment already exists'}, status=status.HTTP_400_BAD_REQUEST)

  
        with transaction.atomic():
            
            refund_type = "full"

            Refund.objects.create(
                creator=request.user,
                payment=payment,
                order_id=payment.order_id,
                refund_amount=payment.amount,
                refund_reason=refund_reason,
                refund_type=refund_type,
                refund_status='in_progress',
                refund_order_name=payment.order_name
            )

        return Response({'detail': 'Refund request created successfully'}, status=status.HTTP_201_CREATED)


class RefundListView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        user = request.user
        recharge_credits = user.recharge_credits
        refunds = Refund.objects.filter(creator=request.user)
        serializer = RefundSerializer(refunds, many=True)
        return Response({'recharge_credits': recharge_credits, 'refund_list': serializer.data})
