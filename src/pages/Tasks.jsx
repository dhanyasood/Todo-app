import { useMemo, useState } from 'react'
import { Plus } from 'lucide-react'
import { AnimatePresence } from 'framer-motion'
import { useTodos } from '../context/TodoContext'
import TaskCard from '../components/tasks/TaskCard'
import TaskModal from '../components/tasks/TaskModal'
import EmptyTasks from '../components/tasks/EmptyTasks'

export default function Tasks() {
  const { todos, toggleTodo, deleteTodo, reorderTodos } = useTodos()
  const [modalOpen, setModalOpen] = useState(false)
  const [editTask, setEditTask] = useState(null)
  const [filter, setFilter] = useState('all')
  const [dragIndex, setDragIndex] = useState(null)

  const sorted = useMemo(
    () => [...todos].sort((a, b) => a.order - b.order),
    [todos],
  )

  const filtered = useMemo(() => {
    if (filter === 'active') return sorted.filter((t) => !t.completed)
    if (filter === 'completed') return sorted.filter((t) => t.completed)
    return sorted
  }, [sorted, filter])

  const openCreate = () => {
    setEditTask(null)
    setModalOpen(true)
  }

  const openEdit = (task) => {
    setEditTask(task)
    setModalOpen(true)
  }

  const closeModal = () => {
    setModalOpen(false)
    setEditTask(null)
  }

  const handleDragStart = (e, index) => {
    setDragIndex(index)
    e.dataTransfer.effectAllowed = 'move'
  }

  const handleDragOver = () => {}

  const handleDrop = (e, dropIndex) => {
    e.preventDefault()
    if (dragIndex === null || dragIndex === dropIndex) return
    const fromGlobal = sorted.findIndex((t) => t.id === filtered[dragIndex]?.id)
    const toGlobal = sorted.findIndex((t) => t.id === filtered[dropIndex]?.id)
    if (fromGlobal >= 0 && toGlobal >= 0) reorderTodos(fromGlobal, toGlobal)
    setDragIndex(null)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white sm:text-3xl">My Tasks</h1>
          <p className="text-slate-400">{filtered.length} tasks</p>
        </div>
        <button
          type="button"
          onClick={openCreate}
          className="btn-primary flex items-center gap-2 px-5 py-2.5 text-sm"
        >
          <Plus className="h-4 w-4" />
          Add Task
        </button>
      </div>

      {todos.length > 0 && (
        <div className="flex gap-2">
          {['all', 'active', 'completed'].map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => setFilter(f)}
              className={`rounded-xl px-4 py-2 text-sm font-medium capitalize transition ${
                filter === f
                  ? 'bg-pink-500/25 text-pink-200 ring-1 ring-pink-500/40'
                  : 'text-slate-400 hover:bg-white/5'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      )}

      {filtered.length === 0 ? (
        <EmptyTasks onCreate={openCreate} />
      ) : (
        <div className="space-y-3">
          <AnimatePresence>
            {filtered.map((task, index) => (
              <TaskCard
                key={task.id}
                task={task}
                index={index}
                onToggle={toggleTodo}
                onEdit={openEdit}
                onDelete={deleteTodo}
                onDragStart={handleDragStart}
                onDragOver={handleDragOver}
                onDrop={handleDrop}
              />
            ))}
          </AnimatePresence>
        </div>
      )}

      <TaskModal open={modalOpen} onClose={closeModal} editTask={editTask} />
    </div>
  )
}
