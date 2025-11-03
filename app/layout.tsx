import type { Metadata } from 'next'
import './globals.css'
import I18nProvider from '@/components/providers/I18nProvider'
import { AuthProvider } from '@/components/providers/AuthProvider'

export const metadata: Metadata = {
  title: {
    template: '%s | Citext',
    default: 'Citext - Modern Reference Management'
  },
  description: 'Citext is a modern, powerful reference management application. Organize, cite, and collaborate on your research with ease.',
  keywords: ['reference management', 'citations', 'research', 'bibliography', 'academic'],
  authors: [{ name: 'Citext Team' }],
  creator: 'Citext',
  metadataBase: new URL('https://citext.com'),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://citext.com',
    title: 'Citext - Modern Reference Management',
    description: 'Citext is a modern, powerful reference management application.',
    siteName: 'Citext',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Citext - Modern Reference Management',
    description: 'Citext is a modern, powerful reference management application.',
    creator: '@citext',
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