import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'MiMundoMagico — Cuentos personalizados con IA',
  description: 'Crea cuentos de hadas únicos donde tu hijo o hija es el protagonista. Personaliza con su nombre, intereses y amigos. Magia a la hora de dormir.',
  keywords: ['cuentos infantiles', 'cuentos personalizados', 'IA para niños', 'cuentos de hadas', 'historias personalizadas'],
  authors: [{ name: 'MiMundoMagico' }],
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'https://mimundomagico.es'),
  openGraph: {
    title: 'MiMundoMagico — El cuento donde tu hijo es el héroe',
    description: 'Cuentos de hadas personalizados donde el protagonista es tu pequeño. Magia personalizada cada noche.',
    type: 'website',
    locale: 'es_ES',
    siteName: 'MiMundoMagico',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MiMundoMagico — Cuentos personalizados con IA',
    description: 'Cuentos de hadas personalizados donde el protagonista es tu pequeño.',
  },
  icons: {
    icon: 'data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🌟</text></svg>',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;500;600;700;800;900&family=Fredoka+One&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-body min-h-screen">
        {children}
      </body>
    </html>
  )
}
