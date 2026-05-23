import { useTheme } from '../context/ThemeContext'
import { useTodos } from '../context/TodoContext'
import GlassCard from '../components/ui/GlassCard'
import { ACHIEVEMENTS } from '../utils/gamification'

export default function Settings() {
  const { theme, toggleTheme } = useTheme()
  const { gamification } = useTodos()

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white sm:text-3xl">Settings</h1>
        <p className="text-slate-400">Profile & preferences</p>
      </div>

      <GlassCard className="p-6">
        <h2 className="mb-4 font-semibold text-white">Appearance</h2>
        <div className="flex items-center justify-between">
          <span className="text-slate-400">Theme</span>
          <button
            type="button"
            onClick={toggleTheme}
            className="rounded-xl bg-pink-500/20 px-4 py-2 text-sm font-medium text-pink-200 ring-1 ring-pink-500/30"
          >
            {theme === 'dark' ? 'Dark' : 'Light'} — tap to switch
          </button>
        </div>
      </GlassCard>

      <GlassCard className="p-6">
        <h2 className="mb-4 font-semibold text-white">Achievements</h2>
        <div className="grid gap-3 sm:grid-cols-2">
          {ACHIEVEMENTS.map((a) => {
            const unlocked = gamification.achievements.includes(a.id)
            return (
              <div
                key={a.id}
                className={`flex items-center gap-3 rounded-xl p-3 ${
                  unlocked ? 'bg-pink-500/15 ring-1 ring-pink-500/30' : 'bg-white/5 opacity-50'
                }`}
              >
                <span className="text-2xl">{a.icon}</span>
                <div>
                  <p className="font-medium text-white">{a.name}</p>
                  <p className="text-xs text-slate-500">+{a.xp} XP</p>
                </div>
              </div>
            )
          })}
        </div>
      </GlassCard>
    </div>
  )
}
