import { useMemo, useState } from 'react'
import { buildSharePayload, encodeShareUrl } from '@/application/reports/shareMessage'
import type { ReportDocument } from '@/domain/reports/types'

type ShareCompletionBarProps = {
  doc: ReportDocument
  /** Path only, e.g. /report/slug?session= */
  sharePath: string
}

export function ShareCompletionBar({ doc, sharePath }: ShareCompletionBarProps) {
  const [toast, setToast] = useState<string | null>(null)
  const url = useMemo(() => {
    if (typeof window === 'undefined') return sharePath
    return `${window.location.origin}${sharePath}`
  }, [sharePath])

  const payload = useMemo(() => buildSharePayload(doc, url), [doc, url])
  const intents = useMemo(
    () => encodeShareUrl(payload.title, payload.text, payload.url),
    [payload],
  )

  function flash(msg: string) {
    setToast(msg)
    window.setTimeout(() => setToast(null), 2200)
  }

  async function copyText(value: string, msg: string) {
    try {
      await navigator.clipboard.writeText(value)
      flash(msg)
    } catch {
      flash('Could not copy — try selecting the text manually.')
    }
  }

  async function nativeShare() {
    if (typeof navigator !== 'undefined' && typeof navigator.share === 'function') {
      try {
        await navigator.share({
          title: payload.title,
          text: payload.text,
          url: payload.url,
        })
        flash('Shared — nice work finishing.')
        return
      } catch {
        /* user cancelled or share failed — fall through */
      }
    }
    await copyText(`${payload.text}\n${payload.url}`, 'Message copied — paste it anywhere.')
  }

  return (
    <div className="report-no-print rounded-2xl border border-mi-border bg-white p-4 shadow-sm sm:p-5">
      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-mi-green">Share your completion</p>
      <p className="mt-1 text-sm leading-6 text-mi-muted">
        You finished a real assessment. Send a short message that names your result.
      </p>
      <p className="mt-3 rounded-xl bg-mi-green-soft/50 px-3 py-2.5 text-sm leading-6 text-mi-forest">
        {payload.text}
      </p>
      <div className="mt-3 flex flex-col gap-2 sm:flex-row sm:flex-wrap">
        <button
          type="button"
          onClick={() => void nativeShare()}
          className="btn-primary w-full justify-center !px-4 !py-3 !text-sm sm:w-auto"
        >
          Share
        </button>
        <button
          type="button"
          onClick={() => void copyText(`${payload.text}\n${payload.url}`, 'Copied — share it with someone.')}
          className="btn-outline w-full justify-center !px-4 !py-3 !text-sm sm:w-auto"
        >
          Copy message
        </button>
        <button
          type="button"
          onClick={() => void copyText(payload.url, 'Link copied.')}
          className="btn-outline w-full justify-center !px-4 !py-3 !text-sm sm:w-auto"
        >
          Copy link
        </button>
        <div className="grid grid-cols-3 gap-2 sm:contents">
          <a
            href={intents.x}
            target="_blank"
            rel="noreferrer"
            className="inline-flex min-h-11 items-center justify-center rounded-xl border border-mi-border px-3 py-2.5 text-sm font-semibold text-mi-text active:bg-mi-canvas sm:px-4"
          >
            X
          </a>
          <a
            href={intents.linkedin}
            target="_blank"
            rel="noreferrer"
            className="inline-flex min-h-11 items-center justify-center rounded-xl border border-mi-border px-3 py-2.5 text-sm font-semibold text-mi-text active:bg-mi-canvas sm:px-4"
          >
            LinkedIn
          </a>
          <a
            href={intents.whatsapp}
            target="_blank"
            rel="noreferrer"
            className="inline-flex min-h-11 items-center justify-center rounded-xl border border-mi-border px-3 py-2.5 text-sm font-semibold text-mi-text active:bg-mi-canvas sm:px-4"
          >
            WhatsApp
          </a>
        </div>
      </div>
      {toast && (
        <p className="mt-3 text-sm font-semibold text-mi-green" role="status">
          {toast}
        </p>
      )}
    </div>
  )
}
