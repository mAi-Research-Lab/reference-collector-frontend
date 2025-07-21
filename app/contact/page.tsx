'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Mail, Phone, MapPin, Send, CheckCircle, ArrowLeft } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { setDocumentTitle } from '@/lib/utils';

export default function ContactPage() {
  const { t, i18n } = useTranslation(['common']);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  // Tab title'ı dil değiştiğinde güncelle
  useEffect(() => {
    const title = t('contact.title');
    setDocumentTitle(title);
  }, [t, i18n.language]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsLoading(false);
    setIsSubmitted(true);
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
                {t('contact.success.title')}
              </h1>
              <p className="text-neutral-600 mb-8">
                {t('contact.success.description')}
              </p>
            </div>

            <Link 
              href="/" 
              className="inline-flex items-center gap-2 text-primary-500 hover:text-primary-600"
            >
              <ArrowLeft className="w-4 h-4" />
              {t('contact.success.backToHome')}
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
      
      <div className="py-20">
        <div className="container">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-4">
              {t('contact.title')}
            </h1>
            <p className="text-xl text-neutral-600 max-w-2xl mx-auto mb-2">
              {t('contact.subtitle')}
            </p>
            <p className="text-neutral-500">
              {t('contact.description')}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Contact Form */}
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-neutral-100">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-neutral-700 mb-2">
                    {t('contact.form.nameLabel')}
                  </label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder={t('contact.form.namePlaceholder')}
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-neutral-700 mb-2">
                    {t('contact.form.emailLabel')}
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder={t('contact.form.emailPlaceholder')}
                  />
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-neutral-700 mb-2">
                    {t('contact.form.subjectLabel')}
                  </label>
                  <Input
                    id="subject"
                    name="subject"
                    type="text"
                    required
                    value={formData.subject}
                    onChange={handleInputChange}
                    placeholder={t('contact.form.subjectPlaceholder')}
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-neutral-700 mb-2">
                    {t('contact.form.messageLabel')}
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={6}
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder={t('contact.form.messagePlaceholder')}
                    className="w-full px-4 py-3 border border-neutral-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200 resize-none"
                  />
                </div>

                <Button 
                  type="submit" 
                  className="w-full"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    t('common.loading')
                  ) : (
                    <>
                      <Send className="w-4 h-4 mr-2" />
                      {t('contact.form.sendButton')}
                    </>
                  )}
                </Button>
              </form>
            </div>

            {/* Contact Information */}
            <div className="space-y-8">
              <div className="bg-white rounded-2xl p-8 shadow-sm border border-neutral-100">
                <h3 className="text-xl font-semibold text-neutral-900 mb-6">
                  {t('contact.info.title')}
                </h3>
                
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Mail className="w-6 h-6 text-primary-500" />
                    </div>
                    <div>
                      <h4 className="font-medium text-neutral-900 mb-1">
                        {t('contact.info.email')}
                      </h4>
                      <a 
                        href={`mailto:${t('contact.info.emailAddress')}`}
                        className="text-primary-500 hover:text-primary-600"
                      >
                        {t('contact.info.emailAddress')}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Mail className="w-6 h-6 text-primary-500" />
                    </div>
                    <div>
                      <h4 className="font-medium text-neutral-900 mb-1">
                        {t('contact.info.support')}
                      </h4>
                      <a 
                        href={`mailto:${t('contact.info.supportAddress')}`}
                        className="text-primary-500 hover:text-primary-600"
                      >
                        {t('contact.info.supportAddress')}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Mail className="w-6 h-6 text-primary-500" />
                    </div>
                    <div>
                      <h4 className="font-medium text-neutral-900 mb-1">
                        {t('contact.info.sales')}
                      </h4>
                      <a 
                        href={`mailto:${t('contact.info.salesAddress')}`}
                        className="text-primary-500 hover:text-primary-600"
                      >
                        {t('contact.info.salesAddress')}
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl p-8 text-white">
                <h3 className="text-xl font-semibold mb-4">
                  {t('buttons.getStarted')}
                </h3>
                <p className="text-primary-100 mb-6">
                  {t('contact.description')}
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Link href="/auth/signup">
                    <Button variant="secondary" className="w-full sm:w-auto">
                      {t('buttons.startFreeTrial')}
                    </Button>
                  </Link>
                  <Link href="/pricing">
                    <Button variant="outline" className="w-full sm:w-auto text-white border-white hover:bg-white hover:text-primary-500">
                      {t('buttons.viewPricing')}
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
} 