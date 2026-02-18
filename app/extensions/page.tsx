'use client';

import React from 'react';
import Link from 'next/link';
import { Chrome, ExternalLink, Download } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Button from '@/components/ui/Button';
import ScrollReveal from '@/components/ui/ScrollReveal';
import { setDocumentTitle } from '@/lib/utils';

export default function ExtensionsPage() {
  const { t, i18n } = useTranslation(['extensions', 'common']);

  React.useEffect(() => {
    const title = t('title', { ns: 'extensions' });
    setDocumentTitle(title);
  }, [t, i18n.language]);

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-primary-50 via-blue-50/30 to-purple-50/20">
        <div className="container max-w-6xl mx-auto px-4">
          <ScrollReveal>
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-4">
                {t('hero.title', { ns: 'extensions' })}
              </h1>
              <p className="text-lg md:text-xl text-neutral-600 max-w-3xl mx-auto">
                {t('hero.description', { ns: 'extensions' })}
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Chrome Extension Section */}
      <section className="py-20 bg-white">
        <div className="container max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left: Content */}
            <ScrollReveal>
              <div className="space-y-6">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
                    <Chrome className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h2 className="text-3xl font-bold text-neutral-900">
                      {t('chrome.title', { ns: 'extensions' })}
                    </h2>
                    <p className="text-neutral-600 mt-1">
                      {t('chrome.subtitle', { ns: 'extensions' })}
                    </p>
                  </div>
                </div>

                <p className="text-lg text-neutral-700 leading-relaxed">
                  {t('chrome.description', { ns: 'extensions' })}
                </p>

                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-neutral-900">
                    {t('chrome.features.title', { ns: 'extensions' })}
                  </h3>
                  <ul className="space-y-3">
                    {['feature1', 'feature2', 'feature3', 'feature4'].map((featureKey, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <div className="w-5 h-5 bg-primary-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <span className="text-neutral-700">
                          {t(`chrome.features.${featureKey}`, { ns: 'extensions' })}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-6">
                  <Link
                    href="https://chromewebstore.google.com/detail/citext-capture/naofpiioeaacikfkkecihgfmianccpnp"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button size="lg" className="w-full sm:w-auto">
                      <Chrome className="w-5 h-5 mr-2" />
                      {t('chrome.button', { ns: 'extensions' })}
                      <ExternalLink className="w-4 h-4 ml-2" />
                    </Button>
                  </Link>
                </div>
              </div>
            </ScrollReveal>

            {/* Right: Visual/Illustration */}
            <ScrollReveal delay={200}>
              <div className="flex justify-center items-center">
                <div className="w-full max-w-md bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 border border-blue-100">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center">
                        <Chrome className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-neutral-900">Citext Capture</h3>
                        <p className="text-sm text-neutral-600">Browser Extension</p>
                      </div>
                    </div>
                    <div className="space-y-2 text-sm text-neutral-700">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span>{t('chrome.status.available', { ns: 'extensions' })}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        <span>{t('chrome.status.version', { ns: 'extensions' })}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Other Browsers Section */}
      <section className="py-20 bg-neutral-50">
        <div className="container max-w-6xl mx-auto px-4">
          <ScrollReveal>
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
                {t('otherBrowsers.title', { ns: 'extensions' })}
              </h2>
              <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
                {t('otherBrowsers.description', { ns: 'extensions' })}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {['edge', 'safari', 'firefox'].map((browser, index) => (
                <ScrollReveal key={browser} delay={index * 100}>
                  <div className="bg-white rounded-xl p-6 border border-neutral-200 text-center">
                    <div className="w-16 h-16 bg-neutral-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Download className="w-8 h-8 text-neutral-400" />
                    </div>
                    <h3 className="text-xl font-semibold text-neutral-900 mb-2">
                      {t(`otherBrowsers.${browser}.name`, { ns: 'extensions' })}
                    </h3>
                    <p className="text-sm text-neutral-600 mb-4">
                      {t(`otherBrowsers.${browser}.status`, { ns: 'extensions' })}
                    </p>
                    <Button variant="outline" size="sm" disabled className="w-full">
                      {t('otherBrowsers.comingSoon', { ns: 'extensions' })}
                    </Button>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-primary-600 via-primary-500 to-primary-700">
        <div className="container max-w-4xl mx-auto px-4 text-center">
          <ScrollReveal>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              {t('cta.title', { ns: 'extensions' })}
            </h2>
            <p className="text-lg text-primary-100 mb-8">
              {t('cta.description', { ns: 'extensions' })}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/auth/signup">
                <Button variant="secondary" size="lg" className="w-full sm:w-auto shadow-lg">
                  {t('buttons.startFreeTrial', { ns: 'common' })}
                </Button>
              </Link>
              <Link href="/">
                <Button variant="outline" size="lg" className="w-full sm:w-auto text-white border-white hover:bg-white hover:text-primary-500 shadow-lg">
                  {t('navigation.home', { ns: 'common' })}
                </Button>
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <Footer />
    </div>
  );
}
