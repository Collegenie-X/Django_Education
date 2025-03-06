from django.urls import path
from .views import TodoListCreateAPIView, TodoDetailAPIView

urlpatterns = [
    # GET: 전체 목록 / POST: 생성
    path("todos/", TodoListCreateAPIView.as_view(), name="todo_list_create"),
    # GET: 단일 조회 / PATCH: 수정 / DELETE: 삭제
    path("todos/<int:pk>/", TodoDetailAPIView.as_view(), name="todo_detail"),
]
