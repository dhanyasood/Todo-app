import { Target } from 'lucide-react'
import GlassCard from '../components/ui/GlassCard'

export default function Goals() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white sm:text-3xl">Goals</h1>
        <p className="text-slate-400">Set long-term objectives</p>
      </div>
      <GlassCard className="flex flex-col items-center px-6 py-16 text-center">
        <Target className="mb-4 h-16 w-16 text-pink-400" />
        <h2 className="text-xl font-semibold text-white">Coming soon</h2>
        <p className="mt-2 max-w-md text-slate-400">
          Goal tracking with milestones will be available in a future update.
        </p>
      </GlassCard>
    </div>
  )
}
