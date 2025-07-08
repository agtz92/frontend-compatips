'use client'

import { useQuery } from '@apollo/client'
import { GET_PRODUCTOS_FILTRADOS } from '../graphql/queries/productosFiltrados'
import {
  Typography,
  Container,
  Grid,
} from '@mui/material'
import { useState } from 'react'
import ProductCard from './components/ProductCard'
import FilterBar from './components/FilterBar'
import LoadingBackdrop from './components/LoadingBackdrop' // Importa el nuevo componente

export default function HomePage() {
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState<string>('')

  const { loading, error, data } = useQuery(GET_PRODUCTOS_FILTRADOS, {
    variables: { categoria: categoriaSeleccionada, search: searchTerm, ordenar_por: "-id", },
  })

  if (error) return <p>Error: {error.message}</p>

  return (
    <Container sx={{ py: 5 }}>
      <LoadingBackdrop open={loading} /> {/* ← Aquí lo usas */}

      <Typography variant="h4" gutterBottom>
        Productos en Oferta
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
      </Grid>
    </Container>
  )
}
