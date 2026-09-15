import type { ContentPack } from '@/domain/reports/types'
import { buildPrimaryPack } from '@/data/reports/packs/packHelpers'

function well(id: string, name: string, blurb: string, hue: string) {
  return buildPrimaryPack({
    id,
    name,
    blurb,
    emblemHue: hue,
    experiment: {
      title: 'Smallest possible moves',
      body: 'For two weeks, pick one ten-minute supportive action daily (walk, one song fully, message one safe person, lights-out time). Track mood energy 1–5 morning and evening. Share the page with a professional if low mood persists.',
    },
    seeds: [
      {
        title: 'What this cluster names',
        teaser: 'A pattern to look at — not a diagnosis.',
        body: `{{primary}} at {{score}}% stood out in this educational screen. That names a cluster of experience, not a medical conclusion. Secondary elevation in {{secondary}} ({{secondaryScore}}%) helps you see interactions — sleep with mood, body with cognition, social with self-view.`,
      },
      {
        title: 'Ordinary Tuesday',
        teaser: 'How the pattern colors a plain day.',
        body: `Follow one ordinary day from first drink of water to lights out. Mark where {{primary}} shows its hand. Supports work best when they are boring and repeatable — not heroic. Let {{secondary}} guide which support to try first.`,
      },
      {
        title: 'When to involve a professional',
        teaser: 'Clear threshold language without panic.',
        body: `If impairment lasts, or safety feels uncertain, contact a licensed clinician or local crisis resources. Bring this report as conversation material only. MindoraInsight does not diagnose or treat.`,
      },
    ],
  })
}

export const wellbeingPack: ContentPack = {
  family: 'wellbeing',
  fallbackPrimaryId: 'emotional',
  disclaimer:
    'Educational wellbeing / energy screen only. Not a diagnosis of depression, anxiety, or any clinical condition. Seek licensed care if you are struggling.',
  primaries: {
    emotional: well(
      'emotional',
      'Emotional',
      'Muted or intense feeling: flatness where pleasure used to register, or reactions that arrive louder than the moment seems to warrant.',
      '#9B6B9E',
    ),
    social: well('social', 'Social', 'Pull toward withdrawal, thinner patience for people, or loneliness that sits under busy days.', '#4880D9'),
    physical: well('physical', 'Physical', 'Body load: heaviness, restlessness, or somatic stress that steals attention from work.', '#C45C6A'),
    cognitive: well('cognitive', 'Cognitive', 'Fog, looping thoughts, or decision friction that makes simple tasks feel thick.', '#3D4F6F'),
    vegetative: well('vegetative', 'Sleep & drive', 'Sleep, appetite, and baseline drive looking off-rhythm compared with your usual self.', '#5A8F7B'),
    'self-perception': well(
      'self-perception',
      'Self-perception',
      'Harsher self-talk, shrinking confidence, or a sense that you are failing a standard you used to meet.',
      '#6B7C85',
    ),
    resilience: well(
      'resilience',
      'Resilience under load',
      'Recovery speed after setbacks — how quickly you return to usable work after a hit.',
      '#31B070',
    ),
    energy: well('energy', 'Energy cycle', 'Peaks and dips in drive across the day and week — timing is part of the pattern.', '#E8A838'),
  },
}
