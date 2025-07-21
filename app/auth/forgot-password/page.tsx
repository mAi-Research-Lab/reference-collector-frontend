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

export default function ForgotPasswordPage() {
  const { t, i18n } = useTranslation(['auth', 'common']);
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Tab title'ı dil değiştiğinde güncelle
  useEffect(() => {
    const title = t('forgotPassword.title', { ns: 'auth' });
    setDocumentTitle(title);
  }, [t, i18n.language]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsLoading(false);
    setIsSubmitted(true);
  };

  const handleResendLink = async () => {
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsLoading(false);
    // Could show a toast notification here
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-neutral-50">
        <Header />
        
        <div className="flex items-center justify-center min-h-[calc(100vh-200px)] py-12">
          <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-2xl shadow-sm border border-neutral-100 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-8 h-8 text-green-500" />
            </div>
            
            <div>
              <h1 className="text-3xl font-bold text-neutral-900 mb-2">
                {t('forgotPassword.checkEmail', { ns: 'auth' })}
              </h1>
              <p className="text-neutral-600 mb-8">
                {t('forgotPassword.resetLinkSent', { ns: 'auth' })}
              </p>
            </div>

            <div className="space-y-4">
              <p className="text-sm text-neutral-500">
                {t('forgotPassword.didntReceiveEmail', { ns: 'auth' })}
              </p>
              
              <Button 
                variant="outline" 
                onClick={handleResendLink}
                disabled={isLoading}
                className="w-full"
              >
                {isLoading ? t('common.loading', { ns: 'common' }) : t('forgotPassword.resendLink', { ns: 'auth' })}
              </Button>
            </div>

            <Link 
              href="/auth/signin" 
              className="inline-flex items-center gap-2 text-primary-500 hover:text-primary-600 text-sm"
            >
              <ArrowLeft className="w-4 h-4" />
              {t('forgotPassword.backToSignIn', { ns: 'auth' })}
            </Link>
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
        <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-2xl shadow-sm border border-neutral-100">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-neutral-900 mb-2">
              {t('forgotPassword.title', { ns: 'auth' })}
            </h1>
            <p className="text-neutral-600">
              {t('forgotPassword.subtitle', { ns: 'auth' })}
            </p>
          </div>

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
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t('forgotPassword.emailPlaceholder', { ns: 'auth' })}
                  className="pl-10"
                />
              </div>
            </div>

            <Button 
              type="submit" 
              className="w-full"
              disabled={isLoading}
            >
              {isLoading ? t('common.loading', { ns: 'common' }) : t('forgotPassword.sendResetLinkButton', { ns: 'auth' })}
            </Button>
          </form>

          <div className="text-center">
            <Link 
              href="/auth/signin" 
              className="inline-flex items-center gap-2 text-primary-500 hover:text-primary-600 text-sm"
            >
              <ArrowLeft className="w-4 h-4" />
              {t('forgotPassword.backToSignIn', { ns: 'auth' })}
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
} 