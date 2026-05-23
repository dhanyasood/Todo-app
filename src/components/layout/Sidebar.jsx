import { NavLink } from 'react-router-dom'
import { motion } from 'framer-motion'
import { X } from 'lucide-react'

const links = [
  { to: '/', label: 'Dashboard', icon: '🏠', end: true },
  { to: '/tasks', label: 'My Tasks', icon: '✅' },
  { to: '/calendar', label: 'Calendar', icon: '📅' },
  { to: '/goals', label: 'Goals', icon: '🎯' },
  { to: '/focus', label: 'Focus Mode', icon: '⏱' },
  { to: '/analytics', label: 'Analytics', icon: '📊' },
  { to: '/settings', label: 'Settings', icon: '⚙' },
]

export default function Sidebar({ open, onClose }) {
  return (
    <>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      <aside
        className={`glass-strong fixed top-16 left-0 z-50 flex h-[calc(100vh-4rem)] w-64 flex-col border-r border-pink-500/15 transition-transform duration-300 lg:translate-x-0 ${
          open ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between border-b border-white/10 p-4 lg:hidden">
          <span className="text-sm font-semibold text-white">Menu</span>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-1.5 text-slate-400 hover:bg-white/10 hover:text-white"
            aria-label="Close menu"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <nav className="flex-1 space-y-1 overflow-y-auto p-3">
          {links.map(({ to, label, icon, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              onClick={onClose}
              className={({ isActive }) =>
                `group relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition ${
                  isActive
                    ? 'bg-pink-500/20 text-pink-300'
                    : 'text-neutral-500 hover:bg-white/5 hover:text-pink-200'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  {isActive && (
                    <motion.span
                      layoutId="sidebar-active"
                      className="absolute inset-0 rounded-xl bg-pink-500/15 ring-1 ring-pink-500/40"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className="relative text-lg" aria-hidden="true">
                    {icon}
                  </span>
                  <span className="relative">{label}</span>
                </>
              )}
            </NavLink>
          ))}
        </nav>

        <div className="border-t border-white/10 p-4">
          <p className="text-xs text-neutral-600">Premium Productivity</p>
          <p className="gradient-text text-sm font-semibold">Todos Pro</p>
        </div>
      </aside>
    </>
  )
}
