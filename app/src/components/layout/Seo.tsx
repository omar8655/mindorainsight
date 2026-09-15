import { Helmet } from 'react-helmet-async'
import { useLocation } from 'react-router-dom'
import {
  absoluteUrl,
  DEFAULT_OG_IMAGE,
  DEFAULT_SEO,
  SITE_ORIGIN,
} from '@/lib/seo'

type SeoProps = {
  title?: string
  description?: string
  /** Override path for canonical (defaults to current location) */
  path?: string
  image?: string
  type?: 'website' | 'article'
  noindex?: boolean
  keywords?: string
  jsonLd?: Record<string, unknown> | Record<string, unknown>[]
}

/**
 * Production SEO head tags — titles, social, canonical, and optional JSON-LD.
 */
export function Seo({
  title,
  description,
  path,
  image = DEFAULT_OG_IMAGE,
  type = 'website',
  noindex = false,
  keywords = DEFAULT_SEO.keywords,
  jsonLd,
}: SeoProps) {
  const location = useLocation()
  const full = title
    ? `${title} | MindoraInsight`
    : DEFAULT_SEO.title
  const desc = description ?? DEFAULT_SEO.description
  const canonical = absoluteUrl(path ?? location.pathname)
  const ogImage = image.startsWith('http') ? image : absoluteUrl(image)

  const scripts = Array.isArray(jsonLd) ? jsonLd : jsonLd ? [jsonLd] : []

  return (
    <Helmet>
      <html lang="en" />
      <title>{full}</title>
      <meta name="description" content={desc} />
      <meta name="keywords" content={keywords} />
      <meta
        name="robots"
        content={noindex ? 'noindex, nofollow' : 'index, follow, max-image-preview:large, max-snippet:-1'}
      />
      <meta name="googlebot" content={noindex ? 'noindex, nofollow' : 'index, follow'} />
      <meta name="author" content="MindoraInsight" />
      <meta name="application-name" content="MindoraInsight" />
      <link rel="canonical" href={canonical} />

      <meta property="og:site_name" content="MindoraInsight" />
      <meta property="og:locale" content="en_GB" />
      <meta property="og:title" content={full} />
      <meta property="og:description" content={desc} />
      <meta property="og:type" content={type} />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:alt" content="MindoraInsight" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={full} />
      <meta name="twitter:description" content={desc} />
      <meta name="twitter:image" content={ogImage} />

      <link rel="alternate" type="application/rss+xml" title="MindoraInsight" href={`${SITE_ORIGIN}/sitemap.xml`} />

      {scripts.map((data, i) => (
        <script key={i} type="application/ld+json">
          {JSON.stringify(data)}
        </script>
      ))}
    </Helmet>
  )
}
