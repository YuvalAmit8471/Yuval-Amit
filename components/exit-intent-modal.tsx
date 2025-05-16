"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useTheme } from "./theme-context"

export function ExitIntentModal() {
  const [isVisible, setIsVisible] = useState(false)
  const [hasTriggered, setHasTriggered] = useState(false)
  const { fireMode } = useTheme()

  useEffect(() => {
    // Only set up the exit intent detection if it hasn't been triggered yet
    if (hasTriggered) return

    const handleMouseLeave = (e: MouseEvent) => {
      // Only trigger when mouse moves to the top of the page
      if (e.clientY <= 5 && !hasTriggered) {
        setIsVisible(true)
        setHasTriggered(true)

        // Store in session storage to prevent showing again in this session
        sessionStorage.setItem("exitIntentShown", "true")
      }
    }

    // Check if we've already shown the modal in this session
    const hasShown = sessionStorage.getItem("exitIntentShown") === "true"
    if (!hasShown) {
      document.addEventListener("mouseleave", handleMouseLeave)
    } else {
      setHasTriggered(true)
    }

    return () => {
      document.removeEventListener("mouseleave", handleMouseLeave)
    }
  }, [hasTriggered])

  const handleClose = () => {
    setIsVisible(false)
  }

  const handleStay = () => {
    setIsVisible(false)

    // Scroll to the protocol section
    const protocolSection = document.getElementById("protocol")
    if (protocolSection) {
      protocolSection.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", damping: 20 }}
            className={`relative max-w-md w-full p-8 rounded-lg shadow-xl ${
              fireMode ? "fire-card border-2 border-red-600" : "bg-zinc-900 border-2 border-red-600"
            }`}
          >
            <button
              className="absolute top-4 right-4 text-zinc-400 hover:text-white"
              onClick={handleClose}
              aria-label="Close"
            >
              <X size={20} />
            </button>

            <h3 className={`text-2xl font-bold mb-6 text-center ${fireMode ? "fire-text" : "text-red-600"}`}>
              Are you walking away from your power again?
            </h3>

            <p className="text-zinc-300 mb-8 text-center">
              Most men never take the step to reclaim their masculine energy. They stay trapped in patterns of weakness
              and frustration.
            </p>

            <div className="flex justify-center">
              <Button
                onClick={handleStay}
                className={`px-6 py-3 text-lg font-medium ${fireMode ? "fire-button" : "bg-red-700 hover:bg-red-800"}`}
              >
                No. I'm Ready.
              </Button>
            </div>

            <p className="text-xs text-zinc-500 mt-6 text-center">
              Your journey to masculine power is one decision away.
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
