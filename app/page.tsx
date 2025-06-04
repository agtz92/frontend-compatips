'use client'

import { useQuery } from '@apollo/client'
import { GET_PRODUCTOS } from '../graphql/queries/productos'
import Link from 'next/link'

import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Grid,
  Container,
  CircularProgress,
  Box,
} from '@mui/material'

export default function HomePage() {
  const { loading, error, data } = useQuery(GET_PRODUCTOS)

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" mt={10}>
        <CircularProgress />
      </Box>
    )
  }

  if (error) {
    return <Typography color="error">Error: {error.message}</Typography>
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 5 }}>
      <Typography variant="h4" gutterBottom>
        Ofertas disponibles
      </Typography>
      <Grid container spacing={4}>
        {data.productos.map((p: any) => (
          <Grid item key={p.id} xs={12} sm={6} md={4}>
            <Link href={`/producto/${p.id}`} style={{ textDecoration: 'none' }}>
              <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <CardMedia
                  component="img"
                  image={p.urlImagen}
                  alt={p.titulo}
                  height="200"
                />
                <CardContent>
                  <Typography variant="h6" component="h2" gutterBottom>
                    {p.titulo.length > 60 ? p.titulo.slice(0, 60) + '…' : p.titulo}
                  </Typography>
                  <Typography variant="subtitle1" color="primary">
                    ${p.precioOferta.toFixed(2)}
                  </Typography>
                </CardContent>
              </Card>
            </Link>
          </Grid>
        ))}
      </Grid>
    </Container>
  )
}
