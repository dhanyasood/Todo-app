import { Plus, ListTodo, CheckCircle2, Clock, TrendingUp, Flame } from 'lucide-react'
import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useTodos } from '../context/TodoContext'
import GlassCard from '../components/ui/GlassCard'
import GamificationBar from '../components/gamification/GamificationBar'
import TaskModal from '../components/tasks/TaskModal'
import { formatDueDate } from '../utils/date'

function StatCard({ icon: Icon, label, value, color }) {
  return (
    <GlassCard hover className="p-5">
      <div className={`mb-3 inline-flex rounded-xl p-2.5 ${color}`}>
        <Icon className="h-5 w-5 text-white" />
      </div>
      <p className="text-2xl font-bold text-white">{value}</p>
      <p className="text-sm text-slate-400">{label}</p>
    </GlassCard>
  )
}

export default function Dashboard() {
  const { todos, stats, gamification } = useTodos()
  const [modalOpen, setModalOpen] = useState(false)

  const todayProgress = useMemo(() => {
    const today = new Date().toISOString().slice(0, 10)
    const dueToday = todos.filter((t) => t.dueDate?.slice(0, 10) === today)
    if (dueToday.length === 0) return stats.productivity
    const done = dueToday.filter((t) => t.completed).length
    return Math.round((done / dueToday.length) * 100)
  }, [todos, stats.productivity])

  const upcoming = useMemo(
    () =>
      [...todos]
        .filter((t) => !t.completed && t.dueDate)
        .sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate))
        .slice(0, 5),
    [todos],
  )

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white sm:text-3xl">Dashboard</h1>
          <p className="text-slate-400">Welcome back — here&apos;s your overview</p>
        </div>
        <button
          type="button"
          onClick={() => setModalOpen(true)}
          className="btn-primary flex items-center gap-2 px-5 py-2.5 text-sm"
        >
          <Plus className="h-4 w-4" />
          Add Task
        </button>
      </div>

      <GamificationBar />

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-5">
        <StatCard icon={ListTodo} label="Total Tasks" value={stats.total} color="bg-pink-500/30" />
        <StatCard icon={CheckCircle2} label="Completed" value={stats.completed} color="bg-emerald-500/30" />
        <StatCard icon={Clock} label="Pending" value={stats.pending} color="bg-amber-500/30" />
        <StatCard icon={TrendingUp} label="Productivity" value={`${stats.productivity}%`} color="bg-pink-500/30" />
        <StatCard icon={Flame} label="Streak" value={gamification.streak} color="bg-orange-500/30" />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <GlassCard className="p-6">
          <h2 className="mb-4 text-lg font-semibold text-white">Today&apos;s Progress</h2>
          <div className="mb-2 flex justify-between text-sm">
            <span className="text-slate-400">Completion</span>
            <span className="text-glow-pink-sm font-semibold text-pink-400">{todayProgress}%</span>
          </div>
          <div className="h-3 overflow-hidden rounded-full bg-white/10">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${todayProgress}%` }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="h-full rounded-full bg-gradient-to-r from-pink-600 via-pink-500 to-rose-500 shadow-[0_0_12px_rgba(236,72,153,0.5)]"
            />
          </div>
        </GlassCard>

        <GlassCard className="p-6">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-white">Upcoming Tasks</h2>
            <Link to="/tasks" className="text-sm text-pink-400 hover:text-pink-300">
              View all
            </Link>
          </div>
          {upcoming.length === 0 ? (
            <p className="text-sm text-slate-500">No upcoming deadlines</p>
          ) : (
            <ul className="space-y-3">
              {upcoming.map((t) => (
                <li
                  key={t.id}
                  className="flex items-center justify-between rounded-xl bg-white/5 px-3 py-2"
                >
                  <span className="truncate text-sm font-medium text-white">{t.title}</span>
                  <span className="shrink-0 text-xs text-slate-500">
                    {formatDueDate(t.dueDate)}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </GlassCard>
      </div>

      <TaskModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </div>
  )
}
