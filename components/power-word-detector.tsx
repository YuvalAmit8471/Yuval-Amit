"use client"

import { useEffect, useRef } from "react"

export function PowerWordDetector() {
  const observerRef = useRef<IntersectionObserver | null>(null)

  useEffect(() => {
    // Create a keyframe animation for the shake effect
    const styleSheet = document.createElement("style")
    styleSheet.textContent = `
      @keyframes shake {
        0% { transform: translateX(0); }
        25% { transform: translateX(5px); }
        50% { transform: translateX(-5px); }
        75% { transform: translateX(5px); }
        100% { transform: translateX(0); }
      }
      
      .shake-effect {
        animation: shake 0.5s ease-in-out;
      }
    `
    document.head.appendChild(styleSheet)

    // Function to apply shake effect to the body
    const applyShakeEffect = () => {
      document.body.classList.add("shake-effect")
      setTimeout(() => {
        document.body.classList.remove("shake-effect")
      }, 500)
    }

    // Set up intersection observer to detect when "POWER" words are visible
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            applyShakeEffect()
            // Unobserve after triggering once
            observerRef.current?.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.5 },
    )

    // Find all elements containing the word "POWER"
    const powerElements = document.querySelectorAll("*:not(script):not(style)")
    powerElements.forEach((element) => {
      if (element.textContent?.includes("POWER")) {
        observerRef.current?.observe(element)
      }
    })

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect()
      }
      document.head.removeChild(styleSheet)
    }
  }, [])

  return null
}
