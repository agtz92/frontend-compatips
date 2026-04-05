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
} from '@mui/material'
import OpenInNewIcon from '@mui/icons-material/OpenInNew'
import AccessTimeIcon from '@mui/icons-material/AccessTime'
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
    esReciente: boolean
  }
}

export default function ProductoCard({ producto }: Props) {
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
              sx={{ width: '100%', height: '100%', objectFit: 'contain', p: 2 }}
            />
            {producto.descuento > 0 && (
              <Box sx={{ position: 'absolute', top: 16, left: 16 }}>
                <Chip
                  label={`-${producto.descuento}%`}
                  sx={{ bgcolor: COLORS.discountRed, color: 'white', fontWeight: 700, fontSize: '1rem', height: 36 }}
                />
              </Box>
            )}
          </Box>
        </Grid>

        {/* Details Column */}
        <Grid size={{ xs: 12, md: 7 }}>
          <CardContent sx={{ p: { xs: 2, md: 4 }, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%' }}>
            <Box>
              {/* Category + Reciente chips */}
              <Box sx={{ display: 'flex', gap: 1, mb: 2, flexWrap: 'wrap' }}>
                {producto.categoria && (
                  <Chip label={producto.categoria} variant="outlined" size="small" />
                )}
                {producto.esReciente && (
                  <Chip
                    label="Oferta reciente"
                    size="small"
                    icon={<AccessTimeIcon />}
                    sx={{ bgcolor: alpha(COLORS.savingsGreen, 0.15), color: COLORS.savingsGreen, fontWeight: 600 }}
                  />
                )}
              </Box>

              {/* Title */}
              <Typography variant="h5" fontWeight={700} sx={{ mb: 2, lineHeight: 1.3 }}>
                {producto.titulo}
              </Typography>

              {/* Price block */}
              <Box sx={{ borderLeft: `4px solid ${COLORS.savingsGreen}`, pl: 2, mb: 2 }}>
                {producto.descuento > 0 && (
                  <Typography variant="body2" color="text.secondary" sx={{ textDecoration: 'line-through' }}>
                    ${producto.precioOriginal.toFixed(2)} MXN
                  </Typography>
                )}
                <Typography variant="h4" fontWeight={800} color="text.primary">
                  ${producto.precioOferta.toFixed(2)} MXN
                </Typography>
              </Box>

              {/* Savings callout */}
              {producto.descuento > 0 && ahorro > 0 && (
                <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 0.5, bgcolor: alpha(COLORS.savingsGreen, 0.12), px: 1.5, py: 0.5, borderRadius: 1, mb: 3 }}>
                  <LocalOfferIcon sx={{ fontSize: 18, color: COLORS.savingsGreen }} />
                  <Typography variant="body2" fontWeight={600}>
                    Ahorras ${ahorro.toFixed(2)} MXN ({producto.descuento}% de descuento)
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
                variant="contained"
                href={producto.linkReferidos}
                target="_blank"
                rel="noopener noreferrer"
                startIcon={<OpenInNewIcon />}
                fullWidth
                sx={{
                  bgcolor: COLORS.amazonOrange,
                  color: '#111',
                  fontWeight: 700,
                  fontSize: '1rem',
                  py: 1.5,
                  borderRadius: 2,
                  textTransform: 'none',
                  '&:hover': { bgcolor: COLORS.amazonOrangeHover },
                }}
              >
                Ver en Amazon
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
