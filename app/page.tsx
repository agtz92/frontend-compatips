'use client'

import { useQuery } from '@apollo/client'
import { GET_PRODUCTOS_FILTRADOS } from '../graphql/queries/productosFiltrados'
import {
  Typography,
  Container,
  Grid,
  Button,
  Box,
  Paper,
  Chip,
} from '@mui/material'
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline'
import LocalOfferIcon from '@mui/icons-material/LocalOffer'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import WhatshotIcon from '@mui/icons-material/Whatshot'
import BoltIcon from '@mui/icons-material/Bolt'
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

  useEffect(() => {
    setVisibleCount(PAGE_SIZE)
  }, [categoriaSeleccionada, searchTerm])

  if (error) return (
    <Container sx={{ py: 8 }}>
      <Paper elevation={3} sx={{ p: 4, textAlign: 'center', borderRadius: 4, maxWidth: 500, mx: 'auto' }}>
        <ErrorOutlineIcon sx={{ fontSize: 60, color: 'error.main', mb: 2 }} />
        <Typography variant="h5" gutterBottom>
          Error al cargar ofertas
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
          No pudimos conectar con el servidor. Intenta recargar la página.
        </Typography>
        <Button variant="contained" onClick={() => window.location.reload()}>
          Reintentar
        </Button>
      </Paper>
    </Container>
  )

  const allProducts = data?.productosFiltrados ?? []
  const visibleProducts = allProducts.slice(0, visibleCount)
  const hasMore = visibleCount < allProducts.length

  return (
    <>
      {/* Hero Section */}
      <Box
        sx={{
          background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
          py: { xs: 4, md: 6 },
          px: 2,
          mb: 4,
        }}
      >
        <Container maxWidth="lg">
          <Box sx={{ textAlign: 'center' }}>
            <Chip
              icon={<BoltIcon />}
              label="Nuevas ofertas cada hora"
              sx={{
                mb: 2,
                bgcolor: 'rgba(255, 153, 0, 0.15)',
                color: '#FF9900',
                fontWeight: 600,
                fontSize: '0.85rem',
                animation: 'pulse 2s ease-in-out infinite',
                '@keyframes pulse': {
                  '0%, 100%': { opacity: 1 },
                  '50%': { opacity: 0.7 },
                },
              }}
            />
            <Typography
              variant="h3"
              fontWeight={800}
              sx={{
                color: 'white',
                mb: 1,
                fontSize: { xs: '1.75rem', md: '2.5rem' },
              }}
            >
              Ofertas Escondidas en Amazon
            </Typography>
            <Typography
              variant="body1"
              sx={{ color: 'rgba(255,255,255,0.7)', mb: 2, maxWidth: 550, mx: 'auto' }}
            >
              Descuentos que Amazon no muestra en su página principal. Se agotan rápido.
            </Typography>
            {allProducts.length > 0 && (
              <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1, flexWrap: 'wrap' }}>
                <Chip
                  icon={<WhatshotIcon sx={{ fontSize: 18 }} />}
                  label={`${allProducts.length} ofertas activas ahora`}
                  sx={{
                    bgcolor: 'rgba(255, 153, 0, 0.2)',
                    color: '#FF9900',
                    fontWeight: 600,
                  }}
                />
                <Chip
                  icon={<LocalOfferIcon sx={{ fontSize: 16 }} />}
                  label="Hasta 50% de descuento"
                  sx={{
                    bgcolor: 'rgba(233, 30, 99, 0.15)',
                    color: '#E91E63',
                    fontWeight: 600,
                  }}
                />
              </Box>
            )}
          </Box>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ pb: 6 }}>
        <LoadingBackdrop open={loading} />

        <FilterBar
          categoria={categoriaSeleccionada}
          onCategoriaChange={setCategoriaSeleccionada}
          search={searchTerm}
          onSearchChange={setSearchTerm}
        />

        {/* Results count */}
        {!loading && allProducts.length > 0 && (
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            Mostrando {visibleProducts.length} de {allProducts.length} ofertas
            {categoriaSeleccionada && <> en <strong>{categoriaSeleccionada}</strong></>}
            {searchTerm && <> para &quot;{searchTerm}&quot;</>}
          </Typography>
        )}

        <Grid container spacing={2}>
          {visibleProducts.map((p: any) => (
            <Grid key={p.id} size={{ xs: 6, sm: 6, md: 3 }}>
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
            <Button
              variant="outlined"
              onClick={() => setVisibleCount((c) => c + PAGE_SIZE)}
              endIcon={<ExpandMoreIcon />}
              sx={{
                borderColor: '#FF9900',
                color: '#FF9900',
                fontWeight: 600,
                px: 4,
                py: 1.2,
                borderRadius: 2,
                textTransform: 'none',
                fontSize: '1rem',
                '&:hover': { borderColor: '#E68A00', bgcolor: 'rgba(255, 153, 0, 0.08)' },
              }}
            >
              Ver más ofertas
            </Button>
          </Box>
        )}
      </Container>
    </>
  )
}
