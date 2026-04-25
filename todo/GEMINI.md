# Funny Todo App (Django MVT)

A modern, "funny" Todo application built with Django.

## Project Overview

- **Backend**: Django (MVT)
- **Frontend**: Vanilla HTML/CSS + SortableJS for drag-and-drop.
- **Style**: "Funny Modern" with Fredoka One font, vibrant colors, and dark mode support.
- **Features**:
    - Email-based authentication with 6-digit verification codes.
    - Task management with priorities, due dates, and categories.
    - Search and filtering.
    - Drag-and-drop reordering.
    - Notifications (success/info messages).
    - Dark mode.

## Building and Running

1.  **Environment**:
    - Python 3.x
    - Virtual environment (`venv`) is already set up.

2.  **Setup**:
    ```bash
    # Activate venv (Windows)
    .\venv\Scripts\activate
    
    # Install dependencies (if not already)
    pip install -r requirements.txt
    
    # Run migrations
    python manage.py migrate
    ```

3.  **Running**:
    ```bash
    python manage.py runserver
    ```

4.  **Credentials**:
    - Email credentials are stored in `.env`.
    - Verification codes are sent via SMTP (Gmail).

## Development Conventions

- Use the `Profile` model to check if a user is verified.
- Add "funny" messages to the `messages` framework when performing actions.
- Keep the `Fredoka One` font for headers to maintain the "funny" vibe.

## TODOs
- [ ] Implement subtask UI.
- [ ] Add more "funny" animations.
- [ ] Implement actual push notifications (using a service or browser API).
