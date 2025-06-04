'use client'

import { useQuery } from '@apollo/client'
import { GET_PRODUCTOS } from '../graphql/queries/productos'
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Container,
} from '@mui/material'
import Link from 'next/link'

export default function HomePage() {
  const { loading, error, data } = useQuery(GET_PRODUCTOS)

  if (loading) return <p>Cargando...</p>
  if (error) return <p>Error: {error.message}</p>

  return (
    <Container sx={{ py: 5 }}>
      <Typography variant="h4" gutterBottom>
        Productos en Oferta
      </Typography>
      <Box
        display="grid"
        gridTemplateColumns={{ xs: '1fr', sm: '1fr 1fr', md: '1fr 1fr 1fr' }}
        gap={3}
      >
        {data.productos.map((p: any) => (
          <Link key={p.id} href={`/producto/${p.id}`} style={{ textDecoration: 'none' }}>
            <Card
              sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                transition: 'transform 0.2s',
                '&:hover': { transform: 'scale(1.02)' },
              }}
            >
              <CardMedia
                component="img"
                height="180"
                image={p.urlImagen}
                alt={p.titulo}
              />
              <CardContent>
                <Typography gutterBottom variant="h6" component="div" noWrap>
                  {p.titulo}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  ${p.precioOferta.toFixed(2)}
                </Typography>
              </CardContent>
            </Card>
          </Link>
        ))}
      </Box>
    </Container>
  )
}
