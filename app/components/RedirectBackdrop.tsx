'use client'

import { Backdrop, Box, CircularProgress, Typography, Button } from '@mui/material'

type Props = {
  open: boolean
  message: string
  onCancel: () => void
}

export default function RedirectBackdrop({ open, message, onCancel }: Props) {
  return (
    <Backdrop open={open} sx={{ zIndex: 9999, color: '#fff' }}>
      <Box textAlign="center">
        <CircularProgress color="inherit" />
        <Typography variant="h6" mt={2}>
          {message}
        </Typography>
        <Button
          variant="contained"
          color="error"
          sx={{ mt: 2 }}
          onClick={onCancel}
        >
          Cancelar redirección
        </Button>
      </Box>
    </Backdrop>
  )
}
