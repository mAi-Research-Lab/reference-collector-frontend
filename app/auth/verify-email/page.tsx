'use client';

import React, { useState, useEffect, useCallback, Suspense, useMemo, useRef } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Mail, CheckCircle, XCircle, Loader2 } from 'lucide-react';
import AuthLayout from '@/components/layout/AuthLayout';
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
  const processedTokenRef = useRef<string | null>(null);

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
        try { sessionStorage.removeItem(RESEND_STORAGE_KEY); } catch { /* ignore */ }
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
      setTimeout(() => { router.push('/auth/signin'); }, 2000);
    } catch (err: any) {
      const apiError = err as ApiError;
      setError(apiError.message || t('verifyEmail.errors.verificationFailed'));
      setStatus('error');
    }
  }, [router, t]);

  useEffect(() => {
    if (!token) return;
    if (processedTokenRef.current === token) return;
    processedTokenRef.current = token;
    void verifyEmail(token);
  }, [token, verifyEmail]);

  const resendVerificationEmail = async () => {
    if (secondsLeft > 0 || isResending) return;
    setIsResending(true);
    setError('');
    try {
      await authService.resendVerificationEmail();
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
            <div className="w-16 h-16 bg-primary-50 rounded-2xl mx-auto flex items-center justify-center">
              <Mail className="w-8 h-8 text-primary-500" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-neutral-900 mb-2">
                {t('verifyEmail.checkInboxTitle')}
              </h1>
              <p className="text-sm text-neutral-500 leading-relaxed mb-2">
                {t('verifyEmail.checkInboxBody')}
              </p>
              <p className="text-xs text-neutral-400 leading-relaxed">
                {t('verifyEmail.checkInboxHint')}
              </p>
            </div>

            <div className="border-t border-neutral-100 pt-6">
              <p className="text-sm font-medium text-neutral-700 mb-1">
                {t('verifyEmail.resendSectionTitle')}
              </p>
              <p className="text-xs text-neutral-500 mb-4">
                <span className="font-semibold text-primary-600">{t('verifyEmail.resendEmphasis')}</span>{' '}
                {t('verifyEmail.resendButton')}
              </p>
              <Button
                onClick={() => void resendVerificationEmail()}
                loading={isResending}
                disabled={secondsLeft > 0 || isResending}
                variant="outline"
                className="w-full"
              >
                {secondsLeft > 0
                  ? t('verifyEmail.resendCooldown', { seconds: secondsLeft })
                  : t('verifyEmail.resendButtonFull')}
              </Button>
            </div>

            <Button onClick={() => router.push('/auth/signin')} variant="ghost" type="button" className="w-full">
              {t('verifyEmail.backToSignIn')}
            </Button>
          </div>
        );

      case 'verifying':
        return (
          <div className="text-center space-y-5">
            <div className="w-16 h-16 bg-primary-50 rounded-2xl mx-auto flex items-center justify-center">
              <Loader2 className="w-8 h-8 text-primary-500 animate-spin" />
            </div>
            <h1 className="text-2xl font-bold text-neutral-900">
              {t('verifyEmail.verifying')}
            </h1>
            <p className="text-sm text-neutral-500">
              {t('verifyEmail.verifyingDescription')}
            </p>
          </div>
        );

      case 'success':
        return (
          <div className="text-center space-y-5">
            <div className="w-16 h-16 bg-green-100 rounded-full mx-auto flex items-center justify-center">
              <CheckCircle className="w-8 h-8 text-green-500" />
            </div>
            <h1 className="text-2xl font-bold text-neutral-900">
              {t('verifyEmail.success')}
            </h1>
            <p className="text-sm text-neutral-500">
              {t('verifyEmail.successDescription')}
            </p>
            <Button onClick={() => router.push('/auth/signin')} className="w-full">
              {t('verifyEmail.goToSignIn')}
            </Button>
          </div>
        );

      case 'error':
        return (
          <div className="text-center space-y-5">
            <div className="w-16 h-16 bg-red-100 rounded-full mx-auto flex items-center justify-center">
              <XCircle className="w-8 h-8 text-red-500" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-neutral-900 mb-2">
                {t('verifyEmail.error')}
              </h1>
              <p className="text-sm text-neutral-500">
                {error || t('verifyEmail.errorDescription')}
              </p>
            </div>
            <div className="border-t border-neutral-100 pt-5">
              <p className="text-xs text-neutral-500 mb-4">
                <span className="font-semibold text-primary-600">{t('verifyEmail.resendEmphasis')}</span>{' '}
                {t('verifyEmail.resendButton')}
              </p>
              <Button
                onClick={() => void resendVerificationEmail()}
                loading={isResending}
                disabled={secondsLeft > 0 || isResending}
                className="w-full"
              >
                {secondsLeft > 0
                  ? t('verifyEmail.resendCooldown', { seconds: secondsLeft })
                  : t('verifyEmail.resendButtonFull')}
              </Button>
            </div>
            <Button onClick={() => router.push('/auth/signin')} variant="ghost" type="button" className="w-full">
              {t('verifyEmail.backToSignIn')}
            </Button>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <AuthLayout>
      <div className="w-full max-w-md px-4">
        <div className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-medium border border-white/60">
          {renderContent()}
        </div>
      </div>
    </AuthLayout>
  );
}

export default function VerifyEmailPage() {
  return (
    <Suspense
      fallback={
        <AuthLayout>
          <div className="w-full max-w-md">
            <div className="bg-white/80 backdrop-blur-sm p-10 rounded-2xl shadow-medium border border-white/60 text-center">
              <div className="w-12 h-12 border-2 border-primary-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
              <p className="text-neutral-500 text-sm">Loading...</p>
            </div>
          </div>
        </AuthLayout>
      }
    >
      <VerifyEmailContent />
    </Suspense>
  );
}
