import { Link } from 'react-router-dom'
import { categories, type Category } from '@/data/categories'
import { useI18n } from '@/i18n/I18nProvider'

type Props = {
  activeId?: string | null
  onSelect?: (id: string | null) => void
  linkMode?: boolean
}

/** Compact filters only — used where needed; home uses PathsExplorer instead. */
export function CategoryPills({ activeId = null, onSelect, linkMode = false }: Props) {
  const { t } = useI18n()

  return (
    <div className="flex flex-wrap gap-2">
      {categories.map((cat) => {
        const label = t.categories[cat.id]
        const active = activeId === cat.id
        const className = `inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold transition ${
          active ? 'bg-mi-text text-white' : 'bg-mi-canvas text-mi-text ring-1 ring-mi-border'
        }`
        if (linkMode) {
          return (
            <Link key={cat.id} to={`/library?category=${cat.id}`} className={className}>
              <PillInner cat={cat} label={label} />
            </Link>
          )
        }
        return (
          <button
            key={cat.id}
            type="button"
            className={className}
            onClick={() => onSelect?.(activeId === cat.id ? null : cat.id)}
          >
            <PillInner cat={cat} label={label} />
          </button>
        )
      })}
    </div>
  )
}

function PillInner({ cat, label }: { cat: Category; label: string }) {
  return (
    <>
      <span className="text-xs" aria-hidden>
        {cat.icon}
      </span>
      {label}
    </>
  )
}
