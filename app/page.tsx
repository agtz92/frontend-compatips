'use client'

import { useQuery } from '@apollo/client'
import { GET_PRODUCTOS } from '../graphql/queries/productos'
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Container
} from '@mui/material'
import Grid from '@mui/material/Grid'
import Link from 'next/link'

export default function HomePage() {
  const { loading, error, data } = useQuery(GET_PRODUCTOS)

  if (loading) return <p>Cargando...</p>
  if (error) return <p>Error: {error.message}</p>

  return (
    <Container sx={{ py: 5 }}>
      <Typography variant="h4" gutterBottom textAlign="center">
        Productos en Oferta
      </Typography>

      <Grid container spacing={4}>
        {data.productos.map((p: any) => (
          <Grid item xs={12} sm={6} md={4} lg={3}> key={p.id}>
            <Link href={`/producto/${p.id}`} style={{ textDecoration: 'none' }}>
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'transform 0.2s',
                  '&:hover': { transform: 'scale(1.03)' },
                  boxShadow: 3,
                  borderRadius: 2
                }}
              >
                <CardMedia
                  component="img"
                  height="200"
                  image={p.urlImagen}
                  alt={p.titulo}
                  sx={{ objectFit: 'cover' }}
                />
                <CardContent>
                  <Typography
                    gutterBottom
                    variant="subtitle1"
                    component="div"
                    sx={{ fontWeight: 600, lineHeight: 1.3 }}
                  >
                    {p.titulo}
                  </Typography>

                  <Typography variant="body2" color="text.secondary">
                    {p.precioOriginal !== undefined && (
                      <>
                        <s>${Number(p.precioOriginal).toFixed(2)}</s>{' '}
                      </>
                    )}
                    {p.precioOferta !== undefined && (
                      <strong style={{ color: '#d32f2f' }}>
                        ${Number(p.precioOferta).toFixed(2)}
                      </strong>
                    )}
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
