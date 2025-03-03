
### backend/urls.py

from django.contrib import admin
from django.urls import path,include

urlpatterns = [
    path('admin/', admin.site.urls),
    
    path("api/v1/", include([
        path('store/', include('store.urls')),
        path("accounts/", include("accounts.urls")),         
        path("reports/", include("reports.urls")), 
        path("payments/", include("payments.urls")),     
        path("reviews/", include("reviews.urls")), 
        path('notices/', include("notices.urls")),     
        path('carts/', include("carts.urls")),   
        path('popups/', include("popups.urls")),    
        path('downloads/', include("downloads.urls")),
    ]))
]
