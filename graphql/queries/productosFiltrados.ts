// graphql/queries/productosFiltrados.ts

import { gql } from '@apollo/client'

export const GET_PRODUCTOS_FILTRADOS = gql`
  query ProductosFiltrados($categoria: String, $search: String, $ordenar_por: String) {
    productosFiltrados(categoria: $categoria, search: $search, ordenarPor: $ordenar_por) {
      id
      titulo
      urlImagen
      precioOferta
      precioOriginal
      descuento
    }
  }
`
