"use client"

import { useEffect } from "react"

export function useImageOptimization() {
  useEffect(() => {
    // Function to handle intersection observer
    const handleIntersection = (entries: IntersectionObserverEntry[], observer: IntersectionObserver) => {
      entries.forEach((entry) => {
        // If the element is in the viewport
        if (entry.isIntersecting) {
          const img = entry.target as HTMLImageElement

          // If the image has a data-src attribute, load it
          const dataSrc = img.getAttribute("data-src")
          if (dataSrc) {
            img.src = dataSrc
            img.removeAttribute("data-src")
          }

          // Stop observing this element
          observer.unobserve(img)
        }
      })
    }

    // Create an intersection observer
    const observer = new IntersectionObserver(handleIntersection, {
      rootMargin: "200px", // Start loading 200px before the image is visible
      threshold: 0.01,
    })

    // Find all images with data-src attribute
    const lazyImages = document.querySelectorAll("img[data-src]")
    lazyImages.forEach((img) => observer.observe(img))

    return () => {
      // Clean up the observer
      observer.disconnect()
    }
  }, [])

  return null
}

export default function ImageOptimization() {
  useImageOptimization()
  return null
}
