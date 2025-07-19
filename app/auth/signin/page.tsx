'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Eye, EyeOff, FileText } from 'lucide-react';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import type { SignInForm } from '@/types';

export default function SignInPage() {
  const [formData, setFormData] = useState<SignInForm>({
    email: '',
    password: '',
    rememberMe: false,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<keyof SignInForm, string>>>({});
  const [isLoading, setIsLoading] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof SignInForm, string>> = {};

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
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
      // TODO: Implement actual signin logic
      console.log('Signin data:', formData);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Redirect or show success message
      alert('Signed in successfully!');
    } catch (error) {
      console.error('Signin error:', error);
      setErrors({ email: 'Invalid email or password' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (field: keyof SignInForm) => (
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
              Welcome back to RefCite
            </h1>
            <p className="text-lg text-neutral-600 mb-8">
              Continue organizing your references and managing your research 
              with the tools you love.
            </p>
            
            <div className="bg-white rounded-xl p-6 shadow-soft border border-neutral-200">
              <h3 className="font-semibold text-neutral-900 mb-3">
                New to RefCite?
              </h3>
              <p className="text-neutral-600 mb-4">
                Create your free account and start organizing your references today.
              </p>
              <Link href="/auth/signup">
                <Button variant="outline" className="w-full">
                  Create Free Account
                </Button>
              </Link>
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
              <h2 className="text-2xl font-bold text-neutral-900">Welcome back</h2>
            </div>

            <div className="hidden lg:block mb-8">
              <h2 className="text-2xl font-bold text-neutral-900 mb-2">
                Sign in to your account
              </h2>
              <p className="text-neutral-600">
                Welcome back! Please sign in to continue.
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
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
                  placeholder="Enter your password"
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

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="rememberMe"
                    checked={formData.rememberMe}
                    onChange={handleInputChange('rememberMe')}
                    className="w-4 h-4 text-primary-500 border-neutral-300 rounded focus:ring-primary-500"
                  />
                  <label htmlFor="rememberMe" className="text-sm text-neutral-600">
                    Remember me
                  </label>
                </div>
                
                <Link 
                  href="/auth/forgot-password" 
                  className="text-sm text-primary-500 hover:text-primary-600"
                >
                  Forgot password?
                </Link>
              </div>

              <Button type="submit" className="w-full" size="lg" loading={isLoading}>
                Sign In
              </Button>
            </form>

            {/* Divider */}
            <div className="my-6 flex items-center">
              <div className="flex-1 border-t border-neutral-200"></div>
              <span className="px-4 text-sm text-neutral-500">or</span>
              <div className="flex-1 border-t border-neutral-200"></div>
            </div>

            {/* Social Login */}
            <div className="space-y-3">
              <Button variant="secondary" className="w-full" size="lg">
                <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="currentColor"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                Continue with Google
              </Button>
              
              <Button variant="secondary" className="w-full" size="lg">
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.024-.105-.949-.199-2.403.041-3.439.219-.937 1.219-5.160 1.219-5.160s-.312-.653-.312-1.618c0-1.515.873-2.646 1.963-2.646.925 0 1.372.694 1.372 1.526 0 .929-.593 2.319-.898 3.608-.255 1.079.541 1.958 1.604 1.958 1.926 0 3.407-2.030 3.407-4.957 0-2.593-1.863-4.405-4.526-4.405-3.084 0-4.896 2.312-4.896 4.703 0 .932.358 1.935.805 2.476.088.107.101.201.074.311-.080.339-.268 1.102-.305 1.258-.048.205-.158.248-.364.15-1.365-.636-2.219-2.635-2.219-4.235 0-3.417 2.484-6.557 7.160-6.557 3.764 0 6.695 2.683 6.695 6.268 0 3.739-2.357 6.747-5.628 6.747-1.098 0-2.133-.572-2.487-1.253 0 0-.545 2.081-.678 2.591-.245.938-.909 2.109-1.354 2.825.022 0 .027 0 .049 0C18.624 24.013 24.017 18.624 24.017 11.987 24.017 5.367 18.650.001 12.017.001z"/>
                </svg>
                Continue with GitHub
              </Button>
            </div>

            <div className="mt-6 text-center">
              <span className="text-neutral-600">Don't have an account? </span>
              <Link href="/auth/signup" className="text-primary-500 hover:text-primary-600 font-medium">
                Sign up
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 