'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { Check, Mail, Star } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Button from '@/components/ui/Button';
import { setDocumentTitle } from '@/lib/utils';
import type { PricingPlan } from '@/types';

export default function PricingPage() {
  const { t, i18n } = useTranslation(['pricing', 'common']);

  // Tab title'ı dil değiştiğinde güncelle
  useEffect(() => {
    const title = t('hero.titleHighlight', { ns: 'pricing' }) + ' ' + t('hero.titleEnd', { ns: 'pricing' });
    setDocumentTitle(title);
  }, [t, i18n.language]);

  const plans: PricingPlan[] = [
    {
      id: 'free',
      name: t('plans.free.name', { ns: 'pricing' }),
      description: t('plans.free.description', { ns: 'pricing' }),
      price: 0,
      currency: 'USD',
      billing: 'monthly',
      type: 'individual',
      features: [
        t('plans.free.features.references', { ns: 'pricing' }),
        t('plans.free.features.citationStyles', { ns: 'pricing' }),
        t('plans.free.features.storage', { ns: 'pricing' }),
      ],
    },
    {
      id: 'individual',
      name: t('plans.individual.name', { ns: 'pricing' }),
      description: t('plans.individual.description', { ns: 'pricing' }),
      price: 9.99,
      currency: 'USD',
      billing: 'monthly',
      type: 'individual',
      recommended: true,
      features: [
        t('plans.individual.features.unlimitedReferences', { ns: 'pricing' }),
        t('plans.individual.features.allCitationStyles', { ns: 'pricing' }),
        t('plans.individual.features.cloudSync', { ns: 'pricing' }),
        t('plans.individual.features.advancedSearch', { ns: 'pricing' }),
        t('plans.individual.features.customTags', { ns: 'pricing' }),
      ],
    },
    {
      id: 'enterprise',
      name: t('plans.enterprise.name', { ns: 'pricing' }),
      description: t('plans.enterprise.description', { ns: 'pricing' }),
      price: 'contact',
      currency: 'USD',
      billing: 'annually',
      type: 'enterprise',
      features: [
        t('plans.enterprise.features.everythingInPro', { ns: 'pricing' }),
        t('plans.enterprise.features.unlimitedTeam', { ns: 'pricing' }),
        t('plans.enterprise.features.adminControls', { ns: 'pricing' }),
        t('plans.enterprise.features.sso', { ns: 'pricing' }),
        t('plans.enterprise.features.customBranding', { ns: 'pricing' }),
        t('plans.enterprise.features.analytics', { ns: 'pricing' }),
        t('plans.enterprise.features.apiAccess', { ns: 'pricing' }),
        t('plans.enterprise.features.customIntegrations', { ns: 'pricing' }),
      ],
    },
  ];

  const faqs = [
    {
      question: t('faq.items.upgradeDowngrade.question', { ns: 'pricing' }),
      answer: t('faq.items.upgradeDowngrade.answer', { ns: 'pricing' }),
    },
    {
      question: t('faq.items.dataAfterCancel.question', { ns: 'pricing' }),
      answer: t('faq.items.dataAfterCancel.answer', { ns: 'pricing' }),
    },
    {
      question: t('faq.items.studentDiscount.question', { ns: 'pricing' }),
      answer: t('faq.items.studentDiscount.answer', { ns: 'pricing' }),
    },
    {
      question: t('faq.items.deviceLimit.question', { ns: 'pricing' }),
      answer: t('faq.items.deviceLimit.answer', { ns: 'pricing' }),
    },
    {
      question: t('faq.items.refunds.question', { ns: 'pricing' }),
      answer: t('faq.items.refunds.answer', { ns: 'pricing' }),
    },
  ];

  return (
    <div className="min-h-screen">
      <Header />
      
      {/* Hero + Pricing Cards (Merged) */}
      <section className="bg-gradient-to-br from-white to-neutral-50 py-10">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-4">
              {t('hero.title', { ns: 'pricing' })} <span className="text-primary-500">{t('hero.titleHighlight', { ns: 'pricing' })}</span> {t('hero.titleEnd', { ns: 'pricing' })}
            </h1>
            <p className="text-xl text-neutral-600 mb-4">
              {t('hero.description', { ns: 'pricing' })}
            </p>
            <div className="flex items-center justify-center gap-2 text-sm text-neutral-500 mb-4">
              <Star className="w-4 h-4 text-yellow-400 fill-current" />
              <span>{t('hero.moneyBackGuarantee', { ns: 'pricing' })}</span>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {plans.map((plan) => (
              <div
                key={plan.id}
                className={`relative card ${
                  plan.recommended 
                    ? 'ring-2 ring-primary-500 scale-105' 
                    : ''
                } group`}
              >
                {plan.recommended && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <span className="bg-primary-500 text-white px-3 py-0.5 rounded-full text-xs font-medium shadow-md">
                      {t('plans.individual.mostPopular', { ns: 'pricing' })}
                    </span>
                  </div>
                )}
                <div className="text-center mb-8">
                  <h3 className="text-xl font-semibold text-neutral-900 mb-1">
                    {plan.name}
                  </h3>
                  <p className="text-sm text-neutral-500 mb-4">
                    {plan.description}
                  </p>
                  <div className="mb-4">
                    {plan.price === 'contact' ? (
                      <div className="text-2xl font-bold text-neutral-900">
                        {t('plans.enterprise.contactUs', { ns: 'pricing' })}
                      </div>
                    ) : (
                      <>
                        <div className="text-3xl font-bold text-neutral-900">
                          ${plan.price}
                          <span className="text-base text-neutral-400 font-normal">
                            /{plan.billing === 'monthly' ? 'mo' : 'year'}
                          </span>
                        </div>
                        {plan.price > 0 && (
                          <div className="text-xs text-neutral-400 mt-0.5">
                            {t('plans.billed', { ns: 'pricing' })} {plan.billing}
                          </div>
                        )}
                      </>
                    )}
                  </div>
                  {plan.type === 'enterprise' ? (
                    <Link href="/contact">
                      <Button className="w-full" size="sm">
                        <Mail className="w-4 h-4 mr-2" />
                        {t('plans.contactSales', { ns: 'pricing' })}
                      </Button>
                    </Link>
                  ) : (
                    <Link href="/auth/signup">
                      <Button 
                        variant={plan.recommended ? 'primary' : 'outline'} 
                        className="w-full" 
                        size="sm"
                      >
                        {plan.price === 0 ? t('plans.getStartedFree', { ns: 'pricing' }) : t('plans.startFreeTrial', { ns: 'pricing' })}
                      </Button>
                    </Link>
                  )}
                </div>
                <div className="space-y-4">
                  <div className="text-xs font-semibold text-neutral-900 mb-2">
                    {t('plans.whatsIncluded', { ns: 'pricing' })}
                  </div>
                  {plan.features.map((feature, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-xs text-neutral-600">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-neutral-50">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-neutral-900 mb-2">
                {t('faq.title', { ns: 'pricing' })}
              </h2>
              <p className="text-base text-neutral-600">
                {t('faq.description', { ns: 'pricing' })}
              </p>
            </div>

            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div key={index} className="card p-4 md:p-5">
                  <h3 className="text-base font-semibold text-neutral-900 mb-2">
                    {faq.question}
                  </h3>
                  <p className="text-sm text-neutral-600">
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>

            <div className="text-center mt-10">
              <p className="text-neutral-600 mb-3">
                {t('faq.stillHaveQuestions', { ns: 'pricing' })}
              </p>
              <Link href="/contact">
                <Button variant="outline" size="sm">
                  {t('buttons.contactSupport', { ns: 'common' })}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-20 bg-gradient-to-br from-primary-600 via-primary-500 to-primary-700 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none select-none" aria-hidden="true">
          {/* Dekoratif blur efektli daireler */}
          <div className="absolute left-[-15vw] top-[-15vw] w-[50vw] h-[50vw] bg-primary-400 opacity-20 rounded-full blur-3xl" />
          <div className="absolute right-[-15vw] bottom-[-15vw] w-[50vw] h-[50vw] bg-primary-300 opacity-15 rounded-full blur-2xl" />
          <div className="absolute left-[10%] bottom-[10%] w-[30vw] h-[30vw] bg-white opacity-5 rounded-full blur-xl" />
        </div>
        <div className="container relative z-10">
          <div className="max-w-2xl mx-auto text-center text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white drop-shadow-sm">
              {t('cta.title', { ns: 'pricing' })}
            </h2>
            <p className="text-lg text-white mb-8 drop-shadow-sm">
              {t('cta.description', { ns: 'pricing' })}
            </p>
            
            <Link href="/auth/signup">
              <Button variant="secondary" size="lg" className="shadow-lg">
                {t('cta.startFreeTrial', { ns: 'pricing' })}
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
} 