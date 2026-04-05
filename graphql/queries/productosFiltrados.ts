// graphql/queries/productosFiltrados.ts

import { gql } from '@apollo/client'

export const GET_PRODUCTOS_FILTRADOS = gql`
  query ProductosFiltrados($categoria: String, $search: String, $ordenar_por: String, $limit: Int, $offset: Int) {
    productosFiltrados(categoria: $categoria, search: $search, ordenarPor: $ordenar_por, limit: $limit, offset: $offset) {
      id
      titulo
      urlImagen
      precioOferta
      precioOriginal
      descuento
      esReciente
    }
  }
`
