// 🔐 Auth Types for PharmaHub

// Tipos de roles según el Role Mapping Guide
export type UserRole =
  | 'super_admin'
  | 'admin'
  | 'system_admin'
  | 'customer_manager'
  | 'sales_operator'
  | 'pharmacist'
  | 'assistant'
  | 'basic_user';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  organizationId: string;
  businessId: string;
  branchId?: string;
  isActive: boolean;
  phone?: string;
  avatar?: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  password: string;
  confirmPassword: string;
  name: string;
  phone?: string;
  businessId: string;
  invitationToken?: string;
}

export interface OTPVerification {
  email: string;
  code: string;
}

export interface ForgotPasswordData {
  email: string;
}

export interface ResetPasswordData {
  email: string;
  code: string;
  newPassword: string;
  confirmPassword: string;
}

export interface InviteUserData {
  email: string;
  name: string;
  role: UserRole;
  businessId: string;
  phone?: string;
  message?: string;
}

// Response types
export interface AuthResponse {
  user: User;
  tokens?: {
    accessToken: string;
    idToken: string;
    refreshToken: string;
  };
  message: string;
}

export interface ApiError {
  error: string;
  message?: string;
  statusCode: number;
}
