'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Eye, EyeOff, FileText, Check } from 'lucide-react';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import type { SignUpForm } from '@/types';

export default function SignUpPage() {
  const [formData, setFormData] = useState<SignUpForm>({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    plan: 'free',
    agreeToTerms: false,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<keyof SignUpForm, string>>>({});
  const [isLoading, setIsLoading] = useState(false);

  const plans = [
    {
      id: 'free' as const,
      name: 'Free Plan',
      price: 'Free',
      features: [
        'Up to 1,000 references',
        'Basic citation styles',
        'Local storage',
        'Desktop application',
      ],
    },
    {
      id: 'individual' as const,
      name: 'Individual Pro',
      price: '$9.99/month',
      features: [
        'Unlimited references',
        'All citation styles (500+)',
        'Cloud sync',
        'Advanced features',
      ],
      recommended: true,
    },
  ];

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof SignUpForm, string>> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (!formData.agreeToTerms) {
      newErrors.agreeToTerms = 'You must agree to the terms and conditions';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    
    try {
      // TODO: Implement actual signup logic
      console.log('Signup data:', formData);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Redirect or show success message
      alert('Account created successfully!');
    } catch (error) {
      console.error('Signup error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (field: keyof SignUpForm) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-neutral-50 flex items-center justify-center py-12 px-4">
      <div className="max-w-4xl w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Branding */}
          <div className="hidden lg:block">
            <Link href="/" className="flex items-center space-x-2 mb-8">
              <div className="w-10 h-10 bg-primary-500 rounded-lg flex items-center justify-center">
                <FileText className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold text-neutral-900">RefCite</span>
            </Link>
            
            <h1 className="text-4xl font-bold text-neutral-900 mb-4">
              Join thousands of researchers
            </h1>
            <p className="text-lg text-neutral-600 mb-8">
              Start organizing your references today with RefCite's powerful, 
              intuitive reference management platform.
            </p>
            
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Check className="w-5 h-5 text-green-500" />
                <span className="text-neutral-700">Free to start, upgrade anytime</span>
              </div>
              <div className="flex items-center gap-3">
                <Check className="w-5 h-5 text-green-500" />
                <span className="text-neutral-700">Works on all devices</span>
              </div>
              <div className="flex items-center gap-3">
                <Check className="w-5 h-5 text-green-500" />
                <span className="text-neutral-700">30-day money-back guarantee</span>
              </div>
            </div>
          </div>

          {/* Right Side - Form */}
          <div className="card max-w-md mx-auto w-full">
            <div className="lg:hidden text-center mb-8">
              <Link href="/" className="inline-flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-primary-500 rounded-lg flex items-center justify-center">
                  <FileText className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold text-neutral-900">RefCite</span>
              </Link>
              <h2 className="text-2xl font-bold text-neutral-900">Create your account</h2>
            </div>

            <div className="hidden lg:block mb-8">
              <h2 className="text-2xl font-bold text-neutral-900 mb-2">
                Create your account
              </h2>
              <p className="text-neutral-600">
                Get started with RefCite today
              </p>
            </div>

            {/* Plan Selection */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-neutral-700 mb-3">
                Choose your plan
              </label>
              <div className="space-y-3">
                {plans.map((plan) => (
                  <label
                    key={plan.id}
                    className={`relative flex cursor-pointer rounded-lg border p-4 focus:outline-none ${
                      formData.plan === plan.id
                        ? 'border-primary-500 bg-primary-50'
                        : 'border-neutral-300 bg-white hover:bg-neutral-50'
                    }`}
                  >
                    <input
                      type="radio"
                      name="plan"
                      value={plan.id}
                      checked={formData.plan === plan.id}
                      onChange={handleInputChange('plan')}
                      className="sr-only"
                    />
                    <div className="flex flex-1 items-center justify-between">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-semibold text-neutral-900">
                            {plan.name}
                          </span>
                          {plan.recommended && (
                            <span className="bg-primary-500 text-white px-2 py-0.5 rounded text-xs">
                              Recommended
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-neutral-600">{plan.price}</p>
                      </div>
                      <div className="flex-shrink-0">
                        <div className={`w-4 h-4 rounded-full border-2 ${
                          formData.plan === plan.id 
                            ? 'border-primary-500 bg-primary-500' 
                            : 'border-neutral-300'
                        }`}>
                          {formData.plan === plan.id && (
                            <div className="w-full h-full rounded-full bg-white scale-50"></div>
                          )}
                        </div>
                      </div>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                label="Full Name"
                type="text"
                placeholder="Enter your full name"
                value={formData.name}
                onChange={handleInputChange('name')}
                error={errors.name}
                required
              />

              <Input
                label="Email Address"
                type="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleInputChange('email')}
                error={errors.email}
                required
              />

              <div className="relative">
                <Input
                  label="Password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Create a password"
                  value={formData.password}
                  onChange={handleInputChange('password')}
                  error={errors.password}
                  required
                />
                <button
                  type="button"
                  className="absolute right-3 top-8 text-neutral-500 hover:text-neutral-700"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>

              <div className="relative">
                <Input
                  label="Confirm Password"
                  type={showConfirmPassword ? 'text' : 'password'}
                  placeholder="Confirm your password"
                  value={formData.confirmPassword}
                  onChange={handleInputChange('confirmPassword')}
                  error={errors.confirmPassword}
                  required
                />
                <button
                  type="button"
                  className="absolute right-3 top-8 text-neutral-500 hover:text-neutral-700"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>

              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  id="agreeToTerms"
                  checked={formData.agreeToTerms}
                  onChange={handleInputChange('agreeToTerms')}
                  className="mt-1 w-4 h-4 text-primary-500 border-neutral-300 rounded focus:ring-primary-500"
                />
                <label htmlFor="agreeToTerms" className="text-sm text-neutral-600">
                  I agree to the{' '}
                  <Link href="/terms" className="text-primary-500 hover:text-primary-600">
                    Terms of Service
                  </Link>{' '}
                  and{' '}
                  <Link href="/privacy" className="text-primary-500 hover:text-primary-600">
                    Privacy Policy
                  </Link>
                </label>
              </div>
              {errors.agreeToTerms && (
                <p className="text-sm text-red-600">{errors.agreeToTerms}</p>
              )}

              <Button type="submit" className="w-full" size="lg" loading={isLoading}>
                Create Account
              </Button>
            </form>

            <div className="mt-6 text-center">
              <span className="text-neutral-600">Already have an account? </span>
              <Link href="/auth/signin" className="text-primary-500 hover:text-primary-600 font-medium">
                Sign in
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 