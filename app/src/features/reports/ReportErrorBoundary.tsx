import { Component, type ErrorInfo, type ReactNode } from 'react'
import { Link } from 'react-router-dom'

type Props = {
  children: ReactNode
  fallbackSlug?: string
}

type State = { error: Error | null }

/** Keeps /report and /test from going fully blank when a render throws. */
export class ReportErrorBoundary extends Component<Props, State> {
  state: State = { error: null }

  static getDerivedStateFromError(error: Error): State {
    return { error }
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('[mi] report UI crashed', error, info.componentStack)
  }

  render() {
    if (!this.state.error) return this.props.children
    const retake = this.props.fallbackSlug ? `/test/${this.props.fallbackSlug}` : '/library'
    return (
      <section className="bg-mi-canvas px-4 py-16">
        <div className="mx-auto max-w-lg text-center">
          <h1 className="font-display text-2xl font-semibold text-mi-text">
            Something went wrong showing this report
          </h1>
          <p className="mt-3 text-mi-muted">
            Your answers may still be saved on this device. Try again, or retake the assessment.
          </p>
          <div className="mt-6 flex flex-col items-center gap-2 sm:flex-row sm:justify-center">
            <button
              type="button"
              className="btn-outline"
              onClick={() => this.setState({ error: null })}
            >
              Try again
            </button>
            <Link to={retake} className="btn-primary">
              {this.props.fallbackSlug ? 'Retake assessment' : 'Back to library'}
            </Link>
          </div>
        </div>
      </section>
    )
  }
}
