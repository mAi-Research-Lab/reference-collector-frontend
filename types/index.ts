import React from 'react';

// User Type Constants
export const USER_TYPES = {
  INDIVIDUAL: 'individual',
  RESEARCHER: 'researcher',
  STUDENT: 'student',
  ACADEMIC: 'academic',
  ENTERPRISE: 'enterprise'
} as const;

export type UserType = typeof USER_TYPES[keyof typeof USER_TYPES];

// API Response Types
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  errorCode?: string;
  statusCode?: number;
  details?: any;
  timestamp?: string;
}

export interface ApiError {
  success: false;
  message: string;
  errorCode?: string;
  statusCode: number;
  details?: any;
  timestamp: string;
}

// User Preferences
export interface UserPreferences {
  language: 'en' | 'tr';
  theme: 'light' | 'dark';
  notifications: boolean;
  timezone: string;
}

// User Types
export interface User {
  id: string;
  email: string;
  fullName: string;
  userType: UserType;
  institutionId?: any;
  fieldOfStudy?: any;
  orcidId?: any;
  subscriptionPlan?: any;
  subscriptionStatus: string;
  avatarUrl?: any;
  preferences?: UserPreferences;
  emailVerified: boolean;
  isActive: boolean;
  lastLogin?: any;
  createdAt: string;
  updatedAt: string;
}

// Auth Request Types
export interface RegisterRequest {
  email: string;
  password: string;
  fullName: string;
  institutionId?: string;
  fieldOfStudy?: string;
  orcidId?: string;
  avatarUrl?: string;
  preferences?: UserPreferences;
  userType: UserType;
}

export interface SignInRequest {
  email: string;
  password: string;
}

export interface UpdateUserRequest {
  fullName?: string;
  institutionId?: string;
  fieldOfStudy?: string;
  orcidId?: string;
  subscriptionPlan?: string;
  avatarUrl?: string;
  preferences?: UserPreferences;
  emailVerified?: boolean;
}

export interface ChangePasswordRequest {
  currentPassword: string;
  newPassword: string;
}

export interface ForgotPasswordRequest {
  email: string;
}

export interface ResetPasswordRequest {
  token: string;
  newPassword: string;
}

// Auth Response Types
export interface AuthResponse {
  access_token: string;
  user: User;
}

export interface VerifyEmailResponse {
  access_token: string;
  user: User;
}

export interface UpdateUserResponse {
  success: true;
  message: string;
  data: User;
  timestamp: string;
  statusCode: number;
}

// Auth State
export interface AuthState {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  isAuthenticated: boolean;
}

// Pricing and Plans
export interface PricingPlan {
  id: string;
  name: string;
  description: string;
  price: number | 'contact';
  currency: string;
  billing: 'monthly' | 'annually';
  features: string[];
  recommended?: boolean;
  type: 'individual' | 'enterprise';
}

// Navigation
export interface NavItem {
  href: string;
  label: string;
  external?: boolean;
}

// Component Props
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  children: React.ReactNode;
}

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

// Form Types
export interface SignUpForm {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  institutionId?: string;
  fieldOfStudy?: string;
  orcidId?: string;
  userType: UserType;
  agreeToTerms: boolean;
}

export interface SignInForm {
  email: string;
  password: string;
  rememberMe: boolean;
}

export interface ForgotPasswordForm {
  email: string;
}

export interface ResetPasswordForm {
  password: string;
  confirmPassword: string;
}

export interface ChangePasswordForm {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
} 