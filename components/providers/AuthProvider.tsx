'use client';

import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';
import { AuthState, User } from '@/types';
import { authService } from '@/lib/services/auth';

interface AuthContextType extends AuthState {
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

type AuthAction =
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_USER'; payload: User | null }
  | { type: 'SET_AUTHENTICATED'; payload: boolean }
  | { type: 'SET_TOKEN'; payload: string | null }
  | { type: 'SIGN_OUT' };

const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };
    case 'SET_USER':
      return {
        ...state,
        user: action.payload,
        isAuthenticated: !!action.payload,
        isLoading: false,
      };
    case 'SET_AUTHENTICATED':
      return { ...state, isAuthenticated: action.payload };
    case 'SET_TOKEN':
      return { ...state, token: action.payload };
    case 'SIGN_OUT':
      return {
        user: null,
        token: null,
        isLoading: false,
        isAuthenticated: false,
      };
    default:
      return state;
  }
};

const initialState: AuthState = {
  user: null,
  token: null,
  isLoading: true,
  isAuthenticated: false,
};

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [state, dispatch] = useReducer(authReducer, initialState);

  const refreshUser = async () => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      
      const token = authService.getAuthToken();
      if (!token) {
        dispatch({ type: 'SET_USER', payload: null });
        dispatch({ type: 'SET_TOKEN', payload: null });
        return;
      }

      // Set token in state
      dispatch({ type: 'SET_TOKEN', payload: token });
      
      const user = await authService.getCurrentUser();
      dispatch({ type: 'SET_USER', payload: user });
    } catch (error) {
      console.error('Failed to refresh user:', error);
      // If token exists but user fetch failed, token might be invalid
      if (authService.isAuthenticated()) {
        console.log('Token exists but user fetch failed, clearing token');
        authService.signOut();
      }
      dispatch({ type: 'SET_USER', payload: null });
      dispatch({ type: 'SET_TOKEN', payload: null });
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      const response = await authService.signIn({ email, password });
      dispatch({ type: 'SET_USER', payload: response.user });
      dispatch({ type: 'SET_TOKEN', payload: response.access_token });
    } catch (error) {
      dispatch({ type: 'SET_LOADING', payload: false });
      throw error;
    }
  };

  const signOut = async () => {
    try {
      await authService.signOut();
      dispatch({ type: 'SIGN_OUT' });
    } catch (error) {
      console.error('Sign out error:', error);
      dispatch({ type: 'SIGN_OUT' });
    }
  };

  // Check authentication status on mount
  useEffect(() => {
    refreshUser();
  }, []);

  const value: AuthContextType = {
    ...state,
    signIn,
    signOut,
    refreshUser,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
} 