# ADHD screening — reference policy (MindoraInsight)

## Sole clinical reference (locked)

For **`/test/adhd-adult-screening`** (Adult ADHD Pattern Screen), **all conceptual answers, domain meaning, interpretation language, and report guidance** must be drawn **only** from:

> Barkley, R. A. (Ed.). *Attention-Deficit Hyperactivity Disorder: A Handbook for Diagnosis and Treatment* (4th ed.). Guilford Press, 2015.

**Local study copy (do not commit to git):**

`/Users/omar/Desktop/ADHD, Fourth Edition A Handbook for Diagnosis and Treatment (Russell A. Barkley) (z-library.sk, 1lib.sk, z-lib.sk).pdf`

### Agent / author rules

1. **Do not** pull ADHD screen content from other books, websites, DSM paraphrases from memory of other sources, or competing models unless the user explicitly unlocks this policy.
2. Prefer handbook chapters most relevant to adults / EF / emotion / assessment, especially:
   - Ch. 2 Primary symptoms, criteria, subtyping, prevalence  
   - Ch. 3 Emotional dysregulation as a core component  
   - Ch. 10 Executive function deficits in adults  
   - Ch. 12 Adult educational/occupational/relationship/financial impairments  
   - Ch. 13 Adult comorbidity / maladjustment  
   - Ch. 16 EF and self-regulation as extended phenotype  
   - Ch. 19 Psychological assessment of adults with ADHD  
3. Write **original** educational items and summaries informed by those concepts.  
4. **Never** paste handbook chapters, tables, or copyrighted scale items (e.g. BAARS-IV, BDEFS wording) into the repo, UI, or customer reports.  
5. We do **not** store or redistribute the full book text in this repository.

## How MindoraInsight uses it

The **Adult ADHD Pattern Screen** (`adhd-adult-screening`) is an **original educational questionnaire**:

- 100 original statements  
- Domains grounded in Barkley 4th ed themes: inattention, hyperactivity, impulsivity, executive self-regulation, emotional regulation, time/motivation  
- Answers mapped to **percentages** (0 / 25 / 50 / 75 / 100)  
- Optional paid **brief summary report** for record-keeping or to pass to a professional  

## Hard limits

- Not a medical diagnosis  
- Not a replacement for clinical interview, licensed rating scales, or licensed assessment  
- Results = basic initial indication only  

## Trust & alliance (product UX — separate from Barkley clinical framing)

To help people feel supported and answer honestly, ADHD screen UI uses warm, professional support visuals and calm copy. That product choice is informed by psychotherapy **working alliance** research:

> Horvath, A. O., & Symonds, B. D. (1991). Relation between working alliance and outcome in psychotherapy: A meta-analysis. *Journal of Counseling Psychology, 38*(2), 139–149. https://doi.org/10.1037/0022-0167.38.2.139

**What we claim:** a moderate, reliable link between alliance quality and outcomes in psychotherapy research — so designing for felt safety/trust is evidence-aligned UX.  
**What we do not claim:** that our illustration diagnoses ADHD, replaces a clinician, or that MindoraInsight is a therapy product.

Asset: `app/public/brand/trust/mi-trust-orb.png` (+ `mi-trust-mark.svg`) · component: `AdhdTrustSupport`  
**Brand rule:** do not use TestLibrary-style orange-blazer / clipboard–handshake–medal collage emblems. MindoraInsight trust art is network-brain + sage/forest/soft-blue only.

## Report add-on (product intent)

When a client pays the extra fee, generate a short PDF/HTML summary including:

1. Overall % and domain % bars  
2. Highest domains (plain language, Barkley-informed, original wording)  
3. Disclaimer + “discuss with a licensed professional”  
4. Optional clinician-facing note: “Educational screen; interpret only with full clinical context”

Do not paste copyrighted handbook chapters into customer reports.
