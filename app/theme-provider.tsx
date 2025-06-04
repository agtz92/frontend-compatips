'use client'

import { ThemeProvider, createTheme, CssBaseline } from '@mui/material'
import { useMemo } from 'react'
import useMediaQuery from '@mui/material/useMediaQuery'

export default function MuiThemeProvider({ children }: { children: React.ReactNode }) {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)')

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: prefersDarkMode ? 'dark' : 'light',
        },
      }),
    [prefersDarkMode]
  )

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  )
}
