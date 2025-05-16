"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Users } from "lucide-react"

export function JoinCounter() {
  const [totalCount, setTotalCount] = useState(7214)
  const [weeklyCount, setWeeklyCount] = useState(102)
  const [animateTotal, setAnimateTotal] = useState(false)
  const [animateWeekly, setAnimateWeekly] = useState(false)

  // Simulate occasional new joins
  useEffect(() => {
    const totalInterval = setInterval(() => {
      setTotalCount((prev) => {
        const newCount = prev + 1
        setAnimateTotal(true)
        setTimeout(() => setAnimateTotal(false), 1000)
        return newCount
      })

      // 30% chance to increment weekly count too
      if (Math.random() < 0.3) {
        setWeeklyCount((prev) => {
          const newCount = prev + 1
          setAnimateWeekly(true)
          setTimeout(() => setAnimateWeekly(false), 1000)
          return newCount
        })
      }
    }, 45000) // New join every ~45 seconds on average

    return () => clearInterval(totalInterval)
  }, [])

  return (
    <div className="flex items-center justify-center gap-2 mb-6 text-zinc-300">
      <Users className="h-4 w-4 text-red-500" />
      <div className="text-sm sm:text-base">
        <AnimatePresence mode="wait">
          {animateTotal ? (
            <motion.span
              key="animated-total"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="font-bold text-red-500"
            >
              {totalCount.toLocaleString()}
            </motion.span>
          ) : (
            <motion.span key="static-total" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="font-bold">
              {totalCount.toLocaleString()}
            </motion.span>
          )}
        </AnimatePresence>{" "}
        men have already joined.{" "}
        <AnimatePresence mode="wait">
          {animateWeekly ? (
            <motion.span
              key="animated-weekly"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="font-bold text-red-500"
            >
              {weeklyCount}
            </motion.span>
          ) : (
            <motion.span key="static-weekly" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="font-bold">
              {weeklyCount}
            </motion.span>
          )}
        </AnimatePresence>{" "}
        joined this week.
      </div>
    </div>
  )
}
