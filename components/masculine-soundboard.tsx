"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Volume2, Shield, Flame } from "lucide-react"
import { motion } from "framer-motion"

type AudioClip = {
  id: string
  text: string
  icon: React.ReactNode
}

const audioClips: AudioClip[] = [
  {
    id: "control",
    text: "I am in control.",
    icon: <Shield className="h-6 w-6" />,
  },
  {
    id: "command",
    text: "Energy is mine to command.",
    icon: <Flame className="h-6 w-6" />,
  },
  {
    id: "attract",
    text: "I don't chase. I attract.",
    icon: <Volume2 className="h-6 w-6" />,
  },
]

export function MasculineSoundboard() {
  const [playing, setPlaying] = useState<string | null>(null)
  const audioRefs = useRef<Record<string, HTMLAudioElement | null>>({})

  const playAudio = (id: string) => {
    // Stop any currently playing audio
    if (playing && audioRefs.current[playing]) {
      audioRefs.current[playing]?.pause()
      audioRefs.current[playing]!.currentTime = 0
    }

    // Play the selected audio
    if (audioRefs.current[id]) {
      audioRefs.current[id]?.play()
      setPlaying(id)

      // Reset playing state when audio ends
      audioRefs.current[id]!.onended = () => {
        setPlaying(null)
      }
    }
  }

  return (
    <div className="mt-8">
      <h3 className="text-xl font-bold mb-4 text-center">Masculine Affirmations</h3>
      <div className="grid grid-cols-3 gap-4">
        {audioClips.map((clip) => (
          <motion.button
            key={clip.id}
            whileTap={{ scale: 0.95 }}
            className={`flex flex-col items-center justify-center p-6 rounded-lg ${
              playing === clip.id
                ? "bg-red-900/30 border-2 border-red-600"
                : "bg-zinc-800 border border-zinc-700 hover:border-red-600"
            } transition-colors`}
            onClick={() => playAudio(clip.id)}
          >
            <div className={`mb-3 ${playing === clip.id ? "text-red-500" : "text-zinc-400"}`}>{clip.icon}</div>
            <p className="text-sm font-medium text-center">{clip.text}</p>

            {/* Audio elements */}
            <audio ref={(el) => (audioRefs.current[clip.id] = el)} src={`/audio/${clip.id}.mp3`} preload="auto" />
          </motion.button>
        ))}
      </div>
      <p className="text-xs text-zinc-500 text-center mt-2">
        Click to play affirmations. Use headphones for best experience.
      </p>
    </div>
  )
}
