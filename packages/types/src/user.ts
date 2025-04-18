export type UserRole = 'admin' | 'farmer' | 'customer';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  farmName?: string;
  address?: string;
  phoneNumber?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface AuthResponse {
  user: User;
  token: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials {
  name: string;
  email: string;
  password: string;
  role: UserRole;
  farmName?: string;
  address?: string;
  phoneNumber?: string;
} 