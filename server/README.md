# Invoice Management - Backend

NestJS backend API for invoice management system.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run start:dev

# Build for production
npm run build

# Start production server
npm run start:prod
```

## 🏗️ Tech Stack

- **NestJS** - Node.js framework
- **TypeScript** - Type safety
- **Prisma** - Database ORM
- **PostgreSQL** - Database
- **JWT** - Authentication
- **Passport** - Auth strategies
- **class-validator** - DTO validation
- **bcryptjs** - Password hashing

## 📁 Project Structure

```
server/
├── src/
│   ├── auth/          # Authentication module
│   ├── invoices/      # Invoice management
│   ├── users/         # User management
│   ├── common/        # Shared utilities
│   │   └── prisma/    # Database service
│   └── main.ts        # Application entry
├── prisma/            # Database schema & migrations
└── package.json
```

## 🗄️ Database

### Prisma Schema
- **User** - User accounts with authentication
- **Invoice** - Invoice records linked to users

### Database Commands

```bash
# Generate Prisma client
npm run prisma:generate

# Run migrations
npm run prisma:migrate

# Seed database
npm run prisma:seed

# Reset database
npm run db:reset
```

## 🔗 API Endpoints

### Authentication
- `POST /api/auth/login` - User login

### Invoices (Protected)
- `GET /api/invoices` - Get user's invoices
- `GET /api/invoices/:id` - Get specific invoice

## 🔧 Development

### Available Scripts

| Command | Description |
|---------|-------------|
| `npm run start:dev` | Start with hot reload |
| `npm run build` | Build for production |
| `npm run start:prod` | Start production server |
| `npm run lint` | Run ESLint |
| `npm run test` | Run tests |

### Environment Variables

Create `.env` file:

```env
DATABASE_URL="postgresql://postgres:password@localhost:5432/invoice_db"
JWT_SECRET="your-secret-key"
JWT_EXPIRES_IN="7d"
PORT=3001
```

## 🔒 Security

- JWT authentication
- Password hashing with bcrypt
- Input validation with class-validator
- CORS configuration
- Protected routes with guards

## 📊 Features

- **User Management** - Registration and authentication
- **Invoice CRUD** - Create, read, update, delete invoices
- **Data Validation** - Server-side validation
- **Error Handling** - Global exception handling
- **Database Relations** - User-Invoice relationships
