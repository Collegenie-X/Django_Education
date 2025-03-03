from django.contrib import admin
from .models import Review,Comment


@admin.register(Review)
class ReviewsAdmin(admin.ModelAdmin):
    list_display = ['user','problem','rating','comment','created_at']  
    search_fields = ['user__email', 'problem__title']  # 검색 기능을 추가할 필드 (유저 이메일과 문제 제목)
    list_filter = ['rating','user__email','problem__title']  # 필터 기능 추가 (유저 기준)


class CommentAdmin(admin.ModelAdmin):
    # 기존 설정 유지
    list_display = [
        'user',
        'get_problem_title',
        'get_problem_description',
        'get_review_comment',
        'get_review_rating',
        'content',
        'created_at'
    ]
    search_fields = ['user__email', 'review__problem__title']
    list_filter = ['user__email', 'review__problem__title']
    
    # Fieldsets 정의
    fieldsets = (
        ("Write Comments", {
            'fields': ('user', 'review', 'content')
        }),
        ('Review Information', {
            'fields': ('get_problem_title','get_problem_description', 'get_review_comment', 'get_review_rating'),
            'classes': ('collapse',),
        }),
        ('Metadata', {
            'fields': ('created_at',),
            'classes': ('collapse',),
        }),
    )
    
    # 커스텀 메서드 정의
    def get_problem_title(self, obj):
        return obj.review.problem.title
    get_problem_title.short_description = 'Problem Title'
    get_problem_title.admin_order_field = 'review__problem__title'
    
    def get_problem_description(self, obj):
        return obj.review.problem.description
    get_problem_description.short_description = 'Problem Description'
    get_problem_description.admin_order_field = 'review__problem__description'

    def get_review_comment(self, obj):
        return obj.review.comment
    get_review_comment.short_description = 'Review Comment'
    get_review_comment.admin_order_field = 'review__comment'

    def get_review_rating(self, obj):
        return obj.review.rating
    get_review_rating.short_description = 'Review Rating'
    get_review_rating.admin_order_field = 'review__rating'

    # 읽기 전용 필드로 설정
    readonly_fields = (
        'get_problem_title',
        'get_problem_description',  # 추가된 부분
        'get_review_comment',
        'get_review_rating',
        'created_at'
    )
admin.site.register(Comment, CommentAdmin)