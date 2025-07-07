from django.urls import path
from .views import *

app_name='learn'

urlpatterns = [
    path('',category_list, name='category_list'),
    path('curriculum/<slug:category_slug>/',curriculum,name='curriculum'),
    path('curriculum_detail/<int:id>/',curriculum_detail,name='curriculum_detail'),
    path('learn_complete/<int:curriculum_id>/', learn_complete, name='learn_complete'),
    path('category_complete/<slug:category_slug>/', category_complete, name='category_complete'),
]