# LCwiki Luxury E-commerce Store & Mobile App

## Project Overview
A bespoke, high-end e-commerce platform for the **LCwiki** brand. Featuring a luxury aesthetic, robust security with email-based 2FA, and a unified experience across Web and Mobile.

## Main Technologies
- **Backend**: Django 5.0 (MVC + REST API)
- **Mobile**: React Native (Expo) with Expo Router
- **Database**: SQLite
- **Authentication**: Custom User Model with:
    - Email Verification (6-digit code)
    - 2FA (6-digit code via email)
    - JWT for Mobile Authentication
- **Email Service**: Gmail SMTP (`fps60y@gmail.com`)
- **Styling**: Luxury Minimalist Design using Playfair Display & Montserrat.

## Implemented Features
- [x] **Project Scaffolding**: Apps `accounts` and `shop`.
- [x] **Custom Auth System**: 
    - Registration with auto-email verification code.
    - Login with mandatory 2FA email code.
    - Secure session handling (Web) and JWT (Mobile).
- [x] **Luxury Shop**:
    - Product Catalog with Categories.
    - Luxury Product Details.
    - Persistent Shopping Cart.
- [x] **Ordering System**:
    - Checkout with shipping details.
    - Order summary and confirmation.
    - **Order Tracking**:
        - Order History dashboard for users.
        - Luxury Stepper UI (Placed -> Processing -> Shipped -> Delivered).
- [x] **REST API Layer**:
    - Full API coverage for Mobile app compatibility.
    - JWT-protected endpoints for orders and profile.
    - CORS configured for cross-platform access.
- [x] **Mobile Experience**:
    - Cinematic native app with Reanimated transitions.
    - Secure storage for authentication tokens.
    - Native checkout flow and order tracking.

## Building and Running

### Backend (Web & API)
1. **Environment**:
   ```bash
   python -m venv venv
   .\venv\Scripts\activate
   pip install django pillow python-dotenv djangorestframework djangorestframework-simplejwt django-cors-headers
   ```
2. **Setup**:
   - Ensure `.env` is present with `EMAIL_HOST_PASSWORD`.
   - `python manage.py migrate`
3. **Run**:
   ```bash
   python manage.py runserver
   ```

### Mobile App
1. **Environment**:
   ```bash
   cd app
   npm install
   ```
2. **Run**:
   ```bash
   npx expo start
   ```
3. **Note**: For Android Emulator, the API points to `http://10.0.2.2:8000`. For physical devices, update `app/api/client.ts` with your local IP.

## API Endpoints
- `POST /api/accounts/register/`: Register new account
- `POST /api/accounts/verify-email/<id>/`: Verify email with code
- `POST /api/accounts/login/`: Login and get JWT (or 2FA challenge)
- `POST /api/accounts/verify-2fa/<id>/`: Verify 2FA code
- `GET /api/shop/products/`: List all products (supports `?category=slug`)
- `GET /api/shop/orders/`: List user orders (Auth required)

## Development Conventions
- **UI**: Keep it minimalist. Use white, black, and gold (#D4AF37).
- **Fonts**: Always use `Playfair Display` for headings and `Montserrat` for body/ui.
- **Mobile**: Use `LuxuryButton` and `LuxuryInput` components for consistency.
