from django.db import models

# Create your models here.
# from django.template.defaultfilters import slugify
# from django.contrib.auth.models import User
from django.utils import timezone
class Subscribers(models.Model):
	email = models.EmailField(max_length = 255, unique= True)
	subscribe_date = models.DateTimeField(auto_now_add=True)
	def __str__(self):
		return self.email