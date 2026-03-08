"use client"

import { useTheme } from "./theme-provider"
import { Sun, Moon } from "lucide-react"
import { useEffect, useState } from "react"

export function HardwareSwitch() {
  const { theme, toggleTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const isDark = theme === "dark"

  return (
    <button
      onClick={toggleTheme}
      className="group relative flex h-8 w-14 items-center rounded-sm border border-border/80 bg-card p-1 shadow-[inset_0_2px_4px_rgba(0,0,0,0.3),0_1px_0_rgba(255,255,255,0.05)] transition-colors hover:border-primary/40"
      aria-label="Toggle theme"
    >
      {/* Track groove */}
      <div className="absolute inset-x-2 top-1/2 h-1 -translate-y-1/2 rounded-full bg-background/50" />
      
      {/* Lever */}
      <div
        className={`relative flex h-6 w-6 items-center justify-center rounded-sm border transition-all duration-200 ${
          !mounted || isDark
            ? "translate-x-0 border-border bg-secondary shadow-[0_2px_0_0_hsl(var(--border))]"
            : "translate-x-5 border-primary/60 bg-primary/20 shadow-[0_2px_0_0_hsl(var(--primary)/0.4)]"
        }`}
      >
        {!mounted || isDark ? (
          <Moon className="h-3.5 w-3.5 text-muted-foreground" />
        ) : (
          <Sun className="h-3.5 w-3.5 text-primary" />
        )}
      </div>

      {/* Metal screws decoration */}
      <div className="absolute -left-0.5 top-1/2 h-1 w-1 -translate-y-1/2 rounded-full bg-border/50" />
      <div className="absolute -right-0.5 top-1/2 h-1 w-1 -translate-y-1/2 rounded-full bg-border/50" />
    </button>
  )
}
