from django.urls import path

from . import views
name = 'landingpage'
urlpatterns = [
    path('', views.index, name= 'index'),
    path('send_inquiry', views.send_inquiry, name='send_inquiry'),
    path('subscribe', views.subscribe, name='subscribe'),
    path('pricing', views.pricing, name = 'pricing'),
    path('contact', views.contact, name = 'contact'),
    path('about', views.about, name = 'about'),
    path('openstack', views.openstack, name = 'openstack'),
    path('features', views.features, name = 'features'),
    path('services', views.services, name = 'services'),
    

]
