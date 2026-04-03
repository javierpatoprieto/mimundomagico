import type { Metadata } from 'next'
import { Nunito } from 'next/font/google'
import './globals.css'
import { DemoBanner } from '@/components/DemoBanner'
import { CookieBanner } from '@/components/CookieBanner'

const nunito = Nunito({
  subsets: ['latin'],
  weight: ['400', '600', '700', '800', '900'],
  variable: '--font-nunito',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL ?? 'https://mimundomagico.es'),
  title: 'Mi Mundo Mágico — Cuentos personalizados para tus hijos',
  description:
    'El cuento donde tu hijo/a es el héroe. Cuentos clásicos personalizados y cuentos únicos creados especialmente para ellos.',
  keywords: ['cuentos infantiles', 'cuentos personalizados', 'historias para niños', 'bedtime stories'],
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
    apple: '/favicon.svg',
  },
  openGraph: {
    title: 'Mi Mundo Mágico ✨',
    description: 'El cuento donde tu hijo/a es el héroe. Cuentos personalizados con IA.',
    url: 'https://mimundomagico.es',
    siteName: 'Mi Mundo Mágico',
    images: ['/og-image.png'],
    locale: 'es_ES',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mi Mundo Mágico ✨',
    description: 'El cuento donde tu hijo/a es el héroe.',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={nunito.variable}>
      <body className="bg-white text-gray-900 antialiased">
        <DemoBanner />
        <CookieBanner />
        {children}
      </body>
    </html>
  )
}
