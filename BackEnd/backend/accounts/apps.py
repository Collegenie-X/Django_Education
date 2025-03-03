from django.apps import AppConfig
from django.conf import settings
import firebase_admin
from firebase_admin import credentials


class AccountsConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'accounts'
