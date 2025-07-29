import { apiClient } from '@/lib/api';
import {
  RegisterRequest,
  SignInRequest,
  ChangePasswordRequest,
  ForgotPasswordRequest,
  ResetPasswordRequest,
  UpdateUserRequest,
  AuthResponse,
  VerifyEmailResponse,
  UpdateUserResponse,
  User,
  ApiResponse
} from '@/types';
import Cookies from 'js-cookie';

class AuthService {
  // Register a new user
  async register(data: RegisterRequest): Promise<AuthResponse> {
    const response = await apiClient.post<AuthResponse>('/auth/signup', data);
    
    // Check if response has data property (wrapped) or is direct response
    const authData = response.data || response as any;
    
    if (authData.access_token) {
      this.setAuthToken(authData.access_token);
    }
    
    return authData as AuthResponse;
  }

  // Sign in with email and password
  async signIn(data: SignInRequest): Promise<AuthResponse> {
    const response = await apiClient.post<AuthResponse>('/auth/signin', data);
    
    // Check if response has data property (wrapped) or is direct response
    const authData = response.data || response as any;
    
    if (authData.access_token) {
      this.setAuthToken(authData.access_token);
    }
    
    return authData as AuthResponse;
  }

  // Sign out user
  async signOut(redirectToSignIn: boolean = false): Promise<void> {
    Cookies.remove('access_token');
    if (redirectToSignIn && typeof window !== 'undefined') {
      window.location.href = '/auth/signin';
    }
  }

  // Get current user info
  async getCurrentUser(): Promise<User> {
    const response = await apiClient.get<User>('/auth/me');
    return (response.data || response) as User;
  }

  // Update user profile
  async updateUser(data: UpdateUserRequest): Promise<UpdateUserResponse> {
    const response = await apiClient.put<UpdateUserResponse>('/auth/profile', data);
    return (response.data || response) as UpdateUserResponse;
  }

  // Change password
  async changePassword(data: ChangePasswordRequest): Promise<ApiResponse> {
    return await apiClient.post<ApiResponse>('/auth/change-password', data);
  }

  // Forgot password - send reset email
  async forgotPassword(data: ForgotPasswordRequest): Promise<ApiResponse> {
    return await apiClient.post<ApiResponse>('/auth/forgot-password', data);
  }

  // Verify reset token
  async verifyResetToken(token: string): Promise<ApiResponse> {
    return await apiClient.get<ApiResponse>(`/auth/verify-reset-token?token=${token}`);
  }

  // Reset password with token
  async resetPassword(data: ResetPasswordRequest): Promise<ApiResponse> {
    return await apiClient.post<ApiResponse>('/auth/reset-password', data);
  }

  // Verify email address
  async verifyEmail(token: string): Promise<VerifyEmailResponse> {
    const response = await apiClient.get<VerifyEmailResponse>(`/auth/verify-email?token=${token}`);
    
    // Check if response has data property (wrapped) or is direct response
    const verifyData = response.data || response as any;
    
    if (verifyData.access_token) {
      this.setAuthToken(verifyData.access_token);
    }
    
    return verifyData as VerifyEmailResponse;
  }

  // Resend verification email
  async resendVerificationEmail(): Promise<ApiResponse> {
    return await apiClient.post<ApiResponse>('/auth/resend-verification-email');
  }

  // Helper methods
  private setAuthToken(token: string): void {
    // Set cookie with 7 days expiry
    Cookies.set('access_token', token, { 
      expires: 7,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax'
    });
  }

  getAuthToken(): string | undefined {
    return Cookies.get('access_token');
  }

  isAuthenticated(): boolean {
    return !!this.getAuthToken();
  }
}

export const authService = new AuthService(); 