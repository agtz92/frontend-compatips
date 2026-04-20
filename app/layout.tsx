import './globals.css'
import MuiThemeProvider from './theme-provider'
import type { Metadata } from 'next'
import { ReactNode } from 'react'
import Providers from './providers'
import ResponsiveNavbar from './components/ResponsiveNavbar'

const SITE_URL = 'https://www.compatips.com'

export const metadata: Metadata = {
  title: {
    default: 'Compatips - Ofertas en Amazon México',
    template: '%s | Compatips',
  },
  description:
    'Encuentra los mejores productos escondidos en oferta en Amazon México. Descuentos actualizados diariamente.',
  keywords: ['ofertas', 'amazon méxico', 'descuentos', 'productos en oferta', 'compatips'],
  alternates: { canonical: SITE_URL },
  openGraph: {
    title: 'Compatips - Ofertas en Amazon México',
    description:
      'Encuentra los mejores productos escondidos en oferta en Amazon México. Descuentos actualizados diariamente.',
    url: SITE_URL,
    siteName: 'Compatips',
    locale: 'es_MX',
    type: 'website',
  },
  metadataBase: new URL(SITE_URL),
}

const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Compatips',
  url: SITE_URL,
  logo: `${SITE_URL}/favicon.ico`,
  description: 'Ofertas escondidas en Amazon México con descuentos verificados.',
  sameAs: ['https://t.me/ofertasperronas'],
}

const websiteJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Compatips',
  url: SITE_URL,
  inLanguage: 'es-MX',
  potentialAction: {
    '@type': 'SearchAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: `${SITE_URL}/?search={search_term_string}`,
    },
    'query-input': 'required name=search_term_string',
  },
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="es">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
      </head>
      <body>
        <Providers><MuiThemeProvider><ResponsiveNavbar />{children}</MuiThemeProvider></Providers>
      </body>
    </html>
  )
}
