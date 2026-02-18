import axios, { AxiosInstance, AxiosResponse, InternalAxiosRequestConfig, AxiosError } from 'axios';
import Cookies from 'js-cookie';
import { ApiResponse, ApiError } from '@/types';
import i18n from '@/lib/i18n';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://citext.net/api/v1';

class ApiClient {
  private client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: API_BASE_URL,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Request interceptor - add auth token
    this.client.interceptors.request.use(
      (config: InternalAxiosRequestConfig) => {
        const token = Cookies.get('access_token');
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error: AxiosError) => Promise.reject(error)
    );

    // Response interceptor - handle errors globally
    this.client.interceptors.response.use(
      (response: AxiosResponse) => response,
      (error: AxiosError) => {
        if (error.response?.status === 401) {
          // Unauthorized - clear token but don't redirect automatically
          // Let individual components/pages decide how to handle auth failures
          Cookies.remove('access_token');
          console.log('Token cleared due to 401 error');
        }
        return Promise.reject(error);
      }
    );
  }

  async get<T>(url: string): Promise<ApiResponse<T>> {
    try {
      const response = await this.client.get<ApiResponse<T>>(url);
      return response.data;
    } catch (error: any) {
      throw this.handleError(error);
    }
  }

  async post<T>(url: string, data?: any): Promise<ApiResponse<T>> {
    try {
      const response = await this.client.post<ApiResponse<T>>(url, data);
      return response.data;
    } catch (error: any) {
      throw this.handleError(error);
    }
  }

  async put<T>(url: string, data?: any): Promise<ApiResponse<T>> {
    try {
      const response = await this.client.put<ApiResponse<T>>(url, data);
      return response.data;
    } catch (error: any) {
      throw this.handleError(error);
    }
  }

  async delete<T>(url: string): Promise<ApiResponse<T>> {
    try {
      const response = await this.client.delete<ApiResponse<T>>(url);
      return response.data;
    } catch (error: any) {
      throw this.handleError(error);
    }
  }

  private getLocalizedErrorMessage(errorCode?: string, statusCode?: number, defaultMessage?: string, url?: string): string {
    // Get current language from i18n or localStorage
    const currentLang = i18n.language || (typeof window !== 'undefined' ? localStorage.getItem('i18nextLng') || 'en' : 'en');
    
    // Ensure i18n is ready
    if (!i18n.isInitialized) {
      // Fallback to default message if i18n not ready
      return defaultMessage || 'An error occurred';
    }
    
    const t = i18n.t;
    
    // Map error codes to translation keys
    const errorCodeMap: Record<string, string> = {
      'USER_NOT_FOUND': 'errors.auth.userNotFound',
      'INVALID_CREDENTIALS': 'errors.auth.invalidCredentials',
      'UNAUTHORIZED': 'errors.auth.unauthorized',
      'FORBIDDEN': 'errors.auth.forbidden',
      'EMAIL_NOT_VERIFIED': 'errors.auth.emailNotVerified',
      'EMAIL_ALREADY_EXISTS': 'errors.auth.emailAlreadyExists',
      'EMAIL_ALREADY_REGISTERED': 'errors.auth.emailAlreadyRegistered',
      'EMAIL_ALREADY_VERIFIED': 'errors.auth.emailAlreadyVerified',
      'INVALID_PASSWORD': 'errors.auth.invalidPassword',
      'SAME_PASSWORD': 'errors.auth.samePassword',
      'INVALID_RESET_TOKEN': 'errors.auth.invalidResetToken',
      'INVALID_VERIFICATION_TOKEN': 'errors.auth.invalidVerificationToken',
      'UNAUTHORIZED_ACCESS': 'errors.auth.unauthorizedAccess',
      'SOMETHING_WENT_WRONG': 'errors.auth.somethingWentWrong',
      'BAD_REQUEST': 'errors.http.badRequest',
      'NOT_FOUND': 'errors.http.notFound',
      'CONFLICT': 'errors.http.conflict',
      'VALIDATION_ERROR': 'errors.http.validationError',
      'INTERNAL_SERVER_ERROR': 'errors.http.internalServerError',
    };

    // Check if it's an auth endpoint (login, signup, etc.) and 404 means user not found
    const isAuthEndpoint = url && (
      url.includes('/auth/login') || 
      url.includes('/auth/signin') || 
      url.includes('/auth/signup') || 
      url.includes('/auth/register') ||
      url.includes('/auth/forgot-password') ||
      url.includes('/auth/reset-password') ||
      url.includes('/auth/verify') ||
      url.includes('/auth/change-password')
    );

    // Priority 1: Try to get localized message by error code (most reliable)
    if (errorCode && errorCodeMap[errorCode]) {
      const localized = t(errorCodeMap[errorCode], { ns: 'common' });
      if (localized && localized !== errorCodeMap[errorCode]) {
        return localized;
      }
    }

    // Priority 2: Check message content for specific error patterns
    const messageLower = (defaultMessage || '').toLowerCase();
    const isUserNotFound = messageLower.includes('user not found') || 
                          messageLower.includes('kullanıcı bulunamadı');
    const isEmailNotVerified = (messageLower.includes('email') || messageLower.includes('e-posta')) && 
                               (messageLower.includes('not verified') || 
                                messageLower.includes('doğrulanmamış') ||
                                messageLower.includes('unverified'));
    const isInvalidCredentials = messageLower.includes('invalid credentials') ||
                                messageLower.includes('geçersiz kimlik') ||
                                messageLower.includes('credentials') ||
                                messageLower.includes('yanlış');
    
    if (isUserNotFound || (statusCode === 404 && isAuthEndpoint)) {
      return t('errors.auth.userNotFound', { ns: 'common' });
    }
    
    if (isEmailNotVerified) {
      return t('errors.auth.emailNotVerified', { ns: 'common' });
    }
    
    if (isInvalidCredentials) {
      return t('errors.auth.invalidCredentials', { ns: 'common' });
    }

    // Fallback to status code based messages
    if (statusCode) {
      switch (statusCode) {
        case 400:
          return t('errors.http.badRequest', { ns: 'common' });
        case 401:
          // For auth endpoints, 401 usually means invalid credentials
          if (isAuthEndpoint) {
            return t('errors.auth.invalidCredentials', { ns: 'common' });
          }
          return t('errors.auth.unauthorized', { ns: 'common' });
        case 403:
          return t('errors.auth.forbidden', { ns: 'common' });
        case 404:
          // For auth endpoints, 404 means user not found
          if (isAuthEndpoint) {
            return t('errors.auth.userNotFound', { ns: 'common' });
          }
          return t('errors.http.notFound', { ns: 'common' });
        case 409:
          return t('errors.http.conflict', { ns: 'common' });
        case 422:
          return t('errors.http.validationError', { ns: 'common' });
        case 500:
        case 502:
        case 503:
          return t('errors.http.internalServerError', { ns: 'common' });
        default:
          if (statusCode >= 500) {
            return t('errors.generic.serverError', { ns: 'common' });
          }
      }
    }

    // Use default message if provided
    if (defaultMessage) {
      return defaultMessage;
    }

    // Final fallback
    return t('errors.generic.unexpectedError', { ns: 'common' });
  }

  private handleError(error: AxiosError): ApiError {
    if (error.response?.data) {
      const errorData = error.response.data as ApiError;
      // Get full URL from config (includes baseURL + path)
      const config = error.config;
      const fullUrl = config?.url || (config?.baseURL && config?.url ? config.baseURL + config.url : '') || '';
      
      // Get localized error message
      const localizedMessage = this.getLocalizedErrorMessage(
        errorData.errorCode,
        errorData.statusCode,
        typeof errorData.message === 'string' ? errorData.message : undefined,
        fullUrl
      );

      return {
        ...errorData,
        message: localizedMessage,
      };
    }

    // Handle network errors
    if (error.code === 'ECONNABORTED' || error.message.includes('timeout')) {
      return {
        success: false,
        message: this.getLocalizedErrorMessage(undefined, undefined, i18n.t('errors.generic.timeout', { ns: 'common' })),
        statusCode: 408,
        timestamp: new Date().toISOString(),
      };
    }

    if (error.code === 'ERR_NETWORK' || !error.response) {
      return {
        success: false,
        message: this.getLocalizedErrorMessage(undefined, undefined, i18n.t('errors.generic.networkError', { ns: 'common' })),
        statusCode: 0,
        timestamp: new Date().toISOString(),
      };
    }
    
    return {
      success: false,
      message: this.getLocalizedErrorMessage(undefined, error.response?.status),
      statusCode: error.response?.status || 500,
      timestamp: new Date().toISOString(),
    };
  }
}

export const apiClient = new ApiClient(); 