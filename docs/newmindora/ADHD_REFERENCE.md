# ADHD test — Barkley 4th ed reference (locked)

**Test id:** `adhd` (`tests/adhd.html`, scorer in `tests.js`)  
**Product:** NewMindora educational ADHD trait screen — **not** a medical diagnosis.

## Sole clinical reference (locked)

For the **ADHD** test, all conceptual meaning — domains, interpretation language, report guidance, and agent answers — must be drawn **only** from:

> Barkley, R. A. (Ed.). *Attention-Deficit Hyperactivity Disorder: A Handbook for Diagnosis and Treatment* (4th ed.). Guilford Press, 2015.

**Local study copy (gitignored, do not commit):**

` ADHD PDF.pdf` in the NewMindora project root (note the leading space in the filename).

### Agent / author rules

1. **Do not** pull ADHD content from Hallowell/Ratey, ASRS manuals, DSM paraphrases from memory, blogs, or other models unless the user **explicitly unlocks** this policy in writing.
2. Prefer handbook chapters most relevant to adults, executive function, emotion, and assessment, especially:
   - Ch. 2 — Primary symptoms, criteria, subtyping, prevalence  
   - Ch. 3 — Emotional dysregulation as a core component  
   - Ch. 10 — Executive function deficits in adults  
   - Ch. 12 — Adult educational / occupational / relationship / financial impairments  
   - Ch. 13 — Adult comorbidity / maladjustment  
   - Ch. 16 — EF and self-regulation as extended phenotype  
   - Ch. 19 — Psychological assessment of adults with ADHD  
3. Write **original** educational statements and summaries informed by those concepts.  
4. **Never** paste handbook chapters, tables, or copyrighted scale items (e.g. BAARS-IV, BDEFS wording, ASRS items) into the repo, UI, or PDF reports.  
5. **Do not** store or redistribute the full book text in this repository.

## Domain themes (align scorer & reports)

Ground item banks and narrative in Barkley-informed **themes** (labels may be plain-language in UI):

| Theme | Plain-language focus |
|-------|----------------------|
| Inattention & sustained focus | Drift, missed details, effortful boring work |
| Hyperactivity & restlessness | Need to move, inner motor, hard to sit still |
| Impulse control | Blurt, interrupt, act before the pause |
| Executive self-regulation | Start-up, planning, organize, finish |
| Emotional self-regulation | Fast rise, slow settle, rejection/criticism sting |
| Time, motivation & follow-through | Time blindness, urgency, interest-based drive |

**Score bands (educational):** low &lt;40 · moderate 40–59 · elevated 60–74 · high ≥75  

Overall % is a headline; **domain shape** individualizes the person.

## Profile shapes (report individualization)

Use highest domains to pick a **shape**, then rewrite with the person’s numbers:

1. Quieter inattentive / executive — high inattention + executive, lower hyperactivity  
2. Restless–impulsive — high hyperactivity + impulsivity  
3. Emotion-forward — high emotional regulation strain with impulse or executive load  
4. Time-blind executive — high time/motivation + executive  
5. Broader combined-style — inattention + hyperactivity + impulsivity elevated  
6. Mixed individual — no clean shape; lead with top domain  
7. Lower overall — still validate if life feels impaired  

Never force one shape. Prefer “your pattern” / “in your answers” over “people with ADHD.”

## Hard limits

- Not a medical diagnosis  
- Not a replacement for clinical interview, licensed rating scales, or licensed assessment  
- Results = educational indication only — discuss with a licensed professional if impaired  

## Relation to site `BOOK_SOURCES`

`reports.js` may still display legacy marketing citations for UI chrome. **Authoritative conceptual work for ADHD** follows **this document and Barkley 4th ed only**, not alternate book blurbs in `BOOK_SOURCES.adhd`.

## See also

- `docs/REFERENCES.md` — full test map  
- `docs/REPORT_POLICY.md` — brief + PDF report rules  
- MindoraInsight mirror: `docs/ADHD_SCREENING_REFERENCE.md` (same Barkley lock, different route name)
