# Todos — Productivity Dashboard

A premium-style todo and productivity app built with React, Vite, and Tailwind CSS.

## Features

- **Dashboard** — stats, today's progress, upcoming tasks
- **My Tasks** — cards with priority, category, due dates, drag-and-drop
- **Calendar** — monthly view with tasks by date
- **Analytics** — charts (Recharts)
- **Focus Mode** — Pomodoro timer (25/5)
- **Gamification** — XP, levels, streaks, achievements
- **Dark purple/blue** glassmorphism UI with Framer Motion

## Stack

- React 19 + Vite
- Tailwind CSS v4
- React Router
- Framer Motion
- Recharts
- Lucide React

## Commands

```bash
npm install
npm run dev      # http://localhost:5173
npm run build
npm run preview
```

## Project structure

```
src/
├── components/
│   ├── layout/     # Navbar, Sidebar, AppLayout
│   ├── tasks/      # TaskCard, TaskModal, EmptyTasks
│   ├── gamification/
│   └── ui/         # GlassCard, PriorityBadge, Skeleton
├── context/        # TodoProvider, ThemeProvider
├── pages/          # Route pages
└── utils/          # storage, gamification, date helpers
```
