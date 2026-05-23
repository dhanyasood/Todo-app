const TODOS_KEY = 'todo-app:todos'
const GAMIFICATION_KEY = 'todo-app:gamification'

export function migrateTodo(todo) {
  if (todo?.title) {
    return {
      id: todo.id,
      title: todo.title,
      description: todo.description ?? '',
      completed: !!todo.completed,
      priority: todo.priority ?? 'medium',
      category: todo.category ?? 'General',
      dueDate: todo.dueDate ?? null,
      order: todo.order ?? 0,
      createdAt: todo.createdAt ?? new Date().toISOString(),
    }
  }
  return {
    id: todo.id ?? crypto.randomUUID(),
    title: todo.text ?? 'Untitled',
    description: '',
    completed: !!todo.completed,
    priority: 'medium',
    category: 'General',
    dueDate: null,
    order: todo.order ?? Date.now(),
    createdAt: new Date().toISOString(),
  }
}

export function loadTodos() {
  try {
    const raw = localStorage.getItem(TODOS_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? parsed.map(migrateTodo) : []
  } catch {
    return []
  }
}

export function saveTodos(todos) {
  try {
    localStorage.setItem(TODOS_KEY, JSON.stringify(todos))
  } catch {
    /* quota exceeded */
  }
}

const defaultGamification = {
  xp: 0,
  level: 1,
  streak: 0,
  lastActiveDate: null,
  achievements: [],
}

export function loadGamification() {
  try {
    const raw = localStorage.getItem(GAMIFICATION_KEY)
    return raw ? { ...defaultGamification, ...JSON.parse(raw) } : defaultGamification
  } catch {
    return defaultGamification
  }
}

export function saveGamification(data) {
  try {
    localStorage.setItem(GAMIFICATION_KEY, JSON.stringify(data))
  } catch {
    /* ignore */
  }
}
