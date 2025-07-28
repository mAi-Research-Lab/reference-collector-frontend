'use client';

import React, { useState, useEffect } from 'react';
import { Check, Crown, Star, CreditCard, Shield, Clock } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Button from '@/components/ui/Button';
import { setDocumentTitle } from '@/lib/utils';

interface PricingPlan {
  id: string;
  name: string;
  price: number;
  period: string;
  features: string[];
  popular?: boolean;
  description: string;
}

export default function PaymentPage() {
  const { t } = useTranslation(['pricing', 'common']);
  const [selectedPlan, setSelectedPlan] = useState<string>('monthly');
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');

  useEffect(() => {
    setDocumentTitle(t('payment.title', { ns: 'pricing' }));
  }, [t]);

  const plans: PricingPlan[] = [
    {
      id: 'free',
      name: 'Free',
      price: 0,
      period: 'forever',
      description: 'Perfect for getting started',
      features: [
        'Up to 100 references',
        'Basic citation formats',
        'PDF storage (100MB)',
        'Export to Word/PDF',
        'Email support'
      ]
    },
    {
      id: 'monthly',
      name: 'Pro Monthly',
      price: billingCycle === 'monthly' ? 9.99 : 7.99,
      period: billingCycle === 'monthly' ? 'month' : 'month',
      description: 'For serious researchers',
      popular: true,
      features: [
        'Unlimited references',
        'All citation formats',
        'Unlimited PDF storage',
        'Advanced search & filters',
        'Team collaboration',
        'Priority support',
        'Auto-backup',
        'API access'
      ]
    },
    {
      id: 'yearly',
      name: 'Pro Yearly',
      price: billingCycle === 'yearly' ? 79.99 : 95.88,
      period: 'year',
      description: 'Best value for long-term use',
      features: [
        'Everything in Pro Monthly',
        '2 months free',
        'Advanced analytics',
        'Custom integrations',
        'Premium templates',
        'Dedicated account manager'
      ]
    }
  ];

  const handlePayment = async (planId: string) => {
    // Placeholder for payment processing
    alert(`Payment process for ${planId} would start here. Integration with payment provider needed.`);
  };

  return (
    <div className="min-h-screen bg-neutral-50">
      <Header />
      
      <div className="max-w-6xl mx-auto py-12 px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-neutral-900 mb-4">
            Choose Your Plan
          </h1>
          <p className="text-xl text-neutral-600 max-w-2xl mx-auto">
            Upgrade to unlock powerful features and take your research to the next level
          </p>
        </div>

        {/* Billing Toggle */}
        <div className="flex justify-center mb-12">
          <div className="bg-white p-1 rounded-xl border border-neutral-200">
            <div className="flex">
              <button
                onClick={() => setBillingCycle('monthly')}
                className={`px-6 py-3 rounded-lg text-sm font-medium transition-all ${
                  billingCycle === 'monthly'
                    ? 'bg-primary-500 text-white shadow-sm'
                    : 'text-neutral-600 hover:text-neutral-900'
                }`}
              >
                Monthly
              </button>
              <button
                onClick={() => setBillingCycle('yearly')}
                className={`px-6 py-3 rounded-lg text-sm font-medium transition-all relative ${
                  billingCycle === 'yearly'
                    ? 'bg-primary-500 text-white shadow-sm'
                    : 'text-neutral-600 hover:text-neutral-900'
                }`}
              >
                Yearly
                <span className="absolute -top-2 -right-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                  Save 20%
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`bg-white rounded-2xl border-2 transition-all duration-200 hover:shadow-lg ${
                plan.popular
                  ? 'border-primary-500 shadow-lg relative'
                  : 'border-neutral-200 hover:border-primary-300'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-primary-500 text-white px-4 py-2 rounded-full text-sm font-medium flex items-center gap-1">
                    <Star className="w-4 h-4" />
                    Most Popular
                  </div>
                </div>
              )}

              <div className="p-8">
                <div className="text-center mb-8">
                  <div className="flex items-center justify-center mb-4">
                    {plan.id === 'free' && <Shield className="w-8 h-8 text-neutral-500" />}
                    {plan.id === 'monthly' && <Crown className="w-8 h-8 text-primary-500" />}
                    {plan.id === 'yearly' && <Star className="w-8 h-8 text-yellow-500" />}
                  </div>
                  
                  <h3 className="text-2xl font-bold text-neutral-900 mb-2">
                    {plan.name}
                  </h3>
                  
                  <p className="text-neutral-600 mb-4">
                    {plan.description}
                  </p>
                  
                  <div className="mb-6">
                    <span className="text-4xl font-bold text-neutral-900">
                      ${plan.price}
                    </span>
                    <span className="text-neutral-600 ml-1">
                      /{plan.period}
                    </span>
                  </div>
                </div>

                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-neutral-600">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  onClick={() => handlePayment(plan.id)}
                  variant={plan.popular ? 'primary' : 'outline'}
                  className="w-full"
                  disabled={plan.id === 'free'}
                >
                  {plan.id === 'free' ? 'Current Plan' : 'Choose Plan'}
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* Payment Security */}
        <div className="bg-white rounded-2xl border border-neutral-200 p-8 mb-12">
          <div className="text-center mb-8">
            <Shield className="w-12 h-12 text-green-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-neutral-900 mb-2">
              Secure Payment
            </h2>
            <p className="text-neutral-600">
              Your payment information is encrypted and secure
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <CreditCard className="w-8 h-8 text-primary-500 mx-auto mb-3" />
              <h3 className="font-semibold text-neutral-900 mb-2">
                Multiple Payment Methods
              </h3>
              <p className="text-sm text-neutral-600">
                Accept all major credit cards and PayPal
              </p>
            </div>
            
            <div className="text-center">
              <Shield className="w-8 h-8 text-green-500 mx-auto mb-3" />
              <h3 className="font-semibold text-neutral-900 mb-2">
                SSL Encrypted
              </h3>
              <p className="text-sm text-neutral-600">
                Bank-level security for all transactions
              </p>
            </div>
            
            <div className="text-center">
              <Clock className="w-8 h-8 text-blue-500 mx-auto mb-3" />
              <h3 className="font-semibold text-neutral-900 mb-2">
                Cancel Anytime
              </h3>
              <p className="text-sm text-neutral-600">
                No long-term commitments or hidden fees
              </p>
            </div>
          </div>
        </div>

        {/* FAQ */}
        <div className="bg-white rounded-2xl border border-neutral-200 p-8">
          <h2 className="text-2xl font-bold text-neutral-900 mb-8 text-center">
            Frequently Asked Questions
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-semibold text-neutral-900 mb-2">
                Can I change my plan later?
              </h3>
              <p className="text-sm text-neutral-600">
                Yes, you can upgrade or downgrade your plan at any time. Changes will be prorated.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold text-neutral-900 mb-2">
                Is there a free trial?
              </h3>
              <p className="text-sm text-neutral-600">
                Yes, you can try Pro features for 14 days free when you sign up for a paid plan.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold text-neutral-900 mb-2">
                What payment methods do you accept?
              </h3>
              <p className="text-sm text-neutral-600">
                We accept all major credit cards (Visa, MasterCard, American Express) and PayPal.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold text-neutral-900 mb-2">
                Can I cancel my subscription?
              </h3>
              <p className="text-sm text-neutral-600">
                Yes, you can cancel your subscription at any time. You'll retain access until the end of your billing period.
              </p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
} 