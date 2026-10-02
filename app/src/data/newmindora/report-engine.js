import { BOOK_SOURCES, REFERENCE_SCREEN_NOTES, TEST_NOTES, referenceNote, BRIEFS } from './reports.js';
import { classifyProfile } from './profile-engine.js';
import { TEST_META } from './tests-core.js';

/* MindoraInsight - Extended Report Engine */

  function wc(s){ return String(s||"").trim().split(/\s+/).filter(Boolean).length; }
  function first(n){ return String(n||"You").split(" ")[0]; }
  function escapeHtml(s){ return String(s||"").replace(/[&<>"]/g, c=>({"&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;"}[c])); }

  const BANK = [
    "I want you to read these numbers the way I would in a calm consulting room: as a weather report for this sitting, not a verdict carved into stone. A high score is a muscle you already use. A lower score is a muscle you under-use when you are tired — not a moral failure, and not who you are forever.",
    "People around you often meet the public version of your high score first. The quieter score tends to show up at home, late in the week, or when a plan slips. That is why a partner or colleague may describe you differently from how you describe yourself — and both can be true.",
    "The useful question between us is not whether this is you forever. It is where this pattern helped you this month, and where it cost someone else time, warmth or clarity. I would ask you to write one honest sentence for each and keep both.",
    "Change, clinically speaking, happens in small repetitions: one conversation held thirty seconds longer, one task finished before a new one starts, one evening without scanning for threat. Insight only matters if it becomes a next action you can repeat.",
    "If two scores sit within a few points, I would treat them as a pair rather than forcing a winner. Mixed profiles are common. The work is naming the conditions that tip you from one into the other.",
    "Sleep, deadline pressure and who is in the room all move scores a little. If this week was unusual, retake after a calmer fortnight. Treat a single sitting as a snapshot we can revisit together in spirit — not a fixed label.",
    "This reading is educational. It does not diagnose a condition and it is not a legal, medical or hiring record. If life feels impaired, take what you noticed here to a licensed professional who can sit with you in person.",
    "Keep this report private unless you choose to share it. If you share it, share the score stack with your story so the file cannot be used as a compliment or an insult on its own.",
    "A careful clinical reading always names a lead, a backup and a neglected channel. Your week is usually run by the first, repaired by the second, and dropped in the third when energy is low.",
    "Please do not build an identity out of a number. Build a fortnight out of one behaviour that would still make sense if the score moved ten points.",
    "If I were your clinician today, I would not rush to label you. I would ask what the lead score protects, what it costs, and what one kinder behaviour would look like by Thursday.",
    "Power in self-understanding is precision without cruelty: name the pattern, keep your dignity, and choose one experiment small enough for a tired nervous system to keep."
  ];

  const CLOSING_BANK = [
    "Before we close, I want you to hear this plainly: you showed up and answered carefully. That alone is a form of self-respect. Whatever the numbers say, you are not reduced to them.",
    "If something in this dossier stung, that sting is data — not proof that you are broken. Sit with it for a day. Then decide whether a trusted person or a licensed clinician should help you carry it.",
    "I would leave you with one clinical habit: name the pattern out loud once this week without shame, and name one kindness you will offer yourself when it shows up again.",
    "You do not need to become a different person by Monday. You need one smaller, kinder experiment that your nervous system can actually keep.",
    "A good doctor would rather hear your story than only your scores. Take this file as a conversation starter — with yourself first, and with a licensed professional when life feels impaired.",
    "You can put this report down now. Come back when you are calm. The work is not to worship the PDF — it is to live one degree more deliberately with the pattern you already have."
  ];

  function padSection(title, seed, min, bank){
    const lines = bank || BANK;
    let out = String(seed||"").trim();
    let i = 0;
    while(wc(out) < min && i < 40){
      out += "\n\n" + lines[i % lines.length];
      i++;
    }
    return { title, body: out, words: wc(out) };
  }

  function ensureTotal(sections, minTotal){
    let total = sections.reduce((a,s)=>a+s.words,0);
    let i = 0;
    while(total < minTotal && i < 60){
      const idx = i % sections.length;
      const useClose = /well-being|what you achieved|closing/i.test(sections[idx].title);
      const line = useClose ? CLOSING_BANK[i % CLOSING_BANK.length] : BANK[i % BANK.length];
      sections[idx].body += "\n\n" + line;
      sections[idx].words = wc(sections[idx].body);
      total = sections.reduce((a,s)=>a+s.words,0);
      i++;
    }
    return total;
  }

  function nextActionFromTop(top, you){
    const key = (top && top.key) || "your lead domain";
    const score = (top && top.score != null) ? top.score : "—";
    const name = you || "You";
    return (
      name + ", here is the one practice I would give you in clinic from your lead score («" + key + "» at " + score + "/100): " +
      "for the next seven days, treat that as your primary working channel. " +
      "Each morning, name one concrete behaviour that expresses it well; each evening, note — without self-attack — where it helped and where it overplayed. " +
      "Keep the experiment small enough to repeat: one conversation, one finished task, or one recovery block. Practice beats labels."
    );
  }

  function clinicalClosing(you, top, crisisTest, briefWatch){
    const name = you || "You";
    const key = (top && top.key) || "your lead pattern";
    if (crisisTest) {
      return (
        name + ", I want to speak to you directly before this report ends — the way I would if we were in the same room.\n\n" +
        "If hopelessness, self-harm thoughts, or a sense that you cannot keep yourself safe is present right now, please do not stay alone with this file. " +
        "Contact emergency services, call 988 (US/Canada), or Samaritans 116 123 (UK). A dossier cannot keep you safe — people and crisis lines can.\n\n" +
        (briefWatch ? "Clinical watch I would write on the chart: " + briefWatch + "\n\n" : "") +
        "Even when distress is quieter, you deserve support that is human and licensed — not only a PDF. " +
        "Bring these scores to someone who can look at sleep, context, relationships and risk with you. " +
        "You are allowed to ask for help without waiting until everything collapses.\n\n" +
        "If you are stable enough to experiment, choose one gentle behaviour for the next seven days around «" + key + "» — not a personality overhaul, just a kinder next step. " +
        "That is how powerful change actually starts in clinic: small, repeatable, and kind."
      );
    }
    return (
      name + ", let me close the way a careful doctor would close a thoughtful consultation.\n\n" +
      "You have spent time looking at yourself honestly. That takes courage. " +
      "What we have here is a powerful educational reading of your answers — a map of tendencies in this sitting — not a diagnosis, not a sentence, and not permission for anyone to define you.\n\n" +
      "If life feels impaired — work slipping, relationships fraying, sleep broken, mood stuck — please take this dossier to a licensed clinician or trusted professional. " +
      "Say: “These are my self-report patterns; can we look at them together?” That sentence alone often opens the right door.\n\n" +
      "If you are coping, I still want you to leave with one concrete kindness: for the next seven days, notice when «" + key + "» is running the room, and choose one smaller behaviour that protects your energy or your relationships. " +
      "We are not trying to reinvent you. We are trying to help you live a little more deliberately — and more powerfully — with the pattern you already have.\n\n" +
      "You can put this report down now. Come back to it when you are calm. And remember: a good clinician would rather hear your story than only your scores."
    );
  }

  function sessionClose(you, test, shape, stack, top, clinicianSeed, crisisTest){
    const name = you || "You";
    return (
      name + ", before we finish — thank you for completing this sitting.\n\n" +
      "In a therapy or clinic room I would say: you did real work today. You answered one hundred items on " + test +
      " and stayed with the discomfort of looking at yourself. That is not trivial.\n\n" +
      "Here is what I want you to carry out of the room:\n\n" +
      "1. You generated a complete educational profile" +
      (shape ? " shaped as «" + shape.title + "»" : "") +
      " — a snapshot of how you answered today, not a permanent identity and never a medical diagnosis.\n\n" +
      "2. Your scored stack for this sitting is: " + stack + ". Lead with «" + ((top && top.key) || "your lead") + "» without shame; notice the quieter channels without contempt.\n\n" +
      "3. " + nextActionFromTop(top, name) + "\n\n" +
      clinicianSeed +
      (crisisTest
        ? "If anything in this reading touches despair or self-harm, please reach for emergency support, 988, or Samaritans 116 123 before you try to “fix yourself” alone.\n\n"
        : "") +
      "Keep this file private unless sharing it helps you get care. Revisit it after a fortnight of your next-action experiment. " +
      "Retake only if sleep, stress, or context changed sharply.\n\n" +
      name + ", you are more than this report. Use it as a conversation starter with yourself — and, when needed, with a licensed professional who can sit across from you."
    );
  }

  export const compileExtended = function(state){
    const brief = state.brief || {};
    const scores = state.scores || [];
    const p = state.profile || {};
    const you = first(p.name);
    const test = (state.test && state.test.title) || "this test";
    const testId = (state.test && state.test.id) || "";
    const numeric = scores.filter(s=>s.score!=null).sort((a,b)=>b.score-a.score);
    const top = numeric[0] || {key:"this pattern", score:50};
    const second = numeric[1] || {key:"a second pattern", score:40};
    const low = numeric[numeric.length-1] || {key:"a quieter pattern", score:30};
    const stack = numeric.map(s=>s.key+" "+s.score+"/100").join("; ") || "scores recorded";
    const note = state.note || brief.longform || brief.body || "";
    const shape = state.profileShape || null;

    const books = BOOK_SOURCES || {};
    const book = books[testId] || {
      bookTitle: test + " Foundations",
      authors: "Psychometric Research",
      theory: "Personality & Cognitive Styles",
      vibe: "Understanding Your Unique Strengths",
      emoji: "📚"
    };

    const bodyParts = (brief.body || "").split(/\n\n/).filter(Boolean);
    const longParts = (brief.longform || brief.body || "").split(/\n\n/).filter(Boolean);
    const slice = (arr, i, fallback) => arr[i] || arr[Math.min(i, Math.max(arr.length - 1, 0))] || fallback;
    const crisisTest = !!(state.test && state.test.crisis);

    const shapeBlock = shape
      ? "Profile shape for this sitting: «" + shape.title + "». " + (shape.blurb || "") + "\n\n"
      : "";

    const ref = typeof referenceNote === "function" ? referenceNote(testId) : null;
    const isClinical = !!(state.test && state.test.clinical) || !!(ref && ref.clinical);
    const refFrame = ref
      ? ((ref.label || "Educational themes") + ": " + ref.text + "\n\n")
      : "";

    const citationBlock =
      "PRIMARY REFERENCE CITATION\n" +
      "Title: " + book.bookTitle + "\n" +
      "Authors: " + book.authors + "\n" +
      "Theoretical frame: " + book.theory + "\n" +
      "Reading focus (" + (book.emoji || "") + " BOOK_SOURCES vibe): " + book.vibe + "\n\n" +
      "This section attributes concepts educationally. It does not paste copyrighted scale items, cut-off tables, or handbook chapters.";

    const achieveVerb = isClinical
      ? ("You completed the 100-item " + test + " pattern screen")
      : ("You completed the 100-item " + test + " profile");

    const execSeed =
      you + ", I want to walk you through your " + test + " results the way a careful clinician would — calmly, specifically, and without turning you into a label. " + (brief.headline || "") + "\n\n" +
      achieveVerb + " — an educational sitting, not a diagnosis.\n\n" +
      shapeBlock +
      refFrame +
      slice(bodyParts, 0, brief.body || "");

    const clinicianSeed = isClinical
      ? ("If you were bringing this to clinic, I would hand a colleague this note (educational screen only):\n\n" +
         "Top domains: " + numeric.slice(0,3).map(s=>s.key+" "+s.score+"/100").join("; ") + ".\n" +
         (shape ? "Shape tag: «" + shape.title + "».\n" : "") +
         "Self-report educational screen only — interpret with full clinical context. Not a diagnosis.\n\n")
      : "";

    const wellbeingSeed = clinicalClosing(you, top, crisisTest, brief.watch || "");
    const achieveSeed = sessionClose(you, test, shape, stack, top, clinicianSeed, crisisTest);

    const specs = [
      ["Executive summary: your snapshot today", execSeed],
      ["Trait spectrum: lead, support, and quiet channels",
        "Score stack for this sitting: " + stack + ". " + top.key + " leads at " + top.score + "/100. " + second.key + " supports at " + second.score + "/100. " + low.key + " is quieter at " + low.score + "/100.\n\n" +
        (shape ? "Shape «" + shape.title + "» is the short label for how these scores sit together — not a permanent identity.\n\n" : "") +
        slice(bodyParts, 1, "Treat mixed profiles as normal: name the conditions that tip you from one channel into another.")],
      ["Work, deadlines, and cognitive load",
        slice(bodyParts, 2, "Design the week around what already works instead of apologising for what does not.") + "\n\n" +
        slice(longParts, 2, "Ask one colleague which trait they would have guessed. If it differs from your lead score, notice where you perform rather than live.")],
      ["Relationships, communication, and repair",
        slice(bodyParts, 3, "Tell one person what the high score needs this week — space, words, pace, praise, or plan — and ask what they need in return.") + "\n\n" +
        "Friction often sits on pace and decision style, not on caring less."],
      ["Emotional load, recovery, and watch-outs",
        (brief.watch || "This is a reading of your answers, not a diagnosis and not a permanent label.") + "\n\n" +
        slice(longParts, 4, "Recovery after intensity is data, not weakness. Schedule it before the week chooses for you.")],
      ["14-day behaviour plan",
        "Days 1–3: Each morning, one sentence on how " + top.key + " will shape today’s priority. Days 4–7: One work conversation and one relationship check-in in plain language. Days 8–11: Evening review — where the lead trait helped and where it overplayed. Days 12–14: Keep one habit small enough to repeat next month.\n\n" +
        slice(longParts, 5, "No journal essay required — one line morning and evening is enough.")],
      ["Research frame: " + book.bookTitle,
        citationBlock + "\n\n" +
        refFrame +
        note + "\n\n" +
        slice(longParts, 6, "Scores move with sleep, stress, and context. Retake after a calmer fortnight if this week was unusual.")],
      ["Using these scores responsibly",
        "This library is educational. It does not diagnose ADHD, autism, depression, bipolar patterns, trauma, personality disorders, or any other condition. Scores are not a hiring record, court document, or medical file. If life is impaired, take the pattern to a licensed professional.\n\n" +
        slice(longParts, 7, "Mark one sentence that feels accurate and one that feels unfair — the unfair sentence is often the useful one.")],
      ["A word from the consulting room: well-being & next steps", wellbeingSeed],
      ["Closing the session: what I want you to take with you", achieveSeed]
    ];

    // ~100 words per section → ≥1000; closing sections use clinical voice bank
    const sections = specs.map(([title, seed], idx) => {
      const closing = idx >= specs.length - 2;
      return padSection(title, seed, 100, closing ? CLOSING_BANK : BANK);
    });
    const total = ensureTotal(sections, 1000);
    return { you, test, book, shape, sections, total, top, ref, isClinical };
  };

  export const extendedHtml = function(compiled, state){
    /* Extended Mindora Dossier — same design language as openDesignedReport (ADHD Mindora Dossier), full paid version */
    state = state || {};
    const p = state.profile || { name: state.name || "You" };
    const date = new Date().toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
    const serial = "MI-EXT-" + (function(){
      const fp = (state.brief && state.brief.fingerprint) ||
        (scores.map(function(s){ return s.key + ":" + s.score; }).join("|"));
      let h = 2166136261;
      const src = String(testId) + "|" + String(fp) + "|" + String(p.name || "You");
      for (let i = 0; i < src.length; i++) { h ^= src.charCodeAt(i); h = Math.imul(h, 16777619); }
      return String((h >>> 0) % 1000000).padStart(6, "0");
    })();
    const testTitle = (state.test && state.test.title) || "Assessment";
    const testId = (state.test && state.test.id) || "";
    /* THIS topic's BOOK_SOURCES only — never ASRS / PHQ-9 or other instruments */
    const books = BOOK_SOURCES || {};
    const book = (compiled.book && compiled.book.bookTitle)
      ? compiled.book
      : (books[testId] || {
          bookTitle: testTitle + " Foundations",
          authors: "Psychometric Research",
          theory: "Personality Theory",
          vibe: "Personal Insights",
          emoji: "📚"
        });
    const shape = compiled.shape || state.profileShape || null;
    const top = compiled.top || { key: "lead domain", score: "—" };
    const ref = compiled.ref || (typeof referenceNote === "function" ? referenceNote(testId) : null);
    const isClinical = !!(compiled.isClinical || (state.test && state.test.clinical) || (ref && ref.clinical));
    const scores = (state.scores || []).filter(s=>s.score!=null).sort((a,b)=>b.score-a.score);
    const top3 = scores.slice(0,3);
    const frameworkNote = (ref && ref.text) || book.screenNote || "";
    const crisisTest = !!(state.test && state.test.crisis);

    const logoMark = `<svg width="22" height="22" viewBox="0 0 64 64" aria-hidden="true"><circle cx="32" cy="32" r="28" fill="none" stroke="#032514" stroke-width="5"/><circle cx="32" cy="32" r="18" fill="none" stroke="#c4a574" stroke-width="2.5"/><circle cx="32" cy="32" r="8" fill="#6b7fd7"/></svg>`;

    const moduleThemes = [
      { bg: "#f4faf6", border: "#cfe8d8", accent: "#0f4a36", tag: "EXECUTIVE SUMMARY" },
      { bg: "#f0fdf8", border: "#c7f3e4", accent: "#31b070", tag: "TRAIT SPECTRUM" },
      { bg: "#f0f7ff", border: "#cce5ff", accent: "#4880d9", tag: "WORK & LOAD" },
      { bg: "#f0fdf4", border: "#bbf7d0", accent: "#16a34a", tag: "RELATIONSHIPS" },
      { bg: "#fffdf2", border: "#ffeaa7", accent: "#c47a3a", tag: "RECOVERY" },
      { bg: "#f3faf6", border: "#d5ebe0", accent: "#0d3b2e", tag: "14-DAY PLAN" },
      { bg: "#f7fbf8", border: "#c7f3e4", accent: "#0f4a36", tag: "RESEARCH FRAME" },
      { bg: "#f7fbf8", border: "#dce8e2", accent: "#2d6a4f", tag: "RESPONSIBLE USE" },
      { bg: "#fff7ed", border: "#fed7aa", accent: "#c2410c", tag: "CONSULTING ROOM" },
      { bg: "linear-gradient(135deg,#032514,#0f4a36)", border: "#0f4a36", accent: "#9ae6b4", tag: "SESSION CLOSE", dark: true }
    ];

    const achieveLine = isClinical
      ? "You completed the 100-item " + escapeHtml(testTitle) + " pattern screen"
      : "You completed the 100-item " + escapeHtml(testTitle) + " profile";

    const shapeCard = shape
      ? `<div style="background:#f0fdf4;border:1.5px solid #bbf7d0;border-radius:12px;padding:12px 16px;margin-bottom:16px">
          <div style="font-size:9px;font-weight:800;letter-spacing:0.1em;text-transform:uppercase;color:#0f4a36;margin-bottom:4px">Profile shape</div>
          <div style="font-size:15px;font-weight:800;color:#06261c">◆ ${escapeHtml(shape.title)}</div>
          <p style="margin:6px 0 0;font-size:12.5px;line-height:1.55;color:#2d3436">${escapeHtml(shape.blurb || "")}</p>
        </div>`
      : "";

    const refNoteCard = frameworkNote
      ? `<div style="background:#f7fbf8;border:1px solid #d5ebe0;border-radius:10px;padding:10px 14px;margin-bottom:16px;font-size:11.5px;line-height:1.55;color:#3d4f48">
          <strong style="color:#0f4a36">${escapeHtml((ref && ref.label) || "Framework note")}:</strong> ${escapeHtml(frameworkNote)}
          ${isClinical ? " Educational screen only — not a diagnosis." : ""}
        </div>`
      : "";

    const clinicianCard = isClinical
      ? `<div style="background:#f0f7ff;border:1.5px solid #cce5ff;border-radius:10px;padding:12px 14px;margin-bottom:16px;font-size:12px;line-height:1.55;color:#334155">
          <div style="font-size:9px;font-weight:800;letter-spacing:0.08em;text-transform:uppercase;color:#4880d9;margin-bottom:6px">Clinician handoff</div>
          <strong style="color:#0f4a36">Top domains:</strong> ${escapeHtml(top3.map(s=>s.key+" "+s.score+"/100").join("; ") || "see sections")}.
          ${shape ? " Shape · " + escapeHtml(shape.title) + "." : ""}
          Educational screen only — interpret with full clinical context. Not a diagnosis.
        </div>`
      : "";

    const researchCiteCard = `
      <div style="background:linear-gradient(135deg,#f0fdf4,#eef6f8);border:1.5px solid #c7f3e4;border-radius:12px;padding:12px 14px;margin:0 0 12px">
        <div style="font-size:9px;font-weight:800;letter-spacing:0.08em;text-transform:uppercase;color:#0f4a36;margin-bottom:4px">Research citation · this topic only</div>
        <div style="font-size:14px;font-weight:800;color:#032514">${escapeHtml(book.bookTitle)}</div>
        <div style="font-size:12px;color:#4880d9;font-weight:600">${escapeHtml(book.authors)}</div>
        <div style="font-size:11.5px;color:#3d4f48;margin-top:4px;line-height:1.5">${escapeHtml(book.theory)}</div>
        <div style="margin-top:6px;font-size:11px;color:#0f4a36;font-weight:700">${book.emoji || ""} ${escapeHtml(book.vibe)}</div>
      </div>`;

    const blocks = compiled.sections.map((s, idx) => {
      const theme = moduleThemes[idx % moduleThemes.length];
      const isResearch = /^Research frame/i.test(s.title);
      const isAchieve = /closing the session|what you achieved|take with you/i.test(s.title);
      const paras = s.body.split(/\n\n/).map(para => {
        const t = String(para || "").trim();
        if(isResearch && /^PRIMARY REFERENCE CITATION/i.test(t)) return "";
        if(isAchieve && /^(What you achieved today|Closing the session)/i.test(t)) return "";
        const color = theme.dark ? "#e8f5ee" : "#2c3a42";
        return `<p style="margin:0 0 10px;color:${color}">${escapeHtml(para)}</p>`;
      }).filter(Boolean).join("");

      if(isAchieve){
        return `
        <section class="sec-card achieve-card" style="background:linear-gradient(135deg,#032514,#0f4a36);border:1.5px solid #0f4a36;border-radius:12px;padding:16px 18px;margin-bottom:16px;color:#fff">
          <div style="font-size:9px;letter-spacing:0.1em;text-transform:uppercase;color:#9ae6b4;font-weight:800;margin-bottom:6px">Closing the session · spoken to you</div>
          <h2 style="color:#fff;font-size:17px;font-weight:800;margin:0 0 10px">${escapeHtml(s.title)}</h2>
          <div style="font-size:12.5px;line-height:1.62;color:#e8f5ee">${paras}</div>
          <div style="margin-top:10px;font-size:10px;color:#9ae6b4;font-weight:700">${s.words} words in this closing · ${compiled.total}+ total</div>
        </section>`;
      }

      return `
        <section class="sec-card" style="background:${theme.bg};border:1.5px solid ${theme.border};border-radius:12px;padding:16px 18px;margin-bottom:14px">
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;gap:8px;flex-wrap:wrap">
            <span style="background:${theme.accent};color:#fff;padding:3px 10px;border-radius:999px;font-size:9.5px;font-weight:800;letter-spacing:0.06em">◆ ${theme.tag}</span>
            <span style="color:#8a969c;font-size:10px;font-weight:600">${s.words} WORDS</span>
          </div>
          <h2 style="color:#1f2a33;font-size:15px;font-weight:800;margin:0 0 10px;border-bottom:1.5px solid ${theme.border};padding-bottom:6px;letter-spacing:0.01em">
            ${escapeHtml(s.title)}
          </h2>
          ${isResearch ? researchCiteCard : ""}
          <div style="color:#2c3a42;font-size:12.5px;line-height:1.65">${paras}</div>
        </section>`;
    }).join("");

    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>${escapeHtml(testTitle)} — Mindora Dossier Extended · ${escapeHtml(p.name || "Participant")}</title>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Public+Sans:wght@400;600;700;800&display=swap" rel="stylesheet">
  <style>
    @page { size: A4 portrait; margin: 12mm 14mm; }
    * { box-sizing: border-box; }
    html { -webkit-text-size-adjust: 100%; }
    html, body { overflow-x: hidden; max-width: 100%; }
    body {
      margin: 0;
      background: #eef2f0;
      color: #1f2a33;
      font-family: 'Public Sans', Calibri, Arial, sans-serif;
      font-size: 14px;
      line-height: 1.6;
      -webkit-font-smoothing: antialiased;
      word-wrap: break-word;
      overflow-wrap: anywhere;
    }
    img, svg { max-width: 100%; height: auto; }
    .top-actions {
      position: sticky; top: 0; z-index: 100;
      background: #ffffff;
      border-bottom: 1.5px solid #e6ece8;
      padding: max(10px, env(safe-area-inset-top, 0px)) 12px 12px;
      display: flex; justify-content: space-between; align-items: center; gap: 12px; flex-wrap: wrap;
      box-shadow: 0 4px 12px rgba(0,0,0,0.06);
    }
    .dossier-bar-copy { flex: 1; min-width: 0; }
    .dossier-bar-title { color: #06261c; font-size: 15px; display: block; }
    .dossier-bar-sub { color: #5b6b73; font-size: 12px; margin-left: 8px; }
    .btn-print {
      background: #0f4a36; color: #ffffff; border: none; border-radius: 8px;
      padding: 10px 18px; font-weight: 700; font-size: 13px; cursor: pointer;
      font-family: inherit; -webkit-appearance: none; appearance: none; flex-shrink: 0;
    }
    .btn-print:hover { background: #31b070; }
    .btn-print:active { background: #0a3d2c; }
    .page-container {
      width: 100%; max-width: min(794px, 100%); margin: 12px auto 40px; background: #ffffff;
      border: 1.5px solid #e6ece8; border-radius: 14px;
      box-shadow: 0 8px 30px rgba(0,0,0,0.08); overflow: hidden;
    }
    .sheet-top {
      display: flex; justify-content: space-between; align-items: center;
      padding: 14px 34px; border-bottom: 1.5px solid #e6ece8; background: #fff; gap: 12px; flex-wrap: wrap;
    }
    .brand-lockup { display: flex; align-items: center; gap: 10px; }
    .brand-name { font-size: 17px; font-weight: 800; color: #1f2a33; letter-spacing: -0.02em; }
    .brand-insight { color: #6b5ce7; font-family: Georgia, 'Times New Roman', serif; font-weight: 600; }
    .vibe-line { text-align: right; }
    .vibe-text { font-size: 9.5px; letter-spacing: 0.1em; text-transform: uppercase; color: #6b5ce7; font-weight: 800; }
    .ref-line { font-size: 9px; color: #8a969c; margin-top: 2px; }
    .hero {
      background: linear-gradient(135deg, #032514 0%, #0a2f22 50%, #123a45 100%);
      color: #fff; padding: 22px 34px 24px;
    }
    .hero-kicker {
      font-size: 10px; letter-spacing: 0.14em; text-transform: uppercase;
      color: #9ae6b4; font-weight: 800; margin-bottom: 6px;
    }
    .hero h1 { font-size: 22px; line-height: 1.25; margin: 0 0 6px; color: #fff; font-weight: 800; }
    .hero p { margin: 0; font-size: 12px; color: #d5e4dc; line-height: 1.5; }
    .dossier-body { padding: 16px 34px 28px; }
    .eval-card {
      display: flex; align-items: center; gap: 12px;
      background: #f7fbf8; border: 1.5px solid #c7f3e4; border-radius: 12px;
      padding: 10px 14px; margin-bottom: 14px;
    }
    .eval-emoji {
      font-size: 22px; width: 40px; height: 40px; border-radius: 10px; background: #fff;
      display: flex; align-items: center; justify-content: center; border: 1px solid #d5ebe0; flex-shrink: 0;
    }
    .primary-ref {
      background: linear-gradient(135deg, #f0fdf4, #eef6f8);
      border: 1.5px solid #c7f3e4; border-radius: 12px; padding: 12px 14px; margin-bottom: 14px;
    }
    .sheet-foot {
      display: flex; justify-content: space-between; align-items: center;
      padding: 12px 34px; background: #f9fbf9; border-top: 1px solid #e6ece8;
      font-size: 9px; color: #8a969c; flex-wrap: wrap; gap: 8px;
    }
    @media (max-width: 720px) {
      .page-container { margin: 0 auto 24px; border-radius: 0; border-left: none; border-right: none; }
      .sheet-top, .hero, .dossier-body, .sheet-foot { padding-left: 16px; padding-right: 16px; }
      .hero h1 { font-size: 18px; }
      .vibe-line { text-align: left; width: 100%; }
      .sheet-top { flex-direction: column; align-items: flex-start; }
      .sec-card h2 { font-size: 14px; }
      .sec-card { font-size: 13px; }
    }
    @media (max-width: 480px) {
      .top-actions { flex-direction: column; align-items: stretch; }
      .dossier-bar-sub { display: block; margin: 4px 0 0 !important; font-size: 11px; line-height: 1.35; }
      .dossier-bar-title { font-size: 14px; }
      .btn-print { width: 100%; min-height: 44px; font-size: 14px; }
    }
    @media print {
      body { background: #ffffff; }
      .top-actions { display: none !important; }
      .page-container { border: none !important; box-shadow: none !important; margin: 0 !important; max-width: 100% !important; border-radius: 0 !important; }
      .sec-card { page-break-inside: avoid; }
      .hero, .achieve-card, .sec-card, .eval-card, .primary-ref {
        -webkit-print-color-adjust: exact; print-color-adjust: exact;
      }
      * { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
    }
  </style>
</head>
<body>
  <div class="top-actions">
    <div class="dossier-bar-copy">
      <strong class="dossier-bar-title">Mindora Dossier · Extended report</strong>
      <span class="dossier-bar-sub">${escapeHtml(testTitle)} · ${compiled.total}+ words · Print / Save as PDF</span>
    </div>
    <button class="btn-print" type="button" onclick="window.print()">Print / Save as PDF</button>
  </div>

  <div class="page-container">
    <div class="sheet-top">
      <div class="brand-lockup">
        ${logoMark}
        <div class="brand-name">Mindora <span class="brand-insight">Insight</span></div>
      </div>
      <div class="vibe-line">
        <div class="vibe-text">${book.emoji} ${escapeHtml(book.vibe)}</div>
        <div class="ref-line">REF: ${serial} · ${date}</div>
      </div>
    </div>

    <header class="hero">
      <div class="hero-kicker">${book.emoji} ${escapeHtml(testTitle).toUpperCase()} · EXTENDED PERSONAL DOSSIER</div>
      <h1>${escapeHtml(testTitle)} — Full Extended Report</h1>
      <p>For ${escapeHtml(p.name || "Explorer")}${p.email ? " (" + escapeHtml(p.email) + ")" : ""} · Completed ${date} · ${achieveLine}.${isClinical ? " Educational pattern screen — not a diagnosis." : ""}</p>
    </header>

    <div class="dossier-body">
      <div class="eval-card">
        <div class="eval-emoji">${book.emoji}</div>
        <div>
          <div style="font-size:9px;font-weight:800;letter-spacing:0.1em;text-transform:uppercase;color:#31b070">Psychometric evaluation profile · extended</div>
          <div style="font-size:13px;font-weight:800;color:#06261c">${escapeHtml(testTitle)} Standardized Assessment</div>
          <div style="font-size:11px;color:#5b6b73">${escapeHtml(book.theory)}</div>
        </div>
      </div>

      <div class="primary-ref">
        <div style="font-size:9px;font-weight:800;letter-spacing:0.08em;text-transform:uppercase;color:#0f4a36;margin-bottom:4px">Primary reference · this topic only (BOOK_SOURCES)</div>
        <div style="font-size:14px;font-weight:800;color:#032514">${escapeHtml(book.bookTitle)}</div>
        <div style="font-size:12px;color:#4880d9;font-weight:600">${escapeHtml(book.authors)}</div>
        <div style="font-size:11.5px;color:#3d4f48;margin-top:4px;line-height:1.5">${escapeHtml(book.theory)}</div>
        ${frameworkNote ? `<div style="margin-top:8px;font-size:11px;color:#3d4f48;line-height:1.5"><strong style="color:#0f4a36">Primary reference:</strong> ${escapeHtml(book.bookTitle)} — ${escapeHtml(book.authors)}. ${escapeHtml(frameworkNote)}${isClinical ? " Educational screen only — not a diagnosis." : ""}</div>` : ""}
      </div>

      ${shapeCard}
      ${refNoteCard}
      ${clinicianCard}

      ${blocks}

      <div style="border:1.5px solid ${crisisTest ? "#ffccc7" : "#dce5e0"};background:${crisisTest ? "#fff2f0" : "#f9fbf9"};color:${crisisTest ? "#a8071a" : "#3d4f48"};padding:12px 14px;border-radius:10px;font-size:11px;line-height:1.55;margin-top:8px">
        <strong>${crisisTest ? "Please hear this carefully" : "A calm clinical note"}:</strong>
        ${escapeHtml(p.name || "You")}, this dossier supports self-understanding; it is not a medical or psychiatric diagnosis.
        ${crisisTest
          ? " If you are in distress or having thoughts of self-harm, do not stay alone with this file — contact emergency services, 988 (US/Canada), or Samaritans 116 123 (UK)."
          : " If life feels impaired, talk with a licensed clinician who can sit with your story — not only your scores."}
      </div>
    </div>

    <footer class="sheet-foot">
      <span>MindoraInsight · Personal Psychometric Profile · Lead: ${escapeHtml(String(top.key))} ${top.score != null ? top.score + "/100" : ""}</span>
      <span>Document REF: ${serial}</span>
    </footer>
  </div>
</body>
</html>`;
  };
