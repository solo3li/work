import random
from django.shortcuts import render, redirect
from django.contrib.auth import login, authenticate, logout
from django.contrib.auth.decorators import login_required
from django.core.mail import send_mail
from django.conf import settings
from .models import User, UserProfile
from .forms import RegisterForm, LoginForm, OTPVerifyForm

from django.template.loader import render_to_string
from django.utils.html import strip_tags
from django.core.mail import EmailMultiAlternatives

def send_otp_email(user):
    otp = str(random.randint(100000, 999999))
    user.verification_otp = otp
    user.save()
    
    subject = 'Verify your Metallic Taxi Account'
    html_content = render_to_string('emails/otp_email.html', {'otp': otp})
    text_content = strip_tags(html_content)
    
    email = EmailMultiAlternatives(
        subject,
        text_content,
        settings.DEFAULT_FROM_EMAIL,
        [user.email]
    )
    email.attach_alternative(html_content, "text/html")
    email.send()

def register_view(request):
    if request.method == 'POST':
        form = RegisterForm(request.POST)
        if form.is_valid():
            user = form.save(commit=False)
            user.is_active = True # We use is_email_verified for access control
            user.save()
            UserProfile.objects.create(user=user)
            send_otp_email(user)
            request.session['verify_email'] = user.email
            return redirect('verify_otp')
    else:
        form = RegisterForm()
    return render(request, 'accounts/register.html', {'form': form})

def verify_otp_view(request):
    email = request.session.get('verify_email')
    if not email:
        return redirect('register')
    
    if request.method == 'POST':
        form = OTPVerifyForm(request.POST)
        if form.is_valid():
            otp = form.cleaned_data.get('otp')
            user = User.objects.filter(email=email, verification_otp=otp).first()
            if user:
                user.is_email_verified = True
                user.verification_otp = None
                user.save()
                login(request, user)
                del request.session['verify_email']
                return redirect('home')
            else:
                form.add_error('otp', 'Invalid OTP')
    else:
        form = OTPVerifyForm()
    return render(request, 'accounts/verify_otp.html', {'form': form})

def login_view(request):
    if request.method == 'POST':
        form = LoginForm(request.POST)
        if form.is_valid():
            email = form.cleaned_data.get('email')
            password = form.cleaned_data.get('password')
            user = authenticate(request, email=email, password=password)
            if user:
                if not user.is_email_verified:
                    send_otp_email(user)
                    request.session['verify_email'] = user.email
                    return redirect('verify_otp')
                login(request, user)
                return redirect('home')
            else:
                form.add_error(None, 'Invalid email or password')
    else:
        form = LoginForm()
    return render(request, 'accounts/login.html', {'form': form})

def logout_view(request):
    logout(request)
    return redirect('login')

@login_required
def profile_view(request):
    profile, created = UserProfile.objects.get_or_create(user=request.user)
    return render(request, 'accounts/profile.html', {'profile': profile})
