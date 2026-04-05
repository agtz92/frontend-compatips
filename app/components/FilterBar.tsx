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
  InputAdornment,
} from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import ClearIcon from '@mui/icons-material/Clear'
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
    <Grid container spacing={2} sx={{ mb: 3 }}>
      <Grid size={{ xs: 12, md: 5 }}>
        <FormControl fullWidth>
          <InputLabel>Categoría</InputLabel>
          <Select
            value={categoria ?? ''}
            label="Categoría"
            onChange={handleCategoriaChange}
            sx={{ borderRadius: 2 }}
          >
            <MenuItem value="">Todas las categorías</MenuItem>
            {data.categoriasUnicas.map((cat: string) => (
              <MenuItem key={cat} value={cat}>
                {cat}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>

      <Grid size={{ xs: 12, md: 7 }}>
        <Box display="flex" gap={1}>
          <TextField
            fullWidth
            placeholder="Buscar producto..."
            value={localSearch}
            onChange={handleSearchInputChange}
            onKeyDown={handleKeyDown}
            variant="outlined"
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon color="action" />
                  </InputAdornment>
                ),
              },
            }}
            sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
          />
          {filtrosActivos && (
            <Button
              variant="outlined"
              color="secondary"
              onClick={handleClearFilters}
              sx={{ whiteSpace: 'nowrap', borderRadius: 2, minWidth: 'auto', px: 2 }}
              startIcon={<ClearIcon />}
            >
              Limpiar
            </Button>
          )}
        </Box>
      </Grid>
    </Grid>
  )
}
