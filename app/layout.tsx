import type { Metadata } from 'next'
import './globals.css'
import I18nProvider from '@/components/providers/I18nProvider'
import { AuthProvider } from '@/components/providers/AuthProvider'

export const metadata: Metadata = {
  title: {
    template: '%s | RefCite',
    default: 'RefCite - Modern Reference Management'
  },
  description: 'RefCite is a modern, powerful reference management application inspired by Zotero. Organize, cite, and collaborate on your research with ease.',
  keywords: ['reference management', 'citations', 'research', 'bibliography', 'academic'],
  authors: [{ name: 'RefCite Team' }],
  creator: 'RefCite',
  metadataBase: new URL('https://refcite.com'),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://refcite.com',
    title: 'RefCite - Modern Reference Management',
    description: 'RefCite is a modern, powerful reference management application inspired by Zotero.',
    siteName: 'RefCite',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'RefCite - Modern Reference Management',
    description: 'RefCite is a modern, powerful reference management application inspired by Zotero.',
    creator: '@refcite',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="antialiased bg-white text-neutral-900">
        <I18nProvider>
          <AuthProvider>
            <div className="min-h-screen flex flex-col">
              {children}
            </div>
          </AuthProvider>
        </I18nProvider>
      </body>
    </html>
  )
} 