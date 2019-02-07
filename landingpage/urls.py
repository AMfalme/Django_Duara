from django.urls import path

from . import views
name = 'landingpage'
urlpatterns = [
    path('', views.index, name= 'index'),
    path('mail', views.send_contact_message, name='send_contact_message'),
    path('subscribe', views.subscribe, name='subscribe'),

]
