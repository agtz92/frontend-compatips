'use client'

import { Typography, Box, Paper } from '@mui/material'
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined'

type Props = {
  titulo?: string | null
  categoria?: string | null
  descuento?: number | null
  precioOriginal?: number | null
  precioOferta?: number | null
  fecha?: string | null
}

export default function SobreLaOferta({ titulo, categoria, descuento, precioOriginal, precioOferta, fecha }: Props) {
  if (!titulo && !categoria) return null

  const ahorro = precioOriginal && precioOferta ? precioOriginal - precioOferta : null
  const fechaFormateada = fecha
    ? new Date(fecha).toLocaleDateString('es-MX', { day: 'numeric', month: 'long', year: 'numeric' })
    : null

  return (
    <Paper
      elevation={0}
      sx={{
        mt: 4,
        p: 3,
        borderRadius: 3,
        bgcolor: 'rgba(255, 153, 0, 0.04)',
        border: '1px solid rgba(255, 153, 0, 0.15)',
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5 }}>
        <InfoOutlinedIcon sx={{ color: '#FF9900', fontSize: 22 }} />
        <Typography variant="h6" component="h2" fontWeight={700} sx={{ fontSize: '1.1rem' }}>
          ¿Por qué aprovechar esta oferta{titulo ? ` de ${titulo}` : ''}?
        </Typography>
      </Box>

      <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.8 }}>
        {categoria && (
          <>Esta oferta de <strong>{categoria}</strong> en Amazon México</>
        )}
        {!categoria && <>Esta oferta en Amazon México</>}
        {descuento != null && descuento > 0 && (
          <> ofrece un descuento del <strong>{descuento}%</strong></>
        )}
        {precioOriginal != null && (
          <> sobre el precio original de <strong>${precioOriginal.toFixed(2)} MXN</strong></>
        )}
        {precioOferta != null && (
          <>, quedando en <strong>${precioOferta.toFixed(2)} MXN</strong></>
        )}
        .
        {fechaFormateada && <> Publicada el {fechaFormateada}.</>}
        {ahorro != null && ahorro > 0 && (
          <> Esto representa un ahorro de <strong>${ahorro.toFixed(2)} MXN</strong> comparado con el precio regular.</>
        )}
      </Typography>

      {categoria && descuento != null && descuento > 0 && (
        <Typography variant="body2" color="text.secondary" sx={{ mt: 1.5, lineHeight: 1.8 }}>
          Los productos de <strong>{categoria}</strong> suelen tener variabilidad de precio en Amazon,
          por lo que aprovechar ofertas con más del {descuento}% de descuento es recomendable cuando
          el producto cumple con tus necesidades.
        </Typography>
      )}
    </Paper>
  )
}
