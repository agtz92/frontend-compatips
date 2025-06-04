'use client'

import { useQuery } from '@apollo/client'
import { GET_PRODUCTOS_FILTRADOS } from '../graphql/queries/productosFiltrados'
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Container,
  Grid,
} from '@mui/material'
import Link from 'next/link'
import { useState } from 'react'
import CategoryFilter from './components/CategoryFilter'
import ProductCard from './components/ProductCard'


export default function HomePage() {
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState<string | null>(null)

  const { loading, error, data } = useQuery(GET_PRODUCTOS_FILTRADOS, {
    variables: { categoria: categoriaSeleccionada },
  })


  if (loading) return <p>Cargando...</p>
  if (error) return <p>Error: {error.message}</p>

  return (
    <Container sx={{ py: 5 }}>
      <Typography variant="h4" gutterBottom>
        Productos en Oferta
      </Typography>

      <CategoryFilter
        value={categoriaSeleccionada}
        onChange={setCategoriaSeleccionada}
      />

      <Grid container spacing={2}>
        {data.productosFiltrados.map((p: any) => (
          <Grid key={p.id} size={{ xs: 12, md: 3 }}>
            <ProductCard
              id={p.id}
              titulo={p.titulo}
              urlImagen={p.urlImagen}
              precioOferta={p.precioOferta}
              precioOriginal={p.precioOriginal}
              descuento={p.descuento}
            />

          </Grid>
        ))}
      </Grid>
    </Container>
  )
}
