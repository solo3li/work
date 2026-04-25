from django.contrib import admin
from .models import RideType, Ride, Review

admin.site.register(RideType)
admin.site.register(Ride)
admin.site.register(Review)
