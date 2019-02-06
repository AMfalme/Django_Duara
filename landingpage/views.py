from django.shortcuts import render, get_object_or_404
from .models import Subscribers
from django.core.mail import send_mail
from django.db import IntegrityError
import json
# from django.shortcuts impor
# Create your views here.
from django.core.validators import validate_email
from django.core.exceptions import ValidationError
import logging
from django.http import HttpResponse

logger = logging.getLogger("DuaraWebPage.subscribe")

def index(request):
    message = None
    error_message = None
    if request.method == 'POST':
        logger.debug("index() - POST")
        try:
            email = request.POST.get('email')
            validate_email(email)
            new_subscriber = Subscribers(email = email)
            new_subscriber.save()
            message = "Thank you for your interest, %s. We will keep you updated on our progress." % email
            logger.info("New user: %s" % email)
        except ValidationError as e:
            error_message = "Invalid e-mail address. Kindly input a valid e-mail address and try again."
            logger.info("Invalid e-mail address submitted.")
        except IntegrityError:
            error_message = "You are already subscribed. We will keep you updated on our progress."
            logger.info("Duplicate subscription")

    return render(request, 'landingpage/index.html', { "message": message, "error_message": error_message })


def send_contact_message(request):
	if request.method == 'POST':
		resonse = json.loads(request.POST.get('data'))
		name = response['name']
		email = response['email']
		message = response['message']
		# email_message = '''
		# name: %s
		# email: %s
		# message: %s
		# '''()
		send_mail(
			'web contact us message',
			message,
			'mfalmegriffin@gmail.com',
			['info@duara.io']
		)
		
	else:
		return HttpResponse('400')