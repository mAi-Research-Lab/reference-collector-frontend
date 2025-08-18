'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Mail, CheckCircle, XCircle, Loader2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Button from '@/components/ui/Button';
import { setDocumentTitle } from '@/lib/utils';
import { authService } from '@/lib/services/auth';
import { ApiError } from '@/types';

export default function VerifyEmailPage() {
  const { t } = useTranslation('auth');
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get('token');
  
  const [status, setStatus] = useState<'pending' | 'verifying' | 'success' | 'error'>('pending');
  const [error, setError] = useState<string>('');
  const [isResending, setIsResending] = useState(false);

  useEffect(() => {
    setDocumentTitle(t('verifyEmail.title'));
  }, [t]);

  useEffect(() => {
    if (token) {
      verifyEmail(token);
    }
  }, [token]);

  const verifyEmail = async (token: string) => {
    setStatus('verifying');
    setError('');

    try {
      await authService.verifyEmail(token);
      setStatus('success');
      
      // Redirect to dashboard after 2 seconds
      setTimeout(() => {
        router.push('/dashboard');
      }, 2000);
    } catch (err: any) {
      const apiError = err as ApiError;
      setError(apiError.message || t('verifyEmail.errors.verificationFailed'));
      setStatus('error');
    }
  };

  const resendVerificationEmail = async () => {
    setIsResending(true);
    setError('');

    try {
      await authService.resendVerificationEmail();
      setError('');
      // Show success message
      alert(t('verifyEmail.resendSuccess'));
    } catch (err: any) {
      const apiError = err as ApiError;
      setError(apiError.message || t('verifyEmail.errors.resendFailed'));
    } finally {
      setIsResending(false);
    }
  };

  const renderContent = () => {
    switch (status) {
      case 'pending':
        return (
          <div className="text-center">
            <Mail className="w-16 h-16 text-primary-500 mx-auto mb-6" />
            <h1 className="text-3xl font-bold text-neutral-900 mb-4">
              {t('verifyEmail.title')}
            </h1>
            <p className="text-lg text-neutral-600 mb-8">
              {t('verifyEmail.description')}
            </p>
            <div className="space-y-4">
              <Button onClick={resendVerificationEmail} loading={isResending} variant="outline">
                {t('verifyEmail.resendButton')}
              </Button>
              <div>
                <Button onClick={() => router.push('/auth/signin')} variant="ghost">
                  {t('verifyEmail.backToSignIn')}
                </Button>
              </div>
            </div>
          </div>
        );

      case 'verifying':
        return (
          <div className="text-center">
            <Loader2 className="w-16 h-16 text-primary-500 mx-auto mb-6 animate-spin" />
            <h1 className="text-3xl font-bold text-neutral-900 mb-4">
              {t('verifyEmail.verifying')}
            </h1>
            <p className="text-lg text-neutral-600">
              {t('verifyEmail.verifyingDescription')}
            </p>
          </div>
        );

      case 'success':
        return (
          <div className="text-center">
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-6" />
            <h1 className="text-3xl font-bold text-neutral-900 mb-4">
              {t('verifyEmail.success')}
            </h1>
            <p className="text-lg text-neutral-600 mb-8">
              {t('verifyEmail.successDescription')}
            </p>
            <div className="space-y-4">
              <Button onClick={() => router.push('/dashboard')}>
                {t('verifyEmail.goToDashboard')}
              </Button>
            </div>
          </div>
        );

      case 'error':
        return (
          <div className="text-center">
            <XCircle className="w-16 h-16 text-red-500 mx-auto mb-6" />
            <h1 className="text-3xl font-bold text-neutral-900 mb-4">
              {t('verifyEmail.error')}
            </h1>
            <p className="text-lg text-neutral-600 mb-4">
              {error || t('verifyEmail.errorDescription')}
            </p>
            <div className="space-y-4">
              <Button onClick={resendVerificationEmail} loading={isResending}>
                {t('verifyEmail.resendButton')}
              </Button>
              <div>
                <Button onClick={() => router.push('/auth/signin')} variant="ghost">
                  {t('verifyEmail.backToSignIn')}
                </Button>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-neutral-50">
      <Header />
      
      <div className="flex items-center justify-center min-h-[calc(100vh-200px)] py-12">
        <div className="max-w-md w-full">
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-neutral-100">
            {renderContent()}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
} 