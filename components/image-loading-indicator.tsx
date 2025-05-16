"use client"

import { useImageLoading } from "@/app/loading-state"
import { useEffect, useState } from "react"

export function ImageLoadingIndicator() {
  const { loadingProgress, loadingComplete } = useImageLoading()
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    if (loadingComplete) {
      // Fade out the indicator after loading completes
      const timer = setTimeout(() => {
        setVisible(false)
      }, 500)
      return () => clearTimeout(timer)
    }
  }, [loadingComplete])

  if (!visible) return null

  return (
    <div
      className={`fixed bottom-4 right-4 bg-zinc-800 border border-zinc-700 rounded-lg p-3 z-50 shadow-lg transition-opacity duration-500 ${loadingComplete ? "opacity-0" : "opacity-100"}`}
    >
      <div className="flex items-center gap-3">
        <div className="w-32 h-2 bg-zinc-700 rounded-full overflow-hidden">
          <div
            className="h-full bg-red-600 transition-all duration-300 ease-out"
            style={{ width: `${loadingProgress}%` }}
          />
        </div>
        <span className="text-xs text-zinc-400">{loadingProgress}%</span>
      </div>
    </div>
  )
}
