'use client'

import { useQuery } from '@apollo/client'
import { GET_CATEGORIAS } from '../../graphql/queries/categorias'
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Grid,
  Button,
  Box,
} from '@mui/material'
import { useState, useEffect } from 'react'

type Props = {
  categoria: string | null
  search: string
  onCategoriaChange: (categoria: string | null) => void
  onSearchChange: (search: string) => void
}

export default function FilterBar({
  categoria,
  search,
  onCategoriaChange,
  onSearchChange,
}: Props) {
  const { data, loading } = useQuery(GET_CATEGORIAS)
  const [localSearch, setLocalSearch] = useState(search)

  useEffect(() => {
    setLocalSearch(search)
  }, [search])

  const handleCategoriaChange = (event: any) => {
    const selected = event.target.value
    onCategoriaChange(selected === '' ? null : selected)
    onSearchChange('')
    setLocalSearch('')
  }

  const handleSearchInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLocalSearch(event.target.value)
  }

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault()
      if (localSearch.trim()) {
        onSearchChange(localSearch.trim())
        onCategoriaChange(null)
      }
    }
  }

  const handleClearFilters = () => {
    onCategoriaChange(null)
    onSearchChange('')
    setLocalSearch('')
  }

  const filtrosActivos = categoria || search

  if (loading || !data) return null

  return (
    <Grid container spacing={2} sx={{ mb: 2 }}>
      <Grid size={{ xs: 12, md: 6 }}>
        <FormControl fullWidth>
          <InputLabel>Categoría</InputLabel>
          <Select
            value={categoria ?? ''}
            label="Categoría"
            onChange={handleCategoriaChange}
          >
            <MenuItem value="">Todas</MenuItem>
            {data.categoriasUnicas.map((cat: string) => (
              <MenuItem key={cat} value={cat}>
                {cat}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>

      <Grid size={{ xs: 12, md: 6 }}>
        <Box display="flex" gap={1}>
          <TextField
            fullWidth
            label="Busca el producto y da enter"
            value={localSearch}
            onChange={handleSearchInputChange}
            onKeyDown={handleKeyDown}
            variant="outlined"
          />
          {filtrosActivos && (
            <Button
              variant="outlined"
              color="secondary"
              onClick={handleClearFilters}
              sx={{ whiteSpace: 'nowrap' }}
            >
              Limpiar
            </Button>
          )}
        </Box>
      </Grid>
    </Grid>
  )
}
