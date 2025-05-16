"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Check, X } from "lucide-react"

type Question = {
  question: string
  options: string[]
  correctAnswer: number
}

const questions: Question[] = [
  {
    question: "What is the primary benefit of breathwork?",
    options: ["Weight loss", "Energy control", "Muscle growth", "Hair growth"],
    correctAnswer: 1,
  },
  {
    question: "How long should you practice semen retention for optimal benefits?",
    options: ["1-3 days", "7-14 days", "21+ days", "It varies by individual"],
    correctAnswer: 3,
  },
  {
    question: "Which emotion most depletes masculine energy?",
    options: ["Anger", "Fear", "Sadness", "Jealousy"],
    correctAnswer: 1,
  },
  {
    question: "What is the best way to redirect sexual energy?",
    options: ["Suppression", "Cold showers", "Creative pursuits", "Physical exercise"],
    correctAnswer: 2,
  },
  {
    question: "Which practice is most effective for building masculine presence?",
    options: ["Meditation", "Weight lifting", "Fasting", "Grounding"],
    correctAnswer: 0,
  },
]

export function DailyQuiz() {
  const [currentQuestion, setCurrentQuestion] = useState<Question>(() => {
    // Get a random question for today
    const today = new Date().toDateString()
    // Use the date string to seed a simple random number generator
    const seed = today.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0)
    const questionIndex = seed % questions.length
    return questions[questionIndex]
  })

  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null)

  const handleAnswerSelect = (index: number) => {
    setSelectedAnswer(index)
    setIsCorrect(index === currentQuestion.correctAnswer)
  }

  return (
    <div className="bg-zinc-800 p-6 rounded-lg border border-zinc-700 mt-6">
      <h3 className="text-xl font-bold mb-4 flex items-center">
        <span className="text-red-500 mr-2">Daily</span> Energy Quiz
      </h3>

      <p className="text-zinc-300 mb-4">{currentQuestion.question}</p>

      <div className="space-y-2">
        {currentQuestion.options.map((option, index) => (
          <button
            key={index}
            onClick={() => handleAnswerSelect(index)}
            disabled={selectedAnswer !== null}
            className={`w-full text-left p-3 rounded-md transition-colors ${
              selectedAnswer === null
                ? "bg-zinc-700 hover:bg-zinc-600"
                : selectedAnswer === index
                  ? isCorrect
                    ? "bg-green-900/30 border border-green-600"
                    : "bg-red-900/30 border border-red-600"
                  : index === currentQuestion.correctAnswer && selectedAnswer !== null
                    ? "bg-green-900/30 border border-green-600"
                    : "bg-zinc-700 opacity-50"
            }`}
          >
            {option}

            {selectedAnswer === index && (
              <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} className="float-right">
                {isCorrect ? <Check className="text-green-500" /> : <X className="text-red-500" />}
              </motion.span>
            )}

            {index === currentQuestion.correctAnswer && selectedAnswer !== null && selectedAnswer !== index && (
              <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} className="float-right">
                <Check className="text-green-500" />
              </motion.span>
            )}
          </button>
        ))}
      </div>

      {selectedAnswer !== null && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className={`mt-4 p-3 rounded-md ${
            isCorrect ? "bg-green-900/20 text-green-400" : "bg-red-900/20 text-red-400"
          }`}
        >
          {isCorrect
            ? "Correct! Your masculine awareness is strong."
            : "Not quite. Keep studying the protocol to deepen your understanding."}
        </motion.div>
      )}
    </div>
  )
}
