"use client"

import { useState, useEffect } from "react"
import { X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

const reflectionPrompts = [
  "What are you avoiding right now?",
  "Is this how a king would act?",
  "Where are you leaking energy?",
  "What would your highest self do?",
  "Are you living with purpose or distraction?",
  "What fear is holding you back?",
  "Are you in your masculine or feminine energy?",
  "What boundaries need to be set?",
  "Are you leading or following?",
  "What discipline have you neglected today?",
]

export function ReflectionModal() {
  const [isOpen, setIsOpen] = useState(false)
  const [currentPrompt, setCurrentPrompt] = useState("")
  const [userActive, setUserActive] = useState(true)
  const inactivityTime = 45000 // 45 seconds

  // Reset the inactivity timer when user interacts
  const resetTimer = () => {
    setUserActive(true)
  }

  // Show a random prompt
  const showRandomPrompt = () => {
    const randomIndex = Math.floor(Math.random() * reflectionPrompts.length)
    setCurrentPrompt(reflectionPrompts[randomIndex])
    setIsOpen(true)
  }

  useEffect(() => {
    // Set up event listeners for user activity
    const events = ["mousedown", "mousemove", "keypress", "scroll", "touchstart"]
    events.forEach((event) => {
      window.addEventListener(event, resetTimer)
    })

    // Set up inactivity timer
    const inactivityTimer = setInterval(() => {
      if (!userActive) {
        showRandomPrompt()
      }
      setUserActive(false)
    }, inactivityTime)

    return () => {
      // Clean up event listeners and timer
      events.forEach((event) => {
        window.removeEventListener(event, resetTimer)
      })
      clearInterval(inactivityTimer)
    }
  }, [userActive])

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80"
          onClick={() => setIsOpen(false)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", damping: 20 }}
            className="relative bg-zinc-900 p-8 rounded-lg border-2 border-red-600 max-w-md w-full shadow-lg shadow-red-900/20"
            onClick={(e) => e.stopPropagation()}
          >
            <button className="absolute top-2 right-2 text-zinc-400 hover:text-white" onClick={() => setIsOpen(false)}>
              <X size={20} />
            </button>
            <h3 className="text-xl font-bold mb-4 text-center text-red-500">Masculine Reflection</h3>
            <p className="text-2xl font-bold text-center text-white mb-6">{currentPrompt}</p>
            <div className="flex justify-center">
              <button
                className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 rounded-md text-sm font-medium transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Reflect Later
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
