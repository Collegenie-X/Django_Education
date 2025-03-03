
### payments/admin.py 
from django.contrib import admin
from .models import Payment,Refund


 
class PyamentAdmin(admin.ModelAdmin):
    
    list_display =[
        "id",
        "creator",
        "payment_key",
        "order_name",
        "order_id",
        "amount",
        "payment_type",
        "method",
        "easy_pay",
        "is_paid",
        "is_report",
        "is_refundable",
        "requested_at",
        "approved_at",
        
    ]
    
    list_filter = [
        "payment_type",
        "is_paid",
        "is_report",
        "is_refundable",        
    ]
    
admin.site.register(Payment, PyamentAdmin)



class RefundAdmin(admin.ModelAdmin):
    
    list_display =[
        
        "payment",
        "creator",
        "order_id",
        "refund_amount",
        "refund_reason",
        "refund_order_name",        
        "refund_type",
        "refund_status",
        "created_at",
        "processed_at",        
    ]
    
admin.site.register(Refund, RefundAdmin)