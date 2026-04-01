'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff, Mail, Lock, User } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import AuthLayout from '@/components/layout/AuthLayout';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { setDocumentTitle } from '@/lib/utils';
import { authService } from '@/lib/services/auth';
import { SignUpForm, RegisterRequest, ApiError, REGISTRATION_ACCOUNT_TYPES } from '@/types';

export default function SignUpPage() {
  const { t, i18n } = useTranslation(['auth', 'common']);
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    setDocumentTitle(t('signup.title', { ns: 'auth' }));
  }, [t, i18n.language]);

  const [formData, setFormData] = useState<SignUpForm>({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    fieldOfStudy: '',
    orcidId: '',
    userType: REGISTRATION_ACCOUNT_TYPES.INDIVIDUAL,
    phoneNumber: '',
    agreeToTerms: false,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
    if (error) setError('');
  };

  const validateForm = (): boolean => {
    if (!formData.firstName.trim()) {
      setError(t('signup.errors.firstNameRequired', { ns: 'auth' }));
      return false;
    }
    if (!formData.lastName.trim()) {
      setError(t('signup.errors.lastNameRequired', { ns: 'auth' }));
      return false;
    }
    if (!formData.email.trim()) {
      setError(t('signup.errors.emailRequired', { ns: 'auth' }));
      return false;
    }
    if (!formData.password) {
      setError(t('signup.errors.passwordRequired', { ns: 'auth' }));
      return false;
    }
    if (formData.password.length < 6) {
      setError(t('signup.errors.passwordTooShort', { ns: 'auth' }));
      return false;
    }
    if (formData.password !== formData.confirmPassword) {
      setError(t('signup.errors.passwordMismatch', { ns: 'auth' }));
      return false;
    }
    if (!formData.agreeToTerms) {
      setError(t('signup.errors.agreeToTerms', { ns: 'auth' }));
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
      const registerData: RegisterRequest = {
        email: formData.email,
        password: formData.password,
        fullName: `${formData.firstName} ${formData.lastName}`,
        fieldOfStudy: "N/A",
        orcidId: formData.orcidId || "N/A",
        userType: formData.userType,
        ...(formData.phoneNumber?.trim()
          ? { phoneNumber: formData.phoneNumber.trim() }
          : {}),
        preferences: {
          language: i18n.language as 'en' | 'tr',
          theme: 'light',
          notifications: true,
          timezone: 'Europe/Istanbul'
        }
      };

      const response = await authService.register(registerData);

      if (!response.user?.emailVerified) {
        router.push('/auth/verify-email');
      } else {
        router.push('/dashboard');
      }
    } catch (err: any) {
      const apiError = err as ApiError;
      setError(apiError.message || t('signup.errors.registrationFailed', { ns: 'auth' }));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout>
      <div className="w-full max-w-lg">
        <div className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-medium border border-white/60">
          {/* Header */}
          <div className="text-center mb-7">
            <h1 className="text-2xl font-bold text-neutral-900 mb-1">
              {t('signup.title', { ns: 'auth' })}
            </h1>
            <p className="text-sm text-neutral-500">
              {t('signup.subtitle', { ns: 'auth' })}
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
            {/* Name row */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium text-neutral-700 mb-1.5">
                  {t('signup.firstNameLabel', { ns: 'auth' })}
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400 w-4 h-4" />
                  <Input
                    id="firstName"
                    name="firstName"
                    type="text"
                    required
                    value={formData.firstName}
                    onChange={handleInputChange}
                    placeholder={t('signup.firstNamePlaceholder', { ns: 'auth' })}
                    className="pl-9"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="lastName" className="block text-sm font-medium text-neutral-700 mb-1.5">
                  {t('signup.lastNameLabel', { ns: 'auth' })}
                </label>
                <Input
                  id="lastName"
                  name="lastName"
                  type="text"
                  required
                  value={formData.lastName}
                  onChange={handleInputChange}
                  placeholder={t('signup.lastNamePlaceholder', { ns: 'auth' })}
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-neutral-700 mb-1.5">
                {t('signup.emailLabel', { ns: 'auth' })}
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
                  placeholder={t('signup.emailPlaceholder', { ns: 'auth' })}
                  className="pl-9"
                />
              </div>
            </div>

            {/* User type + Phone row */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label htmlFor="userType" className="block text-sm font-medium text-neutral-700 mb-1.5">
                  {t('signup.userTypeLabel', { ns: 'auth' })}
                </label>
                <select
                  id="userType"
                  name="userType"
                  value={formData.userType}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-neutral-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-white"
                >
                  <option value={REGISTRATION_ACCOUNT_TYPES.INDIVIDUAL}>
                    {t('signup.userTypes.individual', { ns: 'auth' })}
                  </option>
                  <option value={REGISTRATION_ACCOUNT_TYPES.CORPORATE}>
                    {t('signup.userTypes.corporate', { ns: 'auth' })}
                  </option>
                </select>
              </div>
              <div>
                <label htmlFor="phoneNumber" className="block text-sm font-medium text-neutral-700 mb-1.5">
                  {t('signup.phoneLabel', { ns: 'auth' })}
                </label>
                <Input
                  id="phoneNumber"
                  name="phoneNumber"
                  type="tel"
                  autoComplete="tel"
                  value={formData.phoneNumber ?? ''}
                  onChange={handleInputChange}
                  placeholder={t('signup.phonePlaceholder', { ns: 'auth' })}
                />
              </div>
            </div>

            {/* ORCID */}
            <div>
              <label htmlFor="orcidId" className="block text-sm font-medium text-neutral-700 mb-1.5">
                ORCID
              </label>
              <Input
                id="orcidId"
                name="orcidId"
                type="text"
                value={formData.orcidId}
                onChange={handleInputChange}
                placeholder={t('signup.orcidIdPlaceholder', { ns: 'auth' })}
              />
            </div>

            {/* Password row */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-neutral-700 mb-1.5">
                  {t('signup.passwordLabel', { ns: 'auth' })}
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
                    placeholder={t('signup.passwordPlaceholder', { ns: 'auth' })}
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
                  {t('signup.confirmPasswordLabel', { ns: 'auth' })}
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
                    placeholder={t('signup.confirmPasswordPlaceholder', { ns: 'auth' })}
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
            </div>

            {/* Terms */}
            <div className="flex items-start gap-2.5 pt-1">
              <input
                id="agreeToTerms"
                name="agreeToTerms"
                type="checkbox"
                required
                checked={formData.agreeToTerms}
                onChange={handleInputChange}
                className="h-4 w-4 text-primary-500 focus:ring-primary-500 border-neutral-300 rounded mt-0.5 flex-shrink-0"
              />
              <label htmlFor="agreeToTerms" className="text-sm text-neutral-600">
                {t('signup.agreeToTerms', { ns: 'auth' })}{' '}
                <Link href="/terms" className="text-primary-600 hover:text-primary-700 font-medium">
                  {t('signup.termsOfService', { ns: 'auth' })}
                </Link>{' '}
                {t('signup.and', { ns: 'auth' })}{' '}
                <Link href="/privacy" className="text-primary-600 hover:text-primary-700 font-medium">
                  {t('signup.privacyPolicy', { ns: 'auth' })}
                </Link>
              </label>
            </div>

            <Button type="submit" className="w-full !mt-5" loading={isLoading}>
              {t('signup.signUpButton', { ns: 'auth' })}
            </Button>
          </form>

          {/* Signin redirect */}
          <div className="mt-6 pt-5 border-t border-neutral-100 text-center">
            <p className="text-sm text-neutral-500">
              {t('signup.alreadyHaveAccount', { ns: 'auth' })}{' '}
              <Link href="/auth/signin" className="text-primary-600 hover:text-primary-700 font-medium">
                {t('signup.signInLink', { ns: 'auth' })}
              </Link>
            </p>
          </div>
        </div>
      </div>
    </AuthLayout>
  );
}
