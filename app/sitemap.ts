import type { MetadataRoute } from 'next'
import { createClient } from '@supabase/supabase-js'

const BASE_URL = 'https://smartmenu.tn'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/auth/sign-up`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/auth/login`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.4,
    },
  ]

  // Dynamically include all active public menu pages
  let menuRoutes: MetadataRoute.Sitemap = []
  try {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!
    )
    const { data: restaurants } = await supabase
      .from('restaurants')
      .select('id, created_at')
      .neq('is_active', false)

    menuRoutes = (restaurants ?? []).map((r) => ({
      url: `${BASE_URL}/menu/${r.id}`,
      lastModified: new Date(r.created_at),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    }))
  } catch {
    // Silently skip if DB not available during build
  }

  return [...staticRoutes, ...menuRoutes]
}
