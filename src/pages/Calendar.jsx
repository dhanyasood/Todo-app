import { useMemo, useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useTodos } from '../context/TodoContext'
import GlassCard from '../components/ui/GlassCard'
import { daysInMonth, startOfMonth } from '../utils/date'

const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

export default function Calendar() {
  const { todos } = useTodos()
  const [view, setView] = useState(() => new Date())

  const year = view.getFullYear()
  const month = view.getMonth()
  const first = startOfMonth(view)
  const startPad = first.getDay()
  const totalDays = daysInMonth(year, month)

  const byDate = useMemo(() => {
    const map = {}
    todos.forEach((t) => {
      if (!t.dueDate) return
      const key = t.dueDate.slice(0, 10)
      if (!map[key]) map[key] = []
      map[key].push(t)
    })
    return map
  }, [todos])

  const cells = []
  for (let i = 0; i < startPad; i++) cells.push(null)
  for (let d = 1; d <= totalDays; d++) cells.push(d)

  const monthTasks = todos.filter((t) => {
    if (!t.dueDate) return false
    const d = new Date(t.dueDate)
    return d.getFullYear() === year && d.getMonth() === month
  })

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white sm:text-3xl">Calendar</h1>
        <p className="text-slate-400">Tasks by due date</p>
      </div>

      <GlassCard className="p-4 sm:p-6">
        <div className="mb-6 flex items-center justify-between">
          <button
            type="button"
            onClick={() => setView(new Date(year, month - 1, 1))}
            className="rounded-xl p-2 hover:bg-white/10"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <h2 className="text-lg font-semibold text-white">
            {view.toLocaleString('default', { month: 'long', year: 'numeric' })}
          </h2>
          <button
            type="button"
            onClick={() => setView(new Date(year, month + 1, 1))}
            className="rounded-xl p-2 hover:bg-white/10"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>

        <div className="grid grid-cols-7 gap-1 text-center text-xs font-medium text-slate-500 sm:gap-2 sm:text-sm">
          {WEEKDAYS.map((d) => (
            <div key={d} className="py-2">
              {d}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-1 sm:gap-2">
          {cells.map((day, i) => {
            if (day === null) return <div key={`e-${i}`} />
            const key = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`
            const dayTasks = byDate[key] ?? []
            const isToday = key === new Date().toISOString().slice(0, 10)
            const hasOverdue = dayTasks.some(
              (t) => !t.completed && new Date(t.dueDate) < new Date(),
            )

            return (
              <div
                key={key}
                className={`min-h-[4.5rem] rounded-xl border p-1.5 text-left sm:min-h-[5.5rem] sm:p-2 ${
                  isToday
                    ? 'border-pink-500/50 bg-pink-500/15'
                    : 'border-white/5 bg-white/5'
                } ${hasOverdue ? 'ring-1 ring-red-500/40' : ''}`}
              >
                <span
                  className={`text-xs font-semibold sm:text-sm ${isToday ? 'text-pink-300' : 'text-slate-400'}`}
                >
                  {day}
                </span>
                <div className="mt-1 space-y-0.5">
                  {dayTasks.slice(0, 2).map((t) => (
                    <div
                      key={t.id}
                      className={`truncate rounded px-1 py-0.5 text-[10px] sm:text-xs ${
                        t.completed
                          ? 'bg-white/5 text-slate-500 line-through'
                          : 'bg-pink-500/30 text-pink-100'
                      }`}
                    >
                      {t.title}
                    </div>
                  ))}
                  {dayTasks.length > 2 && (
                    <span className="text-[10px] text-slate-500">+{dayTasks.length - 2}</span>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </GlassCard>

      <GlassCard className="p-6">
        <h3 className="mb-4 font-semibold text-white">This month</h3>
        {monthTasks.length === 0 ? (
          <p className="text-sm text-slate-500">No tasks with due dates this month</p>
        ) : (
          <ul className="space-y-2">
            {monthTasks.map((t) => (
              <li
                key={t.id}
                className="flex justify-between rounded-xl bg-white/5 px-3 py-2 text-sm"
              >
                <span className={t.completed ? 'text-slate-500 line-through' : 'text-white'}>
                  {t.title}
                </span>
                <span className="text-slate-500">{t.dueDate?.slice(0, 10)}</span>
              </li>
            ))}
          </ul>
        )}
      </GlassCard>
    </div>
  )
}
