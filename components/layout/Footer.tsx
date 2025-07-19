import React from 'react';
import Link from 'next/link';
import { FileText, Github, Twitter, Mail } from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const footerSections = [
    {
      title: 'Product',
      links: [
        { href: '/features', label: 'Features' },
        { href: '/pricing', label: 'Pricing' },
        { href: '/download', label: 'Download' },
        { href: '/roadmap', label: 'Roadmap' },
      ],
    },
    {
      title: 'Support',
      links: [
        { href: '/help', label: 'Help Center' },
        { href: '/contact', label: 'Contact Us' },
        { href: '/status', label: 'System Status' },
        { href: '/api-docs', label: 'API Documentation' },
      ],
    },
    {
      title: 'Company',
      links: [
        { href: '/about', label: 'About Us' },
        { href: '/blog', label: 'Blog' },
        { href: '/careers', label: 'Careers' },
        { href: '/press', label: 'Press Kit' },
      ],
    },
    {
      title: 'Legal',
      links: [
        { href: '/privacy', label: 'Privacy Policy' },
        { href: '/terms', label: 'Terms of Service' },
        { href: '/security', label: 'Security' },
        { href: '/cookies', label: 'Cookie Policy' },
      ],
    },
  ];

  const socialLinks = [
    { href: 'https://github.com/refcite', icon: Github, label: 'GitHub' },
    { href: 'https://twitter.com/refcite', icon: Twitter, label: 'Twitter' },
    { href: 'mailto:hello@refcite.com', icon: Mail, label: 'Email' },
  ];

  return (
    <footer className="bg-neutral-50 border-t border-neutral-200">
      <div className="container py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
          {/* Logo and Description */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-primary-500 rounded-lg flex items-center justify-center">
                <FileText className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-neutral-900">RefCite</span>
            </Link>
            <p className="text-neutral-600 mb-6 max-w-sm">
              Modern reference management for researchers, students, and academics. 
              Organize, cite, and collaborate on your research with ease.
            </p>
            
            {/* Social Links */}
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="text-neutral-400 hover:text-neutral-600 transition-colors duration-200"
                  aria-label={social.label}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Footer Sections */}
          {footerSections.map((section) => (
            <div key={section.title}>
              <h3 className="font-semibold text-neutral-900 mb-4">{section.title}</h3>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-neutral-600 hover:text-neutral-900 transition-colors duration-200"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Section */}
        <div className="border-t border-neutral-200 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-neutral-500 text-sm">
            © {currentYear} RefCite. All rights reserved.
          </p>
          
          <div className="flex items-center space-x-6 mt-4 md:mt-0">
            <span className="text-neutral-400 text-sm">Made with ❤️ for researchers</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 