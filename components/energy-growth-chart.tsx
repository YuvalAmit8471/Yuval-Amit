"use client"

import { useEffect, useRef } from "react"

export function EnergyGrowthChart() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const tooltipRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const tooltip = tooltipRef.current
    if (!canvas || !tooltip) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    const setCanvasDimensions = () => {
      const dpr = window.devicePixelRatio || 1
      const rect = canvas.getBoundingClientRect()

      canvas.width = rect.width * dpr
      canvas.height = rect.height * dpr

      ctx.scale(dpr, dpr)
      canvas.style.width = `${rect.width}px`
      canvas.style.height = `${rect.height}px`
    }

    setCanvasDimensions()
    window.addEventListener("resize", setCanvasDimensions)

    // Draw the chart
    const drawChart = () => {
      const width = canvas.width / window.devicePixelRatio
      const height = canvas.height / window.devicePixelRatio
      const padding = 30

      // Clear canvas
      ctx.clearRect(0, 0, width, height)

      // Draw axes
      ctx.beginPath()
      ctx.strokeStyle = "#52525b" // zinc-600
      ctx.lineWidth = 1

      // X-axis
      ctx.moveTo(padding, height - padding)
      ctx.lineTo(width - padding, height - padding)

      // Y-axis
      ctx.moveTo(padding, height - padding)
      ctx.lineTo(padding, padding)

      ctx.stroke()

      // Draw labels
      ctx.fillStyle = "#d4d4d8" // zinc-300
      ctx.font = "12px sans-serif"
      ctx.textAlign = "center"

      // X-axis labels
      ctx.fillText("Day 1", padding, height - padding + 20)
      ctx.fillText("Day 15", width / 2, height - padding + 20)
      ctx.fillText("Day 30", width - padding, height - padding + 20)

      // Y-axis labels
      ctx.textAlign = "right"
      ctx.fillText("0%", padding - 10, height - padding)
      ctx.fillText("50%", padding - 10, height / 2)
      ctx.fillText("100%", padding - 10, padding)

      // Draw the energy growth line
      const dataPoints = [
        { x: padding, y: height - padding - (height - 2 * padding) * 0.2 }, // Day 1: 20%
        { x: width / 2, y: height - padding - (height - 2 * padding) * 0.6 }, // Day 15: 60%
        { x: width - padding, y: height - padding - (height - 2 * padding) * 1.0 }, // Day 30: 100%
      ]

      // Create a smooth curve
      ctx.beginPath()
      ctx.moveTo(dataPoints[0].x, dataPoints[0].y)

      // Draw a curve through the points
      for (let i = 0; i < dataPoints.length - 1; i++) {
        const xc = (dataPoints[i].x + dataPoints[i + 1].x) / 2
        const yc = (dataPoints[i].y + dataPoints[i + 1].y) / 2
        ctx.quadraticCurveTo(dataPoints[i].x, dataPoints[i].y, xc, yc)
      }

      ctx.quadraticCurveTo(
        dataPoints[dataPoints.length - 2].x,
        dataPoints[dataPoints.length - 2].y,
        dataPoints[dataPoints.length - 1].x,
        dataPoints[dataPoints.length - 1].y,
      )

      ctx.strokeStyle = "#dc2626" // red-600
      ctx.lineWidth = 3
      ctx.stroke()

      // Add gradient fill under the line
      const gradient = ctx.createLinearGradient(0, 0, 0, height)
      gradient.addColorStop(0, "rgba(220, 38, 38, 0.5)") // red-600 with alpha
      gradient.addColorStop(1, "rgba(220, 38, 38, 0.0)") // transparent

      ctx.lineTo(width - padding, height - padding)
      ctx.lineTo(padding, height - padding)
      ctx.fillStyle = gradient
      ctx.fill()

      // Draw data points
      dataPoints.forEach((point, index) => {
        ctx.beginPath()
        ctx.arc(point.x, point.y, 6, 0, Math.PI * 2)
        ctx.fillStyle = "#dc2626" // red-600
        ctx.fill()
        ctx.strokeStyle = "#000000"
        ctx.lineWidth = 2
        ctx.stroke()
      })
    }

    drawChart()
    window.addEventListener("resize", drawChart)

    // Handle tooltip on hover
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      const x = e.clientX - rect.left
      const width = rect.width
      const padding = 30

      // Check if mouse is near any data point
      const dataPoints = [
        { day: 1, energy: "20%" },
        { day: 15, energy: "60%" },
        { day: 30, energy: "100%" },
      ]

      const positions = [padding, width / 2, width - padding]

      let showTooltip = false

      positions.forEach((position, index) => {
        if (Math.abs(x - position) < 20) {
          showTooltip = true
          tooltip.style.left = `${e.clientX}px`
          tooltip.style.top = `${e.clientY - 40}px`
          tooltip.textContent = `Day ${dataPoints[index].day}: ${dataPoints[index].energy} Energy`
          tooltip.style.opacity = "1"
        }
      })

      if (!showTooltip) {
        tooltip.style.opacity = "0"
      }
    }

    canvas.addEventListener("mousemove", handleMouseMove)

    return () => {
      window.removeEventListener("resize", setCanvasDimensions)
      window.removeEventListener("resize", drawChart)
      canvas.removeEventListener("mousemove", handleMouseMove)
    }
  }, [])

  return (
    <div className="mt-8 bg-zinc-900 p-6 rounded-lg border border-zinc-700">
      <h3 className="text-xl font-bold mb-4">Masculine Energy Growth</h3>
      <div className="relative">
        <canvas ref={canvasRef} className="w-full h-64"></canvas>
        <div
          ref={tooltipRef}
          className="absolute bg-zinc-800 text-white px-3 py-1 rounded text-sm pointer-events-none opacity-0 transition-opacity z-10"
          style={{ transform: "translate(-50%, -100%)" }}
        ></div>
      </div>
      <p className="text-sm text-zinc-400 mt-2">
        Track your energy growth over the 30-day protocol. Most men experience a significant surge after day 15.
      </p>
    </div>
  )
}
