# GEMINI.md - Project Context: UIS (University Interface System)

This document provides essential context and instructions for the UIS project, a platform connecting students with service executors for university-related tasks.

## 🚀 Project Overview
UIS is a multi-role platform (Student and Executor) designed for university services. It includes a mobile application for users and a backend API for management and data persistence.

- **Frontend:** A cross-platform mobile application built with **Expo (React Native)**.
- **Backend:** (Planned) An **ASP.NET Core Web API** using **PostgreSQL** and **SignalR**.
- **Admin Panel:** (Planned) Integrated into the ASP.NET Core project for platform management.

## 📂 Directory Structure
- `/UIS`: The Expo mobile application source code.
  - `/UIS/app`: Uses Expo Router for file-based navigation.
    - `/(auth)`: Login, Register, OTP, Forgot Password.
    - `/student`: Student-specific layouts and screens.
    - `/executor`: Executor-specific layouts and screens.
    - `/shared`: Shared screens (Chat, Orders details, Support tickets, Settings).
  - `/UIS/context`: React Context for state management (AuthContext).
- `/server`: The ASP.NET Core backend source code (currently empty).
- `prd.txt`: Detailed Product Requirements Document (in Arabic).

## 🛠️ Tech Stack
### Frontend (Mobile)
- **Framework:** Expo (SDK 54) / React Native
- **Routing:** Expo Router (File-based navigation)
- **Language:** TypeScript
- **Styling/UI:** Vanilla React Native `StyleSheet`, `expo-linear-gradient`, `expo-blur`.
- **Animations:** `react-native-reanimated`.
- **Icons:** `@expo/vector-icons` (Ionicons).

### Backend (Planned per `prd.txt`)
- **Framework:** ASP.NET Core Web API
- **Database:** PostgreSQL with Entity Framework Core
- **Real-time:** SignalR (for Chat and Notifications)
- **Payments:** Paymob Integration
- **Auth:** JWT with OTP verification (Email-based)

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
- **TODO:** Initialize the ASP.NET Core project. The `prd.txt` outlines the required controllers and services.

## 📐 Development Conventions
- **Routing:** Use file-based routing in `UIS/app/`. Group authenticated routes in `(auth)` and tab-based navigation in `(tabs)`.
- **Styling:** Centralize colors in `UIS/constants/Colors.ts`.
- **Roles:** Implement Role-Based Access Control (RBAC) within a single app instance as per the PRD.
- **Language:** The UI is primarily in Arabic, catering to the target audience.

## 📋 Key Features (from PRD)
- **Student Role:** Browse services, create orders, chat with executors, pay via Paymob, track order status.
- **Executor Role:** KYC submission, browse available orders, execute and deliver files, manage earnings.
- **Common:** Authentication (Login/Register/OTP), Direct & Order Chat, Support Tickets.

## 🛑 Important Notes
- **Do not create two separate apps.** Use a single Role-Based Expo app.
- **Monolith First:** Start with a clean Monolith architecture for the backend before considering Microservices.
- **Security:** Use JWT for authentication and HMAC for payment validation.
