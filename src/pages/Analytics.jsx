import { useMemo } from 'react'
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts'
import { useTodos } from '../context/TodoContext'
import GlassCard from '../components/ui/GlassCard'
import { getWeekDates } from '../utils/date'

const COLORS = ['#f472b6', '#ec4899', '#db2777', '#fb7185', '#fda4af']
const TOOLTIP_STYLE = {
  background: '#0a0a0a',
  border: '1px solid rgba(236, 72, 153, 0.3)',
  borderRadius: '12px',
}

export default function Analytics() {
  const { todos, stats } = useTodos()

  const weeklyData = useMemo(() => {
    const dates = getWeekDates()
    return dates.map((date) => {
      const completed = todos.filter(
        (t) => t.completed && t.createdAt?.slice(0, 10) === date,
      ).length
      const label = new Date(date).toLocaleDateString(undefined, { weekday: 'short' })
      return { name: label, completed, date }
    })
  }, [todos])

  const trendData = useMemo(() => {
    let cumulative = 0
    return weeklyData.map((d) => {
      cumulative += d.completed
      return { ...d, productivity: cumulative }
    })
  }, [weeklyData])

  const categoryData = useMemo(() => {
    const map = {}
    todos.forEach((t) => {
      const c = t.category || 'General'
      map[c] = (map[c] || 0) + 1
    })
    return Object.entries(map).map(([name, value]) => ({ name, value }))
  }, [todos])

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white sm:text-3xl">Analytics</h1>
        <p className="text-slate-400">Insights into your productivity</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <GlassCard className="p-4">
          <p className="text-sm text-slate-400">Completion rate</p>
          <p className="text-glow-pink text-3xl font-bold text-pink-400">{stats.productivity}%</p>
        </GlassCard>
        <GlassCard className="p-4">
          <p className="text-sm text-slate-400">Total completed</p>
          <p className="text-glow-pink-sm text-3xl font-bold text-pink-400">{stats.completed}</p>
        </GlassCard>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <GlassCard className="p-6">
          <h2 className="mb-4 font-semibold text-white">Completed this week</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={weeklyData}>
                <XAxis dataKey="name" stroke="#64748b" fontSize={12} />
                <YAxis stroke="#64748b" fontSize={12} allowDecimals={false} />
                <Tooltip contentStyle={TOOLTIP_STYLE} />
                <Bar dataKey="completed" fill="#ec4899" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </GlassCard>

        <GlassCard className="p-6">
          <h2 className="mb-4 font-semibold text-white">Productivity trend</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={trendData}>
                <XAxis dataKey="name" stroke="#64748b" fontSize={12} />
                <YAxis stroke="#64748b" fontSize={12} allowDecimals={false} />
                <Tooltip contentStyle={TOOLTIP_STYLE} />
                <Line
                  type="monotone"
                  dataKey="productivity"
                  stroke="#f472b6"
                  strokeWidth={2}
                  dot={{ fill: '#fda4af' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </GlassCard>

        <GlassCard className="p-6 lg:col-span-2">
          <h2 className="mb-4 font-semibold text-white">Category distribution</h2>
          <div className="mx-auto h-72 max-w-md">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  label={({ name, percent }) =>
                    `${name} ${(percent * 100).toFixed(0)}%`
                  }
                >
                  {categoryData.map((_, i) => (
                    <Cell key={i} fill={COLORS[i % COLORS.length]} />
                  ))}
                </Pie>
                <Legend />
                <Tooltip contentStyle={TOOLTIP_STYLE} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          {categoryData.length === 0 && (
            <p className="text-center text-sm text-slate-500">Add tasks to see distribution</p>
          )}
        </GlassCard>
      </div>
    </div>
  )
}
