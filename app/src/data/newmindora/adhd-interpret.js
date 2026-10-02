/* Ported from newmindora */
/* Educational ADHD pattern interpretation — not a diagnosis. */

  const DOMAIN_VOICE = {
    inattention: {
      high: "It can be hard to stay focused, catch small details, or stick with boring work — even when you care.",
      low: "Focus and noticing details look steadier in your answers.",
      tip: "Try short work blocks, a simple checklist, and a quieter place when you can.",
      work: "Missed endings and drift may show up in meetings, email, or detail-heavy work — external cues help more than willpower alone.",
      rel: "Partners may read drift as disinterest; naming attention load early often lands better than apologizing after the fact.",
    },
    hyperactivity: {
      high: "You may feel restless or need to move a lot. Sitting still for long stretches can feel physically hard.",
      low: "Restlessness looks less central in your answers.",
      tip: "Walk while you think, stand at a desk, or take short movement breaks.",
      work: "Long seated blocks or slow meetings may cost more energy than the calendar suggests — movement before and after helps.",
      rel: "Others may experience your pace as intensity; agreeing on when you need to move can reduce friction at home.",
    },
    impulsivity: {
      high: "You may speak or act before you fully pause — then wish you had waited.",
      low: "Waiting before you act looks easier in your answers.",
      tip: "Count to ten before you send, buy, or reply when you feel rushed.",
      work: "Quick replies and sudden pivots can create rework; a short delay rule protects relationships and deadlines.",
      rel: "Interrupting or deciding too fast can sting even when intent was good — a visible pause signal helps people feel heard.",
    },
    executive: {
      high: "Starting tasks, planning steps, and finishing what you start can feel especially hard.",
      low: "Planning and finishing look relatively stronger here.",
      tip: "Write one next step only. Ask someone to check in with you once.",
      work: "Projects may stall at start-up or the last 10%; shrinking the first step and visible milestones often beat big plans.",
      rel: "Unfinished chores or admin can read as unfair split of labor — agree on who owns which visible next step.",
    },
    emotion: {
      high: "Feelings can rise fast and take longer to settle. Stress or criticism may hit hard.",
      low: "Settling after strong feelings looks steadier on this screen.",
      tip: "Name the feeling, step away if you need to, then decide — not at the peak.",
      work: "Feedback and setbacks may land harder than peers expect; recovery time is part of performance, not a flaw.",
      rel: "Sharp reactions can surprise people who only see your calm side — naming when you are flooded helps repair happen faster.",
    },
    time_motivation: {
      high: "Time can slip by. Motivation may come late, or only when something feels urgent or interesting.",
      low: "Time sense and steady follow-through look less strained here.",
      tip: "Put deadlines where you can see them. Pair dull tasks with something you like.",
      work: "Lateness, deadline surprises, and interest-only drive are pattern data — visible timers and body-doubles help boring essentials.",
      rel: "Last-minute scrambles affect shared plans; shared calendars with alerts beat promises made from good intentions alone.",
    },
  };

  function bandFor(score) {
    if (score >= 75) return "high";
    if (score >= 60) return "elevated";
    if (score >= 40) return "moderate";
    return "low";
  }

  function detectProfileShape(traits) {
    const map = Object.fromEntries(traits.map((t) => [t.domain, t.score]));
    const hi = (d) => map[d] >= 60;
    const lo = (d) => map[d] < 40;

    if (hi("inattention") && hi("hyperactivity") && hi("impulsivity")) {
      return {
        id: "combined-broad",
        title: "Combined elevation — focus + restlessness + impulse",
        blurb:
          "several ADHD-pattern domains are elevated together. Lead with your highest score below when you talk to a clinician.",
      };
    }
    if (hi("inattention") && hi("executive") && lo("hyperactivity")) {
      return {
        id: "quiet-inattentive",
        title: "Inattentive / planning type",
        blurb:
          "focus and getting organised are the problem — not looking restless. People with this type are often missed because they seem calm while starting and finishing feel hard.",
      };
    }
    if (hi("hyperactivity") && hi("impulsivity") && !hi("inattention")) {
      return {
        id: "restless-impulsive",
        title: "Restless / impulsive type",
        blurb:
          "energy and fast action lead. The hard part is interrupting, impatience, or deciding too soon — even when focus is fine for work you like.",
      };
    }
    if (hi("emotion") && (hi("impulsivity") || hi("executive"))) {
      return {
        id: "emotion-regulation",
        title: "Emotion-regulation type",
        blurb:
          "big feelings sit at the centre, often with impulse or planning strain. This can look like a mood issue when the deeper theme is settling under stress.",
      };
    }
    if (hi("time_motivation") && hi("executive")) {
      return {
        id: "time-blind-executive",
        title: "Time-blind / follow-through type",
        blurb:
          "deadlines, last-minute urgency, and I'll start later mix with planning friction. You may thrive in a crisis and stall in quiet weeks.",
      };
    }
    if (traits.every((t) => t.score < 45)) {
      return {
        id: "lower-overall",
        title: "Lower overall — no strong ADHD elevation",
        blurb:
          "most domains sit lower on this screen. If daily life still feels impaired, bring concrete examples to a clinician — screens miss context.",
      };
    }
    const top = [...traits].sort((a, b) => b.score - a.score)[0];
    return {
      id: "mixed-individual",
      title: "Lead type: " + top.name,
      blurb:
        "mixed profile with " +
        top.name +
        " leading at " +
        top.score +
        "/100. Name that lead first, then the next two scores, so anyone helping you sees the full stack.",
    };
  }

  function buildBrief(scores, name, overall) {
    const traits = scores
      .filter((s) => s.score != null && s.domain)
      .map((s) => ({ domain: s.domain, name: s.key, score: s.score }));
    if (!traits.length) {
      traits.push(
        ...scores
          .filter((s) => s.score != null)
          .map((s) => ({ domain: s.domain || "mixed", name: s.key, score: s.score }))
      );
    }

    const sorted = [...traits].sort((a, b) => b.score - a.score);
    const top3 = sorted.slice(0, 3);
    const strengths = sorted.filter((t) => t.score < 40).slice(-2);
    const shape = detectProfileShape(traits);

    const overallPct =
      overall != null
        ? overall
        : traits.length
          ? Math.round(traits.reduce((a, t) => a + t.score, 0) / traits.length)
          : 0;

    const elevatedTips = sorted
      .filter((t) => t.score >= 60)
      .slice(0, 3)
      .map((t) => {
        const v = DOMAIN_VOICE[t.domain];
        return v ? t.name + " (" + t.score + "%): " + v.tip : null;
      })
      .filter(Boolean);

    const domainLines = top3.map((t) => {
      const band = bandFor(t.score);
      const v = DOMAIN_VOICE[t.domain];
      const line = band === "low" || band === "moderate" ? v.low : v.high;
      return t.name + " — " + t.score + "%. " + line;
    });

    const workRel = top3
      .map((t) => {
        const v = DOMAIN_VOICE[t.domain];
        if (!v || t.score < 45) return null;
        return "• " + t.name + ": " + v.work + " " + v.rel;
      })
      .filter(Boolean)
      .slice(0, 2);

    const headline =
      "" +
      shape.title +
      " — lead " +
      top3[0].name +
      " (" +
      top3[0].score +
      "/100)";

    const bodyParts = [
      "This educational screen maps Barkley-informed attention and self-regulation themes: focus, restlessness, impulse control, executive follow-through, emotional regulation, and time/motivation.",
      "Overall on this sitting: about " + overallPct + "% averaged across your answers. " + shape.blurb,
      "Your top domains: " + domainLines.join(" "),
      strengths.length
        ? "Steadier areas on this screen: " + strengths.map((t) => t.name + " (" + t.score + "%)").join(" and ") + ". Protect what already works."
        : "No area is clearly low here — support may need to cover more than one thing, still starting with your highest scores.",
      elevatedTips.length ? "Practical starting points: " + elevatedTips.join(" ") : "",
      workRel.length ? "Work & relationships (pattern-based, not a label): " + workRel.join(" ") : "",
    ].filter(Boolean);

    const watch =
      "If several domains sit at 60% or above and daily work, relationships, or self-care feel impaired, a licensed clinician can interpret this profile with your history — this site cannot confirm ADHD or any other condition.";

    const clinician =
      "For a licensed professional (handoff only): Highest areas — " +
      top3.map((t) => t.name + " " + t.score + "%").join("; ") +
      ". Shape tag: " +
      shape.id +
      ". Self-report educational screen only; interpret with full clinical context.";

    const longform = bodyParts.join("\n\n") + "\n\n" + watch + "\n\n" + clinician;

    return { headline, body: bodyParts.join(" "), watch, longform, shape, top3, overall: overallPct };
  }

export const ADHD_INTERPRET = { bandFor, detectProfileShape, buildBrief, DOMAIN_VOICE };
