from django.urls import path
from .views import *

app_name='quiz'

urlpatterns = [
    path('<int:curriculum_id>/', quiz_view, name='quiz'),
]