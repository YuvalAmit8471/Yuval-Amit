"use client"

import { Flame } from "lucide-react"
import { motion } from "framer-motion"
import { useTheme } from "./theme-context"

export function FireModeToggle() {
  const { fireMode, toggleFireMode } = useTheme()

  return (
    <motion.button
      whileTap={{ scale: 0.95 }}
      onClick={toggleFireMode}
      className={`fixed top-20 right-4 z-50 p-3 rounded-full transition-all duration-300 ${
        fireMode
          ? "bg-gradient-to-r from-red-600 to-orange-500 shadow-lg shadow-red-600/30"
          : "bg-zinc-800 hover:bg-zinc-700"
      }`}
      aria-label="Toggle Fire Mode"
    >
      <Flame
        className={`h-6 w-6 ${fireMode ? "text-white" : "text-red-500"}`}
        style={{
          filter: fireMode ? "drop-shadow(0 0 5px rgba(239, 68, 68, 0.5))" : "none",
        }}
      />
      {fireMode && (
        <div className="absolute inset-0 rounded-full overflow-hidden pointer-events-none">
          <FireParticles />
        </div>
      )}
    </motion.button>
  )
}

function FireParticles() {
  return (
    <>
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute bottom-0 left-1/2 w-2 h-2 rounded-full bg-orange-500 opacity-0"
          initial={{ y: 0, x: 0, opacity: 0 }}
          animate={{
            y: -30 - Math.random() * 20,
            x: (Math.random() - 0.5) * 30,
            opacity: [0, 0.8, 0],
          }}
          transition={{
            duration: 1.5 + Math.random(),
            repeat: Number.POSITIVE_INFINITY,
            delay: i * 0.2,
          }}
        />
      ))}
    </>
  )
}
