from django.contrib import admin
from django.utils.html import mark_safe
from .models import Popup

@admin.register(Popup)
class PopupAdmin(admin.ModelAdmin):
    # 이미지 미리보기 설정
    readonly_fields = ('preview_image_tag',)

    # 이미지 미리보기 메서드
    def preview_image_tag(self, obj):
        if obj.image:
            return mark_safe(f'<a href="{obj.image.url}" target="_blank"><img src="{obj.image.url}" width="150" height="150" /></a>')
        return "No Image Available"
    
    preview_image_tag.short_description = 'Image Preview'

    # 다른 팝업의 is_active 필드를 False로 설정하는 로직
    def save_model(self, request, obj, form, change):
        if obj.is_active:
            # 현재 팝업을 제외하고 모든 팝업의 is_active를 False로 설정
            Popup.objects.filter(is_active=True).exclude(pk=obj.pk).update(is_active=False)
        super().save_model(request, obj, form, change)

    # fieldsets 설정 (카테고리별 필드 그룹화)
    fieldsets = (
        ('Popup Information', {
            'fields': ('title', 'description', 'link_url')
        }),
        ('Active Period', {
            'fields': ('start_date', 'end_date', 'is_active')
        }),
        ('Images', {
            'fields': ('image', 'preview_image_tag'),
        }),
    )

    # list_display와 list_filter 설정
    list_display = ['title', 'is_active', 'start_date', 'end_date', 'preview_image_tag']
    list_filter = ['is_active', 'start_date', 'end_date']
