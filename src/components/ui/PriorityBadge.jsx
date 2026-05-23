const styles = {
  high: 'bg-red-500/20 text-red-300 ring-red-500/40',
  medium: 'bg-amber-500/20 text-amber-300 ring-amber-500/40',
  low: 'bg-emerald-500/20 text-emerald-300 ring-emerald-500/40',
}

export default function PriorityBadge({ priority }) {
  const label = priority?.charAt(0).toUpperCase() + priority?.slice(1) || 'Medium'
  return (
    <span
      className={`inline-flex rounded-lg px-2 py-0.5 text-xs font-semibold ring-1 ${styles[priority] || styles.medium}`}
    >
      {label}
    </span>
  )
}
