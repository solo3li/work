# inDriver Clone (Expo + Redux Toolkit + OpenStreetMap)

## Project Overview
A comprehensive inDriver clone built with React Native (Expo). This application features a bidding system where passengers can offer a price and drivers can counter or accept. It uses OpenStreetMap for mapping and Redux Toolkit for state management.

### Key Technologies
- **Framework:** Expo (React Native)
- **State Management:** Redux Toolkit
- **Mapping:** OpenStreetMap via `react-native-maps`
- **Icons:** Lucide React Native
- **Navigation:** React Navigation (Native Stack)

## Project Structure
- `src/store`: Redux store configuration and slices (`authSlice`, `rideSlice`).
- `src/screens`: UI screens including Login, SignUp, and Home (Map).
- `src/navigation`: App navigation logic with auth flow.
- `src/constants`: Dummy data for rides and user roles.

## Features
- **Modern Auth Flow:** Clean Login and SignUp screens.
- **Role Switching:** Toggle between Passenger and Driver modes.
- **OSM Mapping:** OpenStreetMap tiles integration with custom markers.
- **Bidding UI:** Bottom-sheet interface for ride requests and offers.

## Building and Running

### Prerequisites
- Node.js installed
- Expo Go app on your mobile device (to test)

### Setup
1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm start
   ```

3. Open the app:
   - Scan the QR code with the Expo Go app (Android) or Camera app (iOS).
   - Press `w` to run on web.

## Development Conventions
- **State:** Use Redux Toolkit for all global states (Auth, Rides).
- **Styling:** Use standard `StyleSheet` with modern design principles (flexbox, consistent padding, rounded corners).
- **Components:** Functional components with Hooks.
