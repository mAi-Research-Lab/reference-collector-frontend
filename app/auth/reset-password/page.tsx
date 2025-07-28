'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Lock, Eye, EyeOff, CheckCircle, XCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { setDocumentTitle } from '@/lib/utils';
import { authService } from '@/lib/services/auth';
import { ResetPasswordForm, ApiError } from '@/types';

export default function ResetPasswordPage() {
  const { t } = useTranslation(['auth', 'common']);
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get('token');
  
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>('');
  const [isTokenValid, setIsTokenValid] = useState<boolean | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    setDocumentTitle(t('resetPassword.title', { ns: 'auth' }));
  }, [t]);

  useEffect(() => {
    if (token) {
      verifyToken(token);
    } else {
      setIsTokenValid(false);
    }
  }, [token]);

  const [formData, setFormData] = useState<ResetPasswordForm>({
    password: '',
    confirmPassword: '',
  });

  const verifyToken = async (token: string) => {
    try {
      await authService.verifyResetToken(token);
      setIsTokenValid(true);
    } catch (err: any) {
      setIsTokenValid(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));

    // Clear error when user starts typing
    if (error) setError('');
  };

  const validateForm = (): boolean => {
    if (!formData.password) {
      setError(t('resetPassword.errors.passwordRequired', { ns: 'auth' }));
      return false;
    }
    if (formData.password.length < 6) {
      setError(t('resetPassword.errors.passwordTooShort', { ns: 'auth' }));
      return false;
    }
    if (formData.password !== formData.confirmPassword) {
      setError(t('resetPassword.errors.passwordMismatch', { ns: 'auth' }));
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm() || !token) return;

    setIsLoading(true);
    setError('');

    try {
      await authService.resetPassword({
        token,
        newPassword: formData.password,
      });
      setIsSuccess(true);
    } catch (err: any) {
      const apiError = err as ApiError;
      setError(apiError.message || t('resetPassword.errors.resetFailed', { ns: 'auth' }));
    } finally {
      setIsLoading(false);
    }
  };

  if (isTokenValid === null) {
    return (
      <div className="min-h-screen bg-neutral-50">
        <Header />
        <div className="flex items-center justify-center min-h-[calc(100vh-200px)] py-12">
          <div className="max-w-md w-full">
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-neutral-100 text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500 mx-auto mb-4"></div>
              <p>{t('resetPassword.verifyingToken', { ns: 'auth' })}</p>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (isTokenValid === false) {
    return (
      <div className="min-h-screen bg-neutral-50">
        <Header />
        <div className="flex items-center justify-center min-h-[calc(100vh-200px)] py-12">
          <div className="max-w-md w-full">
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-neutral-100 text-center">
              <XCircle className="w-16 h-16 text-red-500 mx-auto mb-6" />
              <h1 className="text-3xl font-bold text-neutral-900 mb-4">
                {t('resetPassword.invalidToken', { ns: 'auth' })}
              </h1>
              <p className="text-lg text-neutral-600 mb-8">
                {t('resetPassword.invalidTokenDescription', { ns: 'auth' })}
              </p>
              <Button onClick={() => router.push('/auth/forgot-password')}>
                {t('resetPassword.requestNewLink', { ns: 'auth' })}
              </Button>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-neutral-50">
        <Header />
        <div className="flex items-center justify-center min-h-[calc(100vh-200px)] py-12">
          <div className="max-w-md w-full">
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-neutral-100 text-center">
              <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-6" />
              <h1 className="text-3xl font-bold text-neutral-900 mb-4">
                {t('resetPassword.success', { ns: 'auth' })}
              </h1>
              <p className="text-lg text-neutral-600 mb-8">
                {t('resetPassword.successDescription', { ns: 'auth' })}
              </p>
              <Button onClick={() => router.push('/auth/signin')}>
                {t('resetPassword.signIn', { ns: 'auth' })}
              </Button>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-50">
      <Header />
      
      <div className="flex items-center justify-center min-h-[calc(100vh-200px)] py-12">
        <div className="max-w-md w-full">
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-neutral-100">
            <div className="text-center mb-8">
              <Lock className="w-16 h-16 text-primary-500 mx-auto mb-6" />
              <h1 className="text-3xl font-bold text-neutral-900 mb-2">
                {t('resetPassword.title', { ns: 'auth' })}
              </h1>
              <p className="text-neutral-600">
                {t('resetPassword.subtitle', { ns: 'auth' })}
              </p>
            </div>

            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-neutral-700 mb-2">
                  {t('resetPassword.newPasswordLabel', { ns: 'auth' })}
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400 w-5 h-5" />
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder={t('resetPassword.newPasswordPlaceholder', { ns: 'auth' })}
                    className="pl-10 pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-neutral-400 hover:text-neutral-600"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-neutral-700 mb-2">
                  {t('resetPassword.confirmPasswordLabel', { ns: 'auth' })}
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400 w-5 h-5" />
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirmPassword ? 'text' : 'password'}
                    required
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    placeholder={t('resetPassword.confirmPasswordPlaceholder', { ns: 'auth' })}
                    className="pl-10 pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-neutral-400 hover:text-neutral-600"
                  >
                    {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              <Button type="submit" className="w-full" loading={isLoading}>
                {t('resetPassword.resetButton', { ns: 'auth' })}
              </Button>
            </form>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
} 