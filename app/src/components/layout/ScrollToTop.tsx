import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

/** Jump to top on every route change (similar-assessment “Start test”, library cards, etc.). */
export function ScrollToTop() {
  const { pathname, search } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
    document.documentElement.scrollTop = 0
    document.body.scrollTop = 0
  }, [pathname, search])

  return null
}
