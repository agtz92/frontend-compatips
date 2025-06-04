'use client'

import { useParams } from 'next/navigation'
import { useQuery } from '@apollo/client'
import { GET_PRODUCTO_POR_ID } from '../../../graphql/queries/productoPorId'

import {
  Box,
  Container,
  Typography,
  CircularProgress,
  Card,
  CardContent,
  CardMedia,
  Button,
} from '@mui/material'

export default function ProductoDetalle() {
  const { id } = useParams()
  const { loading, error, data } = useQuery(GET_PRODUCTO_POR_ID, {
    variables: { id },
  })

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" mt={10}>
        <CircularProgress />
      </Box>
    )
  }

  if (error || !data?.productoPorId) {
    return <Typography color="error">Producto no encontrado.</Typography>
  }

  const p = data.productoPorId

  return (
    <Container maxWidth="md" sx={{ mt: 5 }}>
      <Card>
        <CardMedia
          component="img"
          image={p.urlImagen}
          alt={p.titulo}
          height="400"
        />
        <CardContent>
          <Typography variant="h5" fontWeight={600} gutterBottom>
            {p.titulo}
          </Typography>
          <Typography variant="body1" gutterBottom>
            Categoría: <strong>{p.categoria}</strong>
          </Typography>
          <Typography variant="body1">
            Precio original: <s>${p.precioOriginal.toFixed(2)}</s>
          </Typography>
          <Typography variant="body1">
            Descuento: {p.descuento}%
          </Typography>
          <Typography variant="h6" color="primary" sx={{ mt: 1 }}>
            Precio de oferta: ${p.precioOferta.toFixed(2)}
          </Typography>
          <Typography variant="body2" sx={{ mt: 2 }}>
            Fecha: {p.fecha}
          </Typography>
          <Button
            href={p.linkReferidos}
            target="_blank"
            variant="contained"
            color="secondary"
            sx={{ mt: 3 }}
          >
            Comprar ahora
          </Button>
        </CardContent>
      </Card>
    </Container>
  )
}
