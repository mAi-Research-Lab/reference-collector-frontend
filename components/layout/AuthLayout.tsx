'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from '@/components/ui/LanguageSwitcher';
import Button from '@/components/ui/Button';

interface AuthLayoutProps {
    children: React.ReactNode;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
    const pathname = usePathname();
    const { t } = useTranslation('common');
    const isSignInPage = pathname === '/auth/signin';
    const isSignUpPage = pathname === '/auth/signup';
    const alternateAuthHref = isSignInPage ? '/auth/signup' : '/auth/signin';
    const alternateAuthLabel = isSignInPage
        ? t('navigation.signup')
        : t('navigation.signin');

    return (
        <div className="min-h-screen bg-gradient-to-br from-neutral-50 via-primary-50/40 to-neutral-100 relative overflow-hidden flex flex-col">
            {/* Decorative blobs */}
            <div className="pointer-events-none absolute inset-0 overflow-hidden">
                <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-primary-200/20 blur-3xl" />
                <div className="absolute top-1/2 -left-40 w-80 h-80 rounded-full bg-primary-300/15 blur-3xl" />
                <div className="absolute -bottom-32 right-1/3 w-72 h-72 rounded-full bg-primary-100/25 blur-3xl" />
            </div>

            {/* Top bar */}
            <header className="relative z-10 flex items-center justify-between px-6 py-4 sm:px-8">
                <Link href="/" className="flex items-center space-x-2.5 group">
                    <Image
                        src="/images/logo.png"
                        alt="Citext Logo"
                        width={120}
                        height={32}
                        className="rounded-lg shadow-sm group-hover:shadow-md transition-shadow duration-200"
                        priority
                    />
                </Link>

                <div className="flex items-center gap-2">
                    <Link href="/">
                        <Button variant="ghost" size="sm">
                            {t('navigation.backToHome')}
                        </Button>
                    </Link>
                    {!isSignInPage && !isSignUpPage && (
                        <Link href={alternateAuthHref}>
                            <Button variant="outline" size="sm">
                                {alternateAuthLabel}
                            </Button>
                        </Link>
                    )}
                    {isSignInPage && (
                        <Link href="/auth/signup">
                            <Button variant="outline" size="sm">
                                {t('navigation.signup')}
                            </Button>
                        </Link>
                    )}
                    {isSignUpPage && (
                        <Link href="/auth/signin">
                            <Button variant="outline" size="sm">
                                {t('navigation.signin')}
                            </Button>
                        </Link>
                    )}
                    <LanguageSwitcher />
                </div>
            </header>

            {/* Main content */}
            <main className="relative z-10 flex-1 flex items-center justify-center px-4 py-8">
                {children}
            </main>

            {/* Bottom minimal footer */}
            <footer className="relative z-10 text-center py-4 px-6">
                <p className="text-xs text-neutral-400">
                    © {new Date().getFullYear()} Citext. All rights reserved.
                </p>
            </footer>
        </div>
    );
};

export default AuthLayout;
