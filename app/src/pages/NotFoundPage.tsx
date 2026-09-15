import { Link } from 'react-router-dom'
import { Seo } from '@/components/layout/Seo'

export function NotFoundPage() {
  return (
    <>
      <Seo title="Page not found" noindex />
      <section className="bg-mi-canvas py-16 text-center md:py-24">
        <div className="container max-w-lg">
          <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-mi-muted">404</p>
          <h1 className="font-display mt-2 text-3xl font-semibold text-mi-forest sm:text-4xl">
            Page not found
          </h1>
          <p className="mt-3 text-sm leading-6 text-mi-muted">
            That link may have moved. Try the library, free tests, or head home.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-2">
            <Link to="/" className="btn-primary">
              Home
            </Link>
            <Link to="/free-tests" className="btn-outline">
              Free tests
            </Link>
            <Link to="/library" className="btn-outline">
              Library
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
