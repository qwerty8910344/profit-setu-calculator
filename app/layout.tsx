import type { Metadata } from 'next'
import { DM_Sans, Space_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import Script from 'next/script'
import './globals.css'

const dmSans = DM_Sans({ 
  subsets: ["latin"],
  variable: '--font-sans'
});

const spaceMono = Space_Mono({ 
  weight: ['400', '700'],
  subsets: ["latin"],
  variable: '--font-mono'
});

export const metadata: Metadata = {
  title: 'Profit Setu - 50+ Smart Calculators for Finance, Business & Life',
  description: 'Free online calculators for profit & loss, GST, EMI, SIP, BMI, and more. Accurate results and expert financial insights for entrepreneurs and students.',
  generator: 'ProfitSetu',
  manifest: '/manifest.json',
  openGraph: {
    title: 'Profit Setu - 50+ Smart Calculators',
    description: 'Empowering entrepreneurs with intelligent financial tools.',
    url: 'https://profitsetu.com',
    siteName: 'Profit Setu',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  icons: {
    icon: '/favicon.png',
    apple: '/apple-icon.png',
  },
  metadataBase: new URL('https://profitsetu.com'),
  alternates: {
    canonical: '/',
  },
  verification: {
    google: 'google-site-verification-id', // Placeholder – user to replace
    yandex: 'yandex-verification-id',
    other: {
      'msvalidate.01': 'bing-verification-id',
    },
  },
}

export const viewport = {
  themeColor: '#ccff00',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
}

import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"
import { SplineBackground } from "@/components/spline-background"

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Profit Setu",
    "description": "50+ professional financial and business calculators for entrepreneurs, students, and life.",
    "applicationCategory": "FinanceApplication",
    "operatingSystem": "Web, Android, iOS",
    "url": "https://profitsetu.com",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "INR"
    },
    "featureList": "Profit & Loss, GST, EMI, SIP, Stock Market, BMI, Unit Converters"
  }

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://translate.google.com" />
        <link rel="dns-prefetch" href="https://translate.googleapis.com" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${dmSans.variable} ${spaceMono.variable} font-sans antialiased bg-background text-foreground transition-colors duration-300`}>
        <ThemeProvider attribute="class" defaultTheme="dark" forcedTheme="dark">
          <div className="grain-overlay" />
          <SplineBackground />
          {children}
          <Toaster />
        </ThemeProvider>
        <Analytics />
        <div 
          id="google_translate_element" 
          className="fixed top-6 sm:top-[72px] right-4 sm:right-8 z-50 glass-premium rounded-xl overflow-hidden shadow-2xl transition-all scale-90 sm:scale-100" 
        />
        <Script id="google-translate-config" strategy="lazyOnload">
          {`
            function googleTranslateElementInit() {
              new google.translate.TranslateElement({
                pageLanguage: 'en',
                includedLanguages: 'hi,bn,mr,ta,te,en',
                layout: google.translate.TranslateElement.InlineLayout.SIMPLE,
                autoDisplay: false
              }, 'google_translate_element');
            }
          `}
        </Script>
        <Script
          src="https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
          strategy="lazyOnload"
        />
        <style dangerouslySetInnerHTML={{ __html: `
          .goog-te-banner-frame.skiptranslate, .goog-te-banner-frame { display: none !important; }
          body { top: 0px !important; }
          .goog-te-gadget-icon { display: none !important; }
          .goog-te-gadget-simple { background-color: transparent !important; border: none !important; padding: 8px !important; border-radius: 8px !important; }
          .goog-te-gadget-simple span { color: var(--foreground) !important; font-family: var(--font-sans) !important; font-weight: 700 !important; }
        ` }} />
      </body>
    </html>
  )
}
