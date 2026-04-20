import type { Metadata } from 'next'
import ProductoDetalleClient from './ProductoDetalleClient'

const SITE_URL = 'https://www.compatips.com'
const GRAPHQL_URL = process.env.NEXT_PUBLIC_GRAPHQL_URL || 'http://localhost:8000/graphql/'

const PRODUCTO_QUERY = `
  query GetProducto($id: ID!) {
    productoPorId(id: $id) {
      titulo
      descuento
      precioOferta
      precioOriginal
      urlImagen
      categoria
      linkReferidos
      fecha
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

function addDays(dateStr: string, days: number): string {
  const d = new Date(dateStr)
  if (isNaN(d.getTime())) return new Date(Date.now() + days * 86400000).toISOString().split('T')[0]
  d.setDate(d.getDate() + days)
  return d.toISOString().split('T')[0]
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
  const canonical = `${SITE_URL}/producto/${id}`

  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      title,
      description,
      images: [p.urlImagen],
      url: canonical,
      type: 'website',
    },
  }
}

export default async function ProductoDetalle({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const p = await fetchProducto(id)

  // Note: aggregateRating and review are intentionally omitted. Google
  // prohibits self-serving review markup for content the site doesn't
  // actually display. Compatips aggregates Amazon deals without collecting
  // its own user reviews, so adding rating markup here would violate
  // structured data guidelines.
  const productUrl = `${SITE_URL}/producto/${id}`
  const productJsonLd = p
    ? {
        '@context': 'https://schema.org',
        '@type': 'Product',
        name: p.titulo,
        image: p.urlImagen,
        description: `Oferta de ${p.descuento}% en ${p.titulo}. Precio de oferta $${p.precioOferta} MXN, precio original $${p.precioOriginal} MXN.`,
        sku: id,
        url: productUrl,
        category: p.categoria,
        brand: { '@type': 'Brand', name: 'Amazon' },
        offers: {
          '@type': 'Offer',
          url: p.linkReferidos,
          price: p.precioOferta,
          priceCurrency: 'MXN',
          priceValidUntil: addDays(p.fecha, 14),
          availability: 'https://schema.org/InStock',
          itemCondition: 'https://schema.org/NewCondition',
        },
      }
    : null

  const breadcrumbJsonLd = p
    ? {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Inicio', item: SITE_URL },
          ...(p.categoria
            ? [{ '@type': 'ListItem', position: 2, name: p.categoria, item: `${SITE_URL}/?categoria=${encodeURIComponent(p.categoria)}` }]
            : []),
          { '@type': 'ListItem', position: p.categoria ? 3 : 2, name: p.titulo, item: productUrl },
        ],
      }
    : null

  const faqJsonLd = p
    ? (() => {
        const faqs: { q: string; a: string }[] = []
        if (p.precioOferta != null) {
          faqs.push({
            q: `¿Cuánto cuesta ${p.titulo} en oferta?`,
            a: `El precio de oferta actual es de $${Number(p.precioOferta).toFixed(2)} MXN${p.descuento != null && p.descuento > 0 ? `, con un descuento del ${p.descuento}%` : ''}${p.precioOriginal != null ? ` sobre el precio original de $${Number(p.precioOriginal).toFixed(2)} MXN` : ''}.`,
          })
        }
        const ahorro = p.precioOriginal && p.precioOferta ? p.precioOriginal - p.precioOferta : null
        if (ahorro != null && ahorro > 0) {
          faqs.push({
            q: '¿Cuánto ahorro con este descuento?',
            a: `Con esta oferta ahorras $${ahorro.toFixed(2)} MXN${p.descuento != null && p.descuento > 0 ? `, lo que equivale a un ${p.descuento}% de descuento` : ''}.`,
          })
        }
        if (p.fecha) {
          const fechaExp = new Date(new Date(p.fecha).getTime() + 14 * 86400000).toLocaleDateString('es-MX', { day: 'numeric', month: 'long', year: 'numeric' })
          faqs.push({
            q: '¿Hasta cuándo está disponible esta oferta?',
            a: `La disponibilidad estimada es hasta el ${fechaExp}, aunque las ofertas en Amazon pueden agotarse antes dependiendo del stock disponible.`,
          })
        }
        faqs.push({
          q: '¿Dónde puedo comprar este producto?',
          a: 'Puedes comprar este producto directamente en Amazon México haciendo clic en el botón "Ver en Amazon" en la página del producto.',
        })
        return {
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: faqs.map((f) => ({
            '@type': 'Question',
            name: f.q,
            acceptedAnswer: { '@type': 'Answer', text: f.a },
          })),
        }
      })()
    : null

  return (
    <>
      {productJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
        />
      )}
      {breadcrumbJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
        />
      )}
      {faqJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      )}
      <ProductoDetalleClient id={id} />
    </>
  )
}
