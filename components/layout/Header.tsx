'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, FileText } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import Button from '@/components/ui/Button';
import LanguageSwitcher from '@/components/ui/LanguageSwitcher';
import { useAuth } from '@/components/providers/AuthProvider';
import type { NavItem } from '@/types';

const Header: React.FC = () => {
  const { t } = useTranslation();
  const { isAuthenticated, user } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const isHomePage = pathname === '/';
  const isAuthPage = pathname.startsWith('/auth/');
  const isContactPage = pathname === '/contact';
  const isPricingPage = pathname === '/pricing';
  const isDashboardPage = pathname === '/dashboard';
  const isProfilePage = pathname === '/profile';

  const handleNavigation = (href: string) => {
    if (isHomePage && href.startsWith('#')) {
      // If on home page and it's an anchor link, use smooth scroll
      const targetId = href.replace('#', '');
      const targetElement = document.getElementById(targetId);
      
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
      }
    } else if (href.startsWith('#')) {
      // If not on home page but anchor link, go to home page with hash
      window.location.href = `/${href}`;
    }
    
    setIsMenuOpen(false);
  };

  // Navigation itemları sayfa tipine ve authentication durumuna göre
  const navigationItems: NavItem[] = 
    isAuthPage ? [] : 
    isContactPage ? [] : 
    isPricingPage ? [] : 
    isAuthenticated ? (
      // Authenticated users için navigation
      isDashboardPage || isProfilePage ? [] : [
        { href: '/dashboard', label: t('navigation.dashboard') || 'Dashboard' },
      ]
    ) : (
      // Non-authenticated users için navigation
      isHomePage ? [
        { href: '#home', label: t('navigation.home') },
        { href: '#features', label: t('navigation.features') },
        { href: '#download', label: t('navigation.download') },
        { href: '#about', label: t('navigation.about') },
      ] : [
        { href: '/', label: t('navigation.home') },
      ]
    );

  return (
    <header className="bg-white border-b border-neutral-200 sticky top-0 z-50">
      <div className="container">
        <div className="relative flex items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary-500 rounded-lg flex items-center justify-center">
                <FileText className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-neutral-900">{t('brand')}</span>
            </Link>
          </div>

          {/* Desktop Navigation - Centered */}
          {!isAuthPage && (
            <nav className="hidden md:flex items-center justify-center absolute left-1/2 transform -translate-x-1/2">
              <div className="flex items-center space-x-8">
                {navigationItems.map((item) => (
                  item.href.startsWith('#') ? (
                    <button
                      key={item.href}
                      onClick={() => handleNavigation(item.href)}
                      className="text-neutral-600 hover:text-neutral-900 transition-colors duration-200"
                    >
                      {item.label}
                    </button>
                  ) : (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="text-neutral-600 hover:text-neutral-900 transition-colors duration-200"
                    >
                      {item.label}
                    </Link>
                  )
                ))}
              </div>
            </nav>
          )}

          {/* Right side container - Positioned absolutely to the right */}
          <div className="absolute right-0 flex items-center">
            {/* Language Switcher - Before buttons */}
            <div className="hidden md:flex mr-4">
              <LanguageSwitcher />
            </div>

            {/* Desktop Auth Buttons */}
            <div className="hidden md:flex items-center space-x-4">
              {isAuthenticated ? (
                // Authenticated kullanıcılar için butonlar
                <>
                  {!isDashboardPage && (
                    <Link href="/dashboard">
                      <Button variant="outline" size="sm">
                        {t('navigation.dashboard') || 'Dashboard'}
                      </Button>
                    </Link>
                  )}
                  {!isProfilePage && (
                    <Link href="/profile">
                      <Button variant="ghost" size="sm">
                        {t('navigation.profile') || 'Profile'}
                      </Button>
                    </Link>
                  )}
                  <span className="text-sm text-neutral-600">
                    {user?.fullName || user?.email}
                  </span>
                </>
              ) : isAuthPage ? (
                // Auth sayfalarında sadece auth butonları
                <>
                  {pathname !== '/auth/signin' && (
                    <Link href="/auth/signin">
                      <Button variant="ghost" size="sm">
                        {t('navigation.signin')}
                      </Button>
                    </Link>
                  )}
                  {pathname !== '/auth/signup' && (
                    <Link href="/auth/signup">
                      <Button variant="primary" size="sm">
                        {t('navigation.signup')}
                      </Button>
                    </Link>
                  )}
                </>
              ) : (
                // Non-authenticated kullanıcılar için butonlar
                <>
                  <Link href="/pricing">
                    <Button variant="outline" size="sm">
                      {t('navigation.pricing')}
                    </Button>
                  </Link>
                  <Link href="/auth/signup">
                    <Button variant="primary" size="sm">
                      {t('navigation.signup')}
                    </Button>
                  </Link>
                </>
              )}
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden ml-4">
              <button
                className="p-2 text-neutral-600 hover:text-neutral-900"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-label="Toggle menu"
              >
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-neutral-200">
            <nav className="flex flex-col space-y-4">
              {/* Navigation items (sadece auth olmayan sayfalarda) */}
              {!isAuthPage && navigationItems.map((item) => (
                item.href.startsWith('#') ? (
                  <button
                    key={item.href}
                    onClick={() => handleNavigation(item.href)}
                    className="text-neutral-600 hover:text-neutral-900 transition-colors duration-200 py-2 text-left"
                  >
                    {item.label}
                  </button>
                ) : (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsMenuOpen(false)}
                    className="text-neutral-600 hover:text-neutral-900 transition-colors duration-200 py-2 text-left"
                  >
                    {item.label}
                  </Link>
                )
              ))}
              
              <div className={`flex flex-col space-y-3 ${!isAuthPage ? 'pt-4 border-t border-neutral-200' : ''}`}>
                {isAuthenticated ? (
                  // Authenticated kullanıcılar için butonlar
                  <>
                    {!isDashboardPage && (
                      <Link href="/dashboard" onClick={() => setIsMenuOpen(false)}>
                        <Button variant="outline" size="sm" className="w-full">
                          {t('navigation.dashboard') || 'Dashboard'}
                        </Button>
                      </Link>
                    )}
                    {!isProfilePage && (
                      <Link href="/profile" onClick={() => setIsMenuOpen(false)}>
                        <Button variant="ghost" size="sm" className="w-full">
                          {t('navigation.profile') || 'Profile'}
                        </Button>
                      </Link>
                    )}
                    <div className="text-center py-2 text-sm text-neutral-600">
                      {user?.fullName || user?.email}
                    </div>
                  </>
                ) : isAuthPage ? (
                  // Auth sayfalarında sadece auth butonları
                  <>
                    {pathname !== '/auth/signin' && (
                      <Link href="/auth/signin" onClick={() => setIsMenuOpen(false)}>
                        <Button variant="ghost" size="sm" className="w-full">
                          {t('navigation.signin')}
                        </Button>
                      </Link>
                    )}
                    {pathname !== '/auth/signup' && (
                      <Link href="/auth/signup" onClick={() => setIsMenuOpen(false)}>
                        <Button variant="primary" size="sm" className="w-full">
                          {t('navigation.signup')}
                        </Button>
                      </Link>
                    )}
                  </>
                ) : (
                  // Non-authenticated kullanıcılar için butonlar
                  <>
                    <Link href="/pricing" onClick={() => setIsMenuOpen(false)}>
                      <Button variant="outline" size="sm" className="w-full">
                        {t('navigation.pricing')}
                      </Button>
                    </Link>
                    <Link href="/auth/signup" onClick={() => setIsMenuOpen(false)}>
                      <Button variant="primary" size="sm" className="w-full">
                        {t('navigation.signup')}
                      </Button>
                    </Link>
                  </>
                )}
                <div className="px-4 pt-3 border-t border-neutral-200">
                  <LanguageSwitcher />
                </div>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header; 