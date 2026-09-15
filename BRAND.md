# Brand Direction — MindoraInsight

We are **not** using TestLibrary, Test Library, or any close variant (logo, copy, domain tone). This product is an original brand focused on **work mentality**, **self-insight**, and professional growth.

## Recommended name (chosen)

### **MindoraInsight**
- **Why:** “Mindora” = calm clarity of mind; “Insight” = usable self-knowledge at work.
- **Tagline options:**
  - *Know your mind at work.*
  - *Assessments that sharpen how you think, lead, and grow.*
  - *Practical insight for focus, teams, and career fit.*
- **Domain:** mindorainsight.com (primary)
- **Tone:** Confident, sharp, professional — not clinical, not “quizzy entertainment.”

> Note: A separate UK company uses the root name “Mindora.” Prefer the full compound **MindoraInsight** in all public branding to reduce confusion.

---

## Strong alternatives (backup list)

| Name | Vibe | Notes |
|------|------|--------|
| **MindoraCurve** | Growth + Mindora family | Backup domain candidate |
| **TraitCurve** | Ownable, low collision | Safer if trademark counsel objects |
| **PeakForge** | Ambitious, builder energy | Strong for career/CRM positioning |
| **MindAscend** | Upward growth, mindset | Clear learning-curve metaphor |
| **Traitwise** | Smart, analytical | Good for assessment catalog SEO |
| **ClarityLab** | Experimentation + precision | Fits “work lab” mentality |

---

## Visual system (MindoraInsight)

Calm forest / sage / soft blue — professional studio feel, not a clone of other assessment sites.

| Token | Hex | Role |
|-------|-----|------|
| Forest | `#032514` | Deep accents / dark surfaces |
| Sage green | `#31B070` | Primary CTAs |
| Soft green wash | `#E8F6F1` | Highlights |
| Soft blue | `#4880D9` | Secondary accent |
| Charcoal | `#1F2A33` | Text / dark footer |
| Canvas | `#F7FBF9` | Page background |
| Sky | `#EDF2FB` | Occasional panels |
| White | `#FFFFFF` | Cards |

CSS prefix: `--mi-*` / Tailwind `mi-*` (MindoraInsight).

**Mentality:** Professional, calm, trustworthy — attention through clarity.

---

## Legal / differentiation checklist

- [x] New brand name (not TestLibrary)
- [x] Original logo (do not copy their mark)
- [x] Original illustrations / photography
- [x] Rewritten marketing copy (no “mosaic of traits” / “Real You” clone lines)
- [x] Distinct header / footer / home layout (not cream pill mosaic + utility bar clone)
- [ ] Own contact, legal entity, policies (replace placeholders with your LLC)
- [x] Distinct product framing: work assessment studio
- [x] No reuse of their trademarks in meta titles
- [ ] Confirm trademark clearance vs existing “Mindora” companies before launch

Do **not** recreate TestLibrary’s signature patterns: cream “mosaic of traits” overlapping collage, “Discover the Real You” hero framing, or identical 3-step / growth card clones.

Colored **path pills** are fine when they sit on our sage/sky canvas, use a centered wrap (not a cream float collage), and keep MindoraInsight copy.

---

## Product architecture (CRM-ready)

Public site (Vite + React) + future **CRM / admin** sharing the same design tokens and API:

```
apps/
  web/     → marketing + assessments (this app)
  crm/     → (next) leads, users, subscriptions, reports
packages/
  ui/      → shared components (later)
  api/     → shared types / client (later)
```
