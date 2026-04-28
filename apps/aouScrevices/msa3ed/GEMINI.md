# GEMINI.md - Project Context: UIS (University Interface System)

This document provides essential context and instructions for the UIS project, a platform connecting students with service executors for university-related tasks.

## 🚀 Project Overview
UIS is a multi-role platform (Student and Executor) designed for university services. It includes a mobile application for users and a backend API for management and data persistence.

- **Frontend:** A cross-platform mobile application built with **Expo (React Native)**.
- **Backend:** A functional **ASP.NET Core 10.0 Web API** using **PostgreSQL** and **SignalR**.
- **Admin Panel:** An MVC application integrated into the ASP.NET Core project for platform management.

## 📂 Directory Structure
- `/UIS`: The Expo mobile application source code.
  - `/UIS/app`: Uses Expo Router for file-based navigation.
    - `/(auth)`: Login, Register, OTP, Forgot Password.
    - `/student`: Student-specific layouts and screens.
    - `/executor`: Executor-specific layouts and screens.
    - `/shared`: Shared screens (Chat, Orders details, Support tickets, Settings).
  - `/UIS/context`: React Context for state management (AuthContext).
- `/server`: The ASP.NET Core backend source code.
  - `/server/Controllers`: API Controllers (Users, Services, Orders, etc.) and MVC `AdminController`.
  - `/server/Services`: Business logic and data access (EF Core).
  - `/server/Models`: Entity Framework Data Models.
  - `/server/DTOs`: Data Transfer Objects for API requests/responses.
  - `/server/Views`: Razor Views for the Admin Dashboard.
  - `/server/Hubs`: SignalR real-time hubs (`ChatHub`).
- `prd.txt`: Detailed Product Requirements Document (in Arabic).

## 🛠️ Tech Stack
### Frontend (Mobile)
- **Framework:** Expo (SDK 54) / React Native
- **Routing:** Expo Router (File-based navigation)
- **Language:** TypeScript
- **Styling/UI:** Vanilla React Native `StyleSheet`, `expo-linear-gradient`, `expo-blur`.
- **Animations:** `react-native-reanimated`.
- **Icons:** `@expo/vector-icons` (Ionicons).

### Backend
- **Framework:** ASP.NET Core 10.0 (Web API + MVC)
- **Database:** PostgreSQL with Entity Framework Core 10
- **Real-time:** SignalR (for Chat)
- **Auth:** JWT with Email-based OTP logic
- **Containerization:** Docker & Docker Compose

## 🏃 Getting Started

### Frontend (UIS)
1. Navigate to the `UIS` directory:
   ```bash
   cd UIS
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npx expo start
   ```

**Current State:**
All screens for both Student and Executor roles have been implemented according to the PRD using static dummy data. Navigation between screens is fully functional for the MVP showcase.

### Backend (server)
1. Navigate to the `server` directory:
   ```bash
   cd server
   ```
2. Start the PostgreSQL database via Docker:
   ```bash
   docker-compose up -d
   ```
3. Run Entity Framework Core migrations (ensure `dotnet-ef` tool is installed):
   ```bash
   dotnet ef migrations add InitialCreate
   dotnet ef database update
   ```
4. Start the ASP.NET Core API and Admin Panel:
   ```bash
   dotnet run
   ```
   *The server will start (default is typically `http://localhost:5035` or `http://localhost:5000`).*

**🔑 Default Credentials & URLs:**
- **Admin Panel URL:** `http://localhost:5035/Admin`
- **Admin Account:** `admin@uis.com`
- **Admin Password:** `admin123`
*(Note: Roles for `Student` and `Executor` are also pre-seeded).*

**Current State:**
- The ASP.NET Core Web API + MVC project is fully implemented.
- `docker-compose.yml` is set up with PostgreSQL and pgAdmin.
- `Dockerfile` is ready for deployment.
- Entity Framework Core models (`User`, `Role`, `Permission`, `Order`, `Service`, `Chat`, `Ticket`, `KycRequest`, etc.) are mapped and seeded with comprehensive dummy data.
- JWT Authentication, Email-based OTP, and SignalR (`ChatHub`) are configured.
- The Admin Panel (MVC) is fully functional with dashboards, user management, order tracking, KYC approvals, and role/permission management.
- The Web API endpoints are complete for the mobile application.

## 📐 Development Conventions
- **Routing:** Use file-based routing in `UIS/app/`. Group authenticated routes in `(auth)` and tab-based navigation in `(tabs)`.
- **Roles & Permissions:** Users are registered as Students by default. If they want to switch to an Executor, they must verify their KYC first. The `isExecutor` boolean flag (defaulting to `false`) in the User model and `AuthContext` dictates access to Executor features. Once KYC is approved, they gain access to Executor tabs alongside Student features.
- **Styling:** Centralize colors in `UIS/constants/Colors.ts`.
- **Language:** The UI is primarily in Arabic, catering to the target audience.

## 📋 Key Features (from PRD)
- **Student Role:** Browse services, create orders, chat with executors, pay via Paymob, track order status.
- **Executor Role:** KYC submission, browse available orders, execute and deliver files, manage earnings.
- **Common:** Authentication (Login/Register/OTP), Direct & Order Chat, Support Tickets.

## 🛑 Important Notes
- **Do not create two separate apps.** Use a single Role-Based Expo app.
- **Monolith First:** Start with a clean Monolith architecture for the backend before considering Microservices.
- **Security:** Use JWT for authentication and HMAC for payment validation.
