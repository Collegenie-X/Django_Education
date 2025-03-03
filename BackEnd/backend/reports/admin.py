from django.contrib import admin
from django.urls import reverse
from django.utils.html import format_html
from .models import Report, Answer
from store.models import Problem  # Problem 모델 임포트

# Answer 모델을 Report 관리자 페이지에 인라인으로 추가
class AnswerInline(admin.TabularInline):
    model = Answer
    extra = 0  # 기본 추가 폼 수를 0으로 설정
    fields = ('user','content')  # 표시할 필드 지정    
    # can_delete = False  # 필요에 따라 삭제 가능 여부 설정
    show_change_link = True  # 관련 Answer의 변경 링크 표시

    def problem_title(self, obj):
        """
        Answer와 관련된 Problem의 제목을 클릭 가능한 링크로 표시합니다.
        """
        try:
            problem_id = obj.report.payment.order_id.split('___')[-1]
            problem = Problem.objects.get(pk=problem_id)
            url = reverse("admin:store_problem_change", args=(problem_id,))
            return format_html('<a href="{}">{}</a>', url, problem.title)
        except (IndexError, Problem.DoesNotExist):
            return "N/A"
    problem_title.short_description = "Problem Title"  # 관리자 화면에서의 표시 이름

# Report 관리자 클래스 수정
class ReportAdmin(admin.ModelAdmin):
    list_display = [
        "id",
        "user",
        "answer_contents",  
        "payment",
        "title",
        "description",
        "registration_date",
        "question_type",
        "processing_status",
        "problem_link",      # Problem 링크 추가
         # Answer 내용 추가
    ]
    inlines = [AnswerInline]  # Answer 인라인 추가
    readonly_fields = ['id', 'registration_date', 'problem_link']  # 읽기 전용 필드 설정

    # 필드셋에 problem_link 추가
    fieldsets = (
        (None, {
            'fields': (
                'id', 'user', 'payment', 'problem_link',
                'title', 'description', 'registration_date',
                'question_type', 'processing_status'
            )
        }),
    )

    def problem_link(self, obj):
        """
        Problem의 제목을 클릭하면 해당 Problem의 관리자 상세 페이지로 이동하는 링크를 생성합니다.
        """
        try:
            # payment.order_id에서 problem_id 추출
            problem_id = obj.payment.order_id.split('___')[-1]
            # Problem 인스턴스 가져오기
            problem = Problem.objects.get(pk=problem_id)
            # Problem의 관리자 변경 페이지 URL 생성
            url = reverse("admin:store_problem_change", args=(problem_id,))
            # 클릭 가능한 링크 반환
            return format_html('<a href="{}">{}</a>', url, problem.title)
        except (IndexError, Problem.DoesNotExist):
            return "N/A"
    problem_link.short_description = "Problem"  # 관리자 화면에서의 표시 이름

    def answer_contents(self, obj):
        """
        Report에 연결된 모든 Answer의 내용을 간략하게 표시합니다.
        """
        answers = obj.comments.all()  # 'comments'는 Answer 모델의 related_name
        if answers.exists():
            return ", ".join([answer.content for answer in answers])
        return "No Answers"
    answer_contents.short_description = "Answers"  # 관리자 화면에서의 표시 이름

# Report 모델을 ReportAdmin으로 등록
admin.site.register(Report, ReportAdmin)

# Answer적으로 Answer 모델을 독립적으로 관리할 수 있도록 등록
@admin.register(Answer)
class AnswerAdmin(admin.ModelAdmin):
    list_display = ['id', 'report', 'user', 'content', 'created_at', 'problem_title']
    list_filter = ['report', 'user', 'created_at']
    search_fields = ['content', 'user__username']
    readonly_fields = ['created_at', 'problem_title']  # problem_title을 읽기 전용으로 설정

    def problem_title(self, obj):
        """
        관련된 Problem의 제목을 반환하며, 클릭 시 해당 Problem의 관리자 상세 페이지로 이동합니다.
        """
        try:
            problem_id = obj.report.payment.order_id.split('___')[-1]
            problem = Problem.objects.get(pk=problem_id)
            url = reverse("admin:store_problem_change", args=(problem_id,))
            return format_html('<a href="{}">{}</a>', url, problem.title)
        except (IndexError, Problem.DoesNotExist):
            return "N/A"
    problem_title.short_description = "Problem Title"  # 관리자 화면에서의 표시 이름
