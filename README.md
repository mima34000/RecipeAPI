# RecipeAPI 🍳

A fullstack recipe manager application built solo as a school project.

## Tech Stack

- **Backend:** ASP.NET Core Web API (.NET 9.0)
- **Database:** SQL Server Express + Entity Framework Core
- **Authentication:** JWT (JSON Web Tokens)
- **Frontend:** React (Vite)

## Features

- Browse all recipes with search and category filter
- User registration and login with JWT authentication
- Two roles: User and Admin
- Logged in users can create, edit and delete their own recipes
- Save recipes to favorites
- Admin panel to manage all recipes
- Responsive design for desktop and mobile

## How to Run

### Backend (ASP.NET Core Web API)

1. Clone the repository
2. Open `RecipeAPI.sln` in Visual Studio 2022
3. Update the connection string in `appsettings.json` if needed
4. Open Package Manager Console and run:

5. Press F5 to run the API
6. Swagger UI opens at `https://localhost:7288/swagger`

### Frontend (React)

1. Open terminal and navigate to the frontend folder:
2. Install dependencies:
3. Start the development server:
4. Open `http://localhost:5173` in your browser

## Default Admin Account

- **Email:** admin@recipe.com
- **Password:** Admin123!

## Project Structure
RecipeAPI/
├── Controllers/        # API endpoints
├── Data/              # Database context
├── DTOs/              # Data transfer objects
├── Migrations/        # EF Core migrations
├── Models/            # Entity models
├── Services/          # Business logic
└── recipe-frontend/   # React frontend
├── src/
│   ├── components/ # Reusable components
│   ├── pages/      # Page components
│   ├── services/   # API calls
│   └── styles/     # CSS files

## Author

Mirjana Ristic - NBI Handelsakademin, Göteborg


