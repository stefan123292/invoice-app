# Invoice Management System

A full-stack invoice management application built with NestJS, React, TypeScript, and PostgreSQL.

## 🚀 Tech Stack

### Backend
- **NestJS** - Node.js framework with TypeScript
- **Prisma** - Database ORM
- **PostgreSQL** - Database (Dockerized)
- **JWT & Passport** - Authentication
- **Zod** - Schema validation
- **Docker** - Database containerization

### Frontend
- **React 18** - UI library
- **Vite** - Build tool
- **TypeScript** - Type safety
- **Redux Toolkit** - State management
- **React Query** - Server state management
- **React Router** - Client-side routing
- **Tailwind CSS** - Styling
- **Headless UI** - Unstyled UI components
- **React Hook Form + Zod** - Form handling and validation

## 📋 Features

- **Authentication**: JWT-based login system
- **Invoice Management**: View and manage invoices
- **Real-time Data**: React Query for efficient data fetching
- **Responsive Design**: Mobile-friendly interface
- **Type Safety**: End-to-end TypeScript
- **Form Validation**: Client and server-side validation
- **Modal Interface**: Detailed invoice views

## 🏗️ Project Structure

```
invoice-app/
├── client/                 # React frontend
│   ├── src/
│   │   ├── api/           # API client functions
│   │   ├── components/    # Reusable components
│   │   ├── hooks/         # Custom React hooks
│   │   ├── pages/         # Page components
│   │   ├── store/         # Redux store and slices
│   │   └── types/         # TypeScript type definitions
│   ├── package.json
│   └── ...
├── server/                 # NestJS backend
│   ├── src/
│   │   ├── auth/          # Authentication module
│   │   ├── common/        # Shared utilities
│   │   ├── invoices/      # Invoice module
│   │   └── users/         # User module
│   ├── prisma/            # Database schema and migrations
│   ├── package.json
│   └── ...
├── docker-compose.yml      # PostgreSQL database
└── package.json           # Root package.json with scripts
```

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- Docker and Docker Compose
- npm or yarn

### 1. Clone and Install Dependencies
```bash
git clone <repository-url>
cd invoice-app
npm run install:all
```

### 2. Start Database and Run Migrations
```bash
npm run db:setup
```
This command will:
- Start PostgreSQL in Docker
- Run database migrations
- Seed demo data

### 3. Start Development Servers
```bash
npm run dev
```
This will start both:
- Backend server on http://localhost:3001
- Frontend development server on http://localhost:5173

## 🔑 Demo Credentials

Use these credentials to log in:

**User 1:**
- Email: `demo@example.com`
- Password: `password123`

**User 2:**
- Email: `john@example.com`  
- Password: `password123`

## 📝 Available Scripts

### Root Level
- `npm run dev` - Start both frontend and backend in development mode
- `npm run build` - Build both frontend and backend for production
- `npm run start` - Start production server
- `npm run db:setup` - Setup database with migrations and seed data
- `npm run db:reset` - Reset database (careful!)
- `npm run install:all` - Install dependencies for all projects

### Backend (./server)
- `npm run start:dev` - Start backend in development mode
- `npm run build` - Build for production
- `npm run prisma:generate` - Generate Prisma client
- `npm run prisma:migrate` - Run database migrations
- `npm run prisma:seed` - Seed database with demo data

### Frontend (./client)
- `npm run dev` - Start Vite development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the `server` directory:

```env
# Database
DATABASE_URL="postgresql://postgres:password@localhost:5432/invoice_db?schema=public"

# JWT
JWT_SECRET="your-secret-key-change-in-production"
JWT_EXPIRES_IN="7d"

# Server
PORT=3001
```

### Database Configuration

The application uses PostgreSQL running in Docker. The database configuration is in `docker-compose.yml`:

```yaml
services:
  postgres:
    image: postgres:15-alpine
    environment:
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: password
      POSTGRES_DB: invoice_db
    ports:
      - "5432:5432"
```

## 🗄️ Database Schema

### User Model
- `id` - Unique identifier
- `email` - User email (unique)
- `password` - Hashed password
- `name` - User display name

### Invoice Model
- `id` - Unique identifier
- `vendorName` - Vendor/company name
- `amount` - Invoice amount
- `dueDate` - Payment due date
- `description` - Invoice description (optional)
- `paid` - Payment status boolean
- `userId` - Reference to user

## 🔒 Authentication

The application uses JWT (JSON Web Tokens) for authentication:

1. **Login**: POST `/api/auth/login` with email/password
2. **Token Storage**: JWT stored in localStorage
3. **Authorization**: Bearer token in Authorization header
4. **Auto-logout**: Automatic redirect on token expiration

## 📡 API Endpoints

### Authentication
- `POST /api/auth/login` - User login

### Invoices (Protected)
- `GET /api/invoices` - Get user's invoices
- `GET /api/invoices/:id` - Get specific invoice

## 🎨 UI/UX Features

- **Responsive Design**: Works on desktop and mobile
- **Loading States**: Skeleton loading and spinners
- **Error Handling**: User-friendly error messages
- **Modal Interface**: Clean invoice detail views
- **Status Indicators**: Visual paid/unpaid status
- **Currency Formatting**: Proper currency display
- **Date Formatting**: Human-readable dates

## 🧪 Testing

The project is set up for testing with:
- **Backend**: Jest (configured but tests not implemented)
- **Frontend**: Vitest (configured but tests not implemented)

## 🚀 Production Deployment

### Build for Production
```bash
npm run build
```

### Environment Setup
1. Set up PostgreSQL database
2. Configure environment variables
3. Run database migrations
4. Build and start the application

### Docker Deployment
The application can be containerized using Docker. Database is already configured with Docker Compose.

## 🛠️ Development

### Adding New Features
1. **Backend**: Create new modules in `server/src/`
2. **Frontend**: Add components in `client/src/components/`
3. **API**: Update API clients in `client/src/api/`
4. **Types**: Update TypeScript types in `client/src/types/`

### Database Changes
1. Update Prisma schema in `server/prisma/schema.prisma`
2. Generate migration: `npm run prisma:migrate`
3. Update seed data if needed

## 📚 Additional Notes

- **CORS**: Configured for development (localhost:5173)
- **Validation**: Both client and server-side validation with Zod
- **Error Handling**: Global error handling and user feedback
- **Performance**: React Query for efficient data fetching and caching
- **Security**: JWT tokens, password hashing, input validation

## 🐛 Troubleshooting

### Database Connection Issues
```bash
# Check if PostgreSQL is running
docker ps

# Restart database
docker-compose down
docker-compose up -d
```

### Port Conflicts
- Backend runs on port 3001
- Frontend runs on port 5173
- PostgreSQL runs on port 5432

### Clear Cache
```bash
# Frontend
cd client && rm -rf node_modules/.vite

# Backend  
cd server && rm -rf dist
```

## 📄 License

This project is licensed under the ISC License.
