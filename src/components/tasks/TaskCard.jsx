import { motion } from 'framer-motion'
import { GripVertical, Pencil, Trash2, Calendar } from 'lucide-react'
import PriorityBadge from '../ui/PriorityBadge'
import { formatDueDate, isOverdue } from '../../utils/date'

export default function TaskCard({
  task,
  index,
  onToggle,
  onEdit,
  onDelete,
  onDragStart,
  onDragOver,
  onDrop,
}) {
  const dueLabel = formatDueDate(task.dueDate)
  const overdue = !task.completed && isOverdue(task.dueDate)

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ delay: index * 0.03 }}
      draggable
      onDragStart={(e) => onDragStart(e, index)}
      onDragOver={(e) => {
        e.preventDefault()
        onDragOver(index)
      }}
      onDrop={(e) => onDrop(e, index)}
      className={`glass group flex gap-3 rounded-2xl p-4 transition ${
        task.completed ? 'opacity-60' : ''
      } ${overdue ? 'ring-1 ring-red-500/40' : 'hover:ring-1 hover:ring-pink-500/30'}`}
    >
      <button
        type="button"
        className="cursor-grab self-center text-slate-600 active:cursor-grabbing"
        aria-label="Drag to reorder"
        onMouseDown={(e) => e.stopPropagation()}
      >
        <GripVertical className="h-5 w-5" />
      </button>

      <button
        type="button"
        onClick={() => onToggle(task.id)}
        className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 transition ${
          task.completed
            ? 'border-pink-500 bg-pink-500 text-white'
            : 'border-slate-500 hover:border-pink-400'
        }`}
        aria-label={task.completed ? 'Mark incomplete' : 'Mark complete'}
      >
        {task.completed && (
          <motion.svg
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="h-3.5 w-3.5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={3}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </motion.svg>
        )}
      </button>

      <div className="min-w-0 flex-1">
        <div className="mb-1 flex flex-wrap items-center gap-2">
          <PriorityBadge priority={task.priority} />
          <span className="rounded-lg bg-pink-500/15 px-2 py-0.5 text-xs text-pink-300">
            {task.category}
          </span>
        </div>
        <h3
          className={`font-semibold ${task.completed ? 'text-neutral-600 line-through' : 'text-glow-pink-sm text-pink-200'}`}
        >
          {task.title}
        </h3>
        {task.description && (
          <p className="mt-1 line-clamp-2 text-sm text-slate-400">{task.description}</p>
        )}
        {dueLabel && (
          <p
            className={`mt-2 flex items-center gap-1 text-xs ${overdue ? 'text-red-400' : 'text-slate-500'}`}
          >
            <Calendar className="h-3.5 w-3.5" />
            {dueLabel}
          </p>
        )}
      </div>

      <div className="flex shrink-0 flex-col gap-1 opacity-100 sm:opacity-0 sm:group-hover:opacity-100">
        <button
          type="button"
          onClick={() => onEdit(task)}
          className="rounded-lg p-2 text-slate-400 hover:bg-white/10 hover:text-pink-300"
          aria-label="Edit"
        >
          <Pencil className="h-4 w-4" />
        </button>
        <button
          type="button"
          onClick={() => onDelete(task.id)}
          className="rounded-lg p-2 text-slate-400 hover:bg-red-500/10 hover:text-red-400"
          aria-label="Delete"
        >
          <Trash2 className="h-4 w-4" />
        </button>
      </div>
    </motion.div>
  )
}
