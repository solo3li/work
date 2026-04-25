from django.shortcuts import render, redirect
from django.contrib.auth import login, authenticate, logout
from django.core.mail import EmailMultiAlternatives
from django.template.loader import render_to_string
from django.utils.html import strip_tags
from django.conf import settings
from .models import User
from django.contrib import messages
from django.contrib.auth.decorators import login_required

def register(request):
    if request.method == 'POST':
        email = request.POST.get('email')
        password = request.POST.get('password')
        username = email.split('@')[0]
        
        if User.objects.filter(email=email).exists():
            messages.error(request, 'Email already exists.')
            return render(request, 'accounts/register.html')
            
        user = User.objects.create_user(email=email, password=password, username=username)
        code = user.generate_verification_code()
        
        # Send Professional HTML Email
        subject = 'Verify your LCWIKI account'
        html_content = render_to_string('emails/verification_email.html', {'code': code})
        text_content = strip_tags(html_content)
        
        email_msg = EmailMultiAlternatives(subject, text_content, settings.DEFAULT_FROM_EMAIL, [email])
        email_msg.attach_alternative(html_content, "text/html")
        email_msg.send()
        
        request.session['unverified_user_id'] = user.id
        return redirect('verify_email')
        
    return render(request, 'accounts/register.html')

def verify_email(request):
    user_id = request.session.get('unverified_user_id')
    if not user_id:
        return redirect('register')
        
    if request.method == 'POST':
        code = request.POST.get('code')
        try:
            user = User.objects.get(id=user_id)
            if user.email_verification_code == code:
                user.is_email_verified = True
                user.email_verification_code = None
                user.save()
                messages.success(request, 'Email verified successfully. Please login.')
                return redirect('login')
            else:
                messages.error(request, 'Invalid code.')
        except User.DoesNotExist:
            return redirect('register')
            
    return render(request, 'accounts/verify_email.html')

def user_login(request):
    if request.method == 'POST':
        email = request.POST.get('email')
        password = request.POST.get('password')
        user = authenticate(request, email=email, password=password)
        
        if user:
            if not user.is_email_verified:
                code = user.generate_verification_code()
                subject = 'Verify your LCWIKI account'
                html_content = render_to_string('emails/verification_email.html', {'code': code})
                text_content = strip_tags(html_content)
                
                email_msg = EmailMultiAlternatives(subject, text_content, settings.DEFAULT_FROM_EMAIL, [email])
                email_msg.attach_alternative(html_content, "text/html")
                email_msg.send()
                
                request.session['unverified_user_id'] = user.id
                return redirect('verify_email')
                
            if user.is_2fa_enabled:
                code = user.generate_2fa_code()
                subject = 'LCWIKI Login 2FA Code'
                html_content = render_to_string('emails/2fa_email.html', {'code': code})
                text_content = strip_tags(html_content)
                
                email_msg = EmailMultiAlternatives(subject, text_content, settings.DEFAULT_FROM_EMAIL, [email])
                email_msg.attach_alternative(html_content, "text/html")
                email_msg.send()
                
                request.session['2fa_user_id'] = user.id
                return redirect('verify_2fa')
            
            login(request, user)
            return redirect('home')
        else:
            messages.error(request, 'Invalid credentials.')
            
    return render(request, 'accounts/login.html')

def verify_2fa(request):
    user_id = request.session.get('2fa_user_id')
    if not user_id:
        return redirect('login')
        
    if request.method == 'POST':
        code = request.POST.get('code')
        try:
            user = User.objects.get(id=user_id)
            if user.two_factor_code == code:
                user.two_factor_code = None
                user.save()
                login(request, user)
                del request.session['2fa_user_id']
                return redirect('home')
            else:
                messages.error(request, 'Invalid 2FA code.')
        except User.DoesNotExist:
            return redirect('login')
            
    return render(request, 'accounts/verify_2fa.html')

def user_logout(request):
    logout(request)
    return redirect('login')
