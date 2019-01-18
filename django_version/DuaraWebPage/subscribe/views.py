from django.shortcuts import render, get_object_or_404
from .models import Subscribers
from django.core.mail import send_mail
from django.db import IntegrityError
import json
# from django.shortcuts impor
# Create your views here.
from django.core.validators import validate_email
from django.core.exceptions import ValidationError




def index(request):
    if request.method == 'POST':
        try:
            email = request.POST.get('email')
            validate_email(email)
            new_subscriber = Subscribers(email = email)
            new_subscriber.save()
            return render(request, 'subscribe/index.html', {'new_subscriber': new_subscriber})
        except ValidationError as e:
            error_message = 'Invalid Email address kindy input a valid email address'
            return render(request, 'subscribe/index.html', {'error_message': error_message })
        except IntegrityError:
            error_message = 'You are already subscribed to our platform'
            return render(request, 'subscribe/index.html', {'error_message': error_message})
    else:
        return render(request, 'subscribe/index.html')

def errorpage(request):
    return render(request, 'subscribe/404.html')