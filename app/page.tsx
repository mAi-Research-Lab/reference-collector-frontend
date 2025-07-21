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
import ScrollToTop from '@/components/ui/ScrollToTop';
import ScrollReveal from '@/components/ui/ScrollReveal';
import HeroSection from '@/components/layout/HeroSection';

export default function HomePage() {
  const features = [
    {
      icon: FileText,
      title: 'Smart Organization',
      description: 'Automatically organize your references with intelligent tagging, categorization, and machine learning-powered metadata extraction. Never lose track of important papers again.',
    },
    {
      icon: Search,
      title: 'Powerful Search',
      description: 'Find any reference instantly with advanced search, full-text indexing, and smart filters. Search by author, title, keywords, or even content within PDFs.',
    },
    {
      icon: Users,
      title: 'Team Collaboration',
      description: 'Share libraries, create group collections, and collaborate with colleagues in real-time. Perfect for research teams, departments, and academic institutions.',
    },
    {
      icon: Zap,
      title: 'Quick Citation',
      description: 'Generate perfectly formatted citations in over 500 styles including APA, MLA, Chicago, and journal-specific formats. One-click bibliography creation.',
    },
  ];

  const testimonials = [
    {
      name: 'Dr. Sarah Johnson',
      role: 'Research Scientist',
      institution: 'MIT',
      quote: 'RefCite has completely transformed how I manage my research. The AI-powered organization and seamless collaboration features have saved me countless hours. The interface is intuitive and the citation accuracy is unmatched.',
      rating: 5,
      researchField: 'Computational Biology'
    },
    {
      name: 'Prof. Michael Chen',
      role: 'University Professor',
      institution: 'Stanford University',
      quote: 'Our entire research team has adopted RefCite, and it\'s been game-changing. The real-time collaboration and advanced search capabilities make literature reviews so much more efficient. Best investment we\'ve made.',
      rating: 5,
      researchField: 'Machine Learning'
    },
    {
      name: 'Emma Rodriguez',
      role: 'PhD Student',
      institution: 'University of Oxford',
      quote: 'As a PhD student, I need tools that work seamlessly across devices and don\'t slow me down. RefCite delivers on both fronts. The offline sync is perfect for fieldwork, and the citation styles are comprehensive.',
      rating: 5,
      researchField: 'Environmental Science'
    },
    {
      name: 'Dr. James Thompson',
      role: 'Librarian & Research Coordinator',
      institution: 'University of Cambridge',
      quote: 'We\'ve implemented RefCite across our entire library system. The institutional features and admin controls are excellent. Students love the user experience, and faculty appreciate the advanced features.',
      rating: 5,
      researchField: 'Information Science'
    },
  ];

  const downloadOptions = [
    { 
      platform: 'Windows', 
      size: '125 MB', 
      version: 'v2.1.0',
      requirements: 'Windows 10 or later',
      features: ['Desktop app', 'Office integration', 'Offline sync']
    },
    { 
      platform: 'macOS', 
      size: '98 MB', 
      version: 'v2.1.0',
      requirements: 'macOS 10.14 or later',
      features: ['Native design', 'Quick Look', 'Spotlight search']
    },
    { 
      platform: 'Linux', 
      size: '112 MB', 
      version: 'v2.1.0',
      requirements: 'Ubuntu 18.04+ or equivalent',
      features: ['AppImage format', 'Command line tools', 'Package managers']
    },
  ];

  return (
    <div className="min-h-screen">
      <Header />
      
      <HeroSection />

      {/* Features Section */}
      <section id="features" className="py-20 bg-white">
        <div className="container">
          <ScrollReveal>
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
                Everything you need to manage references
              </h2>
              <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
                RefCite combines the power of traditional reference managers with modern, 
                intuitive design and seamless collaboration features.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <ScrollReveal key={index} delay={index * 100} direction="up">
                <div className="text-center group">
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
                Why Choose RefCite?
              </h2>
              <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
                Built by researchers, for researchers. RefCite addresses the real challenges 
                faced by the academic community with innovative solutions.
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
                    <h3 className="text-xl font-semibold text-neutral-900 mb-2">
                      No Vendor Lock-in
                    </h3>
                    <p className="text-neutral-600">
                      Your data belongs to you. Export your library at any time in multiple formats 
                      including BibTeX, RIS, and EndNote. Switch between tools without losing your work.
                    </p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-primary-500 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Zap className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-neutral-900 mb-2">
                      Lightning Fast Performance
                    </h3>
                    <p className="text-neutral-600">
                      Optimized for speed with local-first architecture. Search through thousands 
                      of references instantly, even when offline. Built with modern web technologies.
                    </p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-primary-500 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Users className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-neutral-900 mb-2">
                      Academic-First Design
                    </h3>
                    <p className="text-neutral-600">
                      Every feature is designed with academic workflows in mind. From dissertation 
                      writing to systematic reviews, RefCite adapts to your research methodology.
                    </p>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="right">
              <div className="bg-white rounded-2xl p-8 shadow-medium">
                <h3 className="text-2xl font-bold text-neutral-900 mb-6">
                  Trusted by Leading Institutions
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-accent-100 rounded-lg flex items-center justify-center">
                      <span className="text-accent-600 font-bold text-sm">MIT</span>
                    </div>
                    <span className="text-neutral-700">Massachusetts Institute of Technology</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-accent-100 rounded-lg flex items-center justify-center">
                      <span className="text-accent-600 font-bold text-sm">STF</span>
                    </div>
                    <span className="text-neutral-700">Stanford University</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-accent-100 rounded-lg flex items-center justify-center">
                      <span className="text-accent-600 font-bold text-sm">OXF</span>
                    </div>
                    <span className="text-neutral-700">University of Oxford</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-accent-100 rounded-lg flex items-center justify-center">
                      <span className="text-accent-600 font-bold text-sm">CAM</span>
                    </div>
                    <span className="text-neutral-700">University of Cambridge</span>
                  </div>
                </div>
                <div className="mt-6 p-4 bg-neutral-50 rounded-lg">
                  <p className="text-sm text-neutral-600 italic">
                    "RefCite has transformed how our research department manages citations. 
                    The collaboration features are exactly what we needed."
                  </p>
                  <p className="text-sm font-medium text-neutral-900 mt-2">
                    — Dr. Sarah Williams, Research Director
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
                Available on all platforms
              </h2>
              <p className="text-lg text-neutral-600 mb-12">
                Download RefCite for your preferred operating system and start managing 
                your references today.
              </p>
            </ScrollReveal>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              {downloadOptions.map((option, index) => (
                <ScrollReveal key={index} delay={index * 150} direction="up">
                  <div className="card text-center hover:shadow-medium transition-shadow duration-300">
                    <h3 className="text-xl font-semibold text-neutral-900 mb-2">
                      {option.platform}
                    </h3>
                    <p className="text-neutral-600 mb-1">Version {option.version}</p>
                    <p className="text-sm text-neutral-500 mb-4">{option.size}</p>
                    <p className="text-xs text-neutral-400 mb-4">{option.requirements}</p>
                    
                    <div className="mb-6">
                      <div className="text-sm font-medium text-neutral-700 mb-2">Features:</div>
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
                      Download for {option.platform}
                    </Button>
                  </div>
                </ScrollReveal>
              ))}
            </div>

            <ScrollReveal delay={450}>
              <p className="text-sm text-neutral-500">
                System requirements: Windows 10+, macOS 10.14+, or Ubuntu 18.04+
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
                Trusted by researchers worldwide
              </h2>
              <p className="text-lg text-neutral-600">
                See what our users have to say about RefCite
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
      <section id="contact" className="py-20 bg-primary-500">
        <div className="container">
          <ScrollReveal>
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
          </ScrollReveal>
        </div>
      </section>

      <Footer />
      <ScrollToTop />
    </div>
  );
} 