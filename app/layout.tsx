import type { Metadata, Viewport } from 'next'
import { DM_Sans, Playfair_Display, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: '--font-dm-sans'
});
const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: '--font-playfair'
});
const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: '--font-geist-mono'
});

const BASE_URL = 'https://smartmenu.tn';

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),

  title: {
    default: 'SmartMenu — Menu Digital QR pour Restaurants Tunisiens',
    template: '%s | SmartMenu',
  },
  description:
    'Creez votre menu digital professionnel accessible par QR code en quelques minutes. Solution de menu digital de luxe pour les restaurants tunisiens. Sans application, sans friction.',

  keywords: [
    'menu digital tunisie',
    'menu qr code restaurant',
    'menu en ligne tunisie',
    'menu restaurant qr',
    'smartmenu',
    'carte restaurant digitale',
    'menu numerique tunisie',
    'qr code restaurant tunisie',
    'menu digital hammamet',
    'menu digital tunis',
  ],

  authors: [{ name: 'SmartMenu', url: BASE_URL }],
  creator: 'SmartMenu',
  publisher: 'SmartMenu',

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

  openGraph: {
    type: 'website',
    locale: 'fr_TN',
    url: BASE_URL,
    siteName: 'SmartMenu',
    title: 'SmartMenu — Menu Digital QR pour Restaurants Tunisiens',
    description:
      'Creez votre menu digital professionnel accessible par QR code en quelques minutes. Sans application, sans friction.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'SmartMenu - Menu Digital de Luxe pour restaurants tunisiens',
      },
    ],
  },

  twitter: {
    card: 'summary_large_image',
    title: 'SmartMenu — Menu Digital QR pour Restaurants Tunisiens',
    description:
      'Creez votre menu digital professionnel accessible par QR code en quelques minutes.',
    images: ['/og-image.png'],
  },

  icons: {
    icon: '/logo.png',
    shortcut: '/logo.png',
    apple: '/logo.png',
  },

  alternates: {
    canonical: BASE_URL,
    languages: { 'fr-TN': BASE_URL },
  },

  category: 'technology',
};

export const viewport: Viewport = {
  themeColor: '#C9A84C',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="fr" className={`${dmSans.variable} ${playfair.variable} ${geistMono.variable} bg-background`}>
      <body className="font-sans antialiased">
        <div className="noise-overlay" />
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
