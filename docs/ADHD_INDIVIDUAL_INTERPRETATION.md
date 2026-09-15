# Individual ADHD screen interpretation playbook

**Purpose:** Turn each person’s 100 answers into a **personal** educational summary — not one generic “you might have ADHD” blurb.

**Scope:** MindoraInsight Adult ADHD Pattern Screen only (`/test/adhd-adult-screening`).  
**Not:** diagnosis, treatment, or a copy of any commercial handbook / rating scale.

**Sole offline reference:** Barkley (Ed.), *ADHD: A Handbook for Diagnosis and Treatment*, 4th ed. (local PDF on Desktop). Draw domain meaning and interpretation **only** from that book. Do not paste handbook chapters into customer reports. See `docs/ADHD_SCREENING_REFERENCE.md`.

---

## 1. Score each person as a profile, not a single number

| Domain | What high % tends to mean (plain language) |
|--------|--------------------------------------------|
| Inattention & sustained focus | Drift, missed details, effortful boring work |
| Hyperactivity & restlessness | Need to move, inner motor, hard to sit still |
| Impulse control | Blurt, interrupt, act before the pause |
| Executive self-regulation | Start-up, planning, organize, finish |
| Emotional self-regulation | Fast rise, slow settle, rejection/criticism sting |
| Time, motivation & follow-through | Time blindness, urgency addiction, interest-based drive |

**Bands:** low &lt;40 · moderate 40–59 · elevated 60–74 · high ≥75  

Overall % is only a headline. **Domain shape** is what makes the person individual.

---

## 2. Named profile shapes (examples)

Use the highest domains to pick a shape — then rewrite in their numbers:

1. **Quieter inattentive / executive** — high inattention + executive, lower hyperactivity  
2. **Restless–impulsive** — high hyperactivity + impulsivity, attention less central  
3. **Emotion-forward** — high emotion with impulse or executive strain  
4. **Time-blind executive** — high time/motivation + executive  
5. **Broader combined-style** — inattention + hyperactivity + impulsivity all elevated  
6. **Mixed individual** — no clean shape; lead with their personal top domain  
7. **Lower overall** — still listen if life feels impaired

Never force one shape. If unsure → **mixed individual**.

---

## 3. Report structure (paid brief summary)

For each client, generate:

1. **Opening** — overall % + their shape title (unique)  
2. **Top 3 domains** — with % and one plain sentence each  
3. **Steadier areas** — what scored lower (strengths to protect)  
4. **One practical tip** per elevated domain (from playbook tips in code)  
5. **Clinician handoff box** — scores + “educational screen only”  
6. **Disclaimer** — not a diagnosis; seek licensed care if impaired  

Tone: calm, specific, respectful. No fear marketing. No claiming “you have ADHD.”

---

## 4. Individual vs one-size-fits-all (rules)

- Do **not** use the same paragraph for every high overall score.  
- Always mention **their** top domain by name and %.  
- If two people both score 68% overall but different tops (emotion vs time), their summaries must differ.  
- Prefer “your pattern” / “in your answers” over “people with ADHD.”  

---

## 5. Implementation

- Questions + % scoring: `app/src/data/adhdScreening.ts`  
- Individual narrative engine: `app/src/data/adhdIndividualReport.ts`  
- UI runner: `app/src/features/assessments/AdhdScreeningRunner.tsx`  

Paid comprehensive report is wired via `persistAssessmentResult` → `/report/adhd-adult-screening` (basic + unlocked full chapters / Download PDF). Narrative still uses `buildIndividualNarrative(...)` for summary/blurb; chapter packs live under `app/src/data/reports/packs/adhdPack.ts`.
