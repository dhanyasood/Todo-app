import { motion } from 'framer-motion'

export default function GlassCard({
  children,
  className = '',
  hover = false,
  ...props
}) {
  const Comp = hover ? motion.div : 'div'
  const motionProps = hover
    ? {
        whileHover: { y: -2, scale: 1.01 },
        transition: { type: 'spring', stiffness: 400, damping: 25 },
      }
    : {}

  return (
    <Comp
      className={`glass-strong rounded-2xl ${className}`}
      {...motionProps}
      {...props}
    >
      {children}
    </Comp>
  )
}
