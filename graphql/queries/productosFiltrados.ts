// graphql/queries/productosFiltrados.ts

import { gql } from '@apollo/client'

export const GET_PRODUCTOS_FILTRADOS = gql`
  query ProductosFiltrados($categoria: String, $search: String) {
    productosFiltrados(categoria: $categoria, search: $search) {
      id
      titulo
      urlImagen
      precioOferta
      precioOriginal
      descuento
    }
  }
`
