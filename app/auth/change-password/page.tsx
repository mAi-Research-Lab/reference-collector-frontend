'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Lock, Eye, EyeOff, CheckCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { setDocumentTitle } from '@/lib/utils';
import { authService } from '@/lib/services/auth';
import { ChangePasswordForm, ApiError } from '@/types';

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
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));

    // Clear error when user starts typing
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
      <div className="min-h-screen bg-neutral-50">
        <Header />
        <div className="flex items-center justify-center min-h-[calc(100vh-200px)] py-12">
          <div className="max-w-md w-full">
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-neutral-100 text-center">
              <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-6" />
              <h1 className="text-3xl font-bold text-neutral-900 mb-4">
                {t('changePassword.success', { ns: 'auth' })}
              </h1>
              <p className="text-lg text-neutral-600 mb-8">
                {t('changePassword.successDescription', { ns: 'auth' })}
              </p>
              <div className="space-y-4">
                <Button onClick={() => router.push('/dashboard')}>
                  {t('changePassword.goToDashboard', { ns: 'auth' })}
                </Button>
                <div>
                  <Button onClick={() => setIsSuccess(false)} variant="ghost">
                    {t('changePassword.changeAnother', { ns: 'auth' })}
                  </Button>
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
              <Lock className="w-16 h-16 text-primary-500 mx-auto mb-6" />
              <h1 className="text-3xl font-bold text-neutral-900 mb-2">
                {t('changePassword.title', { ns: 'auth' })}
              </h1>
              <p className="text-neutral-600">
                {t('changePassword.subtitle', { ns: 'auth' })}
              </p>
            </div>

            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="currentPassword" className="block text-sm font-medium text-neutral-700 mb-2">
                  {t('changePassword.currentPasswordLabel', { ns: 'auth' })}
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400 w-5 h-5" />
                  <Input
                    id="currentPassword"
                    name="currentPassword"
                    type={showCurrentPassword ? 'text' : 'password'}
                    required
                    value={formData.currentPassword}
                    onChange={handleInputChange}
                    placeholder={t('changePassword.currentPasswordPlaceholder', { ns: 'auth' })}
                    className="pl-10 pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-neutral-400 hover:text-neutral-600"
                  >
                    {showCurrentPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              <div>
                <label htmlFor="newPassword" className="block text-sm font-medium text-neutral-700 mb-2">
                  {t('changePassword.newPasswordLabel', { ns: 'auth' })}
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400 w-5 h-5" />
                  <Input
                    id="newPassword"
                    name="newPassword"
                    type={showNewPassword ? 'text' : 'password'}
                    required
                    value={formData.newPassword}
                    onChange={handleInputChange}
                    placeholder={t('changePassword.newPasswordPlaceholder', { ns: 'auth' })}
                    className="pl-10 pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-neutral-400 hover:text-neutral-600"
                  >
                    {showNewPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-neutral-700 mb-2">
                  {t('changePassword.confirmPasswordLabel', { ns: 'auth' })}
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
                    placeholder={t('changePassword.confirmPasswordPlaceholder', { ns: 'auth' })}
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
                {t('changePassword.changeButton', { ns: 'auth' })}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <button 
                onClick={() => router.back()}
                className="text-sm text-neutral-500 hover:text-neutral-700"
              >
                {t('changePassword.goBack', { ns: 'auth' })}
              </button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
} 