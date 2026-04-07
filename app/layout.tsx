import './globals.css'
import MuiThemeProvider from './theme-provider'
import type { Metadata } from 'next'
import { ReactNode } from 'react'
import Providers from './providers'
import ResponsiveNavbar from './components/ResponsiveNavbar'
import { Analytics } from '@vercel/analytics/next'

export const metadata: Metadata = {
  title: {
    default: 'Compatips - Ofertas en Amazon México',
    template: '%s | Compatips',
  },
  description:
    'Encuentra los mejores productos escondidos en oferta en Amazon México. Descuentos actualizados diariamente.',
  keywords: ['ofertas', 'amazon méxico', 'descuentos', 'productos en oferta', 'compatips'],
  openGraph: {
    title: 'Compatips - Ofertas en Amazon México',
    description:
      'Encuentra los mejores productos escondidos en oferta en Amazon México. Descuentos actualizados diariamente.',
    url: 'https://www.compatips.com',
    siteName: 'Compatips',
    locale: 'es_MX',
    type: 'website',
  },
  metadataBase: new URL('https://www.compatips.com'),
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="es">
      <body>
        <Providers><MuiThemeProvider><ResponsiveNavbar />{children}</MuiThemeProvider></Providers>
        <Analytics />
      </body>
    </html>
  )
}
