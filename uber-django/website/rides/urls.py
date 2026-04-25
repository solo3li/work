from django.urls import path
from . import views

urlpatterns = [
    path('requests/', views.ride_request_view, name='ride_requests'),
    path('trip/<int:ride_id>/', views.trip_screen_view, name='trip_screen'),
    path('history/', views.ride_history_view, name='ride_history'),
]
