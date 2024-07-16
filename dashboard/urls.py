from django.urls import path
from django.views.generic import TemplateView

from dashboard import views

urlpatterns = [
    path('v1/dishes/list/', views.ListofDishesAPI.as_view(), name='dishesList'),
    path('v1/dishes/<pk>/update/', views.UpdateDishAPI.as_view(), name='dishesUpdate'),
    path('', TemplateView.as_view(template_name='index.html'), name='dishesTemplate'),
]
