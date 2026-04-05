'use client'

import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Chip,
  Box,
  Grid,
  Alert,
} from '@mui/material'
import OpenInNewIcon from '@mui/icons-material/OpenInNew'
import LocalOfferIcon from '@mui/icons-material/LocalOffer'
import { alpha } from '@mui/material/styles'

const COLORS = {
  amazonOrange: '#FF9900',
  amazonOrangeHover: '#E68A00',
  discountRed: '#E53935',
  savingsGreen: '#B4E50D',
}

type Props = {
  producto: {
    titulo: string
    precioOriginal: number
    descuento: number
    precioOferta: number
    urlImagen: string
    linkReferidos: string
    fecha: string
    categoria: string
  }
}

export default function OfertaExpirada({ producto }: Props) {
  const ahorro = producto.precioOriginal - producto.precioOferta

  return (
    <Card variant="outlined" sx={{ borderRadius: 3, overflow: 'hidden' }}>
      <Grid container>
        {/* Image Column */}
        <Grid size={{ xs: 12, md: 5 }}>
          <Box sx={{ position: 'relative', height: { xs: 300, md: '100%' }, minHeight: { md: 400 }, bgcolor: 'white' }}>
            <CardMedia
              component="img"
              image={producto.urlImagen}
              alt={producto.titulo}
              sx={{ width: '100%', height: '100%', objectFit: 'contain', p: 2, filter: 'grayscale(70%)', opacity: 0.7 }}
            />
            {/* Expired stamp */}
            <Box sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%) rotate(-15deg)',
              border: '3px solid',
              borderColor: 'error.main',
              borderRadius: 1,
              px: 2,
              py: 0.5,
              bgcolor: alpha('#fff', 0.85),
            }}>
              <Typography variant="h6" color="error.main" fontWeight={800} letterSpacing={2}>
                EXPIRADA
              </Typography>
            </Box>
          </Box>
        </Grid>

        {/* Details Column */}
        <Grid size={{ xs: 12, md: 7 }}>
          <CardContent sx={{ p: { xs: 2, md: 4 }, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%' }}>
            <Box>
              {/* Category chip */}
              <Box sx={{ display: 'flex', gap: 1, mb: 2, flexWrap: 'wrap' }}>
                {producto.categoria && (
                  <Chip label={producto.categoria} variant="outlined" size="small" />
                )}
              </Box>

              {/* Title */}
              <Typography variant="h5" fontWeight={700} sx={{ mb: 2, lineHeight: 1.3 }}>
                {producto.titulo}
              </Typography>

              {/* Alert */}
              <Alert severity="warning" sx={{ mb: 2 }}>
                Esta oferta tiene más de 2 semanas y probablemente ya no está disponible.
              </Alert>

              {/* Price block */}
              <Box sx={{ borderLeft: `4px solid ${COLORS.savingsGreen}`, pl: 2, mb: 2, opacity: 0.7 }}>
                {producto.descuento > 0 && (
                  <Typography variant="body2" color="text.secondary" sx={{ textDecoration: 'line-through' }}>
                    ${producto.precioOriginal.toFixed(2)} MXN
                  </Typography>
                )}
                <Typography variant="h5" fontWeight={700} color="text.secondary">
                  ${producto.precioOferta.toFixed(2)} MXN
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  Este era el precio de oferta
                </Typography>
              </Box>

              {/* Savings callout */}
              {producto.descuento > 0 && ahorro > 0 && (
                <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 0.5, bgcolor: alpha(COLORS.savingsGreen, 0.08), px: 1.5, py: 0.5, borderRadius: 1, mb: 3, opacity: 0.7 }}>
                  <LocalOfferIcon sx={{ fontSize: 18, color: COLORS.savingsGreen }} />
                  <Typography variant="body2" fontWeight={600} color="text.secondary">
                    Ahorraste ${ahorro.toFixed(2)} MXN ({producto.descuento}%)
                  </Typography>
                </Box>
              )}

              {/* Date */}
              <Typography variant="caption" color="text.secondary" sx={{ mb: 2, display: 'block' }}>
                Publicado: {producto.fecha}
              </Typography>
            </Box>

            {/* CTA */}
            <Box>
              <Button
                variant="outlined"
                href={producto.linkReferidos}
                target="_blank"
                rel="noopener noreferrer"
                startIcon={<OpenInNewIcon />}
                fullWidth
                sx={{
                  borderColor: COLORS.amazonOrange,
                  color: COLORS.amazonOrange,
                  fontWeight: 600,
                  fontSize: '1rem',
                  py: 1.2,
                  borderRadius: 2,
                  textTransform: 'none',
                  '&:hover': { bgcolor: alpha(COLORS.amazonOrange, 0.08), borderColor: COLORS.amazonOrangeHover },
                }}
              >
                Ver producto en Amazon
              </Button>
              <Typography variant="caption" color="text.secondary" sx={{ mt: 1, textAlign: 'center', display: 'block' }}>
                Serás redirigido a Amazon.com.mx
              </Typography>
            </Box>
          </CardContent>
        </Grid>
      </Grid>
    </Card>
  )
}
