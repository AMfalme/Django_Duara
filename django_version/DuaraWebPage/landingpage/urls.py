

from django.urls import path

from . import views
name = 'landingpage'
urlpatterns = [
    path('', views.index, name= 'index'),
    path('dummy/', views.dummy, name = 'dummy')
]