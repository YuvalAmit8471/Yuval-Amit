"use client"

import { useEffect, useState } from "react"

export function useImageLoading() {
  const [imagesLoaded, setImagesLoaded] = useState(0)
  const [totalImages, setTotalImages] = useState(0)
  const [loadingComplete, setLoadingComplete] = useState(false)

  useEffect(() => {
    // Count all images on the page
    const images = document.querySelectorAll("img")
    setTotalImages(images.length)

    let loadedCount = 0

    // Create an observer to track image loading
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const img = entry.target as HTMLImageElement

            // When image loads or errors
            const handleLoad = () => {
              loadedCount++
              setImagesLoaded(loadedCount)
              if (loadedCount >= images.length) {
                setLoadingComplete(true)
              }
              observer.unobserve(img)
            }

            // Add event listeners
            if (img.complete) {
              handleLoad()
            } else {
              img.addEventListener("load", handleLoad)
              img.addEventListener("error", handleLoad)
            }
          }
        })
      },
      {
        rootMargin: "200px", // Start loading before the image is visible
        threshold: 0.01,
      },
    )

    // Observe all images
    images.forEach((img) => observer.observe(img))

    return () => {
      images.forEach((img) => {
        observer.unobserve(img)
        img.removeEventListener("load", () => {})
        img.removeEventListener("error", () => {})
      })
    }
  }, [])

  return {
    imagesLoaded,
    totalImages,
    loadingComplete,
    loadingProgress: totalImages ? Math.round((imagesLoaded / totalImages) * 100) : 0,
  }
}
