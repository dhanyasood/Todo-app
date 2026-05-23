export function formatDueDate(iso) {
  if (!iso) return null
  const d = new Date(iso)
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const due = new Date(d)
  due.setHours(0, 0, 0, 0)
  const diff = (due - today) / 86400000
  if (diff < 0) return 'Overdue'
  if (diff === 0) return 'Due Today'
  if (diff === 1) return 'Due Tomorrow'
  return d.toLocaleDateString(undefined, { month: 'short', day: 'numeric' })
}

export function isOverdue(iso) {
  if (!iso) return false
  const due = new Date(iso)
  due.setHours(23, 59, 59, 999)
  return due < new Date()
}

export function startOfMonth(date) {
  return new Date(date.getFullYear(), date.getMonth(), 1)
}

export function daysInMonth(year, month) {
  return new Date(year, month + 1, 0).getDate()
}

export function getWeekDates() {
  const dates = []
  const now = new Date()
  for (let i = 6; i >= 0; i--) {
    const d = new Date(now)
    d.setDate(d.getDate() - i)
    dates.push(d.toISOString().slice(0, 10))
  }
  return dates
}
