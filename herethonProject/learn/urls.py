from django.urls import path
from .views import *

app_name='learn'

urlpatterns = [
    path('',category_list, name='category_list'),
    path('curriculum/<slug:category_slug>/',curriculum,name='curriculum'),
    path('curriculum_detail/<int:id>/',curriculum_detail,name='curriculum_detail'),
]