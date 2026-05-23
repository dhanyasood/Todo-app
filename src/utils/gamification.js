export const ACHIEVEMENTS = [
  { id: 'first', name: 'First Step', icon: '🎯', xp: 10, check: (s) => s.totalCompleted >= 1 },
  { id: 'five', name: 'On a Roll', icon: '⚡', xp: 25, check: (s) => s.totalCompleted >= 5 },
  { id: 'ten', name: 'Task Master', icon: '🏆', xp: 50, check: (s) => s.totalCompleted >= 10 },
  { id: 'streak3', name: '3-Day Streak', icon: '🔥', xp: 30, check: (s) => s.streak >= 3 },
  { id: 'streak7', name: 'Week Warrior', icon: '💎', xp: 75, check: (s) => s.streak >= 7 },
  { id: 'level5', name: 'Level 5', icon: '⭐', xp: 0, check: (s) => s.level >= 5 },
]

export function xpForLevel(level) {
  return level * 100
}

export function levelFromXp(xp) {
  let level = 1
  while (xp >= xpForLevel(level)) {
    xp -= xpForLevel(level)
    level += 1
  }
  return level
}

export function xpProgress(xp) {
  const level = levelFromXp(xp)
  let remaining = xp
  for (let l = 1; l < level; l++) remaining -= xpForLevel(l)
  const needed = xpForLevel(level)
  return { level, current: remaining, needed, percent: Math.round((remaining / needed) * 100) }
}

export function todayKey() {
  return new Date().toISOString().slice(0, 10)
}

export function updateStreak(lastActiveDate, streak) {
  const today = todayKey()
  if (lastActiveDate === today) return { streak, lastActiveDate: today }
  const yesterday = new Date()
  yesterday.setDate(yesterday.getDate() - 1)
  const yKey = yesterday.toISOString().slice(0, 10)
  if (lastActiveDate === yKey) return { streak: streak + 1, lastActiveDate: today }
  return { streak: 1, lastActiveDate: today }
}
