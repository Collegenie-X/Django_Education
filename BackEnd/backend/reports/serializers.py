from rest_framework import serializers
from .models import Report, Answer
from store.models import Problem
from accounts.models import User

class ProblemSerializer(serializers.ModelSerializer):
    class Meta:
        model = Problem
        fields = ['id','title', 'grade', 'subject', 'type','is_free','discounted_price','price']

class AnswerSerializer(serializers.ModelSerializer):
    write_user_name = serializers.CharField(source='user.username', read_only=True)
    problem_title = serializers.CharField(source='report.payment.problem.title', read_only=True)

    class Meta:
        model = Answer
        fields = ['id', 'content', 'write_user_name', 'created_at', 'problem_title']
        read_only_fields = ['write_user_name', 'created_at', 'problem_title']

    def validate(self, attrs):
        """
        Validate that the user creating the answer is the author of the related problem.
        """
        request = self.context.get('request')
        user = request.user if request else None
        report = attrs.get('report')

        if report and user:
            try:
                # Extract problem_id from payment.order_id
                problem_id = report.payment.order_id.split('___')[-1]
                # Fetch the related problem instance
                problem = Problem.objects.get(pk=problem_id)
                # Check if the user is the author of the problem
                if problem.user != user:
                    raise serializers.ValidationError("Only the author of this problem can create an answer.")
            except (IndexError, Problem.DoesNotExist):
                raise serializers.ValidationError("Invalid problem ID.")
        else:
            raise serializers.ValidationError("Report and user information are required.")

        return attrs

    def create(self, validated_data):
        # Automatically assign the current user to the answer
        user = self.context['request'].user
        validated_data['user'] = user

        # Create the Answer object
        answer = Answer.objects.create(**validated_data)

        return answer

class ReportSerializer(serializers.ModelSerializer):
    problem_details = ProblemSerializer(source='payment.problem', read_only=True)
    answer_details = AnswerSerializer(many=True, read_only=True, source='comments')  # 'comments' is the related_name in Answer model

    class Meta:
        model = Report
        fields = [
            'id',
            'user',
            'payment',
            'problem_details',
            'title',
            'description',
            'registration_date',
            'question_type',
            'processing_status',
            'answer_details',  # answer_details added
        ]
        read_only_fields = ['user', 'registration_date', 'problem_details', 'answer_details']

    def validate(self, attrs):
        """
        Prevent duplicate Report creation for the same user and payment.
        """
        user = self.context['request'].user
        payment = attrs.get('payment')

        if Report.objects.filter(user=user, payment=payment).exists():
            raise serializers.ValidationError("The Report for this payment already exists.")

        return attrs

    def create(self, validated_data):
        # Automatically assign the current user to the report
        user = self.context['request'].user
        validated_data['user'] = user

        # Create the Report object
        report = Report.objects.create(**validated_data)

        # Update the Payment object status
        report.payment.is_report = True
        report.payment.save()

        return report
