'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Mail, ArrowLeft, CheckCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import AuthLayout from '@/components/layout/AuthLayout';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { setDocumentTitle } from '@/lib/utils';
import { authService } from '@/lib/services/auth';
import { ForgotPasswordForm, ApiError } from '@/types';

export default function ForgotPasswordPage() {
  const { t } = useTranslation(['auth', 'common']);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    setDocumentTitle(t('forgotPassword.title', { ns: 'auth' }));
  }, [t]);

  const [formData, setFormData] = useState<ForgotPasswordForm>({
    email: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (error) setError('');
  };

  const validateForm = (): boolean => {
    if (!formData.email.trim()) {
      setError(t('forgotPassword.errors.emailRequired', { ns: 'auth' }));
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
      await authService.forgotPassword({ email: formData.email });
      setIsSubmitted(true);
    } catch (err: any) {
      const apiError = err as ApiError;
      setError(apiError.message || t('forgotPassword.errors.requestFailed', { ns: 'auth' }));
    } finally {
      setIsLoading(false);
    }
  };

  if (isSubmitted) {
    return (
      <AuthLayout>
        <div className="w-full max-w-md">
          <div className="bg-white/80 backdrop-blur-sm p-10 rounded-2xl shadow-medium border border-white/60 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full mx-auto mb-6 flex items-center justify-center">
              <CheckCircle className="w-8 h-8 text-green-500" />
            </div>
            <h1 className="text-2xl font-bold text-neutral-900 mb-3">
              {t('forgotPassword.emailSent', { ns: 'auth' })}
            </h1>
            <p className="text-neutral-500 text-sm mb-8">
              {t('forgotPassword.emailSentDescription', { ns: 'auth' })}
            </p>
            <div className="flex flex-col gap-3">
              <Button onClick={() => setIsSubmitted(false)} variant="outline" className="w-full">
                {t('forgotPassword.sendAnother', { ns: 'auth' })}
              </Button>
              <Link href="/auth/signin">
                <Button variant="ghost" className="w-full">
                  {t('forgotPassword.backToSignIn', { ns: 'auth' })}
                </Button>
              </Link>
            </div>
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
              <Mail className="w-7 h-7 text-primary-500" />
            </div>
            <h1 className="text-2xl font-bold text-neutral-900 mb-2">
              {t('forgotPassword.title', { ns: 'auth' })}
            </h1>
            <p className="text-sm text-neutral-500">
              {t('forgotPassword.subtitle', { ns: 'auth' })}
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
              <label htmlFor="email" className="block text-sm font-medium text-neutral-700 mb-1.5">
                {t('forgotPassword.emailLabel', { ns: 'auth' })}
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
                  placeholder={t('forgotPassword.emailPlaceholder', { ns: 'auth' })}
                  className="pl-9"
                />
              </div>
            </div>

            <Button type="submit" className="w-full" loading={isLoading}>
              {t('forgotPassword.sendResetLinkButton', { ns: 'auth' })}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <Link
              href="/auth/signin"
              className="inline-flex items-center gap-1.5 text-sm text-primary-600 hover:text-primary-700 font-medium"
            >
              <ArrowLeft className="w-4 h-4" />
              {t('forgotPassword.backToSignIn', { ns: 'auth' })}
            </Link>
          </div>
        </div>
      </div>
    </AuthLayout>
  );
}
