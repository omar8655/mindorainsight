import { COMPANY } from '@/data/legal/company'
import { ADHD_SCREENING_SLUG } from '@/data/adhdScreening'
import { FOOTER_SEO_TESTS } from '@/data/footerSeoTests'
import { tests } from '@/data/tests'

/** Canonical production origin — used for sitemap, OG, and structured data. */
export const SITE_ORIGIN = COMPANY.website.replace(/\/$/, '')

export function absoluteUrl(path = '/'): string {
  if (path.startsWith('http')) return path
  const p = path.startsWith('/') ? path : `/${path}`
  return `${SITE_ORIGIN}${p}`
}

export const DEFAULT_OG_IMAGE = absoluteUrl('/brand/mindorainsight-brain-logo-forest.png')

export const DEFAULT_SEO = {
  title: 'MindoraInsight — Free Adult ADHD Test & Professional Assessments',
  description:
    'MindoraInsight offers a free Adult ADHD Test plus professional assessments for focus, personality, career fit, and growth. Calm, private, educational — not a medical diagnosis.',
  keywords: [
    'MindoraInsight',
    'free ADHD test',
    'adult ADHD screening',
    'ADHD pattern screen',
    'personality test',
    'OCEAN test',
    'Big Five test',
    'career assessment',
    'workplace personality',
    'free psychological tests',
    'professional development assessments',
    'focus assessment',
  ].join(', '),
}

/** Static + SEO free-test paths for sitemap generation. */
export function sitemapPaths(): { path: string; priority: string; changefreq: string }[] {
  const staticPages = [
    { path: '/', priority: '1.0', changefreq: 'daily' },
    { path: '/library', priority: '0.9', changefreq: 'weekly' },
    { path: '/free-tests', priority: '0.95', changefreq: 'daily' },
    { path: '/pricing', priority: '0.8', changefreq: 'weekly' },
    { path: '/about', priority: '0.7', changefreq: 'monthly' },
    { path: '/contact', priority: '0.6', changefreq: 'monthly' },
    { path: '/faq', priority: '0.7', changefreq: 'monthly' },
    { path: '/docs/terms', priority: '0.3', changefreq: 'yearly' },
    { path: '/docs/privacy', priority: '0.3', changefreq: 'yearly' },
    { path: '/docs/subscription', priority: '0.3', changefreq: 'yearly' },
    { path: '/cancel', priority: '0.4', changefreq: 'monthly' },
    { path: `/test/${ADHD_SCREENING_SLUG}`, priority: '1.0', changefreq: 'daily' },
  ]

  const seoTests = FOOTER_SEO_TESTS.map((t) => ({
    path: `/test/${t.slug}`,
    priority: t.slug === ADHD_SCREENING_SLUG ? '1.0' : '0.85',
    changefreq: 'weekly',
  }))

  const catalog = tests.map((t) => ({
    path: `/test/${t.slug}`,
    priority: (t.priceUsd ?? 49) === 0 ? '0.9' : '0.7',
    changefreq: 'weekly',
  }))

  const seen = new Set<string>()
  const out: { path: string; priority: string; changefreq: string }[] = []
  for (const item of [...staticPages, ...seoTests, ...catalog]) {
    if (seen.has(item.path)) continue
    seen.add(item.path)
    out.push(item)
  }
  return out
}

export function buildSitemapXml(lastmod = new Date().toISOString().slice(0, 10)): string {
  const urls = sitemapPaths()
    .map(
      (u) => `  <url>
    <loc>${absoluteUrl(u.path)}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`,
    )
    .join('\n')

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`
}
