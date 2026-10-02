#!/usr/bin/env node
/**
 * Regenerates public/sitemap.xml + public/llms.txt from NewMindora catalog.
 * Run: npm run seo:sitemap
 */
import { readFileSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = join(__dirname, '..')
const origin = 'https://www.mindorainsight.com'
const lastmod = new Date().toISOString().slice(0, 10)

const coreSrc = readFileSync(join(root, 'src/data/newmindora/tests-core.js'), 'utf8')
const topics = [...coreSrc.matchAll(/\{\s*id\s*:\s*"([^"]+)"\s*,\s*title\s*:\s*"([^"]+)"/g)].map(
  (m) => ({ id: m[1], title: m[2] }),
)

if (topics.length < 20) {
  console.error(`[seo] expected ≥20 topics, found ${topics.length}`)
  process.exit(1)
}

const staticPages = [
  ['/', '1.0', 'daily'],
  ['/library', '0.95', 'daily'],
  ['/free-tests', '0.95', 'daily'],
  ['/pricing', '0.7', 'weekly'],
  ['/about', '0.6', 'monthly'],
  ['/contact', '0.5', 'monthly'],
  ['/faq', '0.6', 'monthly'],
  ['/docs/terms', '0.3', 'yearly'],
  ['/docs/privacy', '0.3', 'yearly'],
  ['/docs/subscription', '0.3', 'yearly'],
  ['/cancel', '0.3', 'monthly'],
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
for (const t of topics) {
  const path = `/test/${t.id}`
  if (seen.has(path)) continue
  seen.add(path)
  urls.push({
    path,
    priority: t.id === 'adhd' ? '1.0' : '0.9',
    changefreq: 'weekly',
  })
}
// Legacy ADHD slug redirect target still indexed briefly
if (!seen.has('/test/adhd-adult-screening')) {
  urls.push({ path: '/test/adhd-adult-screening', priority: '0.4', changefreq: 'yearly' })
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

const llms = `# MindoraInsight
> 20 free psychometric assessments · 100 questions each · printable Mindora Dossier PDFs

Site: ${origin}
Library: ${origin}/library
Free tests hub: ${origin}/free-tests

## Assessments
${topics.map((t) => `- [${t.title}](${origin}/test/${t.id}) — free · 100Q · ~15 min · unique PDF`).join('\n')}

Educational only — not medical diagnosis.
`

writeFileSync(join(root, 'public/llms.txt'), llms)
console.log(`[seo] sitemap.xml → ${urls.length} urls · llms.txt → ${topics.length} topics (${lastmod})`)
