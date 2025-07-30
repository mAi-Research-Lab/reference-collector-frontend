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
      size: '125 MB', 
      version: 'v2.1.0',
      requirements: 'Windows 10 or later',
      features: [
        t('download.features.desktopApp', { ns: 'home' }),
        t('download.features.officeIntegration', { ns: 'home' }),
        t('download.features.offlineSync', { ns: 'home' })
      ]
    },
    { 
      platform: 'macOS', 
      size: '98 MB', 
      version: 'v2.1.0',
      requirements: 'macOS 10.14 or later',
      features: [
        t('download.features.nativeDesign', { ns: 'home' }),
        t('download.features.quickLook', { ns: 'home' }),
        t('download.features.spotlightSearch', { ns: 'home' })
      ]
    },
    { 
      platform: 'Linux', 
      size: '112 MB', 
      version: 'v2.1.0',
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

      {/* Why Choose RefCite Section */}
      <section className="py-20 bg-neutral-50">
        <div className="container">
          <ScrollReveal>
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
                {t('whyChoose.title', { ns: 'home' })}
              </h2>
              <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
                {t('whyChoose.description', { ns: 'home' })}
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <ScrollReveal direction="left">
              <div className="space-y-8">
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-primary-500 rounded-lg flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-semibold text-neutral-900 mb-2">
                      {t('whyChoose.items.noVendorLockIn.title', { ns: 'home' })}
                    </h3>
                    <p className="text-neutral-600">
                      {t('whyChoose.items.noVendorLockIn.description', { ns: 'home' })}
                    </p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-primary-500 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Zap className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-semibold text-neutral-900 mb-2">
                      {t('whyChoose.items.lightningFast.title', { ns: 'home' })}
                    </h3>
                    <p className="text-neutral-600">
                      {t('whyChoose.items.lightningFast.description', { ns: 'home' })}
                    </p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-primary-500 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Users className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-semibold text-neutral-900 mb-2">
                      {t('whyChoose.items.academicFirst.title', { ns: 'home' })}
                    </h3>
                    <p className="text-neutral-600">
                      {t('whyChoose.items.academicFirst.description', { ns: 'home' })}
                    </p>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="right">
              <div className="bg-white rounded-2xl p-8 shadow-medium">
                <h3 className="text-2xl font-bold text-neutral-900 mb-6">
                  {t('whyChoose.trustedInstitutions.title', { ns: 'home' })}
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
                      <span className="text-primary-700 font-bold text-sm">MIT</span>
                    </div>
                    <span className="text-neutral-700">Massachusetts Institute of Technology</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
                      <span className="text-primary-700 font-bold text-sm">STF</span>
                    </div>
                    <span className="text-neutral-700">Stanford University</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
                      <span className="text-primary-700 font-bold text-sm">OXF</span>
                    </div>
                    <span className="text-neutral-700">University of Oxford</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
                      <span className="text-primary-700 font-bold text-sm">CAM</span>
                    </div>
                    <span className="text-neutral-700">University of Cambridge</span>
                  </div>
                </div>
                <div className="mt-6 p-4 bg-neutral-50 rounded-lg">
                  <p className="text-sm text-neutral-600 italic">
                    "{t('whyChoose.trustedInstitutions.quote', { ns: 'home' })}"
                  </p>
                  <p className="text-sm font-medium text-neutral-900 mt-2">
                    — {t('whyChoose.trustedInstitutions.author', { ns: 'home' })}
                  </p>
                </div>
              </div>
            </ScrollReveal>
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
                    <p className="text-sm text-neutral-500 mb-4">{option.size}</p>
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
                    
                    <Button className="w-full">
                      <Download className="w-4 h-4 mr-2" />
                      {t('download.downloadFor', { ns: 'home' })} {option.platform}
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

      {/* Testimonials Section */}
      <section id="about" className="py-20 bg-white">
        <div className="container">
          <ScrollReveal>
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
                {t('testimonials.title', { ns: 'home' })}
              </h2>
              <p className="text-lg text-neutral-600">
                {t('testimonials.description', { ns: 'home' })}
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <ScrollReveal key={index} delay={index * 150} direction="up">
                <div className="card hover:shadow-medium transition-all duration-300">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                      ))}
                    </div>
                    <div className="text-xs bg-accent-100 text-accent-700 px-2 py-1 rounded">
                      {testimonial.researchField}
                    </div>
                  </div>
                  
                  <Quote className="w-8 h-8 text-primary-200 mb-4" />
                  
                  <p className="text-neutral-700 mb-6 italic leading-relaxed">
                    "{testimonial.quote}"
                  </p>
                  
                  <div className="border-t border-neutral-200 pt-4">
                    <div className="font-semibold text-neutral-900">
                      {testimonial.name}
                    </div>
                    <div className="text-sm text-neutral-600">
                      {testimonial.role}
                    </div>
                    <div className="text-sm text-neutral-500 mt-1">
                      {testimonial.institution}
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
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