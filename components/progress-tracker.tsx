"use client"

import { useState, useEffect } from "react"

export function ProgressTracker() {
  const [currentDay, setCurrentDay] = useState(1)
  const totalDays = 30
  const progressPercentage = (currentDay / totalDays) * 100

  useEffect(() => {
    // Load progress from local storage
    const savedDay = localStorage.getItem("masculineEnergyDay")
    if (savedDay) {
      setCurrentDay(Number.parseInt(savedDay))
    }

    // For demo purposes, increment the day every 30 seconds
    const demoInterval = setInterval(() => {
      setCurrentDay((prev) => {
        const newDay = prev < totalDays ? prev + 1 : 1
        localStorage.setItem("masculineEnergyDay", newDay.toString())
        return newDay
      })
    }, 30000)

    return () => clearInterval(demoInterval)
  }, [])

  return (
    <div className="fixed top-0 left-0 right-0 h-1 bg-zinc-800 z-50">
      <div
        className="h-full bg-red-600 transition-all duration-500 ease-out"
        style={{ width: `${progressPercentage}%` }}
      />
      <div className="absolute top-1 right-2 text-xs text-zinc-400">
        Day {currentDay}/{totalDays}
      </div>
    </div>
  )
}
