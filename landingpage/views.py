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
from django.conf import settings

logger = logging.getLogger("DuaraWebPage.subscribe")


@require_http_methods(["GET"])
def index(request):
    
    INTERCOM_APPID = getattr(settings, "INTERCOM_APPID", None)
    context = {'INTERCOM_APPID': INTERCOM_APPID}
    return render(request, 'landingpage/index.html', context)


@require_http_methods(["POST"])
def subscribeForm(request):
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
def InquiryForm(request):
    response_message = None
    error = None

    try:
        data = json.loads(request.body.decode('utf-8'))
        form_id = data['form_id']
        if form_id == "sendInquiryForm":
            name = data["name"]
            email = data["email"]
            message = data["message"]
            email_body = """
            From: %s
            E-mail: %s

            %s

            """ % ( name,
                    email,
                    message
                    )


            subject = "Home Page Inquiry: %s" % email
            if not (name and message):
                raise ValidationError("Missing either 'name' or 'message'")
        elif form_id == "supportForm":
            name = data["name"]
            email = data["email"]
            reason = data["select"]
            message = data["message"]
            email_body = """
            From: %s
            E-mail: %s
            Issue: %s
            %s

            """ % ( name,
                    email,
                    reason,
                    message
                    )


            subject = "Support Inquiry: %s" % email
            if not (name and message and reason):
                raise ValidationError("Missing either 'name', 'reason' or 'message'")
        elif form_id == "salesForm":
            name = data["name"]
            email = data["email"]
            company = data["company"]
            reason = data["select"]
            message = data["message"]
            email_body = """
            From: %s
            E-mail: %s
            Company: %s
            Issue: %s

            %s

            """ % ( name,
                    email,
                    company,
                    reason,
                    message
                    )


            subject = "Sales Inquiry: %s" % email
            if not (name and message and reason and company):
                raise ValidationError("Missing either 'name', 'reason', 'Company' or 'message'")
        
        validate_email(email)
    except (ValidationError, KeyError, ValueError) as e:
        logger.warning(e);
        error = LANDING_PAGE_ERROR["bad_input"]
        return JsonResponse({
            "message" : None,
            "error" : LANDING_PAGE_ERROR["bad_input"]
        })


    
    try:
        send_mail(
            subject,
            email_body,
            settings.LANDING_PAGE_INQUIRY_SENDER,
            [settings.RECEPIENTS[form_id]],
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


@require_http_methods(["GET"])
def pricing(request):
    return render(request, 'landingpage/pricing.html')


@require_http_methods(["GET"])
def contact(request):
    return render(request, 'landingpage/contactus.html')


@require_http_methods(["GET"])
def about(request):
    return render(request, 'landingpage/about.html')

@require_http_methods(["GET"])
def openstack(request):
    return render(request, 'landingpage/openstack.html')
    

@require_http_methods(["GET"])
def features(request):
    return render(request, 'landingpage/features.html')

@require_http_methods(["GET"])
def services(request):
    return render(request, 'landingpage/services.html')

