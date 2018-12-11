from django.shortcuts import render
from django.http import HttpResponse
# from django.shortcuts impor
# Create your views here.



def index(request):
    return render(request, 'subscribe/index.html')


def trial(request):
    return HttpResponse("Kindly work for Heveans sake")
