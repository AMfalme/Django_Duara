from django.urls import path

from . import views
name = 'landingpage'
urlpatterns = [
    path('', views.index, name= 'index'),
    path('InquiryForm', views.InquiryForm, name='InquiryForm'),
    path('subscribeForm', views.subscribeForm, name='subscribeForm'),
    path('pricing', views.pricing, name = 'pricing'),
    path('contact', views.contact, name = 'contact'),
    path('about', views.about, name = 'about'),
    path('openstack', views.openstack, name = 'openstack'),
    path('features', views.features, name = 'features'),
    path('services', views.services, name = 'services'),
    

]
