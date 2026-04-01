'use client';

import React, { useState, useEffect, useCallback, Suspense, useMemo } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Mail, CheckCircle, XCircle, Loader2 } from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Button from '@/components/ui/Button';
import { setDocumentTitle } from '@/lib/utils';
import { authService } from '@/lib/services/auth';
import { ApiError } from '@/types';
import { useTranslation } from 'next-i18next';

const RESEND_COOLDOWN_MS = 60_000;
const RESEND_STORAGE_KEY = 'citext-verify-resend-cooldown-until';

function readCooldownEnd(): number {
  if (typeof window === 'undefined') return 0;
  try {
    const v = sessionStorage.getItem(RESEND_STORAGE_KEY);
    if (!v) return 0;
    const end = parseInt(v, 10);
    if (Number.isNaN(end) || end <= Date.now()) {
      sessionStorage.removeItem(RESEND_STORAGE_KEY);
      return 0;
    }
    return end;
  } catch {
    return 0;
  }
}

function writeCooldownEnd(end: number) {
  sessionStorage.setItem(RESEND_STORAGE_KEY, String(end));
}

function VerifyEmailContent() {
  const { t } = useTranslation('auth');
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get('token');

  const [status, setStatus] = useState<'pending' | 'verifying' | 'success' | 'error'>('pending');
  const [error, setError] = useState<string>('');
  const [isResending, setIsResending] = useState(false);
  const [cooldownUntil, setCooldownUntil] = useState(0);
  const [tick, setTick] = useState(0);

  useEffect(() => {
    setCooldownUntil(readCooldownEnd());
  }, []);

  useEffect(() => {
    setDocumentTitle(t('verifyEmail.title'));
  }, [t]);

  const secondsLeft = useMemo(() => {
    void tick;
    if (!cooldownUntil || cooldownUntil <= Date.now()) return 0;
    return Math.max(0, Math.ceil((cooldownUntil - Date.now()) / 1000));
  }, [cooldownUntil, tick]);

  useEffect(() => {
    if (!cooldownUntil || cooldownUntil <= Date.now()) return;
    const id = window.setInterval(() => {
      setTick((x) => x + 1);
      if (Date.now() >= cooldownUntil) {
        setCooldownUntil(0);
        try {
          sessionStorage.removeItem(RESEND_STORAGE_KEY);
        } catch {
          /* ignore */
        }
      }
    }, 1000);
    return () => clearInterval(id);
  }, [cooldownUntil]);

  const verifyEmail = useCallback(async (verifyToken: string) => {
    setStatus('verifying');
    setError('');

    try {
      await authService.verifyEmail(verifyToken);
      setStatus('success');

      setTimeout(() => {
        router.push('/auth/signin');
      }, 2000);
    } catch (err: any) {
      const apiError = err as ApiError;
      setError(apiError.message || t('verifyEmail.errors.verificationFailed'));
      setStatus('error');
    }
  }, [router, t]);

  useEffect(() => {
    if (token) {
      void verifyEmail(token);
    }
  }, [token, verifyEmail]);

  const resendVerificationEmail = async () => {
    if (secondsLeft > 0 || isResending) return;

    setIsResending(true);
    setError('');

    try {
      await authService.resendVerificationEmail();
      setError('');
      const end = Date.now() + RESEND_COOLDOWN_MS;
      writeCooldownEnd(end);
      setCooldownUntil(end);
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
          <div className="text-center space-y-6">
            <Mail className="w-16 h-16 text-primary-500 mx-auto" />
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-neutral-900 mb-3">
                {t('verifyEmail.checkInboxTitle')}
              </h1>
              <p className="text-base text-neutral-600 leading-relaxed mb-4">
                {t('verifyEmail.checkInboxBody')}
              </p>
              <p className="text-sm text-neutral-500 leading-relaxed">
                {t('verifyEmail.checkInboxHint')}
              </p>
            </div>

            <div className="border-t border-neutral-200 pt-6">
              <p className="text-sm font-semibold text-neutral-800 mb-4">
                {t('verifyEmail.resendSectionTitle')}
              </p>
              <p className="text-xs text-neutral-500 mb-3">
                <span className="font-bold text-primary-600">{t('verifyEmail.resendEmphasis')}</span>{' '}
                <span>{t('verifyEmail.resendButton')}</span>
              </p>
              <Button
                onClick={() => void resendVerificationEmail()}
                loading={isResending}
                disabled={secondsLeft > 0 || isResending}
                variant="outline"
                className="w-full sm:w-auto min-w-[240px]"
              >
                {secondsLeft > 0
                  ? t('verifyEmail.resendCooldown', { seconds: secondsLeft })
                  : t('verifyEmail.resendButtonFull')}
              </Button>
            </div>

            <div>
              <Button onClick={() => router.push('/auth/signin')} variant="ghost" type="button">
                {t('verifyEmail.backToSignIn')}
              </Button>
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
              <Button onClick={() => router.push('/auth/signin')}>
                {t('verifyEmail.goToSignIn')}
              </Button>
            </div>
          </div>
        );

      case 'error':
        return (
          <div className="text-center space-y-6">
            <XCircle className="w-16 h-16 text-red-500 mx-auto" />
            <div>
              <h1 className="text-3xl font-bold text-neutral-900 mb-4">
                {t('verifyEmail.error')}
              </h1>
              <p className="text-lg text-neutral-600 mb-4">
                {error || t('verifyEmail.errorDescription')}
              </p>
            </div>
            <div className="border-t border-neutral-200 pt-6">
              <p className="text-xs text-neutral-500 mb-3">
                <span className="font-bold text-primary-600">{t('verifyEmail.resendEmphasis')}</span>{' '}
                <span>{t('verifyEmail.resendButton')}</span>
              </p>
              <Button
                onClick={() => void resendVerificationEmail()}
                loading={isResending}
                disabled={secondsLeft > 0 || isResending}
                className="w-full sm:w-auto"
              >
                {secondsLeft > 0
                  ? t('verifyEmail.resendCooldown', { seconds: secondsLeft })
                  : t('verifyEmail.resendButtonFull')}
              </Button>
            </div>
            <div>
              <Button onClick={() => router.push('/auth/signin')} variant="ghost" type="button">
                {t('verifyEmail.backToSignIn')}
              </Button>
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
        <div className="max-w-lg w-full px-4">
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-neutral-100">
            {renderContent()}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default function VerifyEmailPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-neutral-50">
          <Header />
          <div className="flex items-center justify-center min-h-[calc(100vh-200px)] py-12">
            <div className="max-w-md w-full">
              <div className="bg-white p-8 rounded-2xl shadow-sm border border-neutral-100 text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500 mx-auto mb-4" />
                <p>Loading...</p>
              </div>
            </div>
          </div>
          <Footer />
        </div>
      }
    >
      <VerifyEmailContent />
    </Suspense>
  );
}
