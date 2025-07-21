import React from 'react';
import Link from 'next/link';
import { Check, Mail, Star } from 'lucide-react';
import { Metadata } from 'next';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Button from '@/components/ui/Button';
import type { PricingPlan } from '@/types';

export const metadata: Metadata = {
  title: 'Pricing - RefCite',
  description: 'Choose the perfect RefCite plan for your research needs. Free for individuals, flexible pricing for teams and institutions.',
};

export default function PricingPage() {
  const plans: PricingPlan[] = [
    {
      id: 'free',
      name: 'Free',
      description: 'Perfect for individual researchers and students',
      price: 0,
      currency: 'USD',
      billing: 'monthly',
      type: 'individual',
      features: [
        'Up to 1,000 references',
        'Basic citation styles',
        'Local storage',

      ],
    },
    {
      id: 'individual',
      name: 'Individual Pro',
      description: 'For power users who need advanced features',
      price: 9.99,
      currency: 'USD',
      billing: 'monthly',
      type: 'individual',
      recommended: true,
      features: [
        'Unlimited references',
        'All citation styles (500+)',
        'Cloud sync across devices',
        'Advanced search and filters',
        'Custom tags and folders',

      ],
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      description: 'For institutions, libraries, and large teams',
      price: 'contact',
      currency: 'USD',
      billing: 'annually',
      type: 'enterprise',
      features: [
        'Everything in Individual Pro',
        'Unlimited team members',
        'Advanced admin controls',
        'Single Sign-On (SSO)',
        'Custom branding',
        'Advanced analytics and reporting',
        'API access',
        'Custom integrations',


      ],
    },
  ];

  const faqs = [
    {
      question: 'Can I upgrade or downgrade my plan at any time?',
      answer: 'Yes, you can change your plan at any time. Upgrades take effect immediately, and downgrades take effect at the end of your current billing period.',
    },
    {
      question: 'What happens to my data if I cancel?',
      answer: 'Your data remains accessible in read-only mode for 30 days after cancellation. You can export all your data during this period.',
    },
    {
      question: 'Do you offer student discounts?',
      answer: 'Students can use our free plan, which includes all essential features. For advanced features, we offer a 50% student discount on Individual Pro plans.',
    },
    {
      question: 'Is there a limit to how many devices I can use?',
      answer: 'Individual plans can be used on up to 5 devices. Enterprise plans have no device limits.',
    },
    {
      question: 'Do you offer refunds?',
      answer: 'We offer a 30-day money-back guarantee for all paid plans. Contact support for refund requests.',
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
              Choose Your <span className="text-primary-500">RefCite</span> Plan
            </h1>
            <p className="text-xl text-neutral-600 mb-4">
              Start free and upgrade as your research grows. 
              All plans include our core reference management features.
            </p>
            <div className="flex items-center justify-center gap-2 text-sm text-neutral-500 mb-4">
              <Star className="w-4 h-4 text-yellow-400 fill-current" />
              <span>30-day money-back guarantee</span>
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
                      Most Popular
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
                        Contact Us
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
                            Billed {plan.billing}
                          </div>
                        )}
                      </>
                    )}
                  </div>
                  {plan.type === 'enterprise' ? (
                    <Link href="/contact">
                      <Button className="w-full" size="sm">
                        <Mail className="w-4 h-4 mr-2" />
                        Contact Sales
                      </Button>
                    </Link>
                  ) : (
                    <Link href="/auth/signup">
                      <Button 
                        variant={plan.recommended ? 'primary' : 'outline'} 
                        className="w-full" 
                        size="sm"
                      >
                        {plan.price === 0 ? 'Get Started Free' : 'Start Free Trial'}
                      </Button>
                    </Link>
                  )}
                </div>
                <div className="space-y-4">
                  <div className="text-xs font-semibold text-neutral-900 mb-2">
                    What's included:
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
                Frequently Asked Questions
              </h2>
              <p className="text-base text-neutral-600">
                Got questions? We've got answers.
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
                Still have questions?
              </p>
              <Link href="/contact">
                <Button variant="outline" size="sm">
                  Contact Support
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary-500">
        <div className="container">
          <div className="max-w-2xl mx-auto text-center text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to transform your research?
            </h2>
            <p className="text-lg text-primary-100 mb-8">
              Join thousands of researchers who trust RefCite to organize their references.
            </p>
            
            <Link href="/auth/signup">
              <Button variant="secondary" size="lg">
                Start Your Free Trial
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
} 