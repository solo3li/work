import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'taxi_website.settings')
django.setup()

from rides.models import RideType
from accounts.models import User

def seed_data():
    # 1. Create Ride Types
    ride_types = [
        {'name': 'Economy', 'base_fare': 5.00, 'price_per_km': 1.50, 'icon': 'fa-car'},
        {'name': 'Standard', 'base_fare': 8.00, 'price_per_km': 2.00, 'icon': 'fa-car-side'},
        {'name': 'Premium', 'base_fare': 15.00, 'price_per_km': 3.50, 'icon': 'fa-gem'},
        {'name': 'XL', 'base_fare': 12.00, 'price_per_km': 2.50, 'icon': 'fa-suv'},
        {'name': 'Bike', 'base_fare': 3.00, 'price_per_km': 0.80, 'icon': 'fa-motorcycle'},
    ]

    for rt in ride_types:
        RideType.objects.get_or_create(
            name=rt['name'],
            defaults={
                'base_fare': rt['base_fare'],
                'price_per_km': rt['price_per_km'],
                'icon': rt['icon']
            }
        )
    print("Ride types seeded.")

    # 2. Create sample Driver
    driver_email = 'driver@taxi.com'
    if not User.objects.filter(email=driver_email).exists():
        driver = User.objects.create_user(
            email=driver_email,
            password='driver123',
            user_type='driver',
            is_email_verified=True
        )
        print(f"Sample driver created: {driver_email} / driver123")

    # 3. Create sample Customer
    customer_email = 'customer@taxi.com'
    if not User.objects.filter(email=customer_email).exists():
        customer = User.objects.create_user(
            email=customer_email,
            password='customer123',
            user_type='customer',
            is_email_verified=True
        )
        print(f"Sample customer created: {customer_email} / customer123")

if __name__ == '__main__':
    seed_data()
