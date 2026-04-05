import type { Metadata } from 'next'
import ProductoDetalleClient from './ProductoDetalleClient'

const GRAPHQL_URL = process.env.NEXT_PUBLIC_GRAPHQL_URL || 'http://localhost:8000/graphql/'

const PRODUCTO_QUERY = `
  query GetProducto($id: ID!) {
    productoPorId(id: $id) {
      titulo
      descuento
      precioOferta
      urlImagen
    }
  }
`

async function fetchProducto(id: string) {
  try {
    const res = await fetch(GRAPHQL_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query: PRODUCTO_QUERY, variables: { id } }),
      next: { revalidate: 60 },
    })
    const json = await res.json()
    return json.data?.productoPorId ?? null
  } catch {
    return null
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>
}): Promise<Metadata> {
  const { id } = await params
  const p = await fetchProducto(id)

  if (!p) {
    return { title: 'Producto no encontrado | Compatips' }
  }

  const title = `${p.titulo} | Producto en oferta`
  const description = `Aprovecha ${p.descuento}% de descuento por tiempo limitado. Precio: $${p.precioOferta} MXN`

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [p.urlImagen],
    },
  }
}

export default async function ProductoDetalle({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  return <ProductoDetalleClient id={id} />
}
