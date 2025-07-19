import React from 'react';

// User and Authentication Types
export interface User {
  id: string;
  email: string;
  name: string;
  plan: 'free' | 'individual' | 'enterprise';
  createdAt: Date;
  updatedAt: Date;
}

export interface AuthState {
  user: User | null;
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
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  plan: 'free' | 'individual';
  agreeToTerms: boolean;
}

export interface SignInForm {
  email: string;
  password: string;
  rememberMe: boolean;
}

// API Response Types
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: {
    message: string;
    code: string;
  };
} 