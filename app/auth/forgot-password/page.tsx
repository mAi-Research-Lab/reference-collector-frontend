'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Mail, ArrowLeft, CheckCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
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
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));

    // Clear error when user starts typing
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
      <div className="min-h-screen bg-neutral-50">
        <Header />
        
        <div className="flex items-center justify-center min-h-[calc(100vh-200px)] py-12">
          <div className="max-w-md w-full">
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-neutral-100 text-center">
              <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-6" />
              <h1 className="text-3xl font-bold text-neutral-900 mb-4">
                {t('forgotPassword.emailSent', { ns: 'auth' })}
              </h1>
              <p className="text-lg text-neutral-600 mb-8">
                {t('forgotPassword.emailSentDescription', { ns: 'auth' })}
              </p>
              <div className="space-y-4">
                <Button onClick={() => setIsSubmitted(false)} variant="outline">
                  {t('forgotPassword.sendAnother', { ns: 'auth' })}
                </Button>
                <div>
                  <Link href="/auth/signin">
                    <Button variant="ghost">
                      {t('forgotPassword.backToSignIn', { ns: 'auth' })}
                    </Button>
                  </Link>
                </div>
              </div>
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
              <Mail className="w-16 h-16 text-primary-500 mx-auto mb-6" />
              <h1 className="text-3xl font-bold text-neutral-900 mb-2">
                {t('forgotPassword.title', { ns: 'auth' })}
              </h1>
              <p className="text-neutral-600">
                {t('forgotPassword.subtitle', { ns: 'auth' })}
              </p>
            </div>

            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-neutral-700 mb-2">
                  {t('forgotPassword.emailLabel', { ns: 'auth' })}
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400 w-5 h-5" />
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder={t('forgotPassword.emailPlaceholder', { ns: 'auth' })}
                    className="pl-10"
                  />
                </div>
              </div>

              <Button type="submit" className="w-full" loading={isLoading}>
                {t('forgotPassword.sendResetLink', { ns: 'auth' })}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <Link 
                href="/auth/signin" 
                className="inline-flex items-center text-sm text-primary-500 hover:text-primary-600"
              >
                <ArrowLeft className="w-4 h-4 mr-1" />
                {t('forgotPassword.backToSignIn', { ns: 'auth' })}
              </Link>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
} 