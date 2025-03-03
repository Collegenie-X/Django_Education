from django.contrib import admin
from .models import Cart, CartItem

# 장바구니 아이템에 대한 인라인 설정
class CartItemInline(admin.TabularInline):
    model = CartItem
    extra = 1  # 추가될 수 있는 빈 CartItem 필드 수

# 장바구니 모델에 대한 관리자 설정
@admin.register(Cart)
class CartAdmin(admin.ModelAdmin):
    list_display = ['id','user', 'created_at', 'updated_at']  # 관리자 페이지에서 표시할 필드
    search_fields = ['user__email']  # 검색 기능을 추가할 필드 (이메일 기준)
    list_filter = ['created_at']  # 필터 기능 추가 (생성일 기준)
    inlines = [CartItemInline]  # 장바구니와 연관된 CartItem을 인라인으로 표시

# 장바구니 아이템 모델에 대한 관리자 설정
@admin.register(CartItem)
class CartItemAdmin(admin.ModelAdmin):
    list_display = ['id','cart', 'problem']  # 관리자 페이지에서 표시할 필드
    search_fields = ['cart__user__email', 'problem__title']  # 검색 기능을 추가할 필드 (유저 이메일과 문제 제목)
    list_filter = ['cart__user']  # 필터 기능 추가 (유저 기준)
