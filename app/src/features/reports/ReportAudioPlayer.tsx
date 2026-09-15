import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import type { ReportDocument } from '@/domain/reports/types'
import {
  buildExtendedNarration,
  buildTherapistNarration,
  estimateListenMinutes,
  narrationChunks,
} from '@/application/reports/therapistNarration'
import { useCurrency } from '@/features/currency/CurrencyProvider'
import {
  freeVoiceProsody,
  listFreeVoices,
  pickBestFreeVoice,
  voiceLabel,
} from '@/features/reports/freeVoice'

type ReportAudioPlayerProps = {
  doc: ReportDocument
}

/**
 * $0 therapist-style audio — browser Web Speech only (no ElevenLabs / OpenAI cost).
 * Auto-picks the best free voice; user can switch. Web Speech is the free ceiling.
 */
export function ReportAudioPlayer({ doc }: ReportAudioPlayerProps) {
  const { freeZero } = useCurrency()
  const [playing, setPlaying] = useState(false)
  const [paused, setPaused] = useState(false)
  const [extended, setExtended] = useState(false)
  const [supported, setSupported] = useState(true)
  const [status, setStatus] = useState<string | null>(null)
  const [chunkIndex, setChunkIndex] = useState(0)
  const [chunkTotal, setChunkTotal] = useState(0)
  const [voicesReady, setVoicesReady] = useState(false)
  const [voiceOptions, setVoiceOptions] = useState<SpeechSynthesisVoice[]>([])
  const [selectedVoiceURI, setSelectedVoiceURI] = useState<string>('')

  const chunksRef = useRef<string[]>([])
  const indexRef = useRef(0)
  const stoppedRef = useRef(true)
  const pausedRef = useRef(false)
  const voiceRef = useRef<SpeechSynthesisVoice | null>(null)
  const keepAliveRef = useRef<number | null>(null)
  const speakFromRef = useRef<(startAt: number) => void>(() => {})

  const script = useMemo(
    () => (extended ? buildExtendedNarration(doc) : buildTherapistNarration(doc)),
    [doc, extended],
  )
  const minutes = useMemo(() => estimateListenMinutes(script), [script])
  const scriptPreview = useMemo(
    () => script.slice(0, 200).replace(/\s+/g, ' ').trim() + '…',
    [script],
  )

  const applyVoice = useCallback(
    (voices: SpeechSynthesisVoice[], uri?: string) => {
      const ranked = listFreeVoices(voices, doc.gender)
      setVoiceOptions(ranked.slice(0, 12))
      const chosen =
        (uri ? voices.find((v) => v.voiceURI === uri) : null) ??
        pickBestFreeVoice(voices, doc.gender)
      voiceRef.current = chosen
      if (chosen) setSelectedVoiceURI(chosen.voiceURI)
      setVoicesReady(Boolean(chosen) || voices.length > 0)
    },
    [doc.gender],
  )

  const clearKeepAlive = useCallback(() => {
    if (keepAliveRef.current != null) {
      window.clearInterval(keepAliveRef.current)
      keepAliveRef.current = null
    }
  }, [])

  const startKeepAlive = useCallback(() => {
    clearKeepAlive()
    keepAliveRef.current = window.setInterval(() => {
      if (stoppedRef.current || pausedRef.current) return
      const synth = window.speechSynthesis
      if (!synth.speaking) return
      synth.pause()
      synth.resume()
    }, 9000)
  }, [clearKeepAlive])

  useEffect(() => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      setSupported(false)
      return
    }

    const load = () => {
      const voices = window.speechSynthesis.getVoices()
      if (voices.length) applyVoice(voices, selectedVoiceURI || undefined)
    }
    load()
    window.speechSynthesis.onvoiceschanged = load

    const onVisibility = () => {
      if (document.hidden && !stoppedRef.current && !pausedRef.current) {
        stoppedRef.current = true
        pausedRef.current = true
        clearKeepAlive()
        window.speechSynthesis.cancel()
        setPaused(true)
        setPlaying(false)
        setStatus('Paused while you switched away. Press Continue when you are back.')
      }
    }
    document.addEventListener('visibilitychange', onVisibility)

    return () => {
      stoppedRef.current = true
      clearKeepAlive()
      window.speechSynthesis.cancel()
      window.speechSynthesis.onvoiceschanged = null
      document.removeEventListener('visibilitychange', onVisibility)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps -- only rebind on gender; URI changes via select
  }, [doc.gender, applyVoice, clearKeepAlive])

  const speakFrom = useCallback(
    (startAt: number) => {
      if (!supported) return
      const synth = window.speechSynthesis
      const chunks = chunksRef.current
      if (!chunks.length || startAt >= chunks.length) {
        clearKeepAlive()
        setPlaying(false)
        setPaused(false)
        pausedRef.current = false
        setStatus('Session finished. Come back whenever you want.')
        stoppedRef.current = true
        setChunkIndex(chunks.length)
        return
      }

      stoppedRef.current = false
      pausedRef.current = false
      setPlaying(true)
      setPaused(false)
      indexRef.current = startAt
      setChunkIndex(startAt + 1)
      setChunkTotal(chunks.length)

      const utter = new SpeechSynthesisUtterance(chunks[startAt])
      if (voiceRef.current) utter.voice = voiceRef.current
      const prosody = freeVoiceProsody(doc.gender)
      utter.rate = prosody.rate
      utter.pitch = prosody.pitch
      utter.volume = 1
      utter.lang = voiceRef.current?.lang || 'en-US'

      utter.onstart = () => {
        startKeepAlive()
        const name = voiceRef.current?.name ?? 'system voice'
        setStatus(`Listening — free device voice: ${name}`)
      }

      utter.onend = () => {
        if (stoppedRef.current || pausedRef.current) return
        const next = startAt + 1
        window.setTimeout(() => {
          if (stoppedRef.current || pausedRef.current) return
          speakFromRef.current(next)
        }, 360)
      }

      utter.onerror = (ev) => {
        const err = (ev as SpeechSynthesisErrorEvent).error
        if (err === 'interrupted' || err === 'canceled' || stoppedRef.current || pausedRef.current) {
          return
        }
        clearKeepAlive()
        setPlaying(false)
        setPaused(false)
        pausedRef.current = false
        setStatus('Audio stopped. You can try again, or read the PDF quietly.')
        stoppedRef.current = true
      }

      try {
        synth.speak(utter)
      } catch {
        setStatus('Could not start audio. Try Safari or Chrome on this device.')
        stoppedRef.current = true
        setPlaying(false)
      }
    },
    [doc.gender, supported, clearKeepAlive, startKeepAlive],
  )

  speakFromRef.current = speakFrom

  function prepareChunks() {
    const text = extended ? buildExtendedNarration(doc) : buildTherapistNarration(doc)
    const chunks = narrationChunks(text)
    chunksRef.current = chunks
    setChunkTotal(chunks.length)
    return chunks
  }

  function start() {
    const chunks = prepareChunks()
    if (!chunks.length) {
      setStatus('Nothing to read yet.')
      return
    }
    indexRef.current = 0
    setChunkIndex(0)
    const voices = window.speechSynthesis.getVoices()
    if (voices.length) applyVoice(voices, selectedVoiceURI || undefined)
    window.speechSynthesis.cancel()
    window.setTimeout(() => {
      speakFromRef.current(0)
    }, 60)
  }

  function stop() {
    stoppedRef.current = true
    pausedRef.current = false
    clearKeepAlive()
    window.speechSynthesis.cancel()
    setPlaying(false)
    setPaused(false)
    setStatus(null)
    setChunkIndex(0)
  }

  function pause() {
    if (!playing || paused) return
    stoppedRef.current = true
    pausedRef.current = true
    clearKeepAlive()
    window.speechSynthesis.cancel()
    setPaused(true)
    setPlaying(false)
    setStatus('Paused. Press Continue when you are ready.')
  }

  function resume() {
    if (!paused) return
    speakFromRef.current(indexRef.current)
  }

  function onVoiceChange(uri: string) {
    setSelectedVoiceURI(uri)
    const voices = window.speechSynthesis.getVoices()
    applyVoice(voices, uri)
    if (playing || paused) {
      stop()
      setStatus('Voice updated — press Start listening again.')
    }
  }

  if (!supported) {
    return (
      <div className="report-no-print rounded-2xl border border-mi-border bg-white px-4 py-3 text-sm text-mi-muted">
        Audio readout is not available in this browser. You can still download the PDF.
      </div>
    )
  }

  const progressPct = chunkTotal > 0 ? Math.round((chunkIndex / chunkTotal) * 100) : 0

  return (
    <div className="report-no-print rounded-2xl border border-mi-green/30 bg-gradient-to-br from-white to-mi-green-soft/50 p-5 shadow-sm sm:p-6">
      <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-mi-green">Listen · Free</p>
      <h2 className="font-display mt-1 text-lg font-semibold text-mi-forest sm:text-xl">
        Hear your comprehensive report
      </h2>
      <p className="mt-2 text-sm leading-6 text-mi-muted">
        Uses your device’s built-in voices —{' '}
        <strong className="font-semibold text-mi-forest">{freeZero}</strong>,
        no paid AI voice. About {minutes} min
        {extended ? ' (longer session)' : ''}. Best on Safari (Mac/iPhone) or Chrome.
        {doc.gender ? (
          <span className="mt-1 block text-xs text-mi-forest/80">
            Preferring {doc.gender === 'female' ? 'female' : 'male'} voices from your pre-test choice.
          </span>
        ) : null}
      </p>

      <p className="mt-3 rounded-xl bg-white/70 px-3 py-2 text-xs leading-5 text-mi-muted italic">
        “{scriptPreview}”
      </p>

      {voiceOptions.length > 0 && (
        <label className="mt-4 block text-sm text-mi-muted">
          <span className="mb-1.5 block font-semibold text-mi-text">Voice (free on this device)</span>
          <select
            className="w-full rounded-xl border border-mi-border bg-white px-3 py-2.5 text-sm text-mi-forest outline-none focus:border-mi-green focus:ring-2 focus:ring-mi-green/25"
            value={selectedVoiceURI}
            disabled={playing}
            onChange={(e) => onVoiceChange(e.target.value)}
          >
            {voiceOptions.map((v) => (
              <option key={v.voiceURI} value={v.voiceURI}>
                {voiceLabel(v)}
              </option>
            ))}
          </select>
          <span className="mt-1.5 block text-[11px] leading-4 text-mi-muted">
            Tip: on Mac/iPhone try <em>Samantha</em> or <em>Daniel</em>. On Chrome, try{' '}
            <em>Google UK English</em>.
          </span>
        </label>
      )}

      <label className="mt-4 flex items-start gap-2 text-sm text-mi-muted">
        <input
          type="checkbox"
          className="mt-1"
          checked={extended}
          onChange={(e) => setExtended(e.target.checked)}
          disabled={playing || paused}
        />
        <span>Longer session (every chapter — still paced gently)</span>
      </label>

      {(playing || paused) && chunkTotal > 0 && (
        <div className="mt-4">
          <div className="mb-1 flex justify-between text-[11px] font-semibold text-mi-muted">
            <span>
              Section {Math.min(chunkIndex, chunkTotal)} of {chunkTotal}
            </span>
            <span>{progressPct}%</span>
          </div>
          <div className="h-1.5 overflow-hidden rounded-full bg-slate-200">
            <div
              className="h-full rounded-full bg-mi-green transition-all"
              style={{ width: `${Math.max(progressPct, 2)}%` }}
            />
          </div>
        </div>
      )}

      <div className="mt-4 flex flex-wrap gap-2">
        {!playing && !paused && (
          <button type="button" onClick={start} className="btn-primary !px-4 !py-2.5 !text-sm">
            Start listening
          </button>
        )}
        {playing && (
          <button type="button" onClick={pause} className="btn-outline !px-4 !py-2.5 !text-sm">
            Pause
          </button>
        )}
        {paused && (
          <button type="button" onClick={resume} className="btn-primary !px-4 !py-2.5 !text-sm">
            Continue
          </button>
        )}
        {(playing || paused) && (
          <button type="button" onClick={stop} className="btn-outline !px-4 !py-2.5 !text-sm">
            Stop
          </button>
        )}
      </div>

      {status && <p className="mt-3 text-xs leading-5 text-mi-forest/80">{status}</p>}
      {!voicesReady && !status && (
        <p className="mt-3 text-xs text-mi-muted">Loading free voices… you can still press Start.</p>
      )}
    </div>
  )
}
