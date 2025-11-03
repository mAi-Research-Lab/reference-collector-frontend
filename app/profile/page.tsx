'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { User, Settings, Mail, Building, GraduationCap, Link2, Bell, Globe, Palette, Clock } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { setDocumentTitle } from '@/lib/utils';
import { authService } from '@/lib/services/auth';
import { useAuth } from '@/components/providers/AuthProvider';
import { User as UserType, UpdateUserRequest, ApiError, UserPreferences } from '@/types';

export default function ProfilePage() {
  const { t, i18n, ready } = useTranslation('profile');
  const router = useRouter();
  const { user, isLoading: authLoading, isAuthenticated, refreshUser } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<string>('');
  const [formData, setFormData] = useState<UpdateUserRequest>({
    fullName: '',
    fieldOfStudy: '',
    orcidId: '',
    avatarUrl: '',
    preferences: {
      language: 'en',
      theme: 'light',
      notifications: true,
      timezone: 'Europe/Istanbul'
    }
  });

  useEffect(() => {
    setDocumentTitle(t('title', { defaultValue: 'Profile - Citext' }));
  }, [t, i18n.language]);

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.push('/auth/signin');
    }
  }, [authLoading, isAuthenticated, router]);

  useEffect(() => {
    if (user) {
      setFormData({
        fullName: user.fullName || '',
        fieldOfStudy: user.fieldOfStudy || '',
        orcidId: user.orcidId || '',
        avatarUrl: user.avatarUrl || '',
        preferences: user.preferences || {
          language: 'en',
          theme: 'light',
          notifications: true,
          timezone: 'Europe/Istanbul'
        }
      });
    }
  }, [user]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    
    if (name.startsWith('preferences.')) {
      const prefKey = name.split('.')[1] as keyof UserPreferences;
      setFormData(prev => ({
        ...prev,
        preferences: {
          ...prev.preferences!,
          [prefKey]: type === 'checkbox' ? checked : value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value,
      }));
    }

    // Clear messages when user starts typing
    if (error) setError('');
    if (success) setSuccess('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    setIsLoading(true);
    setError('');
    setSuccess('');

    try {
      await authService.updateUser(formData);
      setSuccess(t('updateSuccess'));
      refreshUser(); // Refresh user data
    } catch (err: any) {
      const apiError = err as ApiError;
      setError(apiError.message || t('updateError'));
    } finally {
      setIsLoading(false);
    }
  };

  if (authLoading || !user || !ready) {
    return (
      <div className="min-h-screen bg-neutral-50">
        <Header />
        <div className="flex items-center justify-center min-h-[calc(100vh-200px)] py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!isAuthenticated) {
    return null; // Will redirect to signin
  }

  return (
    <div className="min-h-screen bg-neutral-50">
      <Header />
      
      <div className="max-w-4xl mx-auto py-12 px-4">
        <div className="bg-white rounded-2xl shadow-sm border border-neutral-100 overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-primary-500 to-primary-600 px-8 py-8">
            <div className="flex items-center gap-6">
              <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center">
                <User className="w-10 h-10 text-primary-500" />
              </div>
              <div className="text-white">
                <h1 className="text-3xl font-bold">{user.fullName}</h1>
                <p className="text-primary-100">{user.email}</p>
                <div className="flex items-center gap-4 mt-2 text-sm">
                  <span className="bg-white/20 px-3 py-1 rounded-full">
                    {user.userType}
                  </span>
                  {user.emailVerified ? (
                    <span className="bg-green-500/20 px-3 py-1 rounded-full">
                      {t('emailVerified')}
                    </span>
                  ) : (
                    <span className="bg-red-500/20 px-3 py-1 rounded-full">
                      {t('emailNotVerified')}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-8">
            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
                {error}
              </div>
            )}

            {success && (
              <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg text-green-600 text-sm">
                {success}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Personal Information */}
              <div>
                <h2 className="text-xl font-semibold text-neutral-900 mb-4 flex items-center gap-2">
                  <User className="w-5 h-5" />
                  {t('sections.personalInfo.title')}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="fullName" className="block text-sm font-medium text-neutral-700 mb-2">
                      {t('sections.personalInfo.fullName')}
                    </label>
                    <Input
                      id="fullName"
                      name="fullName"
                      type="text"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      placeholder={t('sections.personalInfo.fullNamePlaceholder')}
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-neutral-700 mb-2">
                      {t('sections.personalInfo.emailAddress')}
                    </label>
                    <div className="relative">
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={user.email}
                        disabled
                        className="bg-neutral-50"
                      />
                      <Mail className="absolute right-3 top-1/2 transform -translate-y-1/2 text-neutral-400 w-5 h-5" />
                    </div>
                    <p className="text-xs text-neutral-500 mt-1">{t('sections.personalInfo.emailCannotChange')}</p>
                  </div>
                </div>
              </div>

              {/* Academic Information */}
              <div>
                <h2 className="text-xl font-semibold text-neutral-900 mb-4 flex items-center gap-2">
                  <GraduationCap className="w-5 h-5" />
                  {t('sections.academicInfo.title')}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  
                  <div>
                    <label htmlFor="fieldOfStudy" className="block text-sm font-medium text-neutral-700 mb-2">
                      {t('sections.academicInfo.fieldOfStudy')}
                    </label>
                    <Input
                      id="fieldOfStudy"
                      name="fieldOfStudy"
                      type="text"
                      value={formData.fieldOfStudy}
                      onChange={handleInputChange}
                      placeholder={t('sections.academicInfo.fieldOfStudyPlaceholder')}
                    />
                  </div>
                  
                  <div className="md:col-span-2">
                    <label htmlFor="orcidId" className="block text-sm font-medium text-neutral-700 mb-2">
                      {t('sections.academicInfo.orcidId')}
                    </label>
                    <div className="relative">
                      <Link2 className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400 w-5 h-5" />
                      <Input
                        id="orcidId"
                        name="orcidId"
                        type="text"
                        value={formData.orcidId}
                        onChange={handleInputChange}
                        placeholder={t('sections.academicInfo.orcidIdPlaceholder')}
                        className="pl-10"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Preferences */}
              <div>
                <h2 className="text-xl font-semibold text-neutral-900 mb-4 flex items-center gap-2">
                  <Settings className="w-5 h-5" />
                  {t('sections.preferences.title')}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="preferences.language" className="block text-sm font-medium text-neutral-700 mb-2">
                      <Globe className="w-4 h-4 inline mr-1" />
                      {t('sections.preferences.language')}
                    </label>
                    <select
                      id="preferences.language"
                      name="preferences.language"
                      value={formData.preferences?.language}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    >
                      <option value="en">{t('options.language.english')}</option>
                      <option value="tr">{t('options.language.turkish')}</option>
                    </select>
                  </div>
                  
                  <div>
                    <label htmlFor="preferences.theme" className="block text-sm font-medium text-neutral-700 mb-2">
                      <Palette className="w-4 h-4 inline mr-1" />
                      {t('sections.preferences.theme')}
                    </label>
                    <select
                      id="preferences.theme"
                      name="preferences.theme"
                      value={formData.preferences?.theme}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    >
                      <option value="light">{t('options.theme.light')}</option>
                      <option value="dark">{t('options.theme.dark')}</option>
                    </select>
                  </div>
                  
                  <div>
                    <label htmlFor="preferences.timezone" className="block text-sm font-medium text-neutral-700 mb-2">
                      <Clock className="w-4 h-4 inline mr-1" />
                      {t('sections.preferences.timezone')}
                    </label>
                    <select
                      id="preferences.timezone"
                      name="preferences.timezone"
                      value={formData.preferences?.timezone}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    >
                      <option value="Europe/Istanbul">{t('options.timezones.europeIstanbul')}</option>
                      <option value="Europe/London">{t('options.timezones.europeLondon')}</option>
                      <option value="America/New_York">{t('options.timezones.americaNewYork')}</option>
                      <option value="Asia/Tokyo">{t('options.timezones.asiaTokyo')}</option>
                    </select>
                  </div>
                  
                  <div className="flex items-center">
                    <input
                      id="preferences.notifications"
                      name="preferences.notifications"
                      type="checkbox"
                      checked={formData.preferences?.notifications}
                      onChange={handleInputChange}
                      className="h-4 w-4 text-primary-500 focus:ring-primary-500 border-neutral-300 rounded"
                    />
                    <label htmlFor="preferences.notifications" className="ml-2 block text-sm text-neutral-700">
                      <Bell className="w-4 h-4 inline mr-1" />
                      {t('sections.preferences.emailNotifications')}
                    </label>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-neutral-200">
                <Button type="submit" loading={isLoading} className="flex-1">
                  {t('buttons.updateProfile')}
                </Button>
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => router.push('/auth/change-password')}
                  className="flex-1"
                >
                  {t('buttons.changePassword')}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
} 