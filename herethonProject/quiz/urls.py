from django.urls import path
from .views import *

app_name='quiz'

urlpatterns = [
    path('quiz/<slug:category_slug>/<int:curriculum_number>/', quiz_view, name='quiz_view'),
]