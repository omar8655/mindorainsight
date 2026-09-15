# SEO & AI discovery (MindoraInsight)

Technical SEO is wired for crawlability and AI citation. **No code change can guarantee #1 rankings** — Google and AI assistants reward authority, links, reviews, and time. This package feeds them continuously.

## What ships in the app

| Asset | Purpose |
|-------|---------|
| `public/robots.txt` | Crawl rules + sitemap pointer; allows major AI bots |
| `public/sitemap.xml` | All indexable URLs (regenerated on `npm run build`) |
| `public/llms.txt` | Machine-readable site summary for AI assistants |
| `public/ai.txt` | Short brand / keyword association notes |
| `src/components/layout/Seo.tsx` | Titles, canonical, OG/Twitter, robots, JSON-LD |
| `src/lib/structuredData.ts` | Organization, WebSite, FAQ, LearningResource schemas |
| Footer free-test links + `/free-tests` | Keyword-rich crawlable hub |

## Keep feeding (background)

```bash
cd app && npm run seo:sitemap
```

`prebuild` also regenerates the sitemap before every production build.

After deploy:

1. Google Search Console → add property → submit `https://www.mindorainsight.com/sitemap.xml`
2. Bing Webmaster Tools → same sitemap
3. Confirm live: `/robots.txt`, `/sitemap.xml`, `/llms.txt`, `/ai.txt`
4. Keep publishing useful free assessments and unique educational copy (not thin duplicates)

## Honest limits

- SPA HTML is thin until JS runs; Helmet + static `index.html` + sitemap + JSON-LD mitigate that.
- For strongest SEO later, consider prerender / SSR for top landing URLs.
- Ranking for “free ADHD test” is competitive; differentiate with quality, trust, NHS/legal clarity, and backlinks.
