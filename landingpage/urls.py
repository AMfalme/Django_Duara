from django.urls import path

from . import views
name = 'landingpage'
urlpatterns = [
    path('', views.index, name= 'index'),
    path('send_inquiry', views.send_inquiry, name='send_inquiry'),
    path('subscribe', views.subscribe, name='subscribe'),
    path('pricing', views.pricing, name = 'pricing'),
    path('contact', views.contact, name = 'contact')

]
