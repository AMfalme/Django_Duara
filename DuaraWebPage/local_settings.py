DEBUG = True

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'HOST': 'dmysql',
        'NAME': 'launching_soon',
        'USER': 'root',
        'PASSWORD': 'secret',
    }
}

EMAIL_HOST = "smtp-relay.gmail.com"
EMAIL_PORT = 587
EMAIL_HOST_USER = "no-reply@duara.io"
EMAIL_HOST_PASSWORD = "3Qtrn@n84*jQ"
