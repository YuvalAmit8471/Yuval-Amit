"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ChevronRight, ChevronLeft } from "lucide-react"
import { useTheme } from "./theme-context"

type Question = {
  id: number
  text: string
  options: string[]
}

type Archetype = {
  id: string
  name: string
  description: string
  traits: string[]
}

const questions: Question[] = [
  {
    id: 1,
    text: "When faced with a challenge, your first instinct is to:",
    options: [
      "Analyze all possible solutions before acting",
      "Take immediate action to overcome it",
      "Seek wisdom from mentors or books",
      "Find creative ways around the obstacle",
      "Inspire others to help solve it together",
    ],
  },
  {
    id: 2,
    text: "Your greatest source of power comes from:",
    options: [
      "Your intellect and strategic thinking",
      "Your physical strength and courage",
      "Your wisdom and spiritual connection",
      "Your creativity and adaptability",
      "Your charisma and leadership",
    ],
  },
  {
    id: 3,
    text: "In a relationship, you value most:",
    options: [
      "Intellectual stimulation and deep conversations",
      "Loyalty and mutual respect",
      "Spiritual connection and growth",
      "Freedom and spontaneity",
      "Passion and emotional intensity",
    ],
  },
  {
    id: 4,
    text: "Your shadow (negative) tendency under stress is:",
    options: [
      "Overthinking and detachment",
      "Aggression and domination",
      "Withdrawal and rigidity",
      "Manipulation and deception",
      "Narcissism and controlling behavior",
    ],
  },
  {
    id: 5,
    text: "Your life mission is primarily about:",
    options: [
      "Discovering truth and knowledge",
      "Protecting what matters and conquering challenges",
      "Achieving wisdom and guiding others",
      "Creating and exploring possibilities",
      "Leading others and building legacy",
    ],
  },
]

const archetypes: Archetype[] = [
  {
    id: "sage",
    name: "The Sage",
    description:
      "You seek truth and wisdom above all. Your analytical mind and thirst for knowledge make you a natural problem-solver and advisor.",
    traits: ["Strategic", "Analytical", "Wise", "Objective", "Thoughtful"],
  },
  {
    id: "warrior",
    name: "The Warrior",
    description:
      "You embody courage and discipline. Your strength lies in your ability to face challenges head-on and protect what matters most.",
    traits: ["Courageous", "Disciplined", "Protective", "Direct", "Resilient"],
  },
  {
    id: "magician",
    name: "The Magician",
    description:
      "You see beyond the ordinary. Your intuition and connection to deeper wisdom allows you to transform situations and manifest your vision.",
    traits: ["Intuitive", "Transformative", "Visionary", "Spiritual", "Insightful"],
  },
  {
    id: "explorer",
    name: "The Explorer",
    description:
      "You value freedom and discovery. Your adaptability and creativity help you find unique paths and solutions others miss.",
    traits: ["Adaptable", "Creative", "Independent", "Adventurous", "Resourceful"],
  },
  {
    id: "king",
    name: "The King",
    description:
      "You are a natural leader. Your charisma and vision inspire others, and you excel at creating order and building lasting structures.",
    traits: ["Authoritative", "Visionary", "Responsible", "Charismatic", "Decisive"],
  },
]

export function MasculineQuiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<number[]>([])
  const [showResult, setShowResult] = useState(false)
  const [result, setResult] = useState<Archetype | null>(null)
  const { fireMode } = useTheme()

  const handleAnswer = (optionIndex: number) => {
    const newAnswers = [...answers]
    newAnswers[currentQuestion] = optionIndex
    setAnswers(newAnswers)

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      calculateResult(newAnswers)
      setShowResult(true)
    }
  }

  const calculateResult = (finalAnswers: number[]) => {
    // Count which archetype got the most votes
    const counts = [0, 0, 0, 0, 0] // Sage, Warrior, Magician, Explorer, King

    finalAnswers.forEach((answer) => {
      counts[answer]++
    })

    // Find the highest count
    let maxCount = 0
    let maxIndex = 0

    counts.forEach((count, index) => {
      if (count > maxCount) {
        maxCount = count
        maxIndex = index
      }
    })

    setResult(archetypes[maxIndex])
  }

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
    }
  }

  const handleRestart = () => {
    setCurrentQuestion(0)
    setAnswers([])
    setShowResult(false)
    setResult(null)
  }

  return (
    <div className={`mt-12 p-6 rounded-lg border ${fireMode ? "fire-card" : "bg-zinc-900 border-zinc-700"}`}>
      <h3 className={`text-2xl font-bold mb-6 text-center ${fireMode ? "fire-text" : "text-white"}`}>
        Discover Your Masculine Archetype
      </h3>

      <AnimatePresence mode="wait">
        {!showResult ? (
          <motion.div
            key="question"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-zinc-400">
                  Question {currentQuestion + 1} of {questions.length}
                </span>
                <div className="flex gap-1">
                  {questions.map((_, index) => (
                    <div
                      key={index}
                      className={`w-3 h-3 rounded-full ${
                        index === currentQuestion
                          ? "bg-red-600"
                          : index < currentQuestion
                            ? "bg-zinc-600"
                            : "bg-zinc-800"
                      }`}
                    />
                  ))}
                </div>
              </div>
              <h4 className="text-xl font-medium mb-4">{questions[currentQuestion].text}</h4>
              <div className="space-y-3">
                {questions[currentQuestion].options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleAnswer(index)}
                    className={`w-full text-left p-4 rounded-md transition-all ${
                      fireMode
                        ? "bg-zinc-800 hover:bg-zinc-700 hover:shadow-red-600/20 hover:shadow-md"
                        : "bg-zinc-800 hover:bg-zinc-700"
                    } ${answers[currentQuestion] === index ? "border border-red-600" : "border border-transparent"}`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex justify-between mt-6">
              <Button
                onClick={handlePrevious}
                disabled={currentQuestion === 0}
                variant="outline"
                className="flex items-center"
              >
                <ChevronLeft className="mr-1 h-4 w-4" />
                Previous
              </Button>
              {currentQuestion > 0 && answers[currentQuestion] === undefined && (
                <Button
                  onClick={() => setCurrentQuestion(currentQuestion + 1)}
                  className={`flex items-center ${fireMode ? "fire-button" : "bg-red-700 hover:bg-red-800"}`}
                >
                  Skip
                  <ChevronRight className="ml-1 h-4 w-4" />
                </Button>
              )}
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="result"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className={`text-center ${fireMode ? "fire-card p-6 rounded-lg" : "bg-zinc-800 p-6 rounded-lg"}`}
          >
            <div className="mb-4">
              <span className="text-sm text-zinc-400">Your Result</span>
            </div>
            <h4 className={`text-2xl font-bold mb-2 ${fireMode ? "fire-text" : "text-red-600"}`}>
              You are: {result?.name}
            </h4>
            <p className="text-zinc-300 mb-6">{result?.description}</p>

            <div className="flex flex-wrap justify-center gap-2 mb-6">
              {result?.traits.map((trait, index) => (
                <span
                  key={index}
                  className={`px-3 py-1 rounded-full text-sm ${
                    fireMode
                      ? "bg-gradient-to-r from-red-900/40 to-orange-900/40 text-orange-400"
                      : "bg-zinc-700 text-zinc-300"
                  }`}
                >
                  {trait}
                </span>
              ))}
            </div>

            <Button
              onClick={handleRestart}
              className={`mt-4 ${fireMode ? "fire-button" : "bg-red-700 hover:bg-red-800"}`}
            >
              Take Quiz Again
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
