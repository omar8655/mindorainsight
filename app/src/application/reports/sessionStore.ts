import type { ReportSession } from '@/domain/reports/types'

const KEY = 'mi.report.sessions.v1'

function readAll(): Record<string, ReportSession> {
  try {
    const raw = localStorage.getItem(KEY)
    if (!raw) return {}
    return JSON.parse(raw) as Record<string, ReportSession>
  } catch {
    return {}
  }
}

function writeAll(map: Record<string, ReportSession>) {
  localStorage.setItem(KEY, JSON.stringify(map))
}

export function createSessionId() {
  return `rs_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 9)}`
}

export function saveReportSession(session: ReportSession): ReportSession {
  const map = readAll()
  map[session.id] = session
  // Also index latest by slug for quick resume
  map[`latest:${session.slug}`] = session
  writeAll(map)
  return session
}

export function getReportSession(idOrSlug: string): ReportSession | null {
  const map = readAll()
  if (map[idOrSlug]) return map[idOrSlug]
  if (map[`latest:${idOrSlug}`]) return map[`latest:${idOrSlug}`]
  return null
}

export function unlockReportSession(sessionId: string): ReportSession | null {
  const map = readAll()
  const session = map[sessionId]
  if (!session) return null
  const next = { ...session, unlocked: true }
  map[sessionId] = next
  map[`latest:${session.slug}`] = next
  writeAll(map)
  return next
}

/** Demo / local unlock: prefer session id, else latest session for a slug. */
export function unlockReportSessionFlexible(sessionId?: string | null, slug?: string | null): ReportSession | null {
  if (sessionId) {
    const byId = unlockReportSession(sessionId)
    if (byId) return byId
  }
  if (slug) {
    const latest = getReportSession(slug)
    if (latest) return unlockReportSession(latest.id)
  }
  return null
}
