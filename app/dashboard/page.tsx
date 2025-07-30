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
  BookOpen,
  Users,
  FileText,
  Bell,
  Globe,
  Eye,
  CheckCircle,
  XCircle,
  Clock,
  Building,
  GraduationCap,
  Badge
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Button from '@/components/ui/Button';
import { setDocumentTitle } from '@/lib/utils';
import { useAuth } from '@/components/providers/AuthProvider';
import { USER_TYPES } from '@/types';

export default function DashboardPage() {
  const { t, i18n } = useTranslation(['common', 'dashboard']);
  const { user, isLoading, isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    const title = t('dashboard.title', { ns: 'dashboard', defaultValue: 'Dashboard - RefCite' });
    setDocumentTitle(title);
  }, [t, i18n.language]);

  useEffect(() => {
    // Only redirect if not loading and definitely not authenticated
    if (!isLoading && !isAuthenticated && !user) {
      router.push('/auth/signin');
    }
  }, [isLoading, isAuthenticated, user, router]);

  if (isLoading) {
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
    return new Date(dateString).toLocaleDateString('tr-TR', {
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
        return 'Individual User';
      case USER_TYPES.RESEARCHER:
        return 'Researcher';
      case USER_TYPES.STUDENT:
        return 'Student';
      case USER_TYPES.ACADEMIC:
        return 'Academic';
      case USER_TYPES.ENTERPRISE:
        return 'Enterprise';
      default:
        return userType;
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
                {t('dashboard.welcome', { ns: 'dashboard', name: user.fullName })}
              </h1>
              <p className="text-primary-100 text-lg">
                {t('dashboard.subtitle', { ns: 'dashboard' })}
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
                  {t('dashboard.personalInfo.title', { ns: 'dashboard' })}
                </h2>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => router.push('/profile')}
                >
                  <Edit3 className="w-4 h-4 mr-2" />
                  {t('dashboard.personalInfo.edit', { ns: 'dashboard' })}
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      <Mail className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm text-neutral-500">{t('dashboard.personalInfo.email', { ns: 'dashboard' })}</p>
                      <p className="font-medium text-neutral-900">{user.email}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                      <Badge className="w-5 h-5 text-purple-600" />
                    </div>
                    <div>
                      <p className="text-sm text-neutral-500">{t('dashboard.personalInfo.userType', { ns: 'dashboard' })}</p>
                      <p className="font-medium text-neutral-900">{getUserTypeDisplay(user.userType)}</p>
                    </div>
                  </div>

                  {user.institutionId && (
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                        <Building className="w-5 h-5 text-orange-600" />
                      </div>
                      <div>
                        <p className="text-sm text-neutral-500">{t('dashboard.personalInfo.institution', { ns: 'dashboard' })}</p>
                        <p className="font-medium text-neutral-900">{user.institutionId}</p>
                      </div>
                    </div>
                  )}

                  {user.fieldOfStudy && (
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                        <GraduationCap className="w-5 h-5 text-green-600" />
                      </div>
                      <div>
                        <p className="text-sm text-neutral-500">{t('dashboard.personalInfo.fieldOfStudy', { ns: 'dashboard' })}</p>
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
                      <p className="text-sm text-neutral-500">{t('dashboard.personalInfo.membershipDate', { ns: 'dashboard' })}</p>
                      <p className="font-medium text-neutral-900">{formatDate(user.createdAt)}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-cyan-100 rounded-lg flex items-center justify-center">
                      <Clock className="w-5 h-5 text-cyan-600" />
                    </div>
                    <div>
                      <p className="text-sm text-neutral-500">{t('dashboard.personalInfo.lastUpdate', { ns: 'dashboard' })}</p>
                      <p className="font-medium text-neutral-900">{formatDate(user.updatedAt)}</p>
                    </div>
                  </div>

                  {user.lastLogin && (
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
                        <Eye className="w-5 h-5 text-yellow-600" />
                      </div>
                      <div>
                        <p className="text-sm text-neutral-500">{t('dashboard.personalInfo.lastLogin', { ns: 'dashboard' })}</p>
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
                        <p className="text-sm text-neutral-500">{t('dashboard.personalInfo.orcidId', { ns: 'dashboard' })}</p>
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
                {t('dashboard.accountStatus.title', { ns: 'dashboard' })}
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-4 rounded-lg border border-neutral-200">
                  {user.emailVerified ? (
                    <CheckCircle className="w-8 h-8 text-green-500 mx-auto mb-2" />
                  ) : (
                    <XCircle className="w-8 h-8 text-red-500 mx-auto mb-2" />
                  )}
                  <p className="text-sm font-medium text-neutral-900">{t('dashboard.accountStatus.emailConfirm', { ns: 'dashboard' })}</p>
                  <p className={`text-xs ${user.emailVerified ? 'text-green-600' : 'text-red-600'}`}>
                    <p className={`text-xs ${user.emailVerified ? 'text-green-600' : 'text-red-600'}`}>
                      {user.emailVerified
                        ? t('dashboard.accountStatus.verified', { ns: 'dashboard' })
                        : t('dashboard.accountStatus.notVerified', { ns: 'dashboard' })}
                    </p>

                  </p>
                </div>

                <div className="text-center p-4 rounded-lg border border-neutral-200">
                  {user.isActive ? (
                    <CheckCircle className="w-8 h-8 text-green-500 mx-auto mb-2" />
                  ) : (
                    <XCircle className="w-8 h-8 text-red-500 mx-auto mb-2" />
                  )}
                  <p className="text-sm font-medium text-neutral-900">{t('dashboard.accountStatus.accountStatus', { ns: 'dashboard' })}</p>
                  <p className={`text-xs ${user.isActive ? 'text-green-600' : 'text-red-600'}`}>
                    <p className={`text-xs ${user.isActive ? 'text-green-600' : 'text-red-600'}`}>
                      {user.isActive
                        ? t('dashboard.accountStatus.active', { ns: 'dashboard' })
                        : t('dashboard.accountStatus.inactive', { ns: 'dashboard' })}
                    </p>

                  </p>
                </div>

                <div className="text-center p-4 rounded-lg border border-neutral-200">
                  <Shield className="w-8 h-8 text-blue-500 mx-auto mb-2" />
                  <p className="text-sm font-medium text-neutral-900">{t('dashboard.accountStatus.subscription', { ns: 'dashboard' })}</p>
                  <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(user.subscriptionStatus)}`}>
                    {user.subscriptionStatus || 'Free'}
                  </span>
                </div>
              </div>
            </div>

            {/* User Preferences */}
            {user.preferences && (
              <div className="bg-white rounded-2xl border border-neutral-200 p-6">
                <h2 className="text-xl font-semibold text-neutral-900 mb-6 flex items-center gap-2">
                  <Settings className="w-5 h-5" />
                  {t('dashboard.userPreferences.title', { ns: 'dashboard' })}
                </h2>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      <Globe className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm text-neutral-500">{t('dashboard.userPreferences.language', { ns: 'dashboard' })}</p>
                      <p className="font-medium text-neutral-900">
                        <p className="font-medium text-neutral-900">
                          {user.preferences.language === 'tr'
                            ? t('dashboard.userPreferences.language_tr', { ns: 'dashboard' })
                            : t('dashboard.userPreferences.language_en', { ns: 'dashboard' })}
                        </p>

                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                      <Eye className="w-5 h-5 text-purple-600" />
                    </div>
                    <div>
                      <p className="text-sm text-neutral-500">{t('dashboard.userPreferences.theme', { ns: 'dashboard' })}</p>
                      <p className="font-medium text-neutral-900 capitalize">{user.preferences.theme}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
                      <Bell className="w-5 h-5 text-yellow-600" />
                    </div>
                    <div>
                      <p className="text-sm text-neutral-500">{t('dashboard.userPreferences.notifications', { ns: 'dashboard' })}</p>
                      <p className="font-medium text-neutral-900">
                        <p className="font-medium text-neutral-900">
                          {user.preferences.notifications
                            ? t('dashboard.userPreferences.notifications_on', { ns: 'dashboard' })
                            : t('dashboard.userPreferences.notifications_off', { ns: 'dashboard' })}
                        </p>

                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                      <MapPin className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <p className="text-sm text-neutral-500">{t('dashboard.userPreferences.timePeriod', { ns: 'dashboard' })}</p>
                      <p className="font-medium text-neutral-900">{user.preferences.timezone}</p>
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
                {t('dashboard.quickActions.title', { ns: 'dashboard' })}
              </h3>
              <div className="space-y-3">
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  onClick={() => router.push('/profile')}
                >
                  <Edit3 className="w-4 h-4 mr-2" />
                  {t('dashboard.quickActions.editProfile', { ns: 'dashboard' })}
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  onClick={() => router.push('/auth/change-password')}
                >
                  <Shield className="w-4 h-4 mr-2" />
                  {t('dashboard.quickActions.changePassword', { ns: 'dashboard' })}
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  onClick={() => {
                    // If user has active subscription, go to payment management
                    // Otherwise go to pricing page
                    const hasActiveSubscription = user.subscriptionStatus === 'active' || user.subscriptionPlan;
                    router.push(hasActiveSubscription ? '/payment' : '/pricing');
                  }}
                >
                  <Settings className="w-4 h-4 mr-2" />
                  {t('dashboard.quickActions.paymentSettings', { ns: 'dashboard' })}
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