# Invoice Management - Frontend

React frontend application for invoice management system.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 🏗️ Tech Stack

- **React 18** - UI library
- **Vite** - Build tool & dev server
- **TypeScript** - Type safety
- **Redux Toolkit** - State management
- **React Query** - Server state & caching
- **React Router** - Client-side routing
- **Tailwind CSS** - Styling
- **Zod** - Form validation
- **Axios** - HTTP client

## 📁 Project Structure

```
client/
├── src/
│   ├── api/           # API client functions
│   ├── components/    # Reusable components
│   │   └── ui/        # Base UI components
│   ├── hooks/         # Custom React hooks
│   ├── pages/         # Page components
│   ├── store/         # Redux store & slices
│   ├── styles/        # CSS modules & styles
│   └── types/         # TypeScript definitions
├── public/
└── package.json
```

## 🎨 Features

- **Authentication** - Login/logout with JWT
- **Invoice Management** - View and manage invoices
- **Responsive Design** - Mobile-friendly interface
- **Real-time Data** - React Query for efficient fetching
- **Form Validation** - Client-side validation with Zod
- **Modal Interface** - Detailed invoice views

## 🔧 Development

### Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start Vite dev server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |

### Environment

- **Development**: `http://localhost:5173`
- **API Base URL**: `http://localhost:3001/api`

## 🎯 Key Components

- **Login** - Authentication page
- **Invoices** - Dashboard with invoice list
- **InvoiceTable** - Data table component
- **InvoiceModal** - Detail view modal
- **ProtectedRoute** - Route protection

## 📱 Responsive Design

- Mobile-first approach
- Breakpoints: 480px, 768px, 1024px
- Touch-friendly interface
- Optimized for all screen sizes