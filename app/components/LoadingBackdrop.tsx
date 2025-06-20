'use client'

import { Backdrop, Box, CircularProgress, Typography } from '@mui/material'

type Props = {
  open: boolean
  message?: string
}

export default function LoadingBackdrop({ open, message = 'Cargando ofertas...' }: Props) {
  return (
    <Backdrop open={open} sx={{ zIndex: 9999, color: '#fff' }}>
      <Box textAlign="center">
        <CircularProgress color="inherit" />
        <Typography variant="h6" mt={2}>
          {message}
        </Typography>
      </Box>
    </Backdrop>
  )
}
