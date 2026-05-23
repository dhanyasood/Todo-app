import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import { useTodos } from '../../context/TodoContext'

export default function TaskModal({ open, onClose, editTask = null }) {
  const { emptyTask, addTodo, updateTodo } = useTodos()
  const [form, setForm] = useState(emptyTask)

  useEffect(() => {
    if (editTask) {
      setForm({
        title: editTask.title,
        description: editTask.description,
        priority: editTask.priority,
        category: editTask.category,
        dueDate: editTask.dueDate?.slice(0, 10) ?? '',
      })
    } else {
      setForm(emptyTask)
    }
  }, [editTask, open, emptyTask])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!form.title.trim()) return
    if (editTask) {
      updateTodo(editTask.id, form)
    } else {
      addTodo(form)
    }
    onClose()
  }

  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }))

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/70 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed top-1/2 left-1/2 z-[101] w-[calc(100%-2rem)] max-w-lg -translate-x-1/2 -translate-y-1/2"
            role="dialog"
            aria-modal="true"
            aria-labelledby="task-modal-title"
          >
            <div className="glass-strong rounded-3xl p-6 shadow-2xl shadow-pink-500/20">
              <div className="mb-6 flex items-center justify-between">
                <h2 id="task-modal-title" className="text-xl font-bold text-white">
                  {editTask ? 'Edit Task' : 'New Task'}
                </h2>
                <button
                  type="button"
                  onClick={onClose}
                  className="rounded-xl p-2 text-slate-400 hover:bg-white/10 hover:text-white"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="mb-1.5 block text-xs font-medium text-slate-400">
                    Title
                  </label>
                  <input
                    required
                    value={form.title}
                    onChange={set('title')}
                    className="w-full rounded-xl border border-pink-500/20 bg-neutral-900 px-4 py-3 text-pink-100 outline-none focus:border-pink-500/50 focus:ring-2 focus:ring-pink-500/20"
                    placeholder="Task title"
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-xs font-medium text-slate-400">
                    Description
                  </label>
                  <textarea
                    value={form.description}
                    onChange={set('description')}
                    rows={3}
                    className="w-full resize-none rounded-xl border border-pink-500/20 bg-neutral-900 px-4 py-3 text-pink-100 outline-none focus:border-pink-500/50 focus:ring-2 focus:ring-pink-500/20"
                    placeholder="Optional details"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="mb-1.5 block text-xs font-medium text-slate-400">
                      Priority
                    </label>
                    <select
                      value={form.priority}
                      onChange={set('priority')}
                      className="w-full rounded-xl border border-pink-500/20 bg-neutral-900 px-4 py-3 text-pink-100 outline-none focus:border-pink-500/50"
                    >
                      <option value="high">High</option>
                      <option value="medium">Medium</option>
                      <option value="low">Low</option>
                    </select>
                  </div>
                  <div>
                    <label className="mb-1.5 block text-xs font-medium text-slate-400">
                      Category
                    </label>
                    <input
                      value={form.category}
                      onChange={set('category')}
                      className="w-full rounded-xl border border-pink-500/20 bg-neutral-900 px-4 py-3 text-pink-100 outline-none focus:border-pink-500/50"
                      placeholder="e.g. Work"
                    />
                  </div>
                </div>
                <div>
                  <label className="mb-1.5 block text-xs font-medium text-slate-400">
                    Due Date
                  </label>
                  <input
                    type="date"
                    value={form.dueDate}
                    onChange={set('dueDate')}
                    className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none focus:border-pink-500/50"
                  />
                </div>
                <button
                  type="submit"
                  className="btn-primary w-full py-3.5"
                >
                  {editTask ? 'Save Changes' : 'Create Task'}
                </button>
              </form>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
