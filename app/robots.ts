import type { MetadataRoute } from 'next'

const BASE_URL = 'https://smartmenu.tn'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: ['/', '/menu/'],
        disallow: ['/admin', '/superadmin', '/auth/'],
      },
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
    host: BASE_URL,
  }
}
