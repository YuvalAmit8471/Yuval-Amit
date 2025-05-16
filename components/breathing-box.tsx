"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"

export function BreathingBox() {
  const [breathState, setBreathState] = useState<"inhale" | "hold" | "exhale">("inhale")
  const [counter, setCounter] = useState(4)

  useEffect(() => {
    const timer = setInterval(() => {
      setCounter((prev) => {
        if (prev === 1) {
          // Change breath state
          if (breathState === "inhale") {
            setBreathState("hold")
            return 7 // Hold for 7 seconds
          } else if (breathState === "hold") {
            setBreathState("exhale")
            return 8 // Exhale for 8 seconds
          } else {
            setBreathState("inhale")
            return 4 // Inhale for 4 seconds
          }
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [breathState, counter])

  const boxVariants = {
    inhale: {
      scale: 1.5,
      borderColor: "#ef4444",
      transition: { duration: 4, ease: "easeInOut" },
    },
    hold: {
      scale: 1.5,
      borderColor: "#f97316",
      transition: { duration: 0.5, ease: "easeInOut" },
    },
    exhale: {
      scale: 1,
      borderColor: "#dc2626",
      transition: { duration: 8, ease: "easeInOut" },
    },
  }

  const textContent = {
    inhale: "Inhale",
    hold: "Hold",
    exhale: "Exhale",
  }

  return (
    <div className="flex flex-col items-center mt-4 mb-6">
      <p className="text-center mb-4 text-zinc-300 font-medium">Follow the breath. Control the energy.</p>
      <div className="relative flex items-center justify-center">
        <motion.div
          className="w-20 h-20 border-2 rounded-md flex items-center justify-center"
          variants={boxVariants}
          animate={breathState}
        >
          <div className="text-center">
            <div className="text-sm font-bold">{textContent[breathState]}</div>
            <div className="text-xs">{counter}s</div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
