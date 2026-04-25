# Metallic Taxi - Project Overview

A modern, metallic-styled taxi application built with Django, Channels, and Daphne. This project focuses on **Cash-Only** transactions and **Email-Only Authentication**.

## Tech Stack
- **Backend:** Django 6.x (MVT)
- **Real-time:** Django Channels + Daphne
- **Database:** SQLite (Development)
- **Frontend:** Vanilla CSS (Metalic Modern Style) + Leaflet.js (Maps)
- **Auth:** Custom User Model (Email as primary key) + OTP Verification

## Current Implementation
1.  **Accounts:**
    - Custom User model with email authentication.
    - User profiles for Customers and Drivers.
    - Registration with OTP verification (via SMTP).
    - Profile management.
2.  **Rides:**
    - Models for RideTypes, Rides, and Reviews.
    - Ride history and trip screens.
    - Available requests queue for drivers.
3.  **Core:**
    - Role-based dashboards (Customer, Driver, Admin).
    - Interactive map integration.
4.  **UI/UX:**
    - Metallic theme with dark gradients and glossy buttons.
    - Responsive navigation bar with quick access to Profile and History.

## Seed Data
Run the following to populate initial ride types and sample users:
```powershell
python seed.py
```
- **Admin:** `admin@taxi.com` / `admin123`
- **Driver:** `driver@taxi.com` / `driver123`
- **Customer:** `customer@taxi.com` / `customer123`

## Prerequisites
- Python 3.13+
- Virtual Environment (`venv`)

## Getting Started

### 1. Setup Virtual Environment
```powershell
python -m venv venv
.\venv\Scripts\Activate.ps1
pip install -r requirements.txt
```

### 2. Configure Environment
Create a `.env` file in the root directory:
```env
DEBUG=True
SECRET_KEY=your-secret-key
DATABASE_URL=sqlite:///db.sqlite3
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USE_TLS=True
EMAIL_HOST_USER=your-email@gmail.com
EMAIL_HOST_PASSWORD=your-app-password
DEFAULT_FROM_EMAIL=your-email@gmail.com
```

### 3. Database Migrations & Seed
```powershell
python manage.py migrate
python seed.py
```

### 4. Run the Server
```powershell
python manage.py runserver
```

## Admin Access
- **URL:** `/admin/`
