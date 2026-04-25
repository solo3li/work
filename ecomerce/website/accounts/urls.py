from django.urls import path
from . import views

urlpatterns = [
    path('register/', views.register, name='register'),
    path('login/', views.user_login, name='login'),
    path('logout/', views.user_logout, name='logout'),
    path('verify-email/', views.verify_email, name='verify_email'),
    path('verify-2fa/', views.verify_2fa, name='verify_2fa'),
]
