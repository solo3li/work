from django.shortcuts import render, get_object_or_404, redirect
from django.contrib.auth.decorators import login_required
from .models import Ride, RideType

@login_required
def ride_request_view(request):
    # For drivers to see requests
    if request.user.user_type != 'driver':
        return redirect('home')
    requests = Ride.objects.filter(status='pending')
    return render(request, 'rides/requests.html', {'requests': requests})

@login_required
def trip_screen_view(request, ride_id):
    ride = get_object_or_404(Ride, id=ride_id)
    return render(request, 'rides/trip_screen.html', {'ride': ride})

@login_required
def ride_history_view(request):
    if request.user.user_type == 'driver':
        rides = Ride.objects.filter(driver=request.user)
    else:
        rides = Ride.objects.filter(customer=request.user)
    return render(request, 'rides/history.html', {'rides': rides})
