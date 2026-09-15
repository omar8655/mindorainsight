#!/usr/bin/env node
/**
 * Regenerates public/sitemap.xml from catalog data.
 * Run: node scripts/generate-sitemap.mjs
 * Also runs automatically before production builds when wired in package.json.
 */
import { readFileSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = join(__dirname, '..')
const origin = 'https://www.mindorainsight.com'
const lastmod = new Date().toISOString().slice(0, 10)

const testsSrc = readFileSync(join(root, 'src/data/tests.ts'), 'utf8')
const slugs = [...testsSrc.matchAll(/slug:\s*'([^']+)'/g)].map((m) => m[1])

const staticPages = [
  ['/', '1.0', 'daily'],
  ['/library', '0.9', 'weekly'],
  ['/free-tests', '0.95', 'daily'],
  ['/pricing', '0.8', 'weekly'],
  ['/about', '0.7', 'monthly'],
  ['/contact', '0.6', 'monthly'],
  ['/faq', '0.7', 'monthly'],
  ['/docs/terms', '0.3', 'yearly'],
  ['/docs/privacy', '0.3', 'yearly'],
  ['/docs/subscription', '0.3', 'yearly'],
  ['/cancel', '0.4', 'monthly'],
  ['/test/adhd-adult-screening', '1.0', 'daily'],
  ['/llms.txt', '0.5', 'monthly'],
  ['/ai.txt', '0.4', 'monthly'],
]

const seen = new Set()
const urls = []
for (const [path, priority, changefreq] of staticPages) {
  if (seen.has(path)) continue
  seen.add(path)
  urls.push({ path, priority, changefreq })
}
for (const slug of slugs) {
  const path = `/test/${slug}`
  if (seen.has(path)) continue
  seen.add(path)
  const free = slug === 'adhd-adult-screening' || slug === 'ui-preview-5'
  urls.push({ path, priority: free ? '0.9' : '0.7', changefreq: 'weekly' })
}

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (u) => `  <url>
    <loc>${origin}${u.path}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`,
  )
  .join('\n')}
</urlset>
`

writeFileSync(join(root, 'public/sitemap.xml'), xml)
console.log(`[seo] sitemap.xml → ${urls.length} urls (${lastmod})`)
