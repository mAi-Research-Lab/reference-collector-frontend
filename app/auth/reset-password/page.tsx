'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Lock, Eye, EyeOff, CheckCircle, XCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import AuthLayout from '@/components/layout/AuthLayout';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { setDocumentTitle } from '@/lib/utils';
import { authService } from '@/lib/services/auth';
import { ResetPasswordForm, ApiError } from '@/types';

function ResetPasswordContent() {
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
    } catch {
      setIsTokenValid(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
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
      await authService.resetPassword({ token, newPassword: formData.password });
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
      <AuthLayout>
        <div className="w-full max-w-md">
          <div className="bg-white/80 backdrop-blur-sm p-10 rounded-2xl shadow-medium border border-white/60 text-center">
            <div className="w-12 h-12 border-2 border-primary-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <p className="text-neutral-600 text-sm">{t('resetPassword.verifyingToken', { ns: 'auth' })}</p>
          </div>
        </div>
      </AuthLayout>
    );
  }

  if (isTokenValid === false) {
    return (
      <AuthLayout>
        <div className="w-full max-w-md">
          <div className="bg-white/80 backdrop-blur-sm p-10 rounded-2xl shadow-medium border border-white/60 text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full mx-auto mb-6 flex items-center justify-center">
              <XCircle className="w-8 h-8 text-red-500" />
            </div>
            <h1 className="text-2xl font-bold text-neutral-900 mb-3">
              {t('resetPassword.invalidToken', { ns: 'auth' })}
            </h1>
            <p className="text-neutral-500 text-sm mb-8">
              {t('resetPassword.invalidTokenDescription', { ns: 'auth' })}
            </p>
            <Button onClick={() => router.push('/auth/forgot-password')} className="w-full">
              {t('resetPassword.requestNewLink', { ns: 'auth' })}
            </Button>
          </div>
        </div>
      </AuthLayout>
    );
  }

  if (isSuccess) {
    return (
      <AuthLayout>
        <div className="w-full max-w-md">
          <div className="bg-white/80 backdrop-blur-sm p-10 rounded-2xl shadow-medium border border-white/60 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full mx-auto mb-6 flex items-center justify-center">
              <CheckCircle className="w-8 h-8 text-green-500" />
            </div>
            <h1 className="text-2xl font-bold text-neutral-900 mb-3">
              {t('resetPassword.success', { ns: 'auth' })}
            </h1>
            <p className="text-neutral-500 text-sm mb-8">
              {t('resetPassword.successDescription', { ns: 'auth' })}
            </p>
            <Button onClick={() => router.push('/auth/signin')} className="w-full">
              {t('resetPassword.signIn', { ns: 'auth' })}
            </Button>
          </div>
        </div>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout>
      <div className="w-full max-w-md">
        <div className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-medium border border-white/60">
          <div className="text-center mb-8">
            <div className="w-14 h-14 bg-primary-50 rounded-2xl mx-auto mb-5 flex items-center justify-center">
              <Lock className="w-7 h-7 text-primary-500" />
            </div>
            <h1 className="text-2xl font-bold text-neutral-900 mb-2">
              {t('resetPassword.title', { ns: 'auth' })}
            </h1>
            <p className="text-sm text-neutral-500">
              {t('resetPassword.subtitle', { ns: 'auth' })}
            </p>
          </div>

          {error && (
            <div className="mb-5 p-3.5 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm flex items-start gap-2.5">
              <svg className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-neutral-700 mb-1.5">
                {t('resetPassword.newPasswordLabel', { ns: 'auth' })}
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400 w-4 h-4" />
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder={t('resetPassword.newPasswordPlaceholder', { ns: 'auth' })}
                  className="pl-9 pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-neutral-700 mb-1.5">
                {t('resetPassword.confirmPasswordLabel', { ns: 'auth' })}
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400 w-4 h-4" />
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  required
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  placeholder={t('resetPassword.confirmPasswordPlaceholder', { ns: 'auth' })}
                  className="pl-9 pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600 transition-colors"
                >
                  {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <Button type="submit" className="w-full" loading={isLoading}>
              {t('resetPassword.resetButton', { ns: 'auth' })}
            </Button>
          </form>
        </div>
      </div>
    </AuthLayout>
  );
}

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={
      <AuthLayout>
        <div className="w-full max-w-md">
          <div className="bg-white/80 backdrop-blur-sm p-10 rounded-2xl shadow-medium border border-white/60 text-center">
            <div className="w-12 h-12 border-2 border-primary-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <p className="text-neutral-500 text-sm">Loading...</p>
          </div>
        </div>
      </AuthLayout>
    }>
      <ResetPasswordContent />
    </Suspense>
  );
}
