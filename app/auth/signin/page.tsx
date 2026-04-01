'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff, Mail, Lock } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import AuthLayout from '@/components/layout/AuthLayout';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { setDocumentTitle } from '@/lib/utils';
import { SignInForm, ApiError } from '@/types';
import { useAuth } from '@/components/providers/AuthProvider';

export default function SignInPage() {
  const { t, i18n } = useTranslation(['auth', 'common']);
  const router = useRouter();
  const { signIn } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    setDocumentTitle(t('signin.title', { ns: 'auth' }));
  }, [t, i18n.language]);

  const [formData, setFormData] = useState<SignInForm>({
    email: '',
    password: '',
    rememberMe: false,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
    if (error) setError('');
  };

  const validateForm = (): boolean => {
    if (!formData.email.trim()) {
      setError(t('signin.errors.emailRequired', { ns: 'auth' }));
      return false;
    }
    if (!formData.password) {
      setError(t('signin.errors.passwordRequired', { ns: 'auth' }));
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    setError('');

    try {
      await signIn(formData.email, formData.password);
      setTimeout(() => { router.push('/dashboard'); }, 100);
    } catch (err: any) {
      const apiError = err as ApiError;
      const errorMessage = apiError.message || err?.message || t('signin.errors.signInFailed', { ns: 'auth' });

      if (errorMessage.includes('EMAIL_NOT_VERIFIED') || errorMessage.includes('doğrulanmamış') || err?.message === 'EMAIL_NOT_VERIFIED') {
        setError(t('signin.errors.emailNotVerified', { ns: 'auth' }) || 'Email doğrulanmamış. Lütfen e-posta adresinizi doğrulayın.');
        setTimeout(() => { router.push('/auth/verify-email'); }, 1500);
      } else {
        setError(errorMessage);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout>
      <div className="w-full max-w-md">
        <div className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-medium border border-white/60">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-neutral-900 mb-1">
              {t('signin.title', { ns: 'auth' })}
            </h1>
            <p className="text-sm text-neutral-500">
              {t('signin.subtitle', { ns: 'auth' })}
            </p>
          </div>

          {/* Error */}
          {error && (
            <div className="mb-5 p-3.5 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm flex items-start gap-2.5">
              <svg className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>{error}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-neutral-700 mb-1.5">
                {t('signin.email', { ns: 'auth' })}
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400 w-4 h-4" />
                <Input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder={t('signin.emailPlaceholder', { ns: 'auth' })}
                  className="pl-9"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-neutral-700 mb-1.5">
                {t('signin.password', { ns: 'auth' })}
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
                  placeholder={t('signin.passwordPlaceholder', { ns: 'auth' })}
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

            <div className="flex items-center justify-between pt-1">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  id="rememberMe"
                  name="rememberMe"
                  type="checkbox"
                  checked={formData.rememberMe}
                  onChange={handleInputChange}
                  className="h-4 w-4 text-primary-500 focus:ring-primary-500 border-neutral-300 rounded"
                />
                <span className="text-sm text-neutral-600">{t('signin.rememberMe', { ns: 'auth' })}</span>
              </label>
              <Link href="/auth/forgot-password" className="text-sm text-primary-600 hover:text-primary-700 font-medium">
                {t('signin.forgotPassword', { ns: 'auth' })}
              </Link>
            </div>

            <Button type="submit" className="w-full !mt-5" loading={isLoading}>
              {t('signin.signInButton', { ns: 'auth' })}
            </Button>
          </form>

          {/* Signup redirect */}
          <div className="mt-6 pt-5 border-t border-neutral-100 text-center">
            <p className="text-sm text-neutral-500">
              {t('signin.noAccount', { ns: 'auth' })}{' '}
              <Link href="/auth/signup" className="text-primary-600 hover:text-primary-700 font-medium">
                {t('signin.signUpLink', { ns: 'auth' })}
              </Link>
            </p>
          </div>
        </div>
      </div>
    </AuthLayout>
  );
}
