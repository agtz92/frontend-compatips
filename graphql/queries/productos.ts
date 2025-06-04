import { gql } from '@apollo/client'

export const GET_PRODUCTOS = gql`
  query {
    productos {
      id
      titulo
      precioOferta
      urlImagen
    }
  }
`
