'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import LanguageSwitcher from '@/components/ui/LanguageSwitcher';

interface AuthLayoutProps {
    children: React.ReactNode;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
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

                <LanguageSwitcher />
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
