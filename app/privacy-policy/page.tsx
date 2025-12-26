'use client';

import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { setDocumentTitle } from '@/lib/utils';

export default function PrivacyPolicyPage() {
  const { t, i18n, ready } = useTranslation(['privacy-policy', 'common']);

  // Tab title'ı dil değiştiğinde güncelle
  useEffect(() => {
    if (ready) {
      const title = t('title', { ns: 'privacy-policy' });
      setDocumentTitle(title);
    }
  }, [t, i18n.language, ready]);

  return (
    <div className="min-h-screen bg-neutral-50">
      <Header />
      
      <div className="py-20">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-4">
                {t('title', { ns: 'privacy-policy' })}
              </h1>
              <p className="text-lg text-neutral-600">
                {t('lastUpdated', { ns: 'privacy-policy' })}: {t('lastUpdatedDate', { ns: 'privacy-policy' })}
              </p>
            </div>

            {/* Content */}
            <div className="bg-white rounded-2xl p-8 md:p-12 shadow-sm border border-neutral-100 space-y-8">
              {/* Introduction */}
              <section>
                <h2 className="text-2xl font-semibold text-neutral-900 mb-4">
                  {t('introduction.title', { ns: 'privacy-policy' })}
                </h2>
                <p className="text-neutral-700 leading-relaxed">
                  {t('introduction.content', { ns: 'privacy-policy' })}
                </p>
              </section>

              {/* Data Collected */}
              <section>
                <h2 className="text-2xl font-semibold text-neutral-900 mb-4">
                  {t('dataCollected.title', { ns: 'privacy-policy' })}
                </h2>
                
                {/* User Account Information */}
                <div className="mb-6">
                  <h3 className="text-xl font-semibold text-neutral-900 mb-3">
                    {t('dataCollected.userAccountInfo.title', { ns: 'privacy-policy' })}
                  </h3>
                  <p className="text-neutral-700 leading-relaxed">
                    {t('dataCollected.userAccountInfo.content', { ns: 'privacy-policy' })}
                  </p>
                </div>

                {/* Academic Documents and Content */}
                <div>
                  <h3 className="text-xl font-semibold text-neutral-900 mb-3">
                    {t('dataCollected.academicDocuments.title', { ns: 'privacy-policy' })}
                  </h3>
                  <p className="text-neutral-700 leading-relaxed">
                    {t('dataCollected.academicDocuments.content', { ns: 'privacy-policy' })}
                  </p>
                </div>
              </section>

              {/* Purposes of Data Processing */}
              <section>
                <h2 className="text-2xl font-semibold text-neutral-900 mb-4">
                  {t('purposesOfDataProcessing.title', { ns: 'privacy-policy' })}
                </h2>
                <p className="text-neutral-700 leading-relaxed">
                  {t('purposesOfDataProcessing.content', { ns: 'privacy-policy' })}
                </p>
              </section>

              {/* Storage of Academic Content */}
              <section>
                <h2 className="text-2xl font-semibold text-neutral-900 mb-4">
                  {t('storageOfAcademicContent.title', { ns: 'privacy-policy' })}
                </h2>
                
                {/* Storage Environments */}
                <div className="mb-6">
                  <h3 className="text-xl font-semibold text-neutral-900 mb-3">
                    {t('storageOfAcademicContent.storageEnvironments.title', { ns: 'privacy-policy' })}
                  </h3>
                  <p className="text-neutral-700 leading-relaxed">
                    {t('storageOfAcademicContent.storageEnvironments.content', { ns: 'privacy-policy' })}
                  </p>
                </div>

                {/* Retention Period */}
                <div>
                  <h3 className="text-xl font-semibold text-neutral-900 mb-3">
                    {t('storageOfAcademicContent.retentionPeriod.title', { ns: 'privacy-policy' })}
                  </h3>
                  <p className="text-neutral-700 leading-relaxed">
                    {t('storageOfAcademicContent.retentionPeriod.content', { ns: 'privacy-policy' })}
                  </p>
                </div>
              </section>

              {/* Data Sharing */}
              <section>
                <h2 className="text-2xl font-semibold text-neutral-900 mb-4">
                  {t('dataSharing.title', { ns: 'privacy-policy' })}
                </h2>
                <p className="text-neutral-700 leading-relaxed">
                  {t('dataSharing.content', { ns: 'privacy-policy' })}
                </p>
              </section>

              {/* Ownership and Use of Academic Content */}
              <section>
                <h2 className="text-2xl font-semibold text-neutral-900 mb-4">
                  {t('ownershipAndUse.title', { ns: 'privacy-policy' })}
                </h2>
                <p className="text-neutral-700 leading-relaxed">
                  {t('ownershipAndUse.content', { ns: 'privacy-policy' })}
                </p>
              </section>

              {/* User Rights */}
              <section>
                <h2 className="text-2xl font-semibold text-neutral-900 mb-4">
                  {t('userRights.title', { ns: 'privacy-policy' })}
                </h2>
                <p className="text-neutral-700 leading-relaxed">
                  {t('userRights.content', { ns: 'privacy-policy' })}
                </p>
              </section>

              {/* Data Security */}
              <section>
                <h2 className="text-2xl font-semibold text-neutral-900 mb-4">
                  {t('dataSecurity.title', { ns: 'privacy-policy' })}
                </h2>
                <p className="text-neutral-700 leading-relaxed">
                  {t('dataSecurity.content', { ns: 'privacy-policy' })}
                </p>
              </section>

              {/* Changes to This Policy */}
              <section>
                <h2 className="text-2xl font-semibold text-neutral-900 mb-4">
                  {t('changes.title', { ns: 'privacy-policy' })}
                </h2>
                <p className="text-neutral-700 leading-relaxed">
                  {t('changes.content', { ns: 'privacy-policy' })}
                </p>
              </section>

              {/* Contact Us */}
              <section>
                <h2 className="text-2xl font-semibold text-neutral-900 mb-4">
                  {t('contactUs.title', { ns: 'privacy-policy' })}
                </h2>
                <p className="text-neutral-700 leading-relaxed mb-4">
                  {t('contactUs.description', { ns: 'privacy-policy' })}
                </p>
                <div className="text-neutral-700">
                  <p className="font-semibold mb-2">
                    {t('contactUs.support', { ns: 'privacy-policy' })}
                  </p>
                  <p>
                    <strong>{t('contactUs.email', { ns: 'privacy-policy' })}:</strong>{' '}
                    <a 
                      href="mailto:destek@citext.net" 
                      className="text-primary-500 hover:text-primary-600 underline"
                    >
                      destek@citext.net
                    </a>
                  </p>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
