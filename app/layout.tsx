import './globals.css'
import MuiThemeProvider from './theme-provider'
import type { Metadata } from 'next'
import { ReactNode } from 'react'
import Providers from './providers'

export const metadata: Metadata = {
  title: 'Compatips',
  description: 'Ofertas con referidos',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="es">
      <body>
        <Providers><MuiThemeProvider>{children}</MuiThemeProvider></Providers>
      </body>
    </html>
  )
}
