from django.contrib.auth.models import AbstractUser
from django.db import models
import random
import string

class User(AbstractUser):
    email = models.EmailField(unique=True)
    is_email_verified = models.BooleanField(default=False)
    email_verification_code = models.CharField(max_length=6, blank=True, null=True)
    is_2fa_enabled = models.BooleanField(default=True)
    two_factor_code = models.CharField(max_length=6, blank=True, null=True)

    REQUIRED_FIELDS = ['username']
    USERNAME_FIELD = 'email'

    def generate_verification_code(self):
        code = ''.join(random.choices(string.digits, k=6))
        self.email_verification_code = code
        self.save()
        return code

    def generate_2fa_code(self):
        code = ''.join(random.choices(string.digits, k=6))
        self.two_factor_code = code
        self.save()
        return code

class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    address = models.TextField(blank=True)
    phone = models.CharField(max_length=20, blank=True)

    def __str__(self):
        return f"{self.user.email}'s profile"
