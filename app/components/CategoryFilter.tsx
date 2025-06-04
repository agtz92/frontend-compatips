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
} from '@mui/material'

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

  const handleCategoriaChange = (event: any) => {
    const selected = event.target.value
    onCategoriaChange(selected === '' ? null : selected)
  }

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onSearchChange(event.target.value)
  }

  if (loading || !data) return null

  return (
    <Grid container spacing={2} sx={{ mb: 3 }}>
      <Grid  size={{xs:12, md:6}}>
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
      <Grid size={{xs:12, md:6}}>
        <TextField
          fullWidth
          label="Buscar producto"
          value={search}
          onChange={handleSearchChange}
          variant="outlined"
        />
      </Grid>
    </Grid>
  )
}
