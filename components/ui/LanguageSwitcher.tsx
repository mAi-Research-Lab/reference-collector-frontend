'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useTranslation } from 'react-i18next';
import { ChevronDown } from 'lucide-react';

const LanguageSwitcher: React.FC = () => {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  const languages = [
    { code: 'en', name: 'English', flagSrc: '/flags/us.png' },
    { code: 'tr', name: 'Türkçe', flagSrc: '/flags/tr.png' },
  ];

  // During Next.js prerender/build, i18n can be not fully initialized yet.
  // Guard against `i18n.language` being `undefined`.
  const currentLangCode =
    (typeof i18n.language === 'string' && i18n.language) ||
    i18n.resolvedLanguage ||
    (i18n.options?.fallbackLng && typeof i18n.options.fallbackLng === 'string'
      ? i18n.options.fallbackLng
      : Array.isArray(i18n.options?.fallbackLng)
        ? i18n.options.fallbackLng[0]
        : undefined) ||
    'en';

  const currentLanguage =
    languages.find((lang) => currentLangCode.startsWith(lang.code)) || languages[0];

  const changeLanguage = (languageCode: string) => {
    i18n.changeLanguage(languageCode);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 text-sm text-neutral-600 hover:text-neutral-900 transition-colors duration-200"
        aria-label="Change language"
      >
        <Image
          src={currentLanguage.flagSrc}
          alt={`${currentLanguage.name} flag`}
          width={18}
          height={18}
          className="rounded-sm object-cover"
        />
        <span className="hidden sm:inline">{currentLanguage.name}</span>
        <ChevronDown className="w-3 h-3" />
      </button>

      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
          />
          
          {/* Dropdown */}
          <div className="absolute right-0 top-full mt-2 bg-white rounded-lg shadow-lg border border-neutral-200 py-1 z-20 min-w-[140px]">
            {languages.map((language) => (
              <button
                key={language.code}
                onClick={() => changeLanguage(language.code)}
                className={`w-full text-left px-4 py-2 text-sm hover:bg-neutral-50 transition-colors duration-200 flex items-center gap-2 ${
                  currentLangCode.startsWith(language.code) ? 'text-primary-500 bg-primary-50' : 'text-neutral-700'
                }`}
              >
                <Image
                  src={language.flagSrc}
                  alt={`${language.name} flag`}
                  width={18}
                  height={18}
                  className="rounded-sm object-cover"
                />
                <span>{language.name}</span>
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default LanguageSwitcher; 