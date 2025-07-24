'use client'

import { Container, Typography, Button, Box } from '@mui/material'
import TelegramIcon from '@mui/icons-material/Telegram'

export default function TelegramInvitePage() {
  return (
    <Container
      maxWidth="sm"
      sx={{
        py: 10,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
      }}
    >
      <Typography variant="h4" gutterBottom>
        ¡Únete a nuestro grupo de Telegram!
      </Typography>

      <Typography variant="body1" sx={{ mb: 4 }}>
        Descubre las mejores ofertas todos los días en nuestro canal exclusivo. Haz clic abajo para unirte.
      </Typography>

      <Box>
        <Button
          variant="contained"
          color="primary"
          size="large"
          startIcon={<TelegramIcon />}
          onClick={() =>
            window.open('https://t.me/ofertasperronas', '_blank')
          }
        >
          Unirme al canal
        </Button>
      </Box>
      <Typography variant="body1" sx={{ mt: 4 }}>
       O búscanos en canales de telegram como @ofertasperronas OFERTAS EN AMAZON 🔥🔥🔥
      </Typography>
      
    </Container>
  )
}
