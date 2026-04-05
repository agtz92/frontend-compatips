import type { MetadataRoute } from 'next'

const SITE_URL = 'https://www.compatips.com'
const GRAPHQL_URL = process.env.NEXT_PUBLIC_GRAPHQL_URL || 'http://localhost:8000/graphql/'
const PRODUCTS_PER_SITEMAP = 50000

const ALL_PRODUCTS_QUERY = `
  query {
    productos {
      id
    }
  }
`

async function fetchAllProductIds(): Promise<string[]> {
  try {
    const res = await fetch(GRAPHQL_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query: ALL_PRODUCTS_QUERY }),
      next: { revalidate: 300 },
    })
    const json = await res.json()
    return (json.data?.productos ?? []).map((p: { id: string }) => p.id)
  } catch {
    return []
  }
}

export async function generateSitemaps() {
  const productIds = await fetchAllProductIds()
  const totalSitemaps = Math.max(1, Math.ceil(productIds.length / PRODUCTS_PER_SITEMAP))
  return Array.from({ length: totalSitemaps }, (_, i) => ({ id: i }))
}

export default async function sitemap({ id }: { id: number }): Promise<MetadataRoute.Sitemap> {
  const productIds = await fetchAllProductIds()
  const start = id * PRODUCTS_PER_SITEMAP
  const chunk = productIds.slice(start, start + PRODUCTS_PER_SITEMAP)

  const productPages = chunk.map((pid) => ({
    url: `${SITE_URL}/producto/${pid}`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: 0.8,
  }))

  // Include static pages only in the first sitemap
  if (id === 0) {
    return [
      {
        url: SITE_URL,
        lastModified: new Date(),
        changeFrequency: 'hourly' as const,
        priority: 1,
      },
      {
        url: `${SITE_URL}/telegram`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.5,
      },
      ...productPages,
    ]
  }

  return productPages
}
