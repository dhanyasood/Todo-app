import { useEffect, useState, useCallback } from 'react'
import { Play, Pause, RotateCcw } from 'lucide-react'
import { motion } from 'framer-motion'
import { useTodos } from '../context/TodoContext'
import GlassCard from '../components/ui/GlassCard'

const WORK = 25 * 60
const BREAK = 5 * 60

export default function Focus() {
  const { todos, activeFocusId, setActiveFocusId } = useTodos()
  const [seconds, setSeconds] = useState(WORK)
  const [running, setRunning] = useState(false)
  const [mode, setMode] = useState('work')

  const activeTask = todos.find((t) => t.id === activeFocusId) ?? todos.find((t) => !t.completed)

  const reset = useCallback(() => {
    setRunning(false)
    setSeconds(mode === 'work' ? WORK : BREAK)
  }, [mode])

  useEffect(() => {
    if (!running) return
    const id = setInterval(() => {
      setSeconds((s) => {
        if (s <= 1) {
          setRunning(false)
          const next = mode === 'work' ? 'break' : 'work'
          setMode(next)
          return next === 'work' ? WORK : BREAK
        }
        return s - 1
      })
    }, 1000)
    return () => clearInterval(id)
  }, [running, mode])

  const mins = String(Math.floor(seconds / 60)).padStart(2, '0')
  const secs = String(seconds % 60).padStart(2, '0')
  const total = mode === 'work' ? WORK : BREAK
  const progress = ((total - seconds) / total) * 100

  return (
    <div className="mx-auto flex max-w-2xl flex-col items-center space-y-8 py-8">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-white sm:text-3xl">Focus Mode</h1>
        <p className="text-slate-400">Pomodoro · {mode === 'work' ? '25 min work' : '5 min break'}</p>
      </div>

      <GlassCard className="w-full p-8 text-center">
        <p className="mb-2 text-sm uppercase tracking-widest text-pink-400">
          {mode === 'work' ? 'Focus' : 'Break'}
        </p>
        <motion.p
          key={seconds}
          className="mb-6 font-mono text-7xl font-bold text-white sm:text-8xl"
        >
          {mins}:{secs}
        </motion.p>
        <div className="mx-auto mb-8 h-2 max-w-xs overflow-hidden rounded-full bg-white/10">
          <div
            className="h-full rounded-full bg-gradient-to-r from-pink-600 to-rose-500 shadow-[0_0_12px_rgba(236,72,153,0.5)] transition-all duration-1000"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="flex justify-center gap-3">
          <button
            type="button"
            onClick={() => setRunning((r) => !r)}
            className="btn-primary flex items-center gap-2 px-6 py-3"
          >
            {running ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
            {running ? 'Pause' : 'Start'}
          </button>
          <button
            type="button"
            onClick={reset}
            className="flex items-center gap-2 rounded-2xl border border-white/10 px-6 py-3 text-slate-300 hover:bg-white/5"
          >
            <RotateCcw className="h-5 w-5" />
            Reset
          </button>
        </div>
      </GlassCard>

      <GlassCard className="w-full p-6">
        <label className="mb-2 block text-sm text-slate-400">Active task</label>
        {todos.filter((t) => !t.completed).length === 0 ? (
          <p className="text-slate-500">Create a task to focus on</p>
        ) : (
          <>
            <select
              value={activeFocusId ?? activeTask?.id ?? ''}
              onChange={(e) => setActiveFocusId(e.target.value || null)}
              className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none focus:border-pink-500/50"
            >
              {todos
                .filter((t) => !t.completed)
                .map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.title}
                  </option>
                ))}
            </select>
            {activeTask && (
              <p className="mt-4 text-lg font-medium text-white">{activeTask.title}</p>
            )}
          </>
        )}
      </GlassCard>
    </div>
  )
}
