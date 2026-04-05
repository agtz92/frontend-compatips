'use client'

import { useQuery } from '@apollo/client'
import { GET_PRODUCTOS_FILTRADOS } from '../graphql/queries/productosFiltrados'
import {
  Typography,
  Container,
  Grid,
  Button,
  Box,
} from '@mui/material'
import { useState, useEffect } from 'react'
import ProductCard from './components/ProductCard'
import FilterBar from './components/FilterBar'
import LoadingBackdrop from './components/LoadingBackdrop'
import NoOfertas from './components/NoOfertas'

const PAGE_SIZE = 20

export default function HomePage() {
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState<string>('')
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE)

  const { loading, error, data } = useQuery(GET_PRODUCTOS_FILTRADOS, {
    variables: {
      categoria: categoriaSeleccionada,
      search: searchTerm,
      ordenar_por: "-id",
    },
  })

  // Reset visible count when filters change
  useEffect(() => {
    setVisibleCount(PAGE_SIZE)
  }, [categoriaSeleccionada, searchTerm])

  if (error) return <p>Error: {error.message}</p>

  const allProducts = data?.productosFiltrados ?? []
  const visibleProducts = allProducts.slice(0, visibleCount)
  const hasMore = visibleCount < allProducts.length

  return (
    <Container sx={{ py: 5 }}>
      <LoadingBackdrop open={loading} />

      <Typography variant="h4" gutterBottom>
        🔥🔥🔥 Productos en Oferta en Amazon 🔥🔥🔥
      </Typography>
      <Typography variant="body1" gutterBottom>
        Encuentra los últimos productos escondidos en oferta en Amazon México listados aquí!
      </Typography>

      <FilterBar
        categoria={categoriaSeleccionada}
        onCategoriaChange={setCategoriaSeleccionada}
        search={searchTerm}
        onSearchChange={setSearchTerm}
      />

      <Grid container spacing={2}>
        {visibleProducts.map((p: any) => (
          <Grid key={p.id} size={{ xs: 12, md: 3 }}>
            <ProductCard
              id={p.id}
              titulo={p.titulo}
              urlImagen={p.urlImagen}
              precioOferta={p.precioOferta}
              precioOriginal={p.precioOriginal}
              descuento={p.descuento}
              esReciente={p.esReciente}
            />
          </Grid>
        ))}
        {allProducts.length === 0 && !loading && <NoOfertas />}
      </Grid>

      {hasMore && (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <Button variant="contained" onClick={() => setVisibleCount((c) => c + PAGE_SIZE)}>
            Ver más
          </Button>
        </Box>
      )}
    </Container>
  )
}
