import React from 'react';
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
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Button from '@/components/ui/Button';

export default function HomePage() {
  const features = [
    {
      icon: FileText,
      title: 'Smart Organization',
      description: 'Automatically organize your references with intelligent tagging and categorization.',
    },
    {
      icon: Search,
      title: 'Powerful Search',
      description: 'Find any reference instantly with advanced search and filtering capabilities.',
    },
    {
      icon: Users,
      title: 'Team Collaboration',
      description: 'Share libraries and collaborate with colleagues seamlessly.',
    },
    {
      icon: Zap,
      title: 'Quick Citation',
      description: 'Generate citations in any format with just a few clicks.',
    },
  ];

  const testimonials = [
    {
      name: 'Dr. Sarah Johnson',
      role: 'Research Scientist',
      quote: 'RefCite has transformed how I manage my research. The interface is intuitive and the features are exactly what I need.',
      rating: 5,
    },
    {
      name: 'Prof. Michael Chen',
      role: 'University Professor',
      quote: 'Our entire research team uses RefCite. The collaboration features are outstanding.',
      rating: 5,
    },
    {
      name: 'Emma Rodriguez',
      role: 'PhD Student',
      quote: 'Finally, a reference manager that doesn\'t get in my way. Simple, fast, and reliable.',
      rating: 5,
    },
  ];

  const downloadOptions = [
    { platform: 'Windows', size: '125 MB', version: 'v2.1.0' },
    { platform: 'macOS', size: '98 MB', version: 'v2.1.0' },
    { platform: 'Linux', size: '112 MB', version: 'v2.1.0' },
  ];

  return (
    <div className="min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-white to-neutral-50 py-20">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-neutral-900 mb-6">
              Modern Reference
              <span className="text-primary-500"> Management</span>
            </h1>
            <p className="text-xl text-neutral-600 mb-8 max-w-2xl mx-auto">
              RefCite is a powerful, intuitive reference management application 
              designed for researchers, students, and academics who value simplicity and efficiency.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link href="/download">
                <Button size="lg" className="w-full sm:w-auto">
                  <Download className="w-5 h-5 mr-2" />
                  Download Free
                </Button>
              </Link>
              <Link href="/auth/signup">
                <Button variant="outline" size="lg" className="w-full sm:w-auto">
                  Get Started Online
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-sm text-neutral-500">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                Free for individuals
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                No credit card required
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                Works offline
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
              Everything you need to manage references
            </h2>
            <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
              RefCite combines the power of traditional reference managers with modern, 
              intuitive design and seamless collaboration features.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center group">
                <div className="w-16 h-16 bg-primary-50 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-primary-100 transition-colors duration-200">
                  <feature.icon className="w-8 h-8 text-primary-500" />
                </div>
                <h3 className="text-xl font-semibold text-neutral-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-neutral-600">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Download Section */}
      <section className="py-20 bg-neutral-50">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
              Available on all platforms
            </h2>
            <p className="text-lg text-neutral-600 mb-12">
              Download RefCite for your preferred operating system and start managing 
              your references today.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              {downloadOptions.map((option, index) => (
                <div key={index} className="card text-center">
                  <h3 className="text-xl font-semibold text-neutral-900 mb-2">
                    {option.platform}
                  </h3>
                  <p className="text-neutral-600 mb-1">Version {option.version}</p>
                  <p className="text-sm text-neutral-500 mb-6">{option.size}</p>
                  <Button className="w-full">
                    <Download className="w-4 h-4 mr-2" />
                    Download
                  </Button>
                </div>
              ))}
            </div>

            <p className="text-sm text-neutral-500">
              System requirements: Windows 10+, macOS 10.14+, or Ubuntu 18.04+
            </p>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
              Trusted by researchers worldwide
            </h2>
            <p className="text-lg text-neutral-600">
              See what our users have to say about RefCite
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="card">
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                  ))}
                </div>
                
                <Quote className="w-8 h-8 text-primary-200 mb-4" />
                
                <p className="text-neutral-700 mb-6 italic">
                  "{testimonial.quote}"
                </p>
                
                <div>
                  <div className="font-semibold text-neutral-900">
                    {testimonial.name}
                  </div>
                  <div className="text-sm text-neutral-500">
                    {testimonial.role}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary-500">
        <div className="container">
          <div className="max-w-2xl mx-auto text-center text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to get started?
            </h2>
            <p className="text-lg text-primary-100 mb-8">
              Join thousands of researchers who trust RefCite to manage their references.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/auth/signup">
                <Button variant="secondary" size="lg" className="w-full sm:w-auto">
                  Start Free Trial
                </Button>
              </Link>
              <Link href="/pricing">
                <Button variant="outline" size="lg" className="w-full sm:w-auto text-white border-white hover:bg-white hover:text-primary-500">
                  View Pricing
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
} 