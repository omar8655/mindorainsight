# Clinical-style screens — reference map

Educational pattern screens in `questions-bank.js`. Items are **original plain-language statements** aligned to themes in the local PDFs below — **not** verbatim copies of copyrighted questionnaires (PHQ-9, MDQ, MSI-BPD, NPI, PCL-5, AQ, etc.).

| Test id | Local PDF (repo root) | Domain model (5 × 20 items, 0–100) | Crisis flag |
|---------|------------------------|--------------------------------------|-------------|
| `autism` | `TAutism Spectrum -Asperger's Syndrome (Autism Spectrum Disorder) PDF.pdf` | Social cueing, Pattern focus, Sensory load, Routine need, Masking load | — |
| `depression` | `Depression Cognitive-Behavioral Therapies.pdf` | Low mood, Energy / body, Sleep & appetite, Self-view, Hopelessness | `crisis:true` |
| `trauma` | `Trauma.pdf` | Hyperarousal, Numbing, Intrusion, Avoidance, Safety beliefs | `crisis:true` |
| `bipolar` | `Bipolar.pdf` | Elevation, Low stretch, Sleep shift, Drive / risk, Cycle pattern | — |
| `bpd` | `BPD.pdf` | Emotion intensity, Relationship panic, Identity shift, Impulsivity, Emptiness | `crisis:true` |
| `narcissism` | `Narcissism.pdf` | Grand self-view, Need for admiration, Entitlement, Empathy dip, Vulnerability | — |

## Scoring

- `tests.js` → `clinicalBand()` strides items by domain (index `i` → domain `i % 5`).
- Wellness / opposite-direction items are **reverse-keyed** (see reverse index arrays on each scorer).
- Likert 1–5 mapped to 0–100 per domain via `scoreItems()`.

## Reports

- `reports.js` → `window.BRIEFS.<id>` uses top / second / lowest domains plus non-diagnostic copy.
- Crisis watch text for `depression`, `bpd`, `trauma` matches `app.js` crisis UI (`state.test.crisis`).

## ADHD (reference pattern)

- ` ADHDPDF.pdf` — separate Barkley-informed domain map in `scoreAdhd()` (6 domains, not stride-5).
