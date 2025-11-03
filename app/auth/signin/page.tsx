'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff, Mail, Lock } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { setDocumentTitle } from '@/lib/utils';
import { authService } from '@/lib/services/auth';
import { SignInForm, ApiError } from '@/types';
import { useAuth } from '@/components/providers/AuthProvider';

export default function SignInPage() {
  const { t, i18n } = useTranslation(['auth', 'common']);
  const router = useRouter();
  const { signIn } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>('');

  // Tab title'ı dil değiştiğinde güncelle
  useEffect(() => {
    const title = t('signin.title', { ns: 'auth' });
    setDocumentTitle(title);
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

    // Clear error when user starts typing
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
      
      // Small delay to allow AuthProvider state to update
      setTimeout(() => {
        router.push('/dashboard');
      }, 100);
    } catch (err: any) {
      const apiError = err as ApiError;
      setError(apiError.message || t('signin.errors.signInFailed', { ns: 'auth' }));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-50">
      <Header />
      
      <div className="flex items-center justify-center min-h-[calc(100vh-200px)] py-12">
        <div className="max-w-5xl w-full grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Sol kart - Ana form */}
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-neutral-100">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-neutral-900 mb-2">
                {t('signin.title', { ns: 'auth' })}
              </h1>
              <p className="text-neutral-600">
                {t('signin.subtitle', { ns: 'auth' })}
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
                  {t('signin.email', { ns: 'auth' })}
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
                    placeholder={t('signin.emailPlaceholder', { ns: 'auth' })}
                    className="pl-10"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-neutral-700 mb-2">
                  {t('signin.password', { ns: 'auth' })}
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
                    placeholder={t('signin.passwordPlaceholder', { ns: 'auth' })}
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

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="rememberMe"
                    name="rememberMe"
                    type="checkbox"
                    checked={formData.rememberMe}
                    onChange={handleInputChange}
                    className="h-4 w-4 text-primary-500 focus:ring-primary-500 border-neutral-300 rounded"
                  />
                  <label htmlFor="rememberMe" className="ml-2 block text-sm text-neutral-700">
                    {t('signin.rememberMe', { ns: 'auth' })}
                  </label>
                </div>

                <Link href="/auth/forgot-password" className="text-sm text-primary-500 hover:text-primary-600">
                  {t('signin.forgotPassword', { ns: 'auth' })}
                </Link>
              </div>

              <Button type="submit" className="w-full" loading={isLoading}>
                {t('signin.signInButton', { ns: 'auth' })}
              </Button>
            </form>
          </div>

          {/* Sağ kart - Diğer seçenekler */}
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-neutral-100 flex flex-col">
            {/* Sosyal medya giriş */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-neutral-900 mb-4 text-center">
                {t('signin.orContinueWith', { ns: 'auth' })}
              </h3>

              <div className="space-y-3">
                <Button variant="outline" className="w-full">
                  <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  {t('signin.signInWithGoogle', { ns: 'auth' })}
                </Button>

                <Button variant="outline" className="w-full">
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.30.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                  {t('signin.signInWithGitHub', { ns: 'auth' })}
                </Button>
              </div>
            </div>

            {/* Separator */}
            <div className="relative mb-8">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-neutral-200" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-3 bg-white text-neutral-500">veya</span>
              </div>
            </div>

            {/* Signup yönlendirme */}
            <div className="mt-auto">
              <div className="text-center p-6 bg-gradient-to-br from-primary-50 to-primary-100 rounded-xl border border-primary-200">
                <h4 className="text-lg font-semibold text-neutral-900 mb-2">
                  {t('signin.noAccount', { ns: 'auth' })}
                </h4>
                <p className="text-sm text-neutral-600 mb-4">
                    Citext'a katılın ve referanslarınızı organize etmeye başlayın
                </p>
                <Link href="/auth/signup">
                  <Button variant="primary" className="w-full">
                    {t('signin.signUpLink', { ns: 'auth' })}
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