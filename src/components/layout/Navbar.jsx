import { NavLink } from 'react-router-dom'
import { Menu, Moon, Sun, CheckSquare, User } from 'lucide-react'
import { useTheme } from '../../context/ThemeContext'

const navItems = [
  { to: '/', label: 'Dashboard', end: true },
  { to: '/tasks', label: 'Tasks' },
  { to: '/calendar', label: 'Calendar' },
  { to: '/analytics', label: 'Analytics' },
]

export default function Navbar({ onMenuClick }) {
  const { isDark, toggleTheme } = useTheme()

  return (
    <header className="glass-strong fixed top-0 right-0 left-0 z-50 h-16 border-b border-pink-500/15">
      <div className="flex h-full items-center justify-between gap-4 px-4 sm:px-6">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onMenuClick}
            className="rounded-xl p-2 text-slate-300 hover:bg-white/10 lg:hidden"
            aria-label="Open menu"
          >
            <Menu className="h-5 w-5" />
          </button>
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-pink-500 to-rose-600 shadow-lg shadow-pink-500/40">
              <CheckSquare className="h-5 w-5 text-white" />
            </div>
            <span className="gradient-text hidden text-lg font-bold sm:inline">
              Todos
            </span>
          </div>
        </div>

        <nav className="hidden items-center gap-1 md:flex">
          {navItems.map(({ to, label, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) =>
                `rounded-lg px-3 py-2 text-sm font-medium transition ${
                  isActive
                    ? 'bg-pink-500/20 text-pink-300 text-glow-pink-sm'
                    : 'text-neutral-500 hover:bg-white/5 hover:text-pink-200'
                }`
              }
            >
              {label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={toggleTheme}
            className="rounded-xl p-2 text-slate-300 transition hover:bg-white/10 hover:text-white"
            aria-label="Toggle theme"
          >
            {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </button>
          <NavLink
            to="/settings"
            className="flex items-center gap-2 rounded-xl px-2 py-2 text-slate-300 transition hover:bg-white/10 hover:text-white"
            aria-label="Profile"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-pink-500/40 to-rose-600/40 ring-1 ring-pink-500/30">
              <User className="h-4 w-4" />
            </div>
            <span className="hidden text-sm font-medium lg:inline">Profile</span>
          </NavLink>
        </div>
      </div>
    </header>
  )
}
