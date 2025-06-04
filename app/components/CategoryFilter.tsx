'use client'

import { useQuery } from '@apollo/client'
import { GET_CATEGORIAS } from '../../graphql/queries/categorias'
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material'
import { useState } from 'react'

type Props = {
  onChange: (categoria: string) => void
}

export default function CategoryFilter({ onChange }: Props) {
  const { data, loading } = useQuery(GET_CATEGORIAS)
  const [categoria, setCategoria] = useState('')

  const handleChange = (event: any) => {
  const selected = event.target.value
  setCategoria(selected)
  onChange(selected === '' ? null : selected)
}


  if (loading || !data) return null

  return (
    <FormControl fullWidth sx={{ mb: 3 }}>
      <InputLabel>Categoría</InputLabel>
      <Select value={categoria} label="Categoría" onChange={handleChange}>
        <MenuItem value="">Todas</MenuItem>
        {data?.categoriasUnicas?.map((cat: string) => (
          <MenuItem key={cat} value={cat}>
            {cat}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}
