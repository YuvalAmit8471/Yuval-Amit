import type React from "react"
import "./globals.css"
import { ImageLoadingIndicator } from "@/components/image-loading-indicator"
import { ThemeProvider } from "@/components/theme-context"
import { FireModeToggle } from "@/components/fire-mode-toggle"
import { ExitIntentModal } from "@/components/exit-intent-modal"

export const metadata = {
  title: "Masculine Energy Academy",
  description: "Master Your Sexual Energy, Overcome Premature Ejaculation, and Awaken Your True Masculine Power",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider>
          {children}
          <ImageLoadingIndicator />
          <FireModeToggle />
          <ExitIntentModal />
        </ThemeProvider>
      </body>
    </html>
  )
}
