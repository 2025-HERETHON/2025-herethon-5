from django.urls import path
from quiz import views

urlpatterns = [
    path('<str:category>/<int:order>/', views.quiz_view, name='quiz'),
]