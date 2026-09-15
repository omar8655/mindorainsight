import type { ContentPack, ReportFamily } from '@/domain/reports/types'
import { adhdPack } from '@/data/reports/packs/adhdPack'
import { enneagramPack } from '@/data/reports/packs/enneagramPack'
import { oceanPack } from '@/data/reports/packs/oceanPack'
import { spiritPack } from '@/data/reports/packs/spiritPack'
import { types16Pack } from '@/data/reports/packs/types16Pack'
import { wellbeingPack } from '@/data/reports/packs/wellbeingPack'
import { workGenericPack } from '@/data/reports/packs/workGenericPack'

const PACKS: Record<ReportFamily, ContentPack> = {
  ocean: oceanPack,
  adhd: adhdPack,
  types16: types16Pack,
  enneagram: enneagramPack,
  spirit: spiritPack,
  wellbeing: wellbeingPack,
  workGeneric: workGenericPack,
}

export function getPack(family: ReportFamily): ContentPack {
  return PACKS[family]
}
