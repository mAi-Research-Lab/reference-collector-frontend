'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { 
  FileText, 
  Search, 
  Users, 
  Zap, 
  Download, 
  CheckCircle,
  ArrowRight,
  Star,
  Quote
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Button from '@/components/ui/Button';
import ScrollToTop from '@/components/ui/ScrollToTop';
import ScrollReveal from '@/components/ui/ScrollReveal';
import HeroSection from '@/components/layout/HeroSection';
import { setDocumentTitle } from '@/lib/utils';
import ReferenceCaptureAnimation from "@/components/animations/reference-capture-animation";
import ReferenceOrganizationAnimation from "@/components/animations/reference-organization-animation";
import ReferenceCiteAnimation from "@/components/animations/reference-word-animation";
import ReferenceAnnotationAnimation from "@/components/animations/reference-annotation-animation";

export default function HomePage() {
  const { t, i18n } = useTranslation(['home', 'common']);

  // Tab title'ı dil değiştiğinde güncelle
  useEffect(() => {
    const title = t('hero.title', { ns: 'home' }) + ' ' + t('hero.titleHighlight', { ns: 'home' });
    setDocumentTitle(title);
  }, [t, i18n.language]);

  const features = [
    {
      icon: FileText,
      title: t('features.items.smartOrganization.title', { ns: 'home' }),
      description: t('features.items.smartOrganization.description', { ns: 'home' }),
    },
    {
      icon: Search,
      title: t('features.items.powerfulSearch.title', { ns: 'home' }),
      description: t('features.items.powerfulSearch.description', { ns: 'home' }),
    },
    {
      icon: Users,
      title: t('features.items.teamCollaboration.title', { ns: 'home' }),
      description: t('features.items.teamCollaboration.description', { ns: 'home' }),
    },
    {
      icon: Zap,
      title: t('features.items.quickCitation.title', { ns: 'home' }),
      description: t('features.items.quickCitation.description', { ns: 'home' }),
    },
  ];

  const testimonials = [
    {
      name: t('testimonials.items.drSarahJohnson.name', { ns: 'home' }),
      role: t('testimonials.items.drSarahJohnson.role', { ns: 'home' }),
      institution: t('testimonials.items.drSarahJohnson.institution', { ns: 'home' }),
      quote: t('testimonials.items.drSarahJohnson.quote', { ns: 'home' }),
      rating: 5,
      researchField: t('testimonials.items.drSarahJohnson.field', { ns: 'home' })
    },
    {
      name: t('testimonials.items.profMichaelChen.name', { ns: 'home' }),
      role: t('testimonials.items.profMichaelChen.role', { ns: 'home' }),
      institution: t('testimonials.items.profMichaelChen.institution', { ns: 'home' }),
      quote: t('testimonials.items.profMichaelChen.quote', { ns: 'home' }),
      rating: 5,
      researchField: t('testimonials.items.profMichaelChen.field', { ns: 'home' })
    },
    {
      name: t('testimonials.items.emmaRodriguez.name', { ns: 'home' }),
      role: t('testimonials.items.emmaRodriguez.role', { ns: 'home' }),
      institution: t('testimonials.items.emmaRodriguez.institution', { ns: 'home' }),
      quote: t('testimonials.items.emmaRodriguez.quote', { ns: 'home' }),
      rating: 5,
      researchField: t('testimonials.items.emmaRodriguez.field', { ns: 'home' })
    },
    {
      name: t('testimonials.items.drJamesThompson.name', { ns: 'home' }),
      role: t('testimonials.items.drJamesThompson.role', { ns: 'home' }),
      institution: t('testimonials.items.drJamesThompson.institution', { ns: 'home' }),
      quote: t('testimonials.items.drJamesThompson.quote', { ns: 'home' }),
      rating: 5,
      researchField: t('testimonials.items.drJamesThompson.field', { ns: 'home' })
    },
  ];

  const downloadOptions = [
    { 
      platform: 'Windows',
      version: 'v1.0',
      requirements: 'Windows 10 or later',
      features: [
        t('download.features.desktopApp', { ns: 'home' }),
        t('download.features.officeIntegration', { ns: 'home' }),
        t('download.features.offlineSync', { ns: 'home' })
      ]
    },
    { 
      platform: 'macOS',
      version: 'v1.0',
      requirements: 'macOS 10.14 or later',
      features: [
        t('download.features.nativeDesign', { ns: 'home' }),
        t('download.features.quickLook', { ns: 'home' }),
        t('download.features.spotlightSearch', { ns: 'home' })
      ]
    },
    { 
      platform: 'Linux',
      version: 'v1.0',
      requirements: 'Ubuntu 18.04+ or equivalent',
      features: [
        t('download.features.appImageFormat', { ns: 'home' }),
        t('download.features.commandLineTools', { ns: 'home' }),
        t('download.features.packageManagers', { ns: 'home' })
      ]
    },
  ];

  return (
    <div className="min-h-screen">
      <Header />
      
      <HeroSection />

      {/* Features Section */}
      <section id="features" className="py-20 bg-white">
        <div className="container max-w-7xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-16 max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
                {t('features.title', { ns: 'home' })}
              </h2>
              <p className="text-lg text-neutral-600 max-w-3xl mx-auto">
                {t('features.description', { ns: 'home' })}
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-10">
            {features.map((feature, index) => (
              <ScrollReveal key={index} delay={index * 100} direction="up">
                <div className="text-center group px-4 py-6 rounded-2xl bg-white shadow-sm hover:shadow-md transition-all duration-200">
                  <div className="w-16 h-16 bg-primary-50 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-primary-100 transition-colors duration-200">
                    <feature.icon className="w-8 h-8 text-primary-500" />
                  </div>
                  <h3 className="text-2xl font-semibold text-neutral-900 mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-neutral-600">
                    {feature.description}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

        {/* How to Use Citext Section */}
        <section id="how-to-use" className="py-20 bg-white">
            <div className="container max-w-6xl mx-auto">
                {/* Main Title */}
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
                        {t('howToUse.title', { ns: 'home' })}
                    </h2>
                    <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
                        {t('howToUse.description', { ns: 'home' })}
                    </p>
                </div>

                {/* Collect Section */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-24">
                    {/* Left: Text */}
                    <div className="text-left">
                        <h3 className="text-2xl md:text-3xl font-semibold text-neutral-900 mb-4">
                            {t('howToUse.collect.title', { ns: 'home' })}
                        </h3>
                        <p className="text-lg text-neutral-600 leading-relaxed">
                            {t('howToUse.collect.description', { ns: 'home' })}
                        </p>
                    </div>

                    {/* Right: Animation */}
                    <div className="flex justify-center">
                        <ReferenceCaptureAnimation />
                    </div>
                </div>

                {/* Organize Section */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-24">
                    {/* Left: Animation */}
                    <div className="flex justify-center">
                        <ReferenceOrganizationAnimation />
                    </div>

                    {/* Right: Text */}
                    <div className="text-left">
                        <h3 className="text-2xl md:text-3xl font-semibold text-neutral-900 mb-4">
                            {t('howToUse.organize.title', { ns: 'home' })}
                        </h3>
                        <p className="text-lg text-neutral-600 leading-relaxed">
                            {t('howToUse.organize.description', { ns: 'home' })}
                        </p>
                    </div>
                </div>

                {/* Cite Section */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-24">
                    {/* Left: Text */}
                    <div className="text-left">
                        <h3 className="text-2xl md:text-3xl font-semibold text-neutral-900 mb-4">
                            {t('howToUse.cite.title', { ns: 'home' })}
                        </h3>
                        <p
                            className="text-lg text-neutral-600 leading-relaxed"
                            dangerouslySetInnerHTML={{
                                __html: t('howToUse.cite.description', { ns: 'home' }),
                            }}
                        />
                    </div>

                    {/* Right: Animation */}
                    <div className="flex justify-center">
                        <ReferenceCiteAnimation />
                    </div>
                </div>

                {/* Annotation & Smart Organization Section */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    {/* Left: Animation */}
                    <div className="flex justify-center">
                        <ReferenceAnnotationAnimation />
                    </div>

                    {/* Right: Text */}
                    <div className="text-left lg:pl-8">
                        <h3 className="text-2xl md:text-3xl font-semibold text-neutral-900 mb-4">
                            {t('howToUse.annotation.title', { ns: 'home' })}
                        </h3>
                        <p
                            className="text-lg text-neutral-600 leading-relaxed"
                            dangerouslySetInnerHTML={{
                                __html: t('howToUse.annotation.description', { ns: 'home' }),
                            }}
                        />
                    </div>
                </div>
            </div>
        </section>

        {/* Download Section */}
      <section id="download" className="py-20 bg-neutral-50">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
            <ScrollReveal>
              <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
                {t('download.title', { ns: 'home' })}
              </h2>
              <p className="text-lg text-neutral-600 mb-12">
                {t('download.description', { ns: 'home' })}
              </p>
            </ScrollReveal>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              {downloadOptions.map((option, index) => (
                <ScrollReveal key={index} delay={index * 150} direction="up">
                  <div className="card text-center hover:shadow-medium transition-shadow duration-300">
                    <h3 className="text-2xl font-semibold text-neutral-900 mb-2">
                      {option.platform}
                    </h3>
                    <p className="text-neutral-600 mb-1">{t('download.version', { ns: 'home' })} {option.version}</p>
                    <p className="text-xs text-neutral-400 mb-4">{option.requirements}</p>
                    
                    <div className="mb-6">
                      <div className="text-sm font-medium text-neutral-700 mb-2">{t('download.featuresTitle', { ns: 'home' })}</div>
                      <div className="space-y-1">
                        {option.features.map((feature, idx) => (
                          <div key={idx} className="flex items-center justify-center gap-2 text-xs text-neutral-600">
                            <CheckCircle className="w-3 h-3 text-green-500" />
                            {feature}
                          </div>
                        ))}
                      </div>
                    </div>

                      <Button className="w-full" disabled>
                          🚧 {t('download.comingSoon', { ns: 'home' })}
                      </Button>
                  </div>
                </ScrollReveal>
              ))}
            </div>

            <ScrollReveal delay={450}>
              <p className="text-sm text-neutral-500">
                {t('download.requirements', { ns: 'home' })}
              </p>
            </ScrollReveal>
          </div>
        </div>
      </section>

        {/* Support Section (Link Only) */}
        <section id="support" className="py-20 bg-white text-center">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-6">
                    {t('support.title', { ns: 'home' })}
                </h2>
                <p className="text-lg text-neutral-600 mb-8 max-w-2xl mx-auto">
                    {t('support.description', { ns: 'home' })}
                </p>

                <Link
                    href="/contact"
                    className="inline-block bg-primary-600 hover:bg-primary-700 text-white font-medium py-3 px-8 rounded-lg transition"
                >
                    {t('support.support')}
                </Link>
            </div>
        </section>

        {/* CTA Section */}
        <section id="contact" className="relative py-20 bg-gradient-to-br from-primary-600 via-primary-500 to-primary-700 overflow-hidden">
            <div className="absolute inset-0 pointer-events-none select-none" aria-hidden="true">
                {/* Dekoratif blur efektli daireler */}
                <div className="absolute left-[-15vw] top-[-15vw] w-[50vw] h-[50vw] bg-primary-400 opacity-20 rounded-full blur-3xl" />
                <div className="absolute right-[-15vw] bottom-[-15vw] w-[50vw] h-[50vw] bg-primary-300 opacity-15 rounded-full blur-2xl" />
                <div className="absolute left-[10%] bottom-[10%] w-[30vw] h-[30vw] bg-white opacity-5 rounded-full blur-xl" />

            </div>

            <div className="container relative z-10">
                <ScrollReveal>
                    <div className="max-w-2xl mx-auto text-center text-white">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white drop-shadow-sm">
                            {t('cta.title', { ns: 'home' })}
                        </h2>
              <p className="text-lg text-primary-100 mb-8 drop-shadow-sm">
                {t('cta.description', { ns: 'home' })}
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/auth/signup">
                  <Button variant="secondary" size="lg" className="w-full sm:w-auto shadow-lg">
                    {t('buttons.startFreeTrial', { ns: 'common' })}
                  </Button>
                </Link>
                <Link href="/pricing">
                  <Button variant="outline" size="lg" className="w-full sm:w-auto text-white border-white hover:bg-white hover:text-primary-500 shadow-lg">
                    {t('buttons.viewPricing', { ns: 'common' })}
                  </Button>
                </Link>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <Footer />
      <ScrollToTop />
    </div>
  );
} 