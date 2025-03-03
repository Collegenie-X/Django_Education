from rest_framework import serializers
from .models import Popup

class PopupSerializer(serializers.ModelSerializer):
    class Meta:
        model = Popup
        fields = ['id', 'title', 'description', 'image', 'link_url', 'is_active', 'start_date', 'end_date']
