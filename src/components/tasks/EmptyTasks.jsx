import { motion } from 'framer-motion'
import { Plus, Sparkles } from 'lucide-react'

export default function EmptyTasks({ onCreate }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-strong flex flex-col items-center rounded-3xl px-6 py-16 text-center"
    >
      <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-3xl bg-gradient-to-br from-pink-500/20 to-pink-600/20 ring-1 ring-pink-500/30">
        <Sparkles className="h-12 w-12 text-pink-300" />
      </div>
      <h2 className="text-glow-pink mb-2 text-2xl font-bold text-pink-300">No tasks yet</h2>
      <p className="mb-8 max-w-sm text-neutral-500">
        Start building momentum. Create your first task and track your productivity.
      </p>
      <button
        type="button"
        onClick={onCreate}
        className="btn-primary flex items-center gap-2 px-6 py-3.5"
      >
        <Plus className="h-5 w-5" />
        Create First Task
      </button>
    </motion.div>
  )
}
