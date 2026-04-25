from django.db import models
from django.conf import settings

class RideType(models.Model):
    name = models.CharField(max_length=50) # Economy, Standard, etc.
    base_fare = models.DecimalField(max_digits=10, decimal_places=2)
    price_per_km = models.DecimalField(max_digits=10, decimal_places=2)
    icon = models.CharField(max_length=50, blank=True) # Icon name or path

    def __str__(self):
        return self.name

class Ride(models.Model):
    STATUS_CHOICES = (
        ('pending', 'Searching for Driver'),
        ('accepted', 'Driver Assigned'),
        ('arrived', 'Driver Arrived'),
        ('started', 'Trip Started'),
        ('completed', 'Trip Completed'),
        ('cancelled', 'Trip Cancelled'),
    )

    customer = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='rides_as_customer')
    driver = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, null=True, blank=True, related_name='rides_as_driver')
    ride_type = models.ForeignKey(RideType, on_delete=models.PROTECT)
    
    pickup_location = models.CharField(max_length=255)
    pickup_latitude = models.FloatField()
    pickup_longitude = models.FloatField()
    
    dropoff_location = models.CharField(max_length=255)
    dropoff_latitude = models.FloatField()
    dropoff_longitude = models.FloatField()
    
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')
    fare_estimate = models.DecimalField(max_digits=10, decimal_places=2)
    final_fare = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    is_cash_received = models.BooleanField(default=False)
    notes = models.TextField(blank=True)

    def __str__(self):
        return f"Ride {self.id} - {self.status}"

class Review(models.Model):
    ride = models.OneToOneField(Ride, on_delete=models.CASCADE)
    rating = models.IntegerField(choices=[(i, i) for i in range(1, 6)])
    comment = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Review for Ride {self.ride.id}"
