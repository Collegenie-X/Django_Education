from django.urls import path
from .views import PopupListView

urlpatterns = [
    path('', PopupListView.as_view(), name='popup-list'),
]
