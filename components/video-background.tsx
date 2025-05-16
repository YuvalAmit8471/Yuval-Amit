"use client"

import { useEffect, useRef, useState } from "react"

export function VideoBackground() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const handleCanPlay = () => {
      setIsLoaded(true)
    }

    video.addEventListener("canplay", handleCanPlay)

    return () => {
      video.removeEventListener("canplay", handleCanPlay)
    }
  }, [])

  return (
    <div className="absolute inset-0 z-0 overflow-hidden">
      <div
        className={`absolute inset-0 bg-black transition-opacity duration-1000 ${
          isLoaded ? "opacity-0" : "opacity-100"
        }`}
      />
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
          isLoaded ? "opacity-100" : "opacity-0"
        }`}
        style={{ filter: "brightness(0.3)" }}
      >
        <source src="/videos/masculine-energy.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black"></div>
    </div>
  )
}
