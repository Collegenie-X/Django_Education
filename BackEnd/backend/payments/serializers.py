from rest_framework import serializers
from .models import Payment, Refund


class PaymentConfirmSerializer(serializers.Serializer):
    payment_key = serializers.CharField(required=True)
    amount = serializers.DecimalField(max_digits=10, decimal_places=2, required=True)
    order_id = serializers.CharField(required=True)
    payment_type = serializers.ChoiceField(choices=['NORMAL'], default='NORMAL', read_only=True)


class PaymentSerializer(serializers.ModelSerializer):
    refund_status = serializers.SerializerMethodField()
    customer_name = serializers.SerializerMethodField()
    problem_id = serializers.SerializerMethodField()  # problem_id 필드 추가
    problem_file_url = serializers.SerializerMethodField()  # problem_file_url 필드 추가

    class Meta:
        model = Payment
        fields = '__all__'

    def get_refund_status(self, obj):
        try:
            return obj.refund.refund_status
        except Refund.DoesNotExist:
            return None

    def get_customer_name(self, obj):
        return obj.creator.username if obj.creator else None

    def get_problem_id(self, obj):
        return obj.problem.id if obj.problem else None  # problem_id 반환

    def get_problem_file_url(self, obj):
        return obj.problem.file.url if obj.problem and obj.problem.file else None  # problem_file_url 반환




class RefundSerializer(serializers.ModelSerializer):
    customer_name = serializers.SerializerMethodField()

    class Meta:
        model = Refund
        fields = '__all__'

    def get_customer_name(self, obj):
        return obj.creator.username if obj.creator else None
