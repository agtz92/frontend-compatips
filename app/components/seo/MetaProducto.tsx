'use client'

import Head from 'next/head'

type MetaProductoProps = {
  titulo: string
  descripcion: string
  imagen: string
  precio?: string
}

export default function MetaProducto({
  titulo,
  descripcion,
  imagen,
  precio,
}: MetaProductoProps) {
  const title = `${titulo} | Producto en oferta`
  const desc = descripcion || `Compra ${titulo} en oferta exclusiva.`
  const image = imagen || '/default-og-image.jpg'

  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={desc} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={precio ? `${desc} Precio: $${precio}` : desc} />
      <meta property="og:image" content={image} />
    </Head>
  )
}
