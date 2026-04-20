import type { Metadata } from 'next'
import { Container, Typography, Button, Box } from '@mui/material'
import TelegramIcon from '@mui/icons-material/Telegram'

const SITE_URL = 'https://www.compatips.com'

export const metadata: Metadata = {
  title: 'Únete al canal de Telegram',
  description:
    'Únete al canal de Telegram @ofertasperronas y recibe las mejores ofertas escondidas de Amazon México todos los días.',
  alternates: { canonical: `${SITE_URL}/telegram` },
  openGraph: {
    title: 'Únete al canal de Telegram | Compatips',
    description:
      'Recibe las mejores ofertas de Amazon México en tu celular. Canal exclusivo con descuentos actualizados diariamente.',
    url: `${SITE_URL}/telegram`,
    type: 'website',
  },
}

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
          href="https://t.me/ofertasperronas"
          target="_blank"
          rel="noopener noreferrer"
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
