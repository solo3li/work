from django.contrib.auth.models import AbstractUser, BaseUserManager
from django.db import models

class UserManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError('The Email field must be set')
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        return self.create_user(email, password, **extra_fields)

class User(AbstractUser):
    username = None
    email = models.EmailField('email address', unique=True)
    is_email_verified = models.BooleanField(default=False)
    verification_otp = models.CharField(max_length=6, blank=True, null=True)
    
    USER_TYPE_CHOICES = (
        ('customer', 'Customer'),
        ('driver', 'Driver'),
        ('admin', 'Admin'),
    )
    user_type = models.CharField(max_length=10, choices=USER_TYPE_CHOICES, default='customer')

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    objects = UserManager()

    def __str__(self):
        return self.email

class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='profile')
    full_name = models.CharField(max_length=255, blank=True)
    avatar = models.ImageField(upload_to='avatars/', blank=True, null=True)
    phone = models.CharField(max_length=20, blank=True) # Optional, PRD says email ONLY for auth
    
    # Driver specific docs (could be in a separate model too)
    license_number = models.CharField(max_length=50, blank=True)
    vehicle_info = models.TextField(blank=True)
    is_approved = models.BooleanField(default=False) # For admin approval
    
    def __str__(self):
        return f"{self.user.email} Profile"
