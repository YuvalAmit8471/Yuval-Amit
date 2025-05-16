"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

type ThemeContextType = {
  fireMode: boolean
  toggleFireMode: () => void
}

const ThemeContext = createContext<ThemeContextType>({
  fireMode: false,
  toggleFireMode: () => {},
})

export const useTheme = () => useContext(ThemeContext)

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [fireMode, setFireMode] = useState(false)

  const toggleFireMode = () => {
    setFireMode((prev) => !prev)
  }

  // Apply fire mode class to body
  useEffect(() => {
    if (fireMode) {
      document.body.classList.add("fire-mode")
    } else {
      document.body.classList.remove("fire-mode")
    }

    // Add fire mode styles
    const styleElement = document.createElement("style")
    styleElement.id = "fire-mode-styles"
    styleElement.textContent = `
      .fire-mode {
        --primary-color: #ef4444;
        --primary-glow: 0 0 20px rgba(239, 68, 68, 0.7);
        --secondary-color: #f97316;
        --accent-color: #f59e0b;
      }
      
      .fire-mode .fire-text {
        background: linear-gradient(to right, #ef4444, #f97316, #f59e0b);
        -webkit-background-clip: text;
        background-clip: text;
        color: transparent;
        text-shadow: 0 0 10px rgba(239, 68, 68, 0.3);
        animation: pulse-fire 3s infinite;
      }
      
      .fire-mode .fire-button {
        background: linear-gradient(to right, #ef4444, #b91c1c);
        box-shadow: 0 0 15px rgba(239, 68, 68, 0.5);
        transition: all 0.3s ease;
      }
      
      .fire-mode .fire-button:hover {
        background: linear-gradient(to right, #f97316, #ef4444);
        box-shadow: 0 0 20px rgba(239, 68, 68, 0.8);
        transform: translateY(-2px);
      }
      
      @keyframes pulse-fire {
        0% { text-shadow: 0 0 10px rgba(239, 68, 68, 0.3); }
        50% { text-shadow: 0 0 15px rgba(239, 68, 68, 0.6); }
        100% { text-shadow: 0 0 10px rgba(239, 68, 68, 0.3); }
      }
      
      .fire-mode .fire-card {
        border-color: #ef4444;
        background: linear-gradient(to bottom, rgba(30, 30, 30, 0.9), rgba(20, 20, 20, 0.9));
        box-shadow: 0 0 15px rgba(239, 68, 68, 0.2);
      }
      
      .fire-mode .fire-particle {
        position: absolute;
        background: radial-gradient(circle, #f97316, transparent);
        border-radius: 50%;
        pointer-events: none;
        opacity: 0;
        animation: float-up 3s ease-out forwards;
      }
      
      @keyframes float-up {
        0% { transform: translateY(0); opacity: 0.8; }
        100% { transform: translateY(-100px); opacity: 0; }
      }
    `

    if (fireMode) {
      document.head.appendChild(styleElement)
    } else {
      const existingStyle = document.getElementById("fire-mode-styles")
      if (existingStyle) {
        document.head.removeChild(existingStyle)
      }
    }

    return () => {
      const existingStyle = document.getElementById("fire-mode-styles")
      if (existingStyle) {
        document.head.removeChild(existingStyle)
      }
    }
  }, [fireMode])

  return <ThemeContext.Provider value={{ fireMode, toggleFireMode }}>{children}</ThemeContext.Provider>
}
