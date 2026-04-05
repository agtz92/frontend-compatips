'use client'

import { useQuery } from '@apollo/client'
import { GET_PRODUCTO_POR_ID } from '../../../graphql/queries/productoPorId'
import {
  Box,
  Container,
  Typography,
  CircularProgress,
  Paper,
  Button,
} from '@mui/material'
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline'
import ProductoCard from '@/app/components/producto/ProductoCard'
import OfertaExpirada from '@/app/components/producto/OfertaExpirada'
import ProductosRelacionados from '@/app/components/producto/ProductosRelacionados'
import Link from 'next/link'

export default function ProductoDetalleClient({ id }: { id: string }) {
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
    return (
      <Container maxWidth="sm" sx={{ mt: 8 }}>
        <Paper elevation={3} sx={{ p: 4, textAlign: 'center', borderRadius: 4 }}>
          <ErrorOutlineIcon sx={{ fontSize: 60, color: 'error.main', mb: 2 }} />
          <Typography variant="h5" gutterBottom>
            Producto no encontrado
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
            Es posible que este producto haya sido eliminado o que el enlace sea incorrecto.
          </Typography>
          <Link href="/">
            <Button variant="contained">Ver todas las ofertas</Button>
          </Link>
        </Paper>
      </Container>
    )
  }

  const p = data.productoPorId

  return (
    <Container maxWidth="md" sx={{ mt: 5 }}>
      {p.esReciente ? (
        <ProductoCard producto={p} />
      ) : (
        <>
          <OfertaExpirada producto={p} />
          <ProductosRelacionados categoria={p.categoria} />
        </>
      )}
    </Container>
  )
}
