from django.db import models
from accounts.models import User
from payments.models import Payment


TYPE_CHOICES = [
    ('Incorrect Answer', 'Incorrect Answer'), 
    ('Defective', 'Defective'),
    ('Suggestion', 'Suggestion'),
]

PROCESSING_CHOICES = [
    ("Processing", "Processing"),
    ("Resolved", "Resolved"),
]

class Report(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    payment = models.ForeignKey(Payment, on_delete=models.CASCADE)
    title = models.CharField(max_length=255)
    description = models.TextField()
    registration_date = models.DateTimeField(auto_now_add=True)
    question_type = models.CharField(max_length=255, choices=TYPE_CHOICES)
    processing_status = models.CharField(max_length=255, choices=PROCESSING_CHOICES, default='Processing')
    
    def __str__(self):
        return self.title + " " + self.description


class Answer(models.Model):
    report = models.ForeignKey(Report, on_delete=models.CASCADE, related_name='comments')
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Comment by {self.user.username} on {self.report}"