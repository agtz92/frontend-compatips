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
  const [hasMore, setHasMore] = useState(true)

  const { loading, error, data, fetchMore } = useQuery(GET_PRODUCTOS_FILTRADOS, {
    variables: {
      categoria: categoriaSeleccionada,
      search: searchTerm,
      ordenar_por: "-id",
      limit: PAGE_SIZE,
      offset: 0,
    },
    onCompleted: (result) => {
      if (result?.productosFiltrados?.length < PAGE_SIZE) {
        setHasMore(false)
      } else {
        setHasMore(true)
      }
    },
  })

  // Reset pagination when filters change
  useEffect(() => {
    setHasMore(true)
  }, [categoriaSeleccionada, searchTerm])

  const handleLoadMore = () => {
    const currentLength = data?.productosFiltrados?.length || 0
    fetchMore({
      variables: {
        offset: currentLength,
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prev
        if (fetchMoreResult.productosFiltrados.length < PAGE_SIZE) {
          setHasMore(false)
        }
        return {
          productosFiltrados: [
            ...prev.productosFiltrados,
            ...fetchMoreResult.productosFiltrados,
          ],
        }
      },
    })
  }

  if (error) return <p>Error: {error.message}</p>

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
        {data?.productosFiltrados.map((p: any) => (
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
        {data?.productosFiltrados?.length === 0 && <NoOfertas />}
      </Grid>

      {hasMore && data?.productosFiltrados?.length > 0 && (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <Button variant="contained" onClick={handleLoadMore}>
            Ver más
          </Button>
        </Box>
      )}
    </Container>
  )
}
