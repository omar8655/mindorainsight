# Report policy — brief, extended, and PDF (NewMindora)

**Scope:** All 20 tests in `tests.js`. Applies to on-screen results, `reports.js` brief copy, `report-engine.js` extended sections, and print/PDF export in `app.js`.

**Spirit:** Mirror MindoraInsight’s individual, reference-informed ADHD reports — each person gets a **profile-shaped** summary, not a generic blurb — while staying strictly **educational**.

---

## 1. Two report tiers

| Tier | Where | Purpose |
|------|--------|---------|
| **Brief (free)** | Results page after submit | Fast, readable snapshot: headline, 2–4 short paragraphs/cards, domain bars, optional “watch” line |
| **Extended / PDF** | Unlocked extended compile + print | Deeper narrative, chapter-like sections, attribution to primary reference (`docs/REFERENCES.md`) |

Both tiers must:

- Cite the **test’s primary reference** in attribution tone (book title / authors), not paste copyrighted text.
- State clearly that the tool **does not diagnose** and is not a substitute for licensed care.
- Use **original wording** informed by the locked PDF for that test id.

---

## 2. Individualization rules (every test)

Treat scores as a **profile**, not one number:

1. **Lead with domain shape** — name the top 1–3 domains/traits with percentages.  
2. **Second channel** — mention the next-strongest pattern as backup or balance.  
3. **Quieter areas** — note lower scores as context, not “deficits” unless clinical screen copy requires gentle framing.  
4. **Avoid one-size-fits-all** — two people with the same overall % but different tops get **different** opening paragraphs.  
5. **Snapshot language** — sleep, stress, and context shift scores; one sitting is a moment in time.

For **`adhd`**, follow profile shapes in `docs/ADHD_REFERENCE.md`.

---

## 3. Tone and audience

- **Calm, specific, respectful** — no fear marketing, no shame, no mockery.  
- **Teen-friendly where the UI already is** — extended engine uses school/friends language; keep clinical tests more sober.  
- **No identity foreclosure** — “your answers suggest…” not “you are a Type X” or “you have disorder Y.”  
- **Strengths-forward for personality tests** — high scores as usable patterns; low scores as quieter channels, not failure.

---

## 4. Crisis-aware tests

Tests flagged `crisis: true` in `TEST_META` (`depression`, `bpd`, `trauma`):

- Always show crisis/support UI when the site does (`state.test.crisis`).  
- Extended/PDF **must** include a **Kind Boundaries & Well-Being** (or equivalent) block with:
  - Encouragement to talk to a trusted adult or licensed professional  
  - **988** (US/Canada) and **116 123** (UK Samaritans) where appropriate  
- Never instruct users to delay urgent care.  
- Do not interpret elevated scores as confirmation of self-harm risk without clinical assessment — use **“consider reaching out”** language.

---

## 5. Clinical & spectrum screens (non-diagnostic)

For `clinical: true` tests (`autism`, `adhd`, `depression`, `bpd`, `bipolar`, `narcissism`, `trauma`):

- Use **screen** / **pattern** / **trait reflection** language.  
- Include **“discuss with a licensed professional”** when scores are elevated or life feels impaired.  
- Optional **clinician handoff** box in PDF: scores + “educational screen only; interpret with full clinical context.”  
- Ground domains only in that test’s **primary PDF** in `docs/REFERENCES.md`.

---

## 6. Extended report structure (`report-engine.js`)

When editing seeds or BANK paragraphs:

- Keep section titles supportive, not diagnostic.  
- **Psychometric Science** sections paraphrase theory from the locked reference — no item banks.  
- Pad with generic BANK lines only when needed for length; padded text must not contradict disclaimers.  
- PDF header may show vibe/emoji from `BOOK_SOURCES` but **clinical meaning** must follow `docs/REFERENCES.md` (especially ADHD → Barkley).

---

## 7. Prohibited content

- Verbatim copyrighted questionnaire items or official scale cut-off claims presented as clinical fact  
- Handbook chapters or long quotes in customer-facing output  
- Treatment plans, medication advice, or legal/hiring determinations  
- Stigmatizing labels applied to the person (“narcissist,” “borderline,” “autistic” as insult) — describe **patterns** instead  

---

## 8. Definition of done (report changes)

A report change is complete when:

- [ ] Happy path renders for brief + extended/PDF  
- [ ] Disclaimers and crisis blocks present where required  
- [ ] Copy matches the test’s reference map in `docs/REFERENCES.md`  
- [ ] ADHD work verified against `docs/ADHD_REFERENCE.md`  
- [ ] No pasted scale items or book paragraphs in repo or export HTML  

---

## 9. File pointers

| Concern | File |
|---------|------|
| Test list & crisis flags | `tests.js` → `TEST_META` |
| Brief narratives | `reports.js` |
| Extended compile | `report-engine.js` |
| Results + PDF shell | `app.js` |
| Reference map | `docs/REFERENCES.md` |
| ADHD lock | `docs/ADHD_REFERENCE.md` |
