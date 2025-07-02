from django.urls import path
from . import views

urlpatterns = [
    path('create/', views.feedback_create, name='feedback_create'),
    path('list/', views.feedback_list, name='feedback_list'),
    path('detail/<int:feedback_id>/', views.feedback_detail, name='feedback_detail'),
    path('udpate/<int:id>/', views.feedback_update, name='feedback_update'),
    path('delete/<int:id>/', views.feedback_delete, name='feedback_delete'),
]