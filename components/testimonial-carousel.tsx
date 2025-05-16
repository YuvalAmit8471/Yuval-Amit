"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

type Testimonial = {
  quote: string
  name: string
  age: number
}

const testimonials: Testimonial[] = [
  {
    quote: "The energy redirection techniques changed everything. I'm more focused, confident, and women can sense it.",
    name: "Marcus",
    age: 32,
  },
  {
    quote: "I was skeptical at first, but by week 3 I felt a power I hadn't experienced since my early 20s.",
    name: "Jason",
    age: 41,
  },
  {
    quote: "This protocol should be taught to every young man. It's the missing manual for masculine energy.",
    name: "David",
    age: 29,
  },
  {
    quote: "My wife noticed the difference before I did. She says I'm more present and decisive now.",
    name: "Michael",
    age: 37,
  },
  {
    quote: "After years of feeling drained and foggy, I finally feel clear and powerful again.",
    name: "Robert",
    age: 45,
  },
]

export function TestimonialCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState(1) // 1 for right, -1 for left

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length)
    }, 7000)

    return () => clearInterval(interval)
  }, [])

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction > 0 ? -1000 : 1000,
      opacity: 0,
    }),
  }

  return (
    <div className="bg-black py-6 mt-8 overflow-hidden">
      <div className="container relative h-32">
        <AnimatePresence custom={direction} mode="wait">
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ type: "tween", duration: 0.5 }}
            className="absolute inset-0 flex flex-col items-center justify-center text-center px-4"
          >
            <p className="text-xl font-bold text-white mb-2">"{testimonials[currentIndex].quote}"</p>
            <div className="text-sm">
              <span className="text-red-500 font-bold">{testimonials[currentIndex].name}</span>
              <span className="text-zinc-400">, {testimonials[currentIndex].age}</span>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}
