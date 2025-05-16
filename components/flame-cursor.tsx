"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"

export function FlameCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)
  const flameParticlesRef = useRef<{ x: number; y: number; id: number }[]>([])
  const [flameParticles, setFlameParticles] = useState<{ x: number; y: number; id: number }[]>([])
  const nextIdRef = useRef(0)

  // Track mouse position
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  // Track hover state on buy buttons
  useEffect(() => {
    const buyButtons = document.querySelectorAll('button[type="submit"]')

    const handleMouseEnter = () => setIsHovering(true)
    const handleMouseLeave = () => setIsHovering(false)

    buyButtons.forEach((button) => {
      button.addEventListener("mouseenter", handleMouseEnter)
      button.addEventListener("mouseleave", handleMouseLeave)
    })

    return () => {
      buyButtons.forEach((button) => {
        button.removeEventListener("mouseenter", handleMouseEnter)
        button.removeEventListener("mouseleave", handleMouseLeave)
      })
    }
  }, [])

  // Create flame particles when hovering
  useEffect(() => {
    if (!isHovering) {
      flameParticlesRef.current = []
      setFlameParticles([])
      return
    }

    const interval = setInterval(() => {
      const newParticle = {
        x: mousePosition.x + (Math.random() * 20 - 10),
        y: mousePosition.y + (Math.random() * 20 - 10),
        id: nextIdRef.current++,
      }

      flameParticlesRef.current = [...flameParticlesRef.current, newParticle]
      setFlameParticles([...flameParticlesRef.current])

      // Remove particles after animation
      setTimeout(() => {
        flameParticlesRef.current = flameParticlesRef.current.filter((p) => p.id !== newParticle.id)
        setFlameParticles([...flameParticlesRef.current])
      }, 1000)
    }, 50)

    return () => clearInterval(interval)
  }, [isHovering, mousePosition])

  return (
    <AnimatePresence>
      {flameParticles.map((particle) => (
        <motion.div
          key={particle.id}
          initial={{ opacity: 0.8, scale: 1 }}
          animate={{
            opacity: 0,
            scale: 0,
            y: particle.y - 50,
            x: particle.x + (Math.random() * 20 - 10),
          }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="fixed w-4 h-4 rounded-full bg-gradient-to-t from-red-600 to-yellow-400 z-50 pointer-events-none"
          style={{
            left: particle.x,
            top: particle.y,
            filter: "blur(2px)",
          }}
        />
      ))}
    </AnimatePresence>
  )
}
