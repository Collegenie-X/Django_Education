from django.db.models.signals import post_save
from django.dispatch import receiver
from django.core.mail import send_mail
from .models import User
import uuid
import logging

logger = logging.getLogger(__name__)

@receiver(post_save, sender=User)
def send_verification_email(sender, instance, created, **kwargs):
    if created:
        print(f"New user created: {instance.username}")
        verification_url = f"http://localhost:8000/api/verify-email/?code={instance.email_verification_code}"
        subject = "[store.studyola.com] Verify your email address"
        message = f"Please click the link below to verify your email address:\n{verification_url}"
        try:
            send_mail(subject, message, 'support@essayfit.com', [instance.email])
            logger.info(f"Verification email sent to {instance.email}")
        except Exception as e:
            logger.error(f"Failed to send verification email to {instance.email}: {e}")
