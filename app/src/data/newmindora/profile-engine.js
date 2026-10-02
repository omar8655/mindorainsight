/* Ported from newmindora */
/* Reusable 100-question → individual profile shapes (educational, not diagnostic).
   Target: ~100 named shapes across 20 tests. API: classifyProfile(testId, scores). */

  function bandFor(score) {
    if (score >= 75) return "high";
    if (score >= 60) return "elevated";
    if (score >= 40) return "moderate";
    return "low";
  }

  function shape(shapeId, title, blurb) {
    return { shapeId, title, blurb };
  }

  function numericScores(scores) {
    return (scores || []).filter((s) => s.score != null).sort((a, b) => b.score - a.score);
  }

  function topKey(scores) {
    const t = numericScores(scores)[0];
    return t ? t.key : null;
  }

  function scoreOf(scores, re) {
    const hit = (scores || []).find((s) => re.test(s.key || ""));
    return hit && hit.score != null ? hit.score : null;
  }

  function leadShape(prefix, scores, copyMap, mixedId, mixedTitle, mixedBlurb) {
    const ranked = numericScores(scores);
    if (!ranked.length) {
      return shape(mixedId || prefix + "-mixed", mixedTitle || "Mixed individual pattern", mixedBlurb || "Lead with your highest score; this is an educational snapshot, not a diagnosis.");
    }
    const top = ranked[0];
    const second = ranked[1];
    const spread = second ? top.score - second.score : 100;
    if (spread < 8 && second) {
      return shape(
        prefix + "-tied-blend",
        top.key + "–" + second.key + " blend",
        "Two signals sit close: " +
          top.key +
          " (" +
          top.score +
          "/100) and " +
          second.key +
          " (" +
          second.score +
          "/100). Read them as a pair — context often tips which one leads."
      );
    }
    const copy = copyMap[top.key];
    if (copy) return shape(copy[0], copy[1], copy[2]);
    const slug = String(top.key)
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");
    return shape(
      prefix + "-" + slug + "-lead",
      top.key + " forward",
      top.key +
        " leads this sitting (" +
        top.score +
        "/100). Treat the quieter domains as practice fields, not fixed deficits — educational only."
    );
  }

  function crisisTail(elevated) {
    return elevated
      ? " If daily life feels impaired, or thoughts of self-harm appear, contact a licensed professional or crisis line (988 US/Canada, Samaritans 116 123 UK) — this screen cannot keep you safe."
      : " If impairment persists, take concrete examples to a licensed clinician.";
  }

  /* ── ADHD (Barkley-informed domains) ── */
  function inferAdhdDomain(key) {
    const k = (key || "").toLowerCase();
    if (k.includes("focus") || k.includes("attention")) return "inattention";
    if (k.includes("restless")) return "hyperactivity";
    if (k.includes("impulse")) return "impulsivity";
    if (k.includes("started") || k.includes("finishing")) return "executive";
    if (k.includes("feelings") || k.includes("stress")) return "emotion";
    if (k.includes("time") || k.includes("follow")) return "time_motivation";
    return "mixed";
  }

  function classifyAdhd(scores) {
    const traits = scores
      .filter((s) => s.score != null)
      .map((s) => ({
        domain: s.domain || inferAdhdDomain(s.key),
        name: s.key,
        score: s.score,
      }));
    const map = Object.fromEntries(traits.map((t) => [t.domain, t.score]));
    const hi = (d) => (map[d] || 0) >= 60;
    const lo = (d) => (map[d] || 0) < 40;

    if (hi("inattention") && hi("hyperactivity") && hi("impulsivity")) {
      return shape(
        "adhd-broader-combined",
        "Broader combined-style elevation",
        "Several domains are elevated together. Your story stays individual — lead with your highest score when you talk to a licensed professional. Educational screen only — not an ADHD diagnosis."
      );
    }
    if (hi("inattention") && hi("executive") && lo("hyperactivity")) {
      return shape(
        "adhd-quieter-inattentive-executive",
        "Quieter inattentive–executive pattern",
        "Focus and planning strain show more than outward restlessness. Starting, sustaining, and finishing can feel hard even when you look calm — a common educational shape, not a diagnosis."
      );
    }
    if (hi("hyperactivity") && hi("impulsivity") && !hi("inattention")) {
      return shape(
        "adhd-restless-impulsive",
        "Restless–impulsive pattern",
        "Energy, movement, and quick action stand out more than zoning out. Friction may be interrupting, impatience, or deciding before the pause."
      );
    }
    if (hi("emotion") && (hi("impulsivity") || hi("executive"))) {
      return shape(
        "adhd-emotion-forward",
        "Emotion-forward pattern",
        "Strong feelings sit near the centre, often with impulse or executive strain. Stress and criticism may land fast — regulation load, not a character flaw."
      );
    }
    if (hi("time_motivation") && hi("executive")) {
      return shape(
        "adhd-time-blind-executive",
        "Time-blind executive pattern",
        "Deadlines, last-minute urgency, and “I’ll start later” mix with planning friction. Crisis weeks may look strong while quiet weeks stall — rhythm data, not laziness."
      );
    }
    if (hi("inattention") && !hi("hyperactivity") && !hi("impulsivity")) {
      return shape(
        "adhd-focus-primary",
        "Focus-primary pattern",
        "Sustained attention and detail are the loudest themes. External cues and shorter work blocks often help more than willpower alone."
      );
    }
    if (traits.length && traits.every((t) => t.score < 45)) {
      return shape(
        "adhd-lower-overall",
        "Lower overall on this screen",
        "Most areas sit lower on this sitting. That does not erase hard days. If life still feels impaired, bring concrete examples to a clinician."
      );
    }
    const top = [...traits].sort((a, b) => b.score - a.score)[0];
    return shape(
      "adhd-mixed",
      "Mixed individual ADHD-screen pattern",
      "Your pattern does not fit one simple type. Lead with " +
        (top ? top.name + " (" + top.score + "%)" : "your highest domain") +
        ", then the next two — educational, not diagnostic."
    );
  }

  /* ── Big Five / Personality ── */
  const BIG5_COPY = {
    Openness: [
      "big5-openness-lead",
      "Openness forward",
      "Curiosity and new ideas lead. You want meaning and novelty — boredom hits when the week is only repetition.",
    ],
    Conscientiousness: [
      "big5-conscientiousness-lead",
      "Conscientiousness forward",
      "Plans, standards, and follow-through lead. Others often meet you as the person who makes the week real.",
    ],
    Extraversion: [
      "big5-extraversion-lead",
      "Extraversion forward",
      "People and pace fuel you. Variety and contact keep attention honest — solitude still needs a deliberate slot.",
    ],
    Agreeableness: [
      "big5-agreeableness-lead",
      "Agreeableness forward",
      "Harmony and cooperation lead. You de-escalate easily — remember to name your own preference, not only everyone else’s.",
    ],
    "Emotional sensitivity": [
      "big5-sensitivity-lead",
      "Emotional sensitivity forward",
      "You notice nuance early. Recovery after intensity is part of the design, not weakness.",
    ],
  };

  function classifyBig5(scores) {
    const ranked = numericScores(scores);
    if (!ranked.length) return shape("big5-mixed", "Balanced mixed profile", "No single trait dominates — context may tip you week to week.");
    const spread = ranked.length > 1 ? ranked[0].score - ranked[ranked.length - 1].score : 0;
    if (spread < 18) {
      return shape(
        "big5-balanced-mixed",
        "Balanced mixed profile",
        "No single trait dominates this sitting. Sleep, stress, and who is in the room may tip you between styles."
      );
    }
    const t1 = ranked[0];
    const t2 = ranked[1] || ranked[0];
    const gap = Math.abs(t1.score - t2.score);
    const set = new Set([t1.key, t2.key]);
    const lowE = ranked.find((s) => s.key === "Extraversion" && s.score < 42);
    const lowA = ranked.find((s) => s.key === "Agreeableness" && s.score < 42);
    const lowO = ranked.find((s) => s.key === "Openness" && s.score < 42);

    if (set.has("Conscientiousness") && set.has("Openness") && gap < 14) {
      return shape("big5-conscientious-explorer", "Conscientious explorer", "Structure and curiosity share the wheel — boredom hits when either is missing.");
    }
    if (set.has("Extraversion") && set.has("Agreeableness")) {
      return shape("big5-warm-connector", "Warm connector", "People and harmony are central. Watch over-giving when your limits go unnamed.");
    }
    if (set.has("Openness") && set.has("Emotional sensitivity")) {
      return shape("big5-sensitive-dreamer", "Sensitive dreamer", "Imagination and emotional attunement combine — protect recovery after intensity.");
    }
    if (set.has("Extraversion") && set.has("Openness")) {
      return shape("big5-outgoing-explorer", "Outgoing explorer", "Novelty and people fuel you. Variety in the week is how attention stays honest.");
    }
    if (set.has("Emotional sensitivity") && set.has("Agreeableness")) {
      return shape("big5-attuned-helper", "Attuned helper", "You feel states quickly. Empathy is a skill here; boundaries keep it sustainable.");
    }
    if (set.has("Conscientiousness") && set.has("Extraversion")) {
      return shape("big5-structured-leader", "Structured leader", "Plans and visible momentum fit you — make standards collaborative so others can keep up.");
    }
    if (lowO && t1.key === "Conscientiousness") {
      return shape("big5-practical-steady", "Practical steady", "Proven methods and follow-through beat abstract theory. You keep teams grounded.");
    }
    if (lowE && (set.has("Openness") || t1.key === "Openness")) {
      return shape("big5-creative-introvert", "Creative introvert", "Ideas run rich; social performance costs more than others guess. Protect solo time.");
    }
    if (lowE && t1.key === "Conscientiousness") {
      return shape("big5-steady-introvert", "Steady introvert", "Energy returns in quieter conditions. Reliability and depth matter more than volume.");
    }
    if (lowA) {
      return shape("big5-candid-direct", "Candid direct", "Clarity beats smoothness. Relationships improve when people know accuracy is care, not coldness.");
    }
    if (gap >= 14 && BIG5_COPY[t1.key]) {
      const c = BIG5_COPY[t1.key];
      return shape(c[0], c[1], c[2]);
    }
    return shape(
      "big5-" +
        String(t1.key)
          .toLowerCase()
          .replace(/\s+/g, "-")
          .replace(/[^a-z-]/g, "") +
        "-" +
        String(t2.key)
          .toLowerCase()
          .replace(/\s+/g, "-")
          .replace(/[^a-z-]/g, "") +
        "-blend",
      t1.key + "–" + t2.key + " blend",
      "Top signals: " + t1.key + " (" + t1.score + "/100) and " + t2.key + " (" + t2.score + "/100). Traits describe style, not worth."
    );
  }

  /* ── Sixteen / MBTI-style poles ── */
  function classifySixteen(scores) {
    const codeObj = (scores || []).find((s) => s.label);
    const code = codeObj && codeObj.label ? codeObj.label : null;
    const e = scoreOf(scores, /Energy/i);
    const s = scoreOf(scores, /Information/i);
    const t = scoreOf(scores, /Decisions/i);
    const j = scoreOf(scores, /Lifestyle/i);
    if (code) {
      const families = {
        NT: ["sixteen-analyst-leaning", "Analyst-leaning type pattern", "Competence and systems matter. You trust principles and patterns — remember people need warmth, not only correctness."],
        NF: ["sixteen-diplomat-leaning", "Diplomat-leaning type pattern", "Meaning and people lead. You protect values and growth — name practical next steps so ideals become weeks."],
        ST: ["sixteen-sentinel-leaning", "Sentinel-leaning type pattern", "Facts and duty lead. Reliability is a gift — leave room for improvisation when the plan is already good enough."],
        SF: ["sixteen-explorer-care-leaning", "Care-and-detail type pattern", "Concrete care and present facts lead. You help in tangible ways — ask for the same clarity you give."],
      };
      const mid = (code[1] || "") + (code[2] || "");
      const fam = families[mid];
      if (fam) {
        return shape(fam[0], fam[1] + " (" + code + ")", fam[2] + " Type code on this sitting: " + code + ".");
      }
      return shape(
        "sixteen-mixed",
        "Type pattern " + code,
        "Preference shorthand for this sitting: " + code + ". Preferences are habits of attention — not a cage."
      );
    }
    if (e != null && e >= 60) return shape("sixteen-outward-energy", "Outward energy leaning", "Recharge leans toward people and action. Schedule recovery before the week empties you.");
    if (e != null && e < 40) return shape("sixteen-inward-energy", "Inward energy leaning", "Recharge leans toward quieter conditions. Depth beats volume.");
    if (j != null && j >= 60) return shape("sixteen-structure-leaning", "Structure leaning", "Closure and plans feel safer than open loops. Leave one deliberate flexible hour.");
    if (j != null && j < 40) return shape("sixteen-options-leaning", "Options leaning", "Emergence and options feel freer than early locks. Commitments need visible anchors.");
    if (s != null && s >= 60) return shape("sixteen-sensing-leaning", "Sensing / facts leaning", "Inspection and present detail lead. Abstract brainstorms need a concrete hook.");
    if (s != null && s < 40) return shape("sixteen-intuition-leaning", "Intuition / pattern leaning", "Patterns and possibility lead. Anchor big ideas with one checkable fact.");
    if (t != null && t >= 60) return shape("sixteen-thinking-leaning", "Thinking / principle leaning", "Analysis and principle lead. Soften delivery so people can hear the care underneath.");
    if (t != null && t < 40) return shape("sixteen-feeling-leaning", "Feeling / impact leaning", "Impact on people leads decisions. Still name the principle so choices stay fair.");
    return shape("sixteen-mixed", "Mixed preference pattern", "Poles sit mixed this sitting. Preferences move with context — educational shorthand only.");
  }

  /* ── Enneagram ── */
  const ENNEA = {
    "Type 1": ["ennea-1-reformer", "Type 1 — improvement drive", "Standards and correctness pull hard. Growth is allowing good-enough without calling it failure."],
    "Type 2": ["ennea-2-helper", "Type 2 — helper drive", "Being needed feels like love. Practice receiving without earning it first."],
    "Type 3": ["ennea-3-achiever", "Type 3 — achievement drive", "Image and results lead. Rest is not lost productivity — it is how excellence stays human."],
    "Type 4": ["ennea-4-individualist", "Type 4 — identity & depth", "Authenticity and feeling lead. Ordinary days still count as your life."],
    "Type 5": ["ennea-5-investigator", "Type 5 — knowledge & reserve", "Understanding before engaging. Share one unfinished thought this week."],
    "Type 6": ["ennea-6-loyalist", "Type 6 — security scan", "Anticipating risk keeps the group safe. Trust one small certainty without a full audit."],
    "Type 7": ["ennea-7-enthusiast", "Type 7 — options & stimulation", "Possibility keeps pain at bay. Finish one meaningful thing before opening three more."],
    "Type 8": ["ennea-8-challenger", "Type 8 — strength & control", "Intensity protects vulnerability. Softness with safe people is strength, not loss."],
    "Type 9": ["ennea-9-peacemaker", "Type 9 — harmony & merge", "Peacekeeping can erase your preference. Voice one want early, before resentment builds."],
  };

  function classifyEnneagram(scores) {
    const ranked = numericScores(scores);
    if (!ranked.length) return shape("ennea-mixed", "Mixed Enneagram pattern", "No clear lead type this sitting.");
    const top = ranked[0];
    const second = ranked[1];
    if (second && top.score - second.score < 6) {
      return shape(
        "ennea-mixed",
        top.key + " with " + second.key + " colour",
        "Two types sit close. Lead motivation may be " +
          top.key +
          " coloured by " +
          second.key +
          ". Enneagram describes strategies, not a cage."
      );
    }
    const c = ENNEA[top.key];
    if (c) return shape(c[0], c[1], c[2] + " Score " + top.score + "/100 on this educational sitting.");
    return leadShape("ennea", scores, {}, "ennea-mixed", "Mixed Enneagram pattern", "Lead with your highest type score.");
  }

  /* ── Love languages ── */
  const LOVE = {
    Words: ["love-words", "Words of affirmation forward", "Hearing care said clearly lands. Ask for specific phrases; give them too."],
    "Acts of service": ["love-acts", "Acts of service forward", "Help that removes a load feels like love. Notice invisible labour — including yours."],
    Gifts: ["love-gifts", "Gifts forward", "Tangible symbols matter. Small, thoughtful beats expensive and generic."],
    Time: ["love-time", "Quality time forward", "Undivided presence is the gift. Phones away for one short protected window."],
    Touch: ["love-touch", "Physical touch forward", "Contact regulates you. Consent and timing still matter — ask, don’t assume."],
  };

  function classifyLove(scores) {
    return leadShape("love", scores, LOVE, "love-mixed", "Mixed love-channel pattern", "Primary care channels can be mixed — name your top two out loud.");
  }

  /* ── Attachment ── */
  function classifyAttachment(scores) {
    const ranked = numericScores(scores);
    const top = ranked[0];
    if (!top) return shape("attach-mixed", "Mixed attachment pattern", "Bonding styles are learned predictions about safety — educational, not a disorder label.");
    const secure = scoreOf(scores, /secure/i);
    const anxious = scoreOf(scores, /anxious/i);
    const avoidant = scoreOf(scores, /avoidant/i);
    const disorganized = scoreOf(scores, /disorganized/i);

    if (disorganized != null && disorganized >= 55 && disorganized >= (top.score || 0) - 5) {
      return shape(
        "attach-fearful-avoidant",
        "Fearful–avoidant leaning",
        "Closeness and distance can both feel risky. Slow, predictable repair helps more than intensity."
      );
    }
    if (anxious != null && avoidant != null && anxious >= 55 && avoidant >= 55) {
      return shape(
        "attach-anxious-avoidant-mix",
        "Anxious–avoidant mix",
        "Pursuit and retreat both show up. This is learned prediction about closeness — patterns can shift with steady relationships."
      );
    }
    if (/secure/i.test(top.key) && top.score >= 50) {
      return shape("attach-secure", "Secure-leaning pattern", "Closeness and space can coexist. Conflict looks repairable in your answers.");
    }
    if (/anxious/i.test(top.key)) {
      return shape("attach-anxious", "Anxious-leaning pattern", "Distance may register as danger early. Soothe the body before the third message.");
    }
    if (/avoidant/i.test(top.key)) {
      return shape("attach-avoidant", "Avoidant-leaning pattern", "Independence protects safety. Practice staying one extra minute when you want to leave.");
    }
    if (/disorganized/i.test(top.key)) {
      return shape("attach-disorganized-lead", "Disorganized-pull forward", "Mixed signals often mean the nervous system is arguing with itself — predictability over intensity.");
    }
    return shape("attach-mixed", "Mixed attachment pattern", "Strongest pull: " + top.key + " (" + top.score + "/100). Educational only.");
  }

  /* ── Strengths / Career / DISC / EQ / Character ── */
  const STRENGTHS = {
    Executing: ["str-executing", "Executing domain forward", "You make work finish. Protect focus time; hire or tool the influencing gap if needed."],
    Influencing: ["str-influencing", "Influencing domain forward", "You move people and rooms. Pair persuasion with follow-through so trust compounds."],
    Relationship: ["str-relationship", "Relationship domain forward", "You weave teams. Boundaries keep care from becoming burnout."],
    "Strategic thinking": ["str-strategic", "Strategic thinking forward", "You see patterns early. Translate insight into one next action others can run."],
  };

  const CAREER = {
    "Realistic / making": ["career-realistic", "Realistic / making forward", "Hands-on building fits. Abstract meetings need a tangible outcome."],
    Investigative: ["career-investigative", "Investigative forward", "Analysis and inquiry lead. Ship a draft before perfect certainty."],
    Artistic: ["career-artistic", "Artistic forward", "Expression and originality lead. Structure protects creative energy."],
    Social: ["career-social", "Social / helping forward", "People development fits. Recover after emotional labour."],
    Enterprising: ["career-enterprising", "Enterprising forward", "Persuasion and initiative lead. Check the cost of constant pitching."],
    Conventional: ["career-conventional", "Conventional / systems forward", "Order and process fit. Leave room for exception handling without shame."],
  };

  const DISC = {
    Dominance: ["disc-d", "Dominance forward", "Pace and results lead. Soften edges when trust matters more than speed."],
    Influence: ["disc-i", "Influence forward", "Energy and optimism lead. Follow enthusiasm with written next steps."],
    Steadiness: ["disc-s", "Steadiness forward", "Consistency and calm lead. Name change needs early so you are not steamrolled."],
    Conscientiousness: ["disc-c", "Conscientiousness forward", "Quality and accuracy lead. Good-enough deadlines beat endless polishing."],
  };

  const EQ = {
    "Self-awareness": ["eq-self-awareness", "Self-awareness forward", "You notice inner weather early. Use the dashboard to choose, not only to narrate."],
    "Self-management": ["eq-self-management", "Self-management forward", "You can ride a feeling without handing it the wheel. Teach others your pause signal."],
    Motivation: ["eq-motivation", "Motivation forward", "Long aims keep you moving. Break goals into week-sized bets."],
    Empathy: ["eq-empathy", "Empathy forward", "You read others well. Ask before assuming — and keep a boundary for yourself."],
    "Social skill": ["eq-social-skill", "Social skill forward", "You shape interactions. Use skill for clarity, not only harmony."],
  };

  const CHARACTER = {
    Wisdom: ["char-wisdom", "Wisdom virtue forward", "Curiosity and perspective lead. Share knowledge without talking past the room."],
    Courage: ["char-courage", "Courage virtue forward", "Bravery and honesty lead. Pair guts with recovery so courage can repeat."],
    Humanity: ["char-humanity", "Humanity virtue forward", "Kindness and social intelligence lead. Reciprocity keeps giving sustainable."],
    Justice: ["char-justice", "Justice virtue forward", "Fairness and citizenship lead. Pick one local fairness act this week."],
    Temperance: ["char-temperance", "Temperance virtue forward", "Forgiveness and self-regulation lead. Temperance is strength under load."],
    Transcendence: ["char-transcendence", "Transcendence virtue forward", "Meaning, gratitude, or beauty lead. Ground awe in one ordinary habit."],
  };

  /* ── Archetypes ── */
  const ARCH = {
    Innocent: ["arch-innocent", "Innocent forward", "Trust and hope lead. Pair optimism with one clear boundary."],
    Explorer: ["arch-explorer", "Explorer forward", "Freedom and discovery lead. Finish one map before the next departure."],
    Sage: ["arch-sage", "Sage forward", "Understanding leads. Share wisdom as invitation, not lecture."],
    Hero: ["arch-hero", "Hero forward", "Contest and courage lead. Not every problem is a fight."],
    Lover: ["arch-lover", "Lover forward", "Bond and intimacy lead. Keep a self underneath the we."],
    Jester: ["arch-jester", "Jester forward", "Play disarms tension. Watch using humour to skip feeling."],
    Everyperson: ["arch-everyperson", "Everyperson forward", "Belonging leads. You can belong without shrinking."],
    Caregiver: ["arch-caregiver", "Caregiver forward", "Provide and protect. Care includes you on the list."],
    Ruler: ["arch-ruler", "Ruler forward", "Order and responsibility lead. Share power so systems outlive you."],
    Creator: ["arch-creator", "Creator forward", "Make and invent. Ship imperfect work so creation meets the world."],
    Magician: ["arch-magician", "Magician forward", "Transform and catalyse. Influence needs ethics so change stays clean."],
    Outlaw: ["arch-outlaw", "Outlaw forward", "Break stale rules. Destroy only what you will replace with something better."],
  };

  function classifyArchetype(scores) {
    return leadShape("arch", scores, ARCH, "arch-mixed", "Mixed archetype pattern", "Top plots can share the stage — mythic metaphor only, not a clinical label.");
  }

  /* ── Political ── */
  function classifyPolitical(scores) {
    const left = scoreOf(scores, /Economic left/i);
    const right = scoreOf(scores, /Economic right/i);
    const liberty = scoreOf(scores, /Social liberty/i);
    const order = scoreOf(scores, /Social order/i);
    const econ = (left || 0) - (right || 0);
    const social = (liberty || 0) - (order || 0);
    if (Math.abs(econ) < 8 && Math.abs(social) < 8) {
      return shape("pol-centrist-mixed", "Centrist / mixed values", "Axes sit close. Name which moral good wins when two collide — care, fairness, loyalty, liberty.");
    }
    if (econ >= 10 && social >= 10) return shape("pol-left-liberty", "Economic left + social liberty", "Shared provision and personal liberty both pull. Trade-offs show up in regulation debates.");
    if (econ >= 10 && social <= -10) return shape("pol-left-order", "Economic left + social order", "Collective provision with stronger social rules. Clarify which traditions you actually want.");
    if (econ <= -10 && social >= 10) return shape("pol-right-liberty", "Economic right + social liberty", "Markets and personal freedom both lead. Watch who bears downside risk.");
    if (econ <= -10 && social <= -10) return shape("pol-right-order", "Economic right + social order", "Market pace with preference for social structure. Separate policy from identity.");
    if (Math.abs(econ) >= Math.abs(social)) {
      return econ > 0
        ? shape("pol-econ-left-lead", "Economic-left leaning", "State vs market leans collective on this sitting — descriptive, not a party membership.")
        : shape("pol-econ-right-lead", "Economic-right leaning", "State vs market leans market on this sitting — descriptive, not a party membership.");
    }
    return social > 0
      ? shape("pol-social-liberty-lead", "Social-liberty leaning", "Authority vs liberty leans liberty here. Keep disagreements about rules, not worth.")
      : shape("pol-social-order-lead", "Social-order leaning", "Authority vs liberty leans order here. Name which goods order is protecting.");
  }

  /* ── Clinical screens ── */
  const AUTISM = {
    "Social cueing": ["aut-social", "Social-cueing forward", "Tone, turn-taking, and unsaid rules cost deliberate effort — not a lack of caring. Written clarity helps."],
    "Pattern focus": ["aut-pattern", "Pattern-focus forward", "Systems, detail, and correctness pull attention. Deep interests are fuel when respected."],
    "Sensory load": ["aut-sensory", "Sensory-load forward", "Light, sound, texture, and crowds land as load. Quiet recovery is infrastructure."],
    "Routine need": ["aut-routine", "Routine-need forward", "Prediction calms the system. Surprise has a real price — advance notice helps."],
    "Masking load": ["aut-masking", "Masking-load forward", "Performing ‘fine’ spends energy you pay for later. Exhaustion after ‘successful’ days is data."],
  };

  function classifyAutism(scores) {
    const ranked = numericScores(scores);
    const elevated = ranked.filter((s) => s.score >= 60).length;
    if (elevated >= 4) {
      return shape(
        "aut-broad-elevation",
        "Broader neurodiversity-theme elevation",
        "Several clusters are elevated together. This is a trait screen, not an autism diagnosis — discuss with a qualified clinician if life is impaired."
      );
    }
    return leadShape("aut", scores, AUTISM, "aut-mixed", "Mixed neurodiversity pattern", "Many people score high in one area and typical in another — not a diagnosis.");
  }

  const DEP = {
    "Low mood": ["dep-mood", "Low-mood forward", "Sadness or numbness leads this sitting. Behaviour first: one scheduled action, then review thoughts."],
    "Energy / body": ["dep-energy", "Energy / body forward", "Body load and stalled energy lead. Shrink the first step until it is almost silly-small."],
    "Sleep & appetite": ["dep-sleep", "Sleep & appetite forward", "Sleep or appetite change leads. Protect a wind-down window before fixing the whole life."],
    "Self-view": ["dep-self", "Harsh self-view forward", "Self-criticism is loud. Thoughts are events that can be tested, not orders."],
    Hopelessness: ["dep-hope", "Hopelessness forward", "Future feels closed on this sitting. Reach out — screens miss context and cannot replace care."],
  };

  function classifyDepression(scores) {
    const ranked = numericScores(scores);
    const top = ranked[0];
    const elevated = ranked.some((s) => s.score >= 60);
    if (ranked.length && ranked.every((s) => s.score < 40)) {
      return shape("dep-lower", "Lower on this mood screen", "Most areas sit lower. Still seek care if life feels heavy — one sitting is a snapshot." + crisisTail(false));
    }
    if (elevated && ranked.filter((s) => s.score >= 60).length >= 3) {
      return shape(
        "dep-broad",
        "Broader mood-screen elevation",
        "Several mood themes are elevated. This is not a depression diagnosis." + crisisTail(true)
      );
    }
    const base = leadShape("dep", scores, DEP, "dep-mixed", "Mixed mood-screen pattern", "Educational mood themes only.");
    base.blurb += crisisTail(elevated);
    return base;
  }

  const BPD = {
    "Emotion intensity": ["bpd-emotion", "Emotion-intensity forward", "Feelings spike fast. Validation first, then a next action — ride the wave before deciding."],
    "Relationship panic": ["bpd-rel", "Relationship-panic forward", "Fear of being left can steer the room. Name the fear before the protest behaviour."],
    "Identity shift": ["bpd-identity", "Identity-shift forward", "Self-picture can slide. Anchor with values that survive mood weather."],
    Impulsivity: ["bpd-impulse", "Impulsivity forward", "Urge outruns the plan. Delay rule: ten minutes before send, buy, or exit."],
    Emptiness: ["bpd-empty", "Emptiness forward", "Hollow stretches show up. Tiny sensory or social contact can interrupt the void."],
  };

  function classifyBpd(scores) {
    const ranked = numericScores(scores);
    const elevated = ranked.some((s) => s.score >= 60);
    if (elevated && ranked.filter((s) => s.score >= 60).length >= 3) {
      return shape("bpd-broad", "Broader intensity-screen elevation", "Several intensity themes elevate together. Not a personality-disorder diagnosis." + crisisTail(true));
    }
    const base = leadShape("bpd", scores, BPD, "bpd-mixed", "Mixed intensity-screen pattern", "Trait reflection only — never a pejorative label.");
    base.blurb += crisisTail(elevated);
    return base;
  }

  const BIPOLAR = {
    Elevation: ["bip-elevation", "Elevation / high-energy forward", "Speeding mind and elevated drive lead. Protect sleep as infrastructure."],
    "Low stretch": ["bip-low", "Low-stretch forward", "Heavy slow periods lead. Shrink obligations; keep one human check-in."],
    "Sleep shift": ["bip-sleep", "Sleep-shift forward", "Sleep change is a central signal. Treat bedtime as non-negotiable experiment data."],
    "Drive / risk": ["bip-drive", "Drive / risk forward", "Goal pursuit and risk climb together. Add a 24-hour rule for big commitments."],
    "Cycle pattern": ["bip-cycle", "Cycle-pattern forward", "Longer waves matter more than a single day. Track weeks, not hours."],
  };

  function classifyBipolar(scores) {
    const ranked = numericScores(scores);
    const elevated = ranked.some((s) => s.score >= 60);
    if (elevated && ranked.filter((s) => s.score >= 60).length >= 3) {
      return shape("bip-broad", "Broader energy-cycle elevation", "Several cycle themes elevate. Not a bipolar diagnosis — discuss with a clinician if impairment is present.");
    }
    return leadShape("bip", scores, BIPOLAR, "bip-mixed", "Mixed energy-cycle pattern", "Educational spectrum themes only — not prescriber advice.");
  }

  const NARC = {
    "Grand self-view": ["narc-grand", "Grand self-view forward", "Specialness themes lead. Check: after a slight, can you stay curious about the other person’s night?"],
    "Need for admiration": ["narc-admire", "Admiration-need forward", "Recognition hunger leads. Build one source of worth that is not applause."],
    Entitlement: ["narc-entitle", "Entitlement forward", "Fairness feels tilted toward you on this sitting. Practice one equal trade this week."],
    "Empathy dip": ["narc-empathy", "Empathy-dip forward", "Other minds go quiet under threat. Name their likely feeling before defending."],
    Vulnerability: ["narc-vuln", "Vulnerability under display", "A thinner self may sit under the display. Soft honesty with safe people is strength."],
  };

  function classifyNarcissism(scores) {
    return leadShape("narc", scores, NARC, "narc-mixed", "Mixed self-focus pattern", "Dimensional trait reflection — not a disorder label or an insult.");
  }

  const TRAUMA = {
    Hyperarousal: ["traum-hyper", "Hyperarousal forward", "Body on watch leads. Longer exhales and feet-on-floor are tools, not weakness."],
    Numbing: ["traum-numb", "Numbing forward", "Shutdown protects overload. Gentle sensory contact can reopen without flooding."],
    Intrusion: ["traum-intrusion", "Intrusion forward", "Fragments arrive uninvited. Grounding: five objects, present tense, then one safe person."],
    Avoidance: ["traum-avoid", "Avoidance forward", "Steering clear of reminders reduces pain short-term. Gradual supported approach beats forcing the story."],
    "Safety beliefs": ["traum-safety", "Safety-beliefs forward", "Trust and world-safety feel altered. Rebuild predictability in small circles first."],
  };

  function classifyTrauma(scores) {
    const ranked = numericScores(scores);
    const elevated = ranked.some((s) => s.score >= 60);
    if (elevated && ranked.filter((s) => s.score >= 60).length >= 3) {
      return shape(
        "traum-broad",
        "Broader trauma-pattern elevation",
        "Several aftereffect themes elevate. Not a PTSD diagnosis and not a demand to tell the story." + crisisTail(true)
      );
    }
    const base = leadShape("traum", scores, TRAUMA, "traum-mixed", "Mixed trauma-pattern screen", "Trauma-informed education only — encourage professional support when impaired.");
    base.blurb += crisisTail(elevated);
    return base;
  }

  function mixedFallback(testId) {
    return shape(
      "mixed-individual",
      "Mixed individual pattern",
      "Your answers on this " +
        (testId || "screen") +
        " do not map to one simple type. Lead with your highest score — educational snapshot, not a diagnosis."
    );
  }

  export function classifyProfile(testId, scores) {
    const id = (testId || "").toLowerCase();
    if (id === "personality" || id === "big5") return classifyBig5(scores);
    if (id === "sixteen") return classifySixteen(scores);
    if (id === "enneagram") return classifyEnneagram(scores);
    if (id === "love") return classifyLove(scores);
    if (id === "attachment") return classifyAttachment(scores);
    if (id === "strengths") return leadShape("str", scores, STRENGTHS, "str-mixed", "Mixed strengths pattern", "Design the week around the lead domain.");
    if (id === "career") return leadShape("career", scores, CAREER, "career-mixed", "Mixed career-environment pattern", "A two-letter flavour beats a single job title.");
    if (id === "archetype") return classifyArchetype(scores);
    if (id === "political") return classifyPolitical(scores);
    if (id === "disc") return leadShape("disc", scores, DISC, "disc-mixed", "Mixed DISC pattern", "Pace and priority under ordinary conditions — not a moral grade.");
    if (id === "eq") return leadShape("eq", scores, EQ, "eq-mixed", "Mixed EQ pattern", "EQ can be trained — quieter areas are practice fields.");
    if (id === "character") return leadShape("char", scores, CHARACTER, "char-mixed", "Mixed character-strengths pattern", "Signature strength deployed on purpose; a virtue at eleven becomes a vice.");
    if (id === "adhd") return classifyAdhd(scores);
    if (id === "autism") return classifyAutism(scores);
    if (id === "depression") return classifyDepression(scores);
    if (id === "bpd") return classifyBpd(scores);
    if (id === "bipolar") return classifyBipolar(scores);
    if (id === "narcissism") return classifyNarcissism(scores);
    if (id === "trauma") return classifyTrauma(scores);
    const top = numericScores(scores)[0];
    const fb = mixedFallback(id);
    if (top) {
      fb.blurb = "Strongest signal: " + top.key + " (" + top.score + "/100). " + fb.blurb;
    }
    return fb;
  }

  /** Catalog of statically named shapes (for smoke / docs). Dynamic blend ids may add more at runtime. */
  const SHAPE_CATALOG_BY_TEST = {
    personality: [
      ...Object.values(BIG5_COPY).map((c) => c[0]),
      "big5-balanced-mixed",
      "big5-conscientious-explorer",
      "big5-warm-connector",
      "big5-sensitive-dreamer",
      "big5-outgoing-explorer",
      "big5-attuned-helper",
      "big5-structured-leader",
      "big5-practical-steady",
      "big5-creative-introvert",
      "big5-steady-introvert",
      "big5-candid-direct",
      "big5-mixed",
    ],
    big5: null, // filled below — shares personality catalog
    sixteen: [
      "sixteen-analyst-leaning",
      "sixteen-diplomat-leaning",
      "sixteen-sentinel-leaning",
      "sixteen-explorer-care-leaning",
      "sixteen-outward-energy",
      "sixteen-inward-energy",
      "sixteen-structure-leaning",
      "sixteen-options-leaning",
      "sixteen-sensing-leaning",
      "sixteen-intuition-leaning",
      "sixteen-thinking-leaning",
      "sixteen-feeling-leaning",
      "sixteen-mixed",
    ],
    enneagram: [...Object.values(ENNEA).map((c) => c[0]), "ennea-mixed"],
    love: [...Object.values(LOVE).map((c) => c[0]), "love-mixed", "love-tied-blend"],
    attachment: [
      "attach-fearful-avoidant",
      "attach-anxious-avoidant-mix",
      "attach-secure",
      "attach-anxious",
      "attach-avoidant",
      "attach-disorganized-lead",
      "attach-mixed",
    ],
    strengths: [...Object.values(STRENGTHS).map((c) => c[0]), "str-mixed", "str-tied-blend"],
    career: [...Object.values(CAREER).map((c) => c[0]), "career-mixed", "career-tied-blend"],
    archetype: [...Object.values(ARCH).map((c) => c[0]), "arch-mixed", "arch-tied-blend"],
    political: [
      "pol-centrist-mixed",
      "pol-left-liberty",
      "pol-left-order",
      "pol-right-liberty",
      "pol-right-order",
      "pol-econ-left-lead",
      "pol-econ-right-lead",
      "pol-social-liberty-lead",
      "pol-social-order-lead",
    ],
    disc: [...Object.values(DISC).map((c) => c[0]), "disc-mixed", "disc-tied-blend"],
    eq: [...Object.values(EQ).map((c) => c[0]), "eq-mixed", "eq-tied-blend"],
    character: [...Object.values(CHARACTER).map((c) => c[0]), "char-mixed", "char-tied-blend"],
    adhd: [
      "adhd-broader-combined",
      "adhd-quieter-inattentive-executive",
      "adhd-restless-impulsive",
      "adhd-emotion-forward",
      "adhd-time-blind-executive",
      "adhd-focus-primary",
      "adhd-lower-overall",
      "adhd-mixed",
    ],
    autism: [...Object.values(AUTISM).map((c) => c[0]), "aut-broad-elevation", "aut-mixed", "aut-tied-blend"],
    depression: [...Object.values(DEP).map((c) => c[0]), "dep-lower", "dep-broad", "dep-mixed", "dep-tied-blend"],
    bpd: [...Object.values(BPD).map((c) => c[0]), "bpd-broad", "bpd-mixed", "bpd-tied-blend"],
    bipolar: [...Object.values(BIPOLAR).map((c) => c[0]), "bip-broad", "bip-mixed", "bip-tied-blend"],
    narcissism: [...Object.values(NARC).map((c) => c[0]), "narc-mixed", "narc-tied-blend"],
    trauma: [...Object.values(TRAUMA).map((c) => c[0]), "traum-broad", "traum-mixed", "traum-tied-blend"],
  };
  SHAPE_CATALOG_BY_TEST.big5 = SHAPE_CATALOG_BY_TEST.personality;

  function listAllShapes() {
    const seen = new Set();
    const out = [];
    Object.keys(SHAPE_CATALOG_BY_TEST).forEach((testId) => {
      (SHAPE_CATALOG_BY_TEST[testId] || []).forEach((shapeId) => {
        if (seen.has(shapeId)) return;
        seen.add(shapeId);
        out.push({ testId, shapeId });
      });
    });
    return out;
  }

  function shapeCountByTest() {
    const counts = {};
    Object.keys(SHAPE_CATALOG_BY_TEST).forEach((testId) => {
      counts[testId] = (SHAPE_CATALOG_BY_TEST[testId] || []).length;
    });
    return counts;
  }


export const PROFILE_ENGINE = {
    bandFor,
    classifyProfile,
    listAllShapes,
    shapeCountByTest,
    SHAPE_COUNT: listAllShapes().length,
    SHAPE_CATALOG_BY_TEST,
  };
