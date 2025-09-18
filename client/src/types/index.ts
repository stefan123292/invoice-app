export interface User {
  id: string;
  email: string;
  name: string;
}

export interface Invoice {
  id: string;
  vendorName: string;
  amount: number;
  dueDate: string;
  description?: string;
  paid: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  access_token: string;
  user: User;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
}