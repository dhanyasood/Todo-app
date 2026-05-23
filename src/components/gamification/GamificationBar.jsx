import { Flame, Trophy, Star } from 'lucide-react'
import { useTodos } from '../../context/TodoContext'
import { ACHIEVEMENTS } from '../../utils/gamification'
import GlassCard from '../ui/GlassCard'

export default function GamificationBar() {
  const { gamification, xpInfo } = useTodos()
  const unlocked = ACHIEVEMENTS.filter((a) =>
    gamification.achievements.includes(a.id),
  )

  return (
    <GlassCard className="p-4">
      <div className="flex flex-wrap items-center gap-4">
        <div className="flex items-center gap-2">
          <Flame className="h-5 w-5 text-orange-400" />
          <div>
            <p className="text-xs text-slate-500">Streak</p>
            <p className="font-bold text-white">{gamification.streak} days</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Star className="h-5 w-5 text-pink-400" />
          <div>
            <p className="text-xs text-slate-500">Level {xpInfo.level}</p>
            <p className="font-bold text-white">{gamification.xp} XP</p>
          </div>
        </div>
        <div className="min-w-[120px] flex-1">
          <div className="mb-1 flex justify-between text-xs text-slate-500">
            <span>Progress</span>
            <span>{xpInfo.percent}%</span>
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-white/10">
            <div
              className="h-full rounded-full bg-gradient-to-r from-pink-600 to-rose-500 shadow-[0_0_10px_rgba(236,72,153,0.5)] transition-all"
              style={{ width: `${xpInfo.percent}%` }}
            />
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Trophy className="h-5 w-5 text-amber-400" />
          <div className="flex gap-1">
            {unlocked.length === 0 ? (
              <span className="text-xs text-slate-500">No badges yet</span>
            ) : (
              unlocked.slice(0, 4).map((a) => (
                <span key={a.id} className="text-lg" title={a.name}>
                  {a.icon}
                </span>
              ))
            )}
          </div>
        </div>
      </div>
    </GlassCard>
  )
}
