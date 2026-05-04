# E-commerce Project

## Project Overview
This is a modern full-stack e-commerce project separated into a mobile/web frontend (`app`) and a backend server (`server`).
- **Frontend (`app`)**: Built with Expo and React Native, utilizing `expo-router` for navigation. It currently uses dummy data but is architected with contexts (`AuthContext`, `CartContext`) to easily integrate with the backend.
- **Backend (`server`)**: Built with ASP.NET Core. It includes an MVC-based Admin Panel UI and a Hot Chocolate GraphQL API. Data is persisted using Entity Framework Core with an SQLite database. Simple cookie-based authentication is implemented for the Admin Panel.

## Directory Structure

### `app/` (Frontend)
Contains the main React Native application routing and screens.
*   **`_layout.tsx`**: The root layout, wrapping the app with `AuthProvider` and `CartProvider`.
*   **`(tabs)/`**: Bottom tab navigation (`index.tsx`, `categories.tsx`, `cart.tsx`, `profile.tsx`).
*   **`orders.tsx`**: Screen showing past orders.
*   **`context/`**: React Contexts for global state management (`AuthContext`, `CartContext`).
*   **`data/dummy.ts`**: Contains dummy data and TypeScript models (`Product`, `Category`, `User`, `Order`) until the GraphQL integration is complete.

### `server/` (Backend)
Contains the ASP.NET Core backend server.
*   **`Controllers/`**: MVC controllers for the Admin Panel (e.g., Auth, Products, Categories, Users, Orders).
*   **`Models/`**: Entity Framework Core domain models.
*   **`Views/`**: Razor views for the MVC Admin Panel UI.
*   **`Data/`**: Contains the `AppDbContext` for SQLite interaction.
*   **`GraphQL/`**: Contains Hot Chocolate GraphQL Query and Mutation definitions.
*   **`app.db`**: The SQLite database file.

## Building and Running

### Frontend (`app/`)
Navigate to the `app` directory (`cd app`):
*   **Start the server:** `npm start` or `npx expo start`
*   **Run on Android:** `npm run android`
*   **Run on iOS:** `npm run ios`
*   **Run on Web:** `npm run web`

### Backend (`server/`)
Navigate to the `server` directory (`cd server`):
*   **Build the server:** `dotnet build`
*   **Run the server:** `dotnet run`
    *   The Admin Panel will be available at `http://localhost:<port>/`
    *   The GraphQL API endpoint will be available at `http://localhost:<port>/graphql/`
*   **Database Migrations:** If modifying models, run `dotnet ef migrations add <Name>` followed by `dotnet ef database update`.
    *   *Default Admin credentials:* Username: `admin`, Password: `admin`

## Development Conventions
*   **Frontend**: Follow `expo-router` file-based routing conventions. Maintain clean React components and utilize `@expo/vector-icons`. Global state and API logic must be routed through the `Zustand` store (`app/store/useStore.ts`) utilizing `graphql-request`.
*   **Backend**: 
    *   Use MVC for any Admin UI enhancements. Ensure sensitive routes have the `[Authorize]` attribute.
    *   Extend the `Query` class in the `GraphQL` folder when exposing new data via the API.
    *   Use Entity Framework Core for all database interactions.
