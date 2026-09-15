import {
  EMBLEM_COUNT,
  emblemOrbSrc,
  pickEmotionalEmblem,
  profileFingerprint,
  type ReportGender,
} from '@/features/reports/emblemAssets'

type ResultEmblemProps = {
  /** Result title — letter on orb matches PDF primary name */
  label: string
  hue: string
  family: string
  withWordmark?: boolean
  size?: 'md' | 'lg'
  traits?: { id?: string; name: string; score: number }[]
  overall?: number
  gender?: ReportGender | null
}

function polar(cx: number, cy: number, r: number, deg: number) {
  const rad = ((deg - 90) * Math.PI) / 180
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) }
}

function arcPath(cx: number, cy: number, r: number, startDeg: number, sweep: number) {
  const start = polar(cx, cy, r, startDeg)
  const end = polar(cx, cy, r, startDeg + sweep)
  const large = sweep > 180 ? 1 : 0
  return `M ${start.x} ${start.y} A ${r} ${r} 0 ${large} 1 ${end.x} ${end.y}`
}

/**
 * PDF-style result emblem: glass orb + first letter of the result title
 * (matches Big Five / OCEAN report covers — not portrait avatars).
 */
export function ResultEmblem({
  label,
  hue,
  family,
  withWordmark = false,
  size = 'md',
  traits,
  overall,
  gender = null,
}: ResultEmblemProps) {
  const initial = label.trim().charAt(0).toUpperCase() || 'M'
  const profileKey = traits?.length ? profileFingerprint(traits, overall) : undefined
  const mood = pickEmotionalEmblem({ label, family, hue, profileKey, gender })
  const orb = emblemOrbSrc(mood)
  const dim = size === 'lg' ? 'h-48 w-48 sm:h-56 sm:w-56' : 'h-40 w-40 sm:h-48 sm:w-48'
  const letterClass = size === 'lg' ? 'text-5xl sm:text-6xl' : 'text-4xl sm:text-5xl'
  const uid = `em-${mood.id}-${family}`

  const cx = 80
  const cy = 80
  const sweep = 100 + (mood.id % 18)
  const start = -sweep / 2 + mood.rotate
  const d = arcPath(cx, cy, 52, start, sweep)
  const left = polar(cx, cy, 52, start + sweep * 0.15)
  const mid = polar(cx, cy, 52, start + sweep * 0.5)
  const right = polar(cx, cy, 52, start + sweep * 0.85)

  return (
    <div className="report-emblem-wrap mx-auto text-center">
      {withWordmark && (
        <p className="report-emblem-wordmark mb-5 text-[11px] font-semibold uppercase tracking-[0.32em] text-[#6B7C85]">
          MindoraInsight
        </p>
      )}
      <div className={`report-emblem relative mx-auto flex items-center justify-center ${dim}`} aria-hidden>
        <img
          src={orb}
          alt=""
          width={224}
          height={224}
          className="absolute inset-0 h-full w-full object-contain"
          style={{ filter: mood.filter }}
          draggable={false}
        />
        <svg viewBox="0 0 160 160" className="absolute inset-0 h-full w-full">
          <defs>
            <radialGradient id={`${uid}-veil`} cx="35%" cy="30%" r="70%">
              <stop offset="0%" stopColor="#fff" stopOpacity="0.4" />
              <stop offset="100%" stopColor={mood.hue} stopOpacity="0.1" />
            </radialGradient>
          </defs>
          <circle
            cx={cx}
            cy={cy}
            r="74"
            fill={`url(#${uid}-veil)`}
            stroke={mood.hue}
            strokeWidth="2.5"
            opacity="0.9"
          />
          <path d={d} fill="none" stroke={mood.hue} strokeWidth="2" strokeLinecap="round" opacity="0.8" />
          <circle cx={left.x} cy={left.y} r="3" fill="#6B7C85" />
          <circle cx={mid.x} cy={mid.y} r="3.4" fill={mood.accent} />
          <circle cx={right.x} cy={right.y} r="2.8" fill="#4880D9" />
        </svg>
        <span
          className={`relative font-display font-semibold leading-none text-[#032514] ${letterClass}`}
          style={{ textShadow: '0 1px 0 rgba(255,255,255,0.75)' }}
        >
          {initial}
        </span>
      </div>
      <p className="sr-only">
        Result emblem for {label}, variant {mood.id} of {EMBLEM_COUNT}
        {gender ? `, ${gender}` : ''}
      </p>
    </div>
  )
}
