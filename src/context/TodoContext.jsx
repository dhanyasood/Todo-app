import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import {
  ACHIEVEMENTS,
  levelFromXp,
  updateStreak,
  xpProgress,
  todayKey,
} from '../utils/gamification'
import { loadGamification, loadTodos, saveGamification, saveTodos } from '../utils/storage'

const TodoContext = createContext(null)

const emptyTask = {
  title: '',
  description: '',
  priority: 'medium',
  category: 'General',
  dueDate: '',
}

export function TodoProvider({ children }) {
  const [todos, setTodos] = useState(loadTodos)
  const [gamification, setGamification] = useState(loadGamification)
  const [activeFocusId, setActiveFocusId] = useState(null)

  useEffect(() => {
    saveTodos(todos)
  }, [todos])

  useEffect(() => {
    saveGamification(gamification)
  }, [gamification])

  const stats = useMemo(() => {
    const total = todos.length
    const completed = todos.filter((t) => t.completed).length
    const pending = total - completed
    const today = todayKey()
    const completedToday = todos.filter(
      (t) => t.completed && t.createdAt?.slice(0, 10) <= today,
    ).length
    const productivity =
      total === 0 ? 0 : Math.round((completed / total) * 100)
    return { total, completed, pending, completedToday, productivity }
  }, [todos])

  const awardXp = useCallback((amount, totalCompleted) => {
    setGamification((prev) => {
      const streakUpdate = updateStreak(prev.lastActiveDate, prev.streak)
      const newXp = prev.xp + amount
      const level = levelFromXp(newXp)
      const snapshot = {
        totalCompleted,
        streak: streakUpdate.streak,
        level,
      }
      const unlocked = ACHIEVEMENTS.filter(
        (a) => !prev.achievements.includes(a.id) && a.check(snapshot),
      ).map((a) => a.id)
      return {
        ...prev,
        xp: newXp + unlocked.reduce((s, id) => {
          const ach = ACHIEVEMENTS.find((x) => x.id === id)
          return s + (ach?.xp ?? 0)
        }, 0),
        level: levelFromXp(
          newXp + unlocked.reduce((s, id) => {
            const ach = ACHIEVEMENTS.find((x) => x.id === id)
            return s + (ach?.xp ?? 0)
          }, 0),
        ),
        ...streakUpdate,
        achievements: [...prev.achievements, ...unlocked],
      }
    })
  }, [])

  const addTodo = useCallback((fields) => {
    const todo = {
      id: crypto.randomUUID(),
      title: fields.title.trim(),
      description: fields.description?.trim() ?? '',
      priority: fields.priority ?? 'medium',
      category: fields.category?.trim() || 'General',
      dueDate: fields.dueDate || null,
      completed: false,
      order: Date.now(),
      createdAt: new Date().toISOString(),
    }
    setTodos((prev) => [...prev, todo])
    setGamification((prev) => {
      const streakUpdate = updateStreak(prev.lastActiveDate, prev.streak)
      return { ...prev, ...streakUpdate }
    })
    return todo
  }, [])

  const updateTodo = useCallback((id, fields) => {
    setTodos((prev) =>
      prev.map((t) =>
        t.id === id
          ? {
              ...t,
              title: fields.title?.trim() ?? t.title,
              description: fields.description?.trim() ?? t.description,
              priority: fields.priority ?? t.priority,
              category: fields.category?.trim() || t.category,
              dueDate: fields.dueDate !== undefined ? fields.dueDate || null : t.dueDate,
            }
          : t,
      ),
    )
  }, [])

  const toggleTodo = useCallback(
    (id) => {
      setTodos((prev) => {
        const todo = prev.find((t) => t.id === id)
        if (!todo) return prev
        const willComplete = !todo.completed
        const next = prev.map((t) =>
          t.id === id ? { ...t, completed: !t.completed } : t,
        )
        if (willComplete) {
          const completedCount = next.filter((t) => t.completed).length
          awardXp(15, completedCount)
        }
        return next
      })
    },
    [awardXp],
  )

  const deleteTodo = useCallback((id) => {
    setTodos((prev) => prev.filter((t) => t.id !== id))
  }, [])

  const reorderTodos = useCallback((fromIndex, toIndex) => {
    setTodos((prev) => {
      const sorted = [...prev].sort((a, b) => a.order - b.order)
      const [moved] = sorted.splice(fromIndex, 1)
      sorted.splice(toIndex, 0, moved)
      return sorted.map((t, i) => ({ ...t, order: i }))
    })
  }, [])

  const xpInfo = useMemo(() => xpProgress(gamification.xp), [gamification.xp])

  const value = {
    todos,
    stats,
    gamification,
    xpInfo,
    activeFocusId,
    setActiveFocusId,
    emptyTask,
    addTodo,
    updateTodo,
    toggleTodo,
    deleteTodo,
    reorderTodos,
  }

  return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>
}

export function useTodos() {
  const ctx = useContext(TodoContext)
  if (!ctx) throw new Error('useTodos must be used within TodoProvider')
  return ctx
}
