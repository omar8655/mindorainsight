import { Link, NavLink, Outlet } from 'react-router-dom'

const links = [
  { to: '/admin', label: 'Overview', end: true },
  { to: '/admin/leads', label: 'Leads' },
  { to: '/admin/contacts', label: 'Contacts' },
  { to: '/admin/deals', label: 'Pipeline' },
  { to: '/admin/assessments', label: 'Assessments' },
]

export function AdminLayout() {
  return (
    <div className="flex min-h-screen flex-col bg-mi-canvas">
      <div className="border-b border-mi-border bg-mi-forest text-white">
        <div className="flex h-14 w-full items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <img src="/logo.svg" alt="" width={28} height={28} className="h-7 w-7" />
            <span className="font-bold">
              Mindora<span className="text-[#7ddea8]">Insight</span> CRM
            </span>
          </div>
          <Link to="/" className="text-sm text-white/80 hover:text-white">
            ← Back to site
          </Link>
        </div>
      </div>

      <div className="flex min-h-0 flex-1">
        <aside className="sticky top-0 hidden h-[calc(100vh-3.5rem)] w-[220px] shrink-0 overflow-y-auto border-r border-mi-border bg-white p-3 lg:block">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.end}
              className={({ isActive }) =>
                `mb-1 block rounded-lg px-3 py-2.5 text-sm font-semibold ${
                  isActive ? 'bg-mi-green text-white' : 'text-mi-muted hover:bg-mi-green-soft'
                }`
              }
            >
              {l.label}
            </NavLink>
          ))}
        </aside>

        <div className="flex min-w-0 flex-1 flex-col">
          <nav className="flex gap-1 overflow-x-auto border-b border-mi-border bg-white px-4 py-2 lg:hidden">
            {links.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                end={l.end}
                className={({ isActive }) =>
                  `shrink-0 rounded-lg px-3 py-2 text-sm font-semibold ${
                    isActive ? 'bg-mi-green text-white' : 'text-mi-muted hover:bg-mi-green-soft'
                  }`
                }
              >
                {l.label}
              </NavLink>
            ))}
          </nav>
          <main className="w-full flex-1 px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  )
}
