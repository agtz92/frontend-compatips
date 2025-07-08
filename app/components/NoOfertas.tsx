'use client'

import { Box, Typography, Button, Paper } from '@mui/material'
import TelegramIcon from '@mui/icons-material/Telegram'

export default function NoOfertas() {
  return (
    <Paper
      elevation={3}
      sx={{
        mt: 6,
        p: 4,
        textAlign: 'center',
        borderRadius: 4,
      }}
    >
      <Typography variant="h5" gutterBottom>
        😔 No hay ofertas recientes en esta categoría
      </Typography>

      <Typography variant="body1" sx={{ mb: 3 }}>
        Vuelve a buscar en unas horas o únete a nuestro canal de Telegram para no perderte las próximas ofertas.
      </Typography>

      <Button
        variant="contained"
        color="primary"
        size="large"
        startIcon={<TelegramIcon />}
        onClick={() => window.open('https://t.me/ofertasperronas', '_blank')}
      >
        Unirme al canal de Telegram
      </Button>
    </Paper>
  )
}
