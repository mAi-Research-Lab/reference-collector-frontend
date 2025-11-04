'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  User,
  Mail,
  Calendar,
  MapPin,
  Shield,
  Settings,
  Edit3,
  Bell,
  Globe,
  Eye,
  CheckCircle,
  XCircle,
  Clock,
  GraduationCap,
  Badge,
  LogOut
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Button from '@/components/ui/Button';
import { setDocumentTitle } from '@/lib/utils';
import { useAuth } from '@/components/providers/AuthProvider';
import { USER_TYPES } from '@/types';

export default function DashboardPage() {
  const { t, i18n, ready } = useTranslation('dashboard'); // Ana namespace olarak dashboard kullan
  const { user, isLoading, isAuthenticated, signOut } = useAuth();
  const router = useRouter();

  useEffect(() => {
    const title = t('title', { defaultValue: 'Dashboard - Citext' });
    setDocumentTitle(title);
  }, [t, i18n.language]);

  useEffect(() => {
    // Only redirect if not loading and definitely not authenticated
    if (!isLoading && !isAuthenticated && !user) {
      router.push('/auth/signin');
    }
  }, [isLoading, isAuthenticated, user, router]);

  if (isLoading || !ready) {
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

  if (!isAuthenticated || !user) {
    return null; // Will redirect to signin
  }

  // Format dates
  const formatDate = (dateString: string) => {
    const locale = i18n.language === 'tr' ? 'tr-TR' : 'en-US';
    return new Date(dateString).toLocaleDateString(locale, {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Get user type display name
  const getUserTypeDisplay = (userType: string) => {
    switch (userType) {
      case USER_TYPES.INDIVIDUAL:
        return t('userTypes.individual');
      case USER_TYPES.RESEARCHER:
        return t('userTypes.researcher');
      case USER_TYPES.STUDENT:
        return t('userTypes.student');
      case USER_TYPES.ACADEMIC:
        return t('userTypes.academic');
      case USER_TYPES.ENTERPRISE:
        return t('userTypes.enterprise');
      default:
        return userType;
    }
  };

  // Get theme display name
  const getThemeDisplay = (theme: string) => {
    if (!theme) return theme;
    
    switch (theme.toLowerCase()) {
      case 'light':
        return t('userPreferences.theme_light');
      case 'dark':
        return t('userPreferences.theme_dark');
      case 'system':
        return t('userPreferences.theme_system');
      case 'auto':
        return t('userPreferences.theme_auto');
      default:
        return theme;
    }
  };

  // Get timezone display name
  const getTimezoneDisplay = (timezone: string) => {
    if (!timezone) return timezone;
    
    // Common timezone mappings
    switch (timezone.toLowerCase()) {
      case 'utc':
        return t('userPreferences.timezone_utc');
      case 'europe/istanbul':
        return t('userPreferences.timezone_europe_istanbul');
      case 'europe/london':
        return t('userPreferences.timezone_europe_london');
      case 'america/new_york':
        return t('userPreferences.timezone_america_new_york');
      case 'america/los_angeles':
        return t('userPreferences.timezone_america_los_angeles');
      case 'asia/tokyo':
        return t('userPreferences.timezone_asia_tokyo');
      case 'asia/shanghai':
        return t('userPreferences.timezone_asia_shanghai');
      case 'australia/sydney':
        return t('userPreferences.timezone_australia_sydney');
      default:
        return timezone;
    }
  };

  // Get subscription status color
  const getStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case 'active':
        return 'text-green-600 bg-green-100';
      case 'inactive':
        return 'text-red-600 bg-red-100';
      case 'trial':
        return 'text-blue-600 bg-blue-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="min-h-screen bg-neutral-50">
      <Header />

      <div className="max-w-7xl mx-auto py-8 px-4">
        {/* Welcome Header */}
        <div className="bg-gradient-to-r from-primary-500 to-primary-600 rounded-2xl p-8 mb-8 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">
                {t('welcome').replace('{name}', user?.fullName || user?.email || (i18n.language === 'tr' ? 'Kullanıcı' : 'User'))}
              </h1>
              <p className="text-primary-100 text-lg">
                {t('subtitle')}
              </p>
            </div>
            <div className="hidden md:flex items-center space-x-4">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                <User className="w-8 h-8 text-white" />
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Profile Information */}
          <div className="lg:col-span-2 space-y-6">
            {/* Basic Info Card */}
            <div className="bg-white rounded-2xl border border-neutral-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-neutral-900 flex items-center gap-2">
                  <User className="w-5 h-5" />
                  {t('personalInfo.title')}
                </h2>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => router.push('/profile')}
                >
                  <Edit3 className="w-4 h-4 mr-2" />
                  {t('personalInfo.edit')}
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      <Mail className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm text-neutral-500">{t('personalInfo.email')}</p>
                      <p className="font-medium text-neutral-900">{user.email}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                      <Badge className="w-5 h-5 text-purple-600" />
                    </div>
                    <div>
                      <p className="text-sm text-neutral-500">{t('personalInfo.userType')}</p>
                      <p className="font-medium text-neutral-900">{getUserTypeDisplay(user.userType)}</p>
                    </div>
                  </div>

                  {user.fieldOfStudy && (
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                        <GraduationCap className="w-5 h-5 text-green-600" />
                      </div>
                      <div>
                        <p className="text-sm text-neutral-500">{t('personalInfo.fieldOfStudy')}</p>
                        <p className="font-medium text-neutral-900">{user.fieldOfStudy}</p>
                      </div>
                    </div>
                  )}
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center">
                      <Calendar className="w-5 h-5 text-indigo-600" />
                    </div>
                    <div>
                      <p className="text-sm text-neutral-500">{t('personalInfo.membershipDate')}</p>
                      <p className="font-medium text-neutral-900">{formatDate(user.createdAt)}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-cyan-100 rounded-lg flex items-center justify-center">
                      <Clock className="w-5 h-5 text-cyan-600" />
                    </div>
                    <div>
                      <p className="text-sm text-neutral-500">{t('personalInfo.lastUpdate')}</p>
                      <p className="font-medium text-neutral-900">{formatDate(user.updatedAt)}</p>
                    </div>
                  </div>

                  {user.lastLogin && (
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
                        <Eye className="w-5 h-5 text-yellow-600" />
                      </div>
                      <div>
                        <p className="text-sm text-neutral-500">{t('personalInfo.lastLogin')}</p>
                        <p className="font-medium text-neutral-900">{formatDate(user.lastLogin)}</p>
                      </div>
                    </div>
                  )}

                  {user.orcidId && (
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-pink-100 rounded-lg flex items-center justify-center">
                        <Shield className="w-5 h-5 text-pink-600" />
                      </div>
                      <div>
                        <p className="text-sm text-neutral-500">{t('personalInfo.orcidId')}</p>
                        <p className="font-medium text-neutral-900">{user.orcidId}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Account Status */}
            <div className="bg-white rounded-2xl border border-neutral-200 p-6">
              <h2 className="text-xl font-semibold text-neutral-900 mb-6 flex items-center gap-2">
                <Shield className="w-5 h-5" />
                {t('accountStatus.title')}
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-4 rounded-lg border border-neutral-200">
                  {user.emailVerified ? (
                    <CheckCircle className="w-8 h-8 text-green-500 mx-auto mb-2" />
                  ) : (
                    <XCircle className="w-8 h-8 text-red-500 mx-auto mb-2" />
                  )}
                  <p className="text-sm font-medium text-neutral-900">{t('accountStatus.emailConfirm')}</p>
                  <span className={`text-xs px-2 py-1 rounded-full ${user.emailVerified ? 'text-green-600 bg-green-100' : 'text-red-600 bg-red-100'}`}>
                    {user.emailVerified
                      ? t('accountStatus.verified')
                      : t('accountStatus.notVerified')}
                  </span>
                </div>

                <div className="text-center p-4 rounded-lg border border-neutral-200">
                  {user.isActive ? (
                    <CheckCircle className="w-8 h-8 text-green-500 mx-auto mb-2" />
                  ) : (
                    <XCircle className="w-8 h-8 text-red-500 mx-auto mb-2" />
                  )}
                  <p className="text-sm font-medium text-neutral-900">{t('accountStatus.accountStatus')}</p>
                  <span className={`text-xs px-2 py-1 rounded-full ${user.isActive ? 'text-green-600 bg-green-100' : 'text-red-600 bg-red-100'}`}>
                    {user.isActive
                      ? t('accountStatus.active')
                      : t('accountStatus.inactive')}
                  </span>
                </div>

                <div className="text-center p-4 rounded-lg border border-neutral-200">
                  <Shield className="w-8 h-8 text-blue-500 mx-auto mb-2" />
                  <p className="text-sm font-medium text-neutral-900">{t('accountStatus.subscription')}</p>
                  <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(user.subscriptionStatus)}`}>
                    {user.subscriptionStatus 
                      ? t(`subscriptionStatus.${user.subscriptionStatus.toLowerCase()}`, { defaultValue: user.subscriptionStatus })
                      : t('subscriptionStatus.free')}
                  </span>
                </div>
              </div>
            </div>

            {/* User Preferences */}
            {user.preferences && (
              <div className="bg-white rounded-2xl border border-neutral-200 p-6">
                <h2 className="text-xl font-semibold text-neutral-900 mb-6 flex items-center gap-2">
                  <Settings className="w-5 h-5" />
                  {t('userPreferences.title')}
                </h2>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      <Globe className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm text-neutral-500">{t('userPreferences.language')}</p>
                      <p className="font-medium text-neutral-900">
                        {user.preferences.language === 'tr'
                          ? t('userPreferences.language_tr')
                          : t('userPreferences.language_en')}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                      <Eye className="w-5 h-5 text-purple-600" />
                    </div>
                    <div>
                      <p className="text-sm text-neutral-500">{t('userPreferences.theme')}</p>
                      <p className="font-medium text-neutral-900">{getThemeDisplay(user.preferences.theme)}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
                      <Bell className="w-5 h-5 text-yellow-600" />
                    </div>
                    <div>
                      <p className="text-sm text-neutral-500">{t('userPreferences.notifications')}</p>
                      <p className="font-medium text-neutral-900">
                        {user.preferences.notifications
                          ? t('userPreferences.notifications_on')
                          : t('userPreferences.notifications_off')}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                      <MapPin className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <p className="text-sm text-neutral-500">{t('userPreferences.timePeriod')}</p>
                      <p className="font-medium text-neutral-900">{getTimezoneDisplay(user.preferences.timezone)}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar with Quick Actions */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <div className="bg-white rounded-2xl border border-neutral-200 p-6">
              <h3 className="text-lg font-semibold text-neutral-900 mb-4">
                {t('quickActions.title')}
              </h3>
              <div className="space-y-3">
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  onClick={() => router.push('/profile')}
                >
                  <Edit3 className="w-4 h-4 mr-2" />
                  {t('quickActions.editProfile')}
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  onClick={() => router.push('/auth/change-password')}
                >
                  <Shield className="w-4 h-4 mr-2" />
                  {t('quickActions.changePassword')}
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  onClick={() => {
                    const hasActiveSubscription = user.subscriptionStatus === 'active' || user.subscriptionPlan;
                    router.push(hasActiveSubscription ? '/payment' : '/pricing');
                  }}
                >
                  <Settings className="w-4 h-4 mr-2" />
                  {t('quickActions.paymentSettings')}
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  onClick={() => {
                    signOut(); // oturumu sonlandır
                  }}
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  {t('quickActions.logOut')}
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