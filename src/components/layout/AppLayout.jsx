import { useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import Navbar from './Navbar'
import Sidebar from './Sidebar'

export default function AppLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const location = useLocation()

  return (
    <div className="app-bg relative min-h-screen">
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="glow-orb absolute -top-32 -left-32 h-96 w-96 rounded-full" />
        <div className="glow-orb absolute top-1/3 -right-24 h-80 w-80 rounded-full" />
        <div className="glow-orb absolute bottom-0 left-1/3 h-72 w-72 rounded-full opacity-80" />
      </div>

      <Navbar onMenuClick={() => setSidebarOpen(true)} />
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <main className="relative pt-16 lg:pl-64">
        <div className="min-h-[calc(100vh-4rem)] p-4 sm:p-6 lg:p-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
            >
              <Outlet />
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
    </div>
  )
}
