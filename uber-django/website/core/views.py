from django.shortcuts import render, redirect
from django.contrib.auth.decorators import login_required

@login_required
def home_view(request):
    if not request.user.is_email_verified:
        return redirect('verify_otp')
    
    if request.user.user_type == 'driver':
        return render(request, 'core/driver_dashboard.html')
    elif request.user.user_type == 'admin':
        return render(request, 'core/admin_dashboard.html')
    else:
        return render(request, 'core/customer_home.html')
