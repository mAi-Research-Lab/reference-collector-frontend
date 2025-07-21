'use client';

import React from 'react';
import Link from 'next/link';
import { Download, ArrowRight, CheckCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import Button from '@/components/ui/Button';

const HeroSection: React.FC = () => {
  const { t } = useTranslation(['home', 'common']);

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 via-white to-neutral-100 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none select-none" aria-hidden="true">
        {/* Hafif bir dekoratif blur efektli daire */}
        <div className="absolute left-[-10vw] top-[-10vw] w-[40vw] h-[40vw] bg-primary-200 opacity-30 rounded-full blur-3xl" />
        <div className="absolute right-[-10vw] bottom-[-10vw] w-[40vw] h-[40vw] bg-primary-100 opacity-20 rounded-full blur-2xl" />
      </div>
      <div className="container relative z-10">
        <div className="max-w-3xl mx-auto text-center flex flex-col items-center justify-center">
          <h1 className="text-5xl md:text-6xl font-extrabold text-neutral-900 mb-8 drop-shadow-sm">
            {t('hero.title', { ns: 'home' })}
            <span className="text-primary-500"> {t('hero.titleHighlight', { ns: 'home' })}</span>
          </h1>
          <p className="text-base md:text-lg text-neutral-600 mb-10 max-w-2xl mx-auto font-normal">
            {t('hero.description', { ns: 'home' })}
          </p>
          <div className="flex flex-col sm:flex-row gap-5 justify-center mb-10 w-full">
            <button
              onClick={() => {
                const el = document.getElementById('download');
                if (el) {
                  el.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="w-full sm:w-auto text-lg px-8 py-4 shadow-lg btn btn-primary flex items-center justify-center"
              type="button"
            >
              <Download className="w-6 h-6 mr-2" />
              {t('buttons.downloadFree', { ns: 'common' })}
            </button>
            <Link href="/auth/signup">
              <Button variant="outline" size="lg" className="w-full sm:w-auto text-lg px-8 py-4 border-2">
                {t('buttons.getStartedOnline', { ns: 'common' })}
                <ArrowRight className="w-6 h-6 ml-2" />
              </Button>
            </Link>
          </div>
          {/* Trust Indicators */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-base text-neutral-500 mb-10">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-500" />
              {t('hero.trustIndicators.freeForIndividuals', { ns: 'home' })}
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-500" />
              {t('hero.trustIndicators.noCreditCardRequired', { ns: 'home' })}
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-500" />
              {t('hero.trustIndicators.worksOffline', { ns: 'home' })}
            </div>
          </div>
          {/* Statistics - yarı şeffaf kutuda */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-2xl mx-auto bg-white/70 backdrop-blur-md rounded-2xl shadow-lg py-6 px-4">
            <div className="text-center">
              <div className="text-4xl font-extrabold text-primary-500 mb-1">50K+</div>
              <div className="text-neutral-700 font-medium">{t('hero.statistics.activeUsers', { ns: 'home' })}</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-extrabold text-primary-500 mb-1">200+</div>
              <div className="text-neutral-700 font-medium">{t('hero.statistics.universities', { ns: 'home' })}</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-extrabold text-primary-500 mb-1">10M+</div>
              <div className="text-neutral-700 font-medium">{t('hero.statistics.referencesManaged', { ns: 'home' })}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection; 