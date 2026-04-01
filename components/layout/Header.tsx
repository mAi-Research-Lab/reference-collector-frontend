'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import Image from 'next/image';
import Button from '@/components/ui/Button';
import LanguageSwitcher from '@/components/ui/LanguageSwitcher';
import { useAuth } from '@/components/providers/AuthProvider';
import type { NavItem } from '@/types';

const Header: React.FC = () => {
    const { isAuthenticated, user } = useAuth();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const pathname = usePathname();
    const isHomePage = pathname === '/';
    const isAuthPage = pathname.startsWith('/auth/');
    const isContactPage = pathname === '/contact';
    const isPricingPage = pathname === '/pricing';
    const isDashboardPage = pathname === '/dashboard';
    const isProfilePage = pathname === '/profile';
    const { t } = useTranslation(['common']);

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 8);
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Close mobile menu on route change
    useEffect(() => {
        setIsMenuOpen(false);
    }, [pathname]);

    const handleNavigation = (href: string) => {
        if (isHomePage && href.startsWith('#')) {
            const targetId = href.replace('#', '');
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        } else if (href.startsWith('#')) {
            window.location.href = `/${href}`;
        }
        setIsMenuOpen(false);
    };

    const navigationItems: NavItem[] =
        isAuthPage ? [] :
            isContactPage ? [] :
                isPricingPage ? [] :
                    isAuthenticated
                        ? (
                            isHomePage ? [
                                { href: '#home', label: t('navigation.home') },
                                { href: '#features', label: t('navigation.features') },
                                { href: '#how-to-use', label: t('navigation.howToUse') },
                                { href: '#download', label: t('navigation.download') }
                            ] : (
                                isDashboardPage || isProfilePage ? [] : [
                                    { href: '/dashboard', label: t('navigation.dashboard') || 'Dashboard' },
                                ]
                            )
                        )
                        : (
                            isHomePage ? [
                                { href: '#home', label: t('navigation.home') },
                                { href: '#features', label: t('navigation.features') },
                                { href: '#download', label: t('navigation.download') }
                            ] : [
                                { href: '/', label: t('navigation.home') },
                            ]
                        );

    return (
        <header
            className={`sticky top-0 z-50 transition-all duration-300 ${
                isScrolled
                    ? 'bg-white/90 backdrop-blur-md shadow-soft border-b border-neutral-200/60'
                    : 'bg-white border-b border-neutral-200'
            }`}
        >
            <div className="container">
                <div className="relative flex items-center h-16">
                    {/* Logo */}
                    <div className="flex-shrink-0">
                        <Link href="/" className="flex items-center space-x-2.5 group">
                            <div className="relative">
                                <Image
                                    src="/images/logo.jpg"
                                    alt="Citext Logo"
                                    width={34}
                                    height={34}
                                    className="rounded-lg shadow-sm group-hover:shadow-md transition-shadow duration-200"
                                    priority
                                />
                            </div>
                            <span className="text-xl font-bold tracking-tight">
                                <span className="text-primary-600">Ci</span>
                                <span className="text-neutral-900">text</span>
                            </span>
                        </Link>
                    </div>

                    {/* Desktop Navigation */}
                    {!isAuthPage && (
                        <nav className="hidden md:flex items-center justify-center absolute left-1/2 transform -translate-x-1/2">
                            <div className="flex items-center space-x-1">
                                {navigationItems.map((item) => (
                                    item.href.startsWith('#') ? (
                                        <button
                                            key={item.href}
                                            onClick={() => handleNavigation(item.href)}
                                            className="px-3 py-2 text-sm font-medium text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100 rounded-lg transition-all duration-200"
                                        >
                                            {item.label}
                                        </button>
                                    ) : (
                                        <Link
                                            key={item.href}
                                            href={item.href}
                                            className={`px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                                                pathname === item.href
                                                    ? 'text-primary-600 bg-primary-50'
                                                    : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100'
                                            }`}
                                        >
                                            {item.label}
                                        </Link>
                                    )
                                ))}
                            </div>
                        </nav>
                    )}

                    {/* Right side */}
                    <div className="absolute right-0 flex items-center gap-2">
                        <div className="hidden md:flex">
                            <LanguageSwitcher />
                        </div>

                        <div className="hidden md:flex items-center gap-2">
                            {isAuthenticated ? (
                                <Link href="/dashboard" onClick={() => setIsMenuOpen(false)}>
                                    <Button variant="outline" size="sm">
                                        {user?.fullName || user?.email}
                                    </Button>
                                </Link>
                            ) : isAuthPage ? (
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
                                <Link href="/auth/signup">
                                    <Button variant="primary" size="sm">
                                        {t('navigation.signup')}
                                    </Button>
                                </Link>
                            )}
                        </div>

                        {/* Mobile Menu Button */}
                        <div className="md:hidden ml-1">
                            <button
                                className="p-2 text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100 rounded-lg transition-all duration-200"
                                onClick={() => setIsMenuOpen(!isMenuOpen)}
                                aria-label="Toggle menu"
                                aria-expanded={isMenuOpen}
                            >
                                {isMenuOpen
                                    ? <X className="w-5 h-5" />
                                    : <Menu className="w-5 h-5" />
                                }
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile Menu */}
                <div
                    className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
                        isMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
                    }`}
                >
                    <div className="py-3 border-t border-neutral-200">
                        <nav className="flex flex-col">
                            {!isAuthPage && navigationItems.map((item) => (
                                item.href.startsWith('#') ? (
                                    <button
                                        key={item.href}
                                        onClick={() => handleNavigation(item.href)}
                                        className="px-2 py-2.5 text-sm font-medium text-neutral-600 hover:text-neutral-900 hover:bg-neutral-50 rounded-lg transition-colors duration-200 text-left"
                                    >
                                        {item.label}
                                    </button>
                                ) : (
                                    <Link
                                        key={item.href}
                                        href={item.href}
                                        onClick={() => setIsMenuOpen(false)}
                                        className={`px-2 py-2.5 text-sm font-medium rounded-lg transition-colors duration-200 ${
                                            pathname === item.href
                                                ? 'text-primary-600 bg-primary-50'
                                                : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-50'
                                        }`}
                                    >
                                        {item.label}
                                    </Link>
                                )
                            ))}

                            <div className={`flex flex-col gap-2 ${!isAuthPage && navigationItems.length > 0 ? 'mt-3 pt-3 border-t border-neutral-200' : 'mt-1'}`}>
                                {isAuthenticated ? (
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
                                        <p className="text-center py-1.5 text-xs text-neutral-500">
                                            {user?.fullName || user?.email}
                                        </p>
                                    </>
                                ) : (
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
                                <div className="pt-2 border-t border-neutral-200">
                                    <LanguageSwitcher />
                                </div>
                            </div>
                        </nav>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
