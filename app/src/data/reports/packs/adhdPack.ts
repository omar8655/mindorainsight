import type { ChapterTemplate, ContentPack, PrimaryPack } from '@/domain/reports/types'

/** Simple English themes for ADHD PDF — easy to follow. */
const ADHD_THEMES = [
  { id: 'core', title: 'Your main pattern' },
  { id: 'daily', title: 'In everyday life' },
  { id: 'costs', title: 'What gets hard' },
  { id: 'living', title: 'What you can try' },
] as const

type Seed = { title: string; teaser: string; body: string }

function adhdChapters(id: string, seeds: Seed[]): ChapterTemplate[] {
  return seeds.slice(0, 16).map((seed, i) => {
    const theme = ADHD_THEMES[Math.floor(i / 4)]!
    return {
      id: `${id}-${theme.id}-${i % 4}`,
      themeId: theme.id,
      title: seed.title,
      teaser: seed.teaser,
      body: seed.body,
    }
  })
}

function adhdPrimary(
  id: string,
  name: string,
  blurb: string,
  hue: string,
  plainLead: string,
): PrimaryPack {
  const seeds: Seed[] = [
    {
      title: 'What this score means',
      teaser: 'Simple words for your highest area — not a medical label.',
      body: `${plainLead} On this screen, {{primary}} is your highest area at {{score}}%. That is how you answered — it is not a diagnosis. Your next area, {{secondary}} at {{secondaryScore}}%, also matters so a professional can see the whole picture.`,
    },
    {
      title: 'Where you may feel it',
      teaser: 'Normal days where this pattern often shows up.',
      body: `Watch mornings, boring-but-important tasks, waiting, stress after criticism, and guessing how long things take. {{primary}} at {{score}}% often shows up first in those moments. Also watch {{secondary}} when you plan support.`,
    },
    {
      title: 'Simple supports to try',
      teaser: 'Practical ideas — not medical treatment.',
      body: `Write the next step where you can see it. Work in short blocks. Move if you need to. Wait ten seconds before you send or buy. Pair dull work with something you like. Shape this to {{primary}} and {{secondary}}. A licensed professional can help you go further.`,
    },
    {
      title: 'Talking to a professional',
      teaser: 'What to bring so the chat stays clear.',
      body: `Bring: your top scores with percentages, two real examples from work or home, and what you already tried. Say this was an educational screen, not a full clinical test. Ask about your history and real-life impact — not a quick stamp from a quiz.`,
    },
    {
      title: 'Early signs in your day',
      teaser: 'How this pattern shows up before you name it.',
      body: `When {{primary}} is at {{score}}%, it rarely arrives as a big label. It shows up as small habits: putting things off, rushing a reply, losing the thread, or feeling “on” when you need to be still. With {{secondary}} also higher at {{secondaryScore}}%, that mix is yours.`,
    },
    {
      title: 'What other people may notice',
      teaser: 'What colleagues or family often see first.',
      body: `People may not say “your {{primary}} is high.” They may say you interrupt, finish late, restart plans, or look distracted. That outside view can help. Pair it with {{secondary}} when you explain what support you need.`,
    },
    {
      title: 'Settings that help you',
      teaser: 'Places and routines where this pattern works better.',
      body: `{{primary}} usually works better with clear next steps and honest deadlines. Too much noise, too little structure, or endless open tasks can make the same pattern feel worse. Use {{secondary}} as a second dial when you design your week.`,
    },
    {
      title: 'A sentence you can share',
      teaser: 'Plain words for a manager, partner, or teammate.',
      body: `Try: “I work best when {{primary}} has a clear next step — and I need a little structure around {{secondary}} so the week stays honest.” It is clear without being clinical, and it invites help instead of blame.`,
    },
    {
      title: 'When stress makes it worse',
      teaser: 'What happens under pressure — and a small reset.',
      body: `Under stress, {{primary}} often gets louder: more rush, more freeze, or less flexibility. Notice that early. A ten-minute reset that respects both {{primary}} and {{secondary}} beats a huge recovery plan you will not keep.`,
    },
    {
      title: 'One small 30-day experiment',
      teaser: 'A low-pressure way to learn how you run.',
      body: `For four weeks, track one habit tied to {{primary}} and one support tied to {{secondary}}. Keep it small. The goal is to learn how you work — not to “fix” your personality.`,
    },
    {
      title: 'Mistakes to avoid',
      teaser: 'Common traps that make this pattern harder.',
      body: `Avoid all-or-nothing plans, shame spirals, and secret struggling. Avoid treating this PDF as a diagnosis. Avoid changing everything at once. Start with {{primary}} at {{score}}%, then add support for {{secondary}}.`,
    },
    {
      title: 'If life feels impaired',
      teaser: 'When to seek licensed help.',
      body: `If work, relationships, money, sleep, or safety feel hurt by this pattern, talk to a qualified professional. Bring this report as a conversation starter only. Your {{primary}} and {{secondary}} scores are clues — not a final answer.`,
    },
    {
      title: 'Protect what already works',
      teaser: 'Build on strengths, not only problems.',
      body: `Even with a high {{primary}} score, something in your life already works — interest, people, movement, deadlines, or tools. Keep those. Add one support for {{secondary}} instead of rebuilding your whole life overnight.`,
    },
    {
      title: 'Workday checklist',
      teaser: 'Three checks you can use tomorrow.',
      body: `1) What is the one next step for {{primary}}? 2) Where will {{secondary}} trip me today? 3) What is my ten-second pause rule? Small and visible beats perfect and forgotten.`,
    },
    {
      title: 'Home and relationships',
      teaser: 'How this pattern can show up with people you love.',
      body: `{{primary}} can look like forgotten plans, quick words, or uneven energy at home. Name the pattern without blaming yourself. Ask for one clear request around {{secondary}} — not a long list.`,
    },
    {
      title: 'Your next step after this PDF',
      teaser: 'One calm action when you put this away.',
      body: `Pick one: save your top three scores, write two real-life examples, or book a talk with a licensed professional. Keep {{primary}} ({{score}}%) and {{secondary}} ({{secondaryScore}}%) in that note so the next conversation stays specific.`,
    },
  ]

  return {
    id,
    name,
    blurb,
    emblemHue: hue,
    themes: ADHD_THEMES.map((t) => ({ id: t.id, title: t.title })),
    chapters: adhdChapters(id, seeds),
    experiment: {
      title: 'Two-week simple log',
      body: 'For 14 days, write one hard moment and one thing that helped (a reminder, a walk, a short delay, a friend working beside you, or a shorter work block). Bring the log to a licensed professional if life feels hard. This screen is educational — not a diagnosis.',
    },
  }
}

export const adhdPack: ContentPack = {
  family: 'adhd',
  fallbackPrimaryId: 'inattention',
  disclaimer:
    'This is an educational ADHD pattern screen only. It is not a medical diagnosis, not a full clinical test, and not a replacement for licensed care. If life feels hard, please speak with a qualified professional.',
  primaries: {
    inattention: adhdPrimary(
      'inattention',
      'Focus & attention',
      'Focus may drift, details slip, and boring work feels costly — even when you care about the result.',
      '#4880D9',
      'Your highest signal is about staying focused and catching details.',
    ),
    hyperactivity: adhdPrimary(
      'hyperactivity',
      'Restlessness & energy',
      'Restlessness and a need to move or stay “on” show up strongly — energy that can look like drive until you must sit still.',
      '#E8A838',
      'Your highest signal is about restlessness and high energy in the body.',
    ),
    impulsivity: adhdPrimary(
      'impulsivity',
      'Impulse control',
      'Acting or speaking before a full pause looks like a main hard point in how you answered.',
      '#C45C6A',
      'Your highest signal is about waiting before you act or speak.',
    ),
    executive: adhdPrimary(
      'executive',
      'Getting started & finishing',
      'Starting, planning steps, and finishing what you start look especially hard in this profile.',
      '#31B070',
      'Your highest signal is about starting, organising steps, and finishing.',
    ),
    emotion: adhdPrimary(
      'emotion',
      'Feelings & stress',
      'Feelings rise fast and settle slowly — stress and criticism may hit with extra force.',
      '#9B6B9E',
      'Your highest signal is about strong feelings and how long they take to settle.',
    ),
    time_motivation: adhdPrimary(
      'time_motivation',
      'Time & follow-through',
      'Time can slip, last-minute urgency shows up, and motivation may depend on interest.',
      '#5A8F7B',
      'Your highest signal is about time sense, urgency, and follow-through.',
    ),
  },
}
