// app/graphql/queries/productosFiltrados.ts

import { gql } from '@apollo/client'

export const GET_PRODUCTOS_FILTRADOS = gql`
  query ProductosFiltrados($categoria: String) {
    productosFiltrados(categoria: $categoria) {
      id
      titulo
      urlImagen
      precioOferta
      precioOriginal
      descuento
    }
  }
`
