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
from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .messages import LANDING_PAGE_ERROR, LANDING_PAGE_MESSAGE

logger = logging.getLogger("DuaraWebPage.subscribe")

def index(request):
    if request.method == 'GET':
        return render(request, 'landingpage/index.html')

def subscribe(request):
    message = None
    error = None

    if request.method == 'POST':
        data = json.loads(request.body.decode('utf-8'))
        try:
            email = data["email"]
            validate_email(email)
            new_subscriber = Subscribers(email = email)
            new_subscriber.save()
            message = LANDING_PAGE_MESSAGE["subscribe_successful"]
            logger.info("New user: %s" % email)
        except ValidationError as e:
            error = LANDING_PAGE_ERROR["invalid_email"]
            logger.info("Invalid e-mail address submitted.")
        except IntegrityError:
            error = LANDING_PAGE_ERROR["duplicate_email"]
            logger.info("Duplicate subscription")

    return JsonResponse({
        "message": message,
        "error": error
    })


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
