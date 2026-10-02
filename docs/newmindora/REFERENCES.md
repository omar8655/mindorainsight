# Psychometric tests — sole reference map (NewMindora)

**Site:** static library at [newmindora.vercel.app](https://newmindora.vercel.app) — 20 free tests, 100 items each, instant scores + optional extended/PDF report.

**Purpose:** When agents or authors write items, domain labels, brief copy, or report narrative for a test, they must ground meaning in **one primary local study PDF** per test (repo root, **gitignored**). Use **original educational wording** only.

**Global hard limits (all tests)**

- **No diagnosis** — screens describe patterns and traits; they do not establish medical or psychiatric disorders.
- **No copyrighted scale items** — do not paste PHQ-9, ASRS, MDQ, PCL-5, AQ, NPI, McLean, DISC official item banks, CliftonStrengths items, or any licensed questionnaire text into `questions-bank.js`, UI, or reports.
- **No handbook redistribution** — do not commit PDFs or paste full chapters into the repo or customer deliverables.
- **Crisis tests** (`depression`, `bpd`, `trauma` per `tests.js`) — always include supportive resources and “seek licensed care” language; never minimize self-harm or abuse disclosures.

**How to use this file**

| Column | Meaning |
|--------|---------|
| **Test id** | `window.TEST_META` id in `tests.js` |
| **Primary PDF** | Exact filename in project root (local only) |
| **Citation** | What the PDF represents for attribution in reports |
| **Domains / themes agents may use** | Conceptual buckets for scoring copy (original labels OK) |
| **Do not** | Test-specific guardrails |

---

## Personality & typology pack

| Test id | Primary PDF | Citation (report attribution) | Domains / themes agents may use | Do not |
|---------|-------------|-------------------------------|-----------------------------------|--------|
| `personality` | `big 5.pdf` | Costa, P. T., Jr., & McCrae, R. R. *Revised NEO Personality Inventory (NEO PI-R) and NEO Five-Factor Inventory (NEO-FFI) professional manual.* Psychological Assessment Resources, 1992; see also McCrae & Costa, *Personality in Adulthood* (5-factor theory). | Same five factors as `big5`: Openness, Conscientiousness, Extraversion, Agreeableness, Neuroticism/emotional sensitivity; facet-level nuance in plain language. | Shares scorer with `big5` — keep domains aligned. No NEO item text. |
| `big5` | `big 5.pdf` | McCrae, R. R., & Costa, P. T., Jr. *Personality in Adulthood: A Five-Factor Theory Perspective* (2nd ed.). Guilford Press. | OCEAN trait levels, stability vs. change, interpersonal and motivational correlates of each factor. | No NEO-PI-R / NEO-FFI item copying. |
| `sixteen` | `16 Personalities isabel-briggs-myers-pdf-2-pdf-free.pdf` | Myers, I. B., & Myers, P. B. *Gifts Differing: Understanding Personality Type.* Davies-Black / CPP tradition. | E–I energy, S–N perception, T–F judgment, J–P outer structure; type code as shorthand only. | No MBTI® item bank; no “official type” certification claims. |
| `enneagram` | `enneagram-the-complete-guide-to-psychological-and-spiritual-growth-for-the-nine-personality-types-by-don-richard-riso-and-russ-huds-pdf-free.pdf` | Riso, D. R., & Hudson, R. *The Wisdom of the Enneagram.* Bantam. | Nine types, core motivation, stress/security directions, levels of development (paraphrased). | No Enneagram Institute proprietary type descriptions pasted verbatim. |
| `love` | `5-love-languages.pdf` | Chapman, G. *The 5 Love Languages.* Northfield. | Words of affirmation, quality time, gifts, acts of service, physical touch — as **preference channels**, not relationship verdicts. | No quiz item text from the book; Chapman is one model among many. |
| `attachment` | `Attachment Style.pdf` | Levine, A., & Heller, R. S. F. *Attached: The New Science of Adult Attachment.* TarcherPerigee; Bowlby–Ainsworth attachment theory. | Secure, anxious, avoidant, fearful-avoidant **patterns**; protest behaviors, trust, closeness vs. autonomy. | Not couples therapy; no ECR-R item copying. |
| `strengths` | `strengthsfinder.pdf` | Rath, T., & Clifton, D. O. *StrengthsFinder 2.0* / Gallup CliftonStrengths® materials (study copy). | Talent themes grouped into executing, influencing, relationship-building, strategic thinking (conceptual domains only). | **No CliftonStrengths item or theme definition pasting** — paraphrase for education; respect Gallup trademarks. |
| `career` | `Career.pdf` | Holland, J. L. *A Theory of Vocational Choice* (Journal of Counseling Psychology, 1959) — RIASEC environments (local PDF). | Realistic, Investigative, Artistic, Social, Enterprising, Conventional (two-letter flavour). | Not vocational licensing or hiring decisions. |
| `archetype` | `Archetype.pdf` | Pearson, C. S., & Marr, H. K. *Introduction to Archetypes* / Pearson–Marr Archetype Indicator companion (Jungian tradition paraphrase). | Innocent, explorer, sage, hero, outlaw, magician, everyman, lover, jester, caregiver, ruler, creator (or subset used in scorer). | No clinical “complex” diagnosis; mythic metaphor only. No PMAI® item text. |
| `political` | `Political Identity.pdf` | Political Compass / multi-axis civic ideology materials in local PDF (Pace / Brittenden tradition). | Economic axis (state vs. market), social axis (authority vs. liberty); values, not party membership. | No electioneering; no hate toward groups; descriptive not prescriptive. |
| `disc` | `DISC.pdf` | Marston, W. M. *Emotions of Normal People*; modern DISC behavioral style tradition. | Dominance, Influence, Steadiness, Conscientiousness — pace, priorities, communication under stress. | No DiSC® / Everything DiSC® licensed profile text. |
| `eq` | `emotional intelligence.pdf` | Goleman, D. *Emotional Intelligence.* Bantam. | Self-awareness, self-regulation, motivation, empathy, social skill (and related sub-themes in scorer). | EQ is not IQ replacement; no fixed “EQ score” clinical claims. |
| `character` | `Character Strengths.pdf` | Peterson, C., & Seligman, M. E. P. *Character Strengths and Virtues: A Handbook and Classification* (VIA). | Six virtues, 24 character strengths, signature vs. lesser strengths. | No VIA-IS item text; distinguish from `strengths` (Gallup) test id. |

---

## Clinical & spectrum screens pack

| Test id | Primary PDF | Citation (report attribution) | Domains / themes agents may use | Do not |
|---------|-------------|-------------------------------|-----------------------------------|--------|
| `adhd` | ` ADHD PDF.pdf` *(leading space in filename)* | Barkley, R. A. (Ed.). *Attention-Deficit Hyperactivity Disorder: A Handbook for Diagnosis and Treatment* (4th ed.). Guilford Press, 2015. | See **`docs/ADHD_REFERENCE.md`** (Barkley-locked). | **Locked to Barkley 4th ed** for this test only. No BAARS-IV / BDEFS / ASRS item text. |
| `autism` | `TAutism Spectrum -Asperger's Syndrome (Autism Spectrum Disorder) PDF.pdf` | Attwood, T. *The Complete Guide to Asperger’s Syndrome* / autism spectrum conceptual literature in local PDF; Baron-Cohen systemizing–empathizing (conceptual only). | Social communication, sensory sensitivity, routines, special interests, masking, pattern thinking. | Not ASD diagnosis; no AQ item copying; respect identity-first vs. person-first user preference in copy. |
| `depression` | `Depression Cognitive-Behavioral Therapies.pdf` | Beck, A. T., Rush, A. J., Shaw, B. F., & Emery, G. *Cognitive Therapy of Depression*; Burns, D. D. *Feeling Good* (CBT mood model). | Mood, anhedonia, energy, sleep, cognition, self-criticism, withdrawal — **screening themes** only. | **Crisis flag** in `tests.js`. No PHQ-9 verbatim items; urgent care if suicidal ideation. |
| `bpd` | `BPD.pdf` | Linehan, M. M. *Cognitive-Behavioral Treatment of Borderline Personality Disorder* / BPD psychoeducation in local PDF. | Emotion intensity, abandonment sensitivity, identity instability, impulsivity, relationship turbulence — **trait reflection**, not label. | **Crisis flag**. Never call user “borderline” as insult; no McLean screening instrument item text. |
| `bipolar` | `Bipolar.pdf` | Goodwin, F. K., & Jamison, K. R. *Manic-Depressive Illness*; Jamison, K. R. *An Unquiet Mind* (patient perspective). | Energy cycles, mood elevation, irritability, sleep reduction, goal pursuit, depressive contrast — spectrum **education**. | No MDQ item text; not prescriber advice. |
| `narcissism` | `Narcissism.pdf` | Kernberg / Kohut / modern narcissism spectrum psychoeducation in local PDF (study copy). | Grandiosity, entitlement, empathy variability, validation seeking, vulnerability beneath display — **dimensional**, not name-calling. | No NPI-40 items; avoid weaponizing results in reports. |
| `trauma` | `Trauma.pdf` | van der Kolk, B. *The Body Keeps the Score*; trauma-informed care principles. | Hypervigilance, avoidance, re-experiencing, numbness, somatic stress, trust — **pattern screen**. | **Crisis flag**. No PCL-5 item text; encourage professional trauma therapy when impaired. |

---

## Cross-reference index (quick lookup)

```
personality, big5     → big 5.pdf
sixteen               → 16 Personalities isabel-briggs-myers-pdf-2-pdf-free.pdf
enneagram             → enneagram-the-complete-guide-...-pdf-free.pdf
love                  → 5-love-languages.pdf
attachment            → Attachment Style.pdf
strengths             → strengthsfinder.pdf
career                → Career.pdf
archetype             → Archetype.pdf
political             → Political Identity.pdf
disc                  → DISC.pdf
eq                    → emotional intelligence.pdf
character             → Character Strengths.pdf
adhd                  →  ADHD PDF.pdf
autism                → TAutism Spectrum -Asperger's Syndrome (Autism Spectrum Disorder) PDF.pdf
depression            → Depression Cognitive-Behavioral Therapies.pdf
bpd                   → BPD.pdf
bipolar               → Bipolar.pdf
narcissism            → Narcissism.pdf
trauma                → Trauma.pdf
```

**Not mapped to a test:** `Master Document .pdf` — internal notes only; do not treat as a sole clinical source unless the user promotes it.

---

## Agent workflow

1. Open the **primary PDF** for the test id you are editing.
2. Read **`docs/REPORT_POLICY.md`** before changing brief or extended/PDF copy.
3. For `adhd`, read **`docs/ADHD_REFERENCE.md`** first (Barkley-only).
4. Update `reports.js` / `questions-bank.js` only with **original** items and paraphrased theory — never paste items from the PDF.
