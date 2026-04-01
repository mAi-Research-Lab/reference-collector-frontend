'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Lock, Eye, EyeOff, CheckCircle } from 'lucide-react';
import AuthLayout from '@/components/layout/AuthLayout';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { setDocumentTitle } from '@/lib/utils';
import { authService } from '@/lib/services/auth';
import { ChangePasswordForm, ApiError } from '@/types';
import { useTranslation } from 'next-i18next';

export default function ChangePasswordPage() {
  const { t } = useTranslation(['auth', 'common']);
  const router = useRouter();
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>('');
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    setDocumentTitle(t('changePassword.title', { ns: 'auth' }));
  }, [t]);

  const [formData, setFormData] = useState<ChangePasswordForm>({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (error) setError('');
  };

  const validateForm = (): boolean => {
    if (!formData.currentPassword) {
      setError(t('changePassword.errors.currentPasswordRequired', { ns: 'auth' }));
      return false;
    }
    if (!formData.newPassword) {
      setError(t('changePassword.errors.newPasswordRequired', { ns: 'auth' }));
      return false;
    }
    if (formData.newPassword.length < 6) {
      setError(t('changePassword.errors.passwordTooShort', { ns: 'auth' }));
      return false;
    }
    if (formData.newPassword !== formData.confirmPassword) {
      setError(t('changePassword.errors.passwordMismatch', { ns: 'auth' }));
      return false;
    }
    if (formData.currentPassword === formData.newPassword) {
      setError(t('changePassword.errors.samePassword', { ns: 'auth' }));
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
      await authService.changePassword({
        currentPassword: formData.currentPassword,
        newPassword: formData.newPassword,
      });
      setIsSuccess(true);
    } catch (err: any) {
      const apiError = err as ApiError;
      setError(apiError.message || t('changePassword.errors.changeFailed', { ns: 'auth' }));
    } finally {
      setIsLoading(false);
    }
  };

  if (isSuccess) {
    return (
      <AuthLayout>
        <div className="w-full max-w-md">
          <div className="bg-white/80 backdrop-blur-sm p-10 rounded-2xl shadow-medium border border-white/60 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full mx-auto mb-6 flex items-center justify-center">
              <CheckCircle className="w-8 h-8 text-green-500" />
            </div>
            <h1 className="text-2xl font-bold text-neutral-900 mb-3">
              {t('changePassword.success', { ns: 'auth' })}
            </h1>
            <p className="text-neutral-500 text-sm mb-8">
              {t('changePassword.successDescription', { ns: 'auth' })}
            </p>
            <div className="flex flex-col gap-3">
              <Button onClick={() => router.push('/dashboard')} className="w-full">
                {t('changePassword.goToDashboard', { ns: 'auth' })}
              </Button>
              <Button onClick={() => setIsSuccess(false)} variant="ghost" className="w-full">
                {t('changePassword.changeAnother', { ns: 'auth' })}
              </Button>
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
              <Lock className="w-7 h-7 text-primary-500" />
            </div>
            <h1 className="text-2xl font-bold text-neutral-900 mb-2">
              {t('changePassword.title', { ns: 'auth' })}
            </h1>
            <p className="text-sm text-neutral-500">
              {t('changePassword.subtitle', { ns: 'auth' })}
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
              <label htmlFor="currentPassword" className="block text-sm font-medium text-neutral-700 mb-1.5">
                {t('changePassword.currentPasswordLabel', { ns: 'auth' })}
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400 w-4 h-4" />
                <Input
                  id="currentPassword"
                  name="currentPassword"
                  type={showCurrentPassword ? 'text' : 'password'}
                  required
                  value={formData.currentPassword}
                  onChange={handleInputChange}
                  placeholder={t('changePassword.currentPasswordPlaceholder', { ns: 'auth' })}
                  className="pl-9 pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600 transition-colors"
                >
                  {showCurrentPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div>
              <label htmlFor="newPassword" className="block text-sm font-medium text-neutral-700 mb-1.5">
                {t('changePassword.newPasswordLabel', { ns: 'auth' })}
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400 w-4 h-4" />
                <Input
                  id="newPassword"
                  name="newPassword"
                  type={showNewPassword ? 'text' : 'password'}
                  required
                  value={formData.newPassword}
                  onChange={handleInputChange}
                  placeholder={t('changePassword.newPasswordPlaceholder', { ns: 'auth' })}
                  className="pl-9 pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600 transition-colors"
                >
                  {showNewPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-neutral-700 mb-1.5">
                {t('changePassword.confirmPasswordLabel', { ns: 'auth' })}
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
                  placeholder={t('changePassword.confirmPasswordPlaceholder', { ns: 'auth' })}
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
              {t('changePassword.changeButton', { ns: 'auth' })}
            </Button>
          </form>

          <div className="mt-5 text-center">
            <button
              onClick={() => router.back()}
              className="text-sm text-neutral-500 hover:text-neutral-700 transition-colors"
            >
              {t('changePassword.goBack', { ns: 'auth' })}
            </button>
          </div>
        </div>
      </div>
    </AuthLayout>
  );
}
