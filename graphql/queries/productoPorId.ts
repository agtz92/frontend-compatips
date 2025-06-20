// graphql/queries/productoPorId.ts
import { gql } from '@apollo/client'

export const GET_PRODUCTO_POR_ID = gql`
  query GetProducto($id: ID!) {
    productoPorId(id: $id) {
      id
      titulo
      precioOriginal
      descuento
      precioOferta
      urlImagen
      linkReferidos
      fecha
      categoria
      esReciente
    }
  }
`
