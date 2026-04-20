import HomeClient from './HomeClient'

const SITE_URL = 'https://www.compatips.com'
const GRAPHQL_URL = process.env.NEXT_PUBLIC_GRAPHQL_URL || 'http://localhost:8000/graphql/'

const TOP_PRODUCTS_QUERY = `
  query {
    productosFiltrados(ordenarPor: "-id") {
      id
      titulo
      urlImagen
      precioOferta
    }
  }
`

async function fetchTopProducts() {
  try {
    const res = await fetch(GRAPHQL_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query: TOP_PRODUCTS_QUERY }),
      next: { revalidate: 300 },
    })
    const json = await res.json()
    return (json.data?.productosFiltrados ?? []).slice(0, 20)
  } catch {
    return []
  }
}

export default async function HomePage() {
  const topProducts = await fetchTopProducts()

  const itemListJsonLd = topProducts.length > 0
    ? {
        '@context': 'https://schema.org',
        '@type': 'ItemList',
        name: 'Ofertas destacadas en Amazon México',
        numberOfItems: topProducts.length,
        itemListElement: topProducts.map((p: { id: string; titulo: string; urlImagen: string; precioOferta: number }, i: number) => ({
          '@type': 'ListItem',
          position: i + 1,
          url: `${SITE_URL}/producto/${p.id}`,
          name: p.titulo,
          image: p.urlImagen,
        })),
      }
    : null

  return (
    <>
      {itemListJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }}
        />
      )}
      <HomeClient />
    </>
  )
}
