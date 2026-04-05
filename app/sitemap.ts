import type { MetadataRoute } from 'next'

const SITE_URL = 'https://www.compatips.com'
const GRAPHQL_URL = process.env.NEXT_PUBLIC_GRAPHQL_URL || 'http://localhost:8000/graphql/'

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

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const productIds = await fetchAllProductIds()

  const productPages = productIds.map((id) => ({
    url: `${SITE_URL}/producto/${id}`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: 0.8,
  }))

  return [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: 'hourly',
      priority: 1,
    },
    {
      url: `${SITE_URL}/telegram`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    ...productPages,
  ]
}
