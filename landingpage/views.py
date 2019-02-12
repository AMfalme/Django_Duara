from .messages import LANDING_PAGE_ERROR, LANDING_PAGE_MESSAGE
from .models import Subscribers
from django.conf import settings
from django.core.exceptions import ValidationError
from django.core.mail import send_mail
from django.core.validators import validate_email
from django.db import IntegrityError
from django.http import HttpResponse, JsonResponse
from django.shortcuts import render, get_object_or_404
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_http_methods
from smtplib import SMTPException
import json
import logging


logger = logging.getLogger("DuaraWebPage.subscribe")


@require_http_methods(["GET"])
def index(request):
    return render(request, 'landingpage/index.html')


@require_http_methods(["POST"])
def subscribe(request):
    data = json.loads(request.body.decode('utf-8'))
    error = None
    message = None

    try:
        email = data["email"]
        validate_email(email)
        new_subscriber = Subscribers(email = email)
        new_subscriber.save()
        message = LANDING_PAGE_MESSAGE["subscribe_successful"]
        logger.info("New user")
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


@require_http_methods(["POST"])
def send_inquiry(request):
    data = json.loads(request.body.decode('utf-8'))
    response_message = None
    error = None

    try:
        name = data["name"]
        email = data["email"]
        message = data["message"]
        if not (name and message):
            raise ValidationError("Missing either 'name' or 'message'")
        validate_email(email)
    except (ValidationError, KeyError) as e:
        error = LANDING_PAGE_ERROR["bad_input"]
        return JsonResponse({
            "message" : None,
            "error" : LANDING_PAGE_ERROR["bad_input"]
        })


    email_body = """
    From: %s
    E-mail: %s

    %s

    """ % ( data["name"],
            data["email"],
            data["message"]
            )


    subject = "Home Page Inquiry: %s" % data["name"]

    try:
        send_mail(
            subject,
            email_body,
            settings.LANDING_PAGE_INQUIRY_SENDER,
            [settings.LANDING_PAGE_INQUIRY_RECIPIENT],
            fail_silently=False
        )
        response_message = LANDING_PAGE_MESSAGE["inquiry_email_send_success"]
    except SMTPException as e:
        logger.error("Failed to send email inquiry")
        logger.error(e)
        error = LANDING_PAGE_ERROR["contact_form_email_send_failure"]

    return JsonResponse({
        "message": response_message,
        "error": error
    })
