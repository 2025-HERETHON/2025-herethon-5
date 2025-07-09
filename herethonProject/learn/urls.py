from django.urls import path
from .views import *

app_name='learn'

urlpatterns = [
    # path('',category_list, name='category_list'),
    path('curriculum/<slug:category_slug>/',curriculum,name='curriculum'),
    path('curriculum_detail/<slug:category_slug>/<int:curriculum_number>/', curriculum_detail, name='curriculum_detail'),
    path('learn_complete/<slug:category_slug>/<int:curriculum_number>/', learn_complete, name='learn_complete'),
    path('category_complete/<slug:category_slug>/', category_complete, name='category_complete'),

]