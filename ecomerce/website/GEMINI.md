# LCwiki Luxury E-commerce Store

## Project Overview
A bespoke, high-end e-commerce platform for the **LCwiki** brand. Featuring a luxury aesthetic, robust security with email-based 2FA, and a full shopping experience.

## Main Technologies
- **Backend**: Django 5.0 (MVC)
- **Database**: SQLite
- **Authentication**: Custom User Model with:
    - Email Verification (6-digit code)
    - 2FA (6-digit code via email)
- **Email Service**: Gmail SMTP (`fps60y@gmail.com`)
- **Styling**: Luxury Minimalist Design using Playfair Display & Montserrat.

## Implemented Features
- [x] **Project Scaffolding**: Apps `accounts` and `shop`.
- [x] **Custom Auth System**: 
    - Registration with auto-email verification code.
    - Login with mandatory 2FA email code.
    - Secure session handling.
- [x] **Luxury Shop**:
    - Product Catalog with Categories.
    - Luxury Product Details.
    - Persistent Shopping Cart (Session-based).
- [x] **Ordering System**:
    - Checkout with shipping details.
    - Order summary and confirmation.
    - **Order Tracking**:
        - Order History dashboard for users.
        - Luxury Stepper UI (Placed -> Processing -> Shipped -> Delivered).
        - Detailed shipping and item breakdown.
- [x] **Professional Email System**:
    - Custom Luxury-styled HTML templates for all system communications.
    - Branded Verification & 2FA emails with gold-accented code boxes.
    - Multi-part email support (HTML with plain-text fallback).
- [x] **Admin Dashboard**: Fully configured for managing luxury items and orders.
- [x] **Cinematic Luxury UI**:
    - Modern minimalist design with glassmorphism effects.
    - Integrated **Animate.css** for cinematic entries.
    - Custom **Scroll-Reveal** system for products and sections.
    - Responsive hero section with high-resolution imagery.
- [x] **Expanded Catalog**: Initial seeds include Timepieces, Leather Goods, Fragrances, Eyewear, and High Jewelry.

## Building and Running
1. **Environment**:
   ```bash
   python -m venv venv
   .\venv\Scripts\activate
   pip install django pillow python-dotenv
   ```
2. **Setup**:
   - Ensure `.env` is present with `EMAIL_HOST_PASSWORD`.
   - `python manage.py migrate`
   - `python populate_shop.py` (optional: already done)
3. **Run**:
   ```bash
   python manage.py runserver
   ```
4. **Access**:
   - Store: `http://127.0.0.1:8000/`
   - Admin: `http://127.0.0.1:8000/admin/` (admin@lcwiki.com / adminpass)

## Development Conventions
- **UI**: Keep it minimalist. Use white, black, and gold (#D4AF37).
- **Security**: All authentication flows must use the codes sent to `fps60y@gmail.com`.
- **Database**: Use `shop` models for any new catalog items.
