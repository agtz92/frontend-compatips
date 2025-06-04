// graphql/mutations/createProducto.ts
import { gql } from '@apollo/client'

export const CREATE_PRODUCTO = gql`
  mutation CreateProducto(
    $titulo: String!,
    $precioOriginal: Float!,
    $descuento: Float!,
    $precioOferta: Float!,
    $urlImagen: String!,
    $linkReferidos: String!,
    $fecha: String!,
    $categoria: String!
  ) {
    createProducto(
      titulo: $titulo,
      precioOriginal: $precioOriginal,
      descuento: $descuento,
      precioOferta: $precioOferta,
      urlImagen: $urlImagen,
      linkReferidos: $linkReferidos,
      fecha: $fecha,
      categoria: $categoria
    ) {
      id
      titulo
      precioOferta
    }
  }
`
