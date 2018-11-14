from django.shortcuts import render
from django.http import HttpResponse
# from django.shortcuts impor
# Create your views here.


def dummy(request):
    return HttpResponse("Kindly work for Heveans sake")

def index(request):
    return render(request, 'landingpage/index.html')
