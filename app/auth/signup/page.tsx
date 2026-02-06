'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff, Mail, Lock, User } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { setDocumentTitle } from '@/lib/utils';
import { authService } from '@/lib/services/auth';
import { SignUpForm, RegisterRequest, ApiError, USER_TYPES } from '@/types';

export default function SignUpPage() {
  const { t, i18n } = useTranslation(['auth', 'common']);
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>('');

  // Tab title'ı dil değiştiğinde güncelle
  useEffect(() => {
    const title = t('signup.title', { ns: 'auth' });
    setDocumentTitle(title);
  }, [t, i18n.language]);

  const [formData, setFormData] = useState<SignUpForm>({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    fieldOfStudy: '',
    orcidId: '',
    userType: USER_TYPES.INDIVIDUAL, // default value
    agreeToTerms: false,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
    
    // Clear error when user starts typing
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
        fieldOfStudy: formData.fieldOfStudy || "N/A",
        orcidId: formData.orcidId || "N/A",
        userType: formData.userType,
        preferences: {
          language: i18n.language as 'en' | 'tr',
          theme: 'light',
          notifications: true,
          timezone: 'Europe/Istanbul'
        }
      };

      const response = await authService.register(registerData);
      
      // If user is not email verified, redirect to verification page
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
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 via-blue-50/30 to-purple-50/20">
      <Header />
      
      <div className="flex items-center justify-center min-h-[calc(100vh-200px)] py-12">
        <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-3 gap-8 px-4">
          {/* Sol kart - Ana form */}
          <div className="lg:col-span-2 bg-white p-8 rounded-2xl shadow-lg border border-neutral-100 backdrop-blur-sm bg-white/95">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-gradient-to-r from-primary-500 to-primary-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                <User className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-neutral-900 to-neutral-700 bg-clip-text text-transparent mb-3">
                {t('signup.title', { ns: 'auth' })}
              </h1>
              <p className="text-lg text-neutral-600 max-w-md mx-auto">
                {t('signup.subtitle', { ns: 'auth' })}
              </p>
            </div>

            {error && (
              <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-400 rounded-lg text-red-700 text-sm flex items-start gap-3">
                <svg className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-neutral-700 mb-2">
                    {t('signup.firstNameLabel', { ns: 'auth' })}
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400 w-5 h-5" />
                    <Input
                      id="firstName"
                      name="firstName"
                      type="text"
                      required
                      value={formData.firstName}
                      onChange={handleInputChange}
                      placeholder={t('signup.firstNamePlaceholder', { ns: 'auth' })}
                      className="pl-10"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-neutral-700 mb-2">
                    {t('signup.lastNameLabel', { ns: 'auth' })}
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400 w-5 h-5" />
                    <Input
                      id="lastName"
                      name="lastName"
                      type="text"
                      required
                      value={formData.lastName}
                      onChange={handleInputChange}
                      placeholder={t('signup.lastNamePlaceholder', { ns: 'auth' })}
                      className="pl-10"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-neutral-700 mb-2">
                  {t('signup.emailLabel', { ns: 'auth' })}
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
                    placeholder={t('signup.emailPlaceholder', { ns: 'auth' })}
                    className="pl-10"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="userType" className="block text-sm font-medium text-neutral-700 mb-2">
                  {t('signup.userTypeLabel', { ns: 'auth' })}
                </label>
                <select
                  id="userType"
                  name="userType"
                  value={formData.userType}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                >
                  <option value={USER_TYPES.INDIVIDUAL}>{t('signup.userTypes.individual', { ns: 'auth' })}</option>
                  <option value={USER_TYPES.RESEARCHER}>{t('signup.userTypes.researcher', { ns: 'auth' })}</option>
                  <option value={USER_TYPES.STUDENT}>{t('signup.userTypes.student', { ns: 'auth' })}</option>
                  <option value={USER_TYPES.ACADEMIC}>{t('signup.userTypes.academic', { ns: 'auth' })}</option>
                  <option value={USER_TYPES.ENTERPRISE}>{t('signup.userTypes.enterprise', { ns: 'auth' })}</option>
                </select>
              </div>

              <div>
                <label htmlFor="fieldOfStudy" className="block text-sm font-medium text-neutral-700 mb-2">
                  {t('signup.fieldOfStudyLabel', { ns: 'auth' })}
                </label>
                <Input
                  id="fieldOfStudy"
                  name="fieldOfStudy"
                  type="text"
                  value={formData.fieldOfStudy}
                  onChange={handleInputChange}
                  placeholder={t('signup.fieldOfStudyPlaceholder', { ns: 'auth' })}
                />
              </div>

              <div>
                <label htmlFor="orcidId" className="block text-sm font-medium text-neutral-700 mb-2">
                  {t('signup.orcidIdLabel', { ns: 'auth' })}
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

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-neutral-700 mb-2">
                  {t('signup.passwordLabel', { ns: 'auth' })}
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400 w-5 h-5" />
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder={t('signup.passwordPlaceholder', { ns: 'auth' })}
                    className="pl-10 pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-neutral-400 hover:text-neutral-600"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-neutral-700 mb-2">
                  {t('signup.confirmPasswordLabel', { ns: 'auth' })}
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
                    placeholder={t('signup.confirmPasswordPlaceholder', { ns: 'auth' })}
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

              <div className="flex items-start">
                <input
                  id="agreeToTerms"
                  name="agreeToTerms"
                  type="checkbox"
                  required
                  checked={formData.agreeToTerms}
                  onChange={handleInputChange}
                  className="h-4 w-4 text-primary-500 focus:ring-primary-500 border-neutral-300 rounded mt-0.5"
                />
                <label htmlFor="agreeToTerms" className="ml-2 block text-sm text-neutral-700">
                  {t('signup.agreeToTerms', { ns: 'auth' })}{' '}
                  <Link href="/terms" className="text-primary-500 hover:text-primary-600">
                    {t('signup.termsOfService', { ns: 'auth' })}
                  </Link>{' '}
                  {t('signup.and', { ns: 'auth' })}{' '}
                  <Link href="/privacy" className="text-primary-500 hover:text-primary-600">
                    {t('signup.privacyPolicy', { ns: 'auth' })}
                  </Link>
                </label>
              </div>

              <Button 
                type="submit" 
                className="w-full bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white font-semibold py-3 px-6 rounded-lg transform transition-all duration-200 hover:scale-[1.02] hover:shadow-lg" 
                loading={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    <span>{t('common.creating', { ns: 'common', defaultValue: 'Creating account...' })}</span>
                  </div>
                ) : (
                  <div className="flex items-center justify-center gap-2">
                    <span>{t('signup.signUpButton', { ns: 'auth' })}</span>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </div>
                )}
              </Button>
            </form>
          </div>

          {/* Sağ kart - Diğer seçenekler */}
          <div className="bg-white p-6 rounded-2xl shadow-lg border border-neutral-100 flex flex-col backdrop-blur-sm bg-white/95">
            {/* Citext'in avantajları */}
            <div className="mb-6">
              <div className="text-center mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-green-400 to-blue-500 rounded-full mx-auto mb-3 flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-neutral-900">
                  {t('signup.benefits.title', { ns: 'auth' })}
                </h3>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-start gap-3 p-3 rounded-lg bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-neutral-900 text-sm">{t('signup.benefits.unlimitedReferences.title', { ns: 'auth' })}</h4>
                    <p className="text-xs text-neutral-600 mt-1">{t('signup.benefits.unlimitedReferences.description', { ns: 'auth' })}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 rounded-lg bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-100">
                  <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-600 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-neutral-900 text-sm">{t('signup.benefits.automaticCitation.title', { ns: 'auth' })}</h4>
                    <p className="text-xs text-neutral-600 mt-1">{t('signup.benefits.automaticCitation.description', { ns: 'auth' })}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 rounded-lg bg-gradient-to-r from-green-50 to-emerald-50 border border-green-100">
                  <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-neutral-900 text-sm">{t('signup.benefits.teamCollaboration.title', { ns: 'auth' })}</h4>
                    <p className="text-xs text-neutral-600 mt-1">{t('signup.benefits.teamCollaboration.description', { ns: 'auth' })}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Sosyal medya kayıt 
            <div className="mb-6">
              <div className="relative mb-4">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-neutral-200" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-3 bg-white text-neutral-500 font-medium">{t('signup.orContinueWith', { ns: 'auth' })}</span>
                </div>
              </div>

              <div className="space-y-3">
                <Button variant="outline" className="w-full hover:bg-red-50 hover:border-red-200 transition-colors">
                  <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  {t('signup.signUpWithGoogle', { ns: 'auth' })}
                </Button>

                <Button variant="outline" className="w-full hover:bg-gray-50 hover:border-gray-300 transition-colors">
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.30.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                  {t('signup.signUpWithGitHub', { ns: 'auth' })}
                </Button>
              </div>
            </div>
*/}
            {/* Güven göstergeleri */}
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-4 rounded-lg border border-green-100 mb-4">
              <div className="flex items-center justify-center space-x-4 text-xs text-green-700">
                <div className="flex items-center gap-1">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                  <span>SSL Güvenli</span>
                </div>
                <div className="flex items-center gap-1">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>GDPR Uyumlu</span>
                </div>
                <div className="flex items-center gap-1">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  <span>Hızlı Kurulum</span>
                </div>
              </div>
            </div>

            {/* Signin yönlendirme */}
            <div className="text-center p-4 bg-gradient-to-br from-primary-50 to-blue-50 rounded-lg border border-primary-100">
              <h4 className="font-semibold text-neutral-900 mb-1">
                {t('signup.alreadyHaveAccount', { ns: 'auth' })}
              </h4>
              <p className="text-xs text-neutral-600 mb-3">
                {t('signup.benefits.signinPrompt', { ns: 'auth' })}
              </p>
              <Link href="/auth/signin">
                <Button variant="outline" className="w-full border-primary-200 text-primary-700 hover:bg-primary-50">
                  {t('signup.signInLink', { ns: 'auth' })}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
} 