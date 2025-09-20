# Invoice Management System

A full-stack invoice management application built with NestJS, React, TypeScript, and PostgreSQL.

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- Docker & Docker Compose
- npm or yarn

### Installation & Setup

```bash
# Clone repository
git clone <repository-url>
cd invoice-app

# Install all dependencies
npm run install:all

# Start database and run migrations
npm run db:setup

# Start development servers
npm run dev
```

### Demo Credentials
- **Email**: `demo@example.com`
- **Password**: `password123`

## 📁 Project Structure

```
invoice-app/
├── client/          # React frontend (Vite + TypeScript)
├── server/          # NestJS backend (TypeScript)
├── docker-compose.yml
└── package.json     # Root scripts
```

## 🛠️ Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start both frontend and backend |
| `npm run build` | Build both applications |
| `npm run start` | Start production server |
| `npm run db:setup` | Setup database with seed data |
| `npm run install:all` | Install all dependencies |

## 🏗️ Tech Stack

### Backend
- **NestJS** - Node.js framework
- **Prisma** - Database ORM
- **PostgreSQL** - Database (Docker)
- **JWT** - Authentication
- **class-validator** - Validation

### Frontend
- **React 18** - UI library
- **Vite** - Build tool
- **TypeScript** - Type safety
- **Redux Toolkit** - State management
- **React Query** - Server state
- **Tailwind CSS** - Styling
- **Zod** - Form validation

## 🔗 API Endpoints

### Authentication
- `POST /api/auth/login` - User login

### Invoices (Protected)
- `GET /api/invoices` - Get user's invoices
- `GET /api/invoices/:id` - Get specific invoice

## 🚀 Production

```bash
# Build applications
npm run build

# Start production server
npm run start
```

## 📄 License

ISC License