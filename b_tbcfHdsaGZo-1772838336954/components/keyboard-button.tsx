"use client"

import Link from "next/link"
import { cn } from "@/lib/utils"

interface KeyboardButtonProps {
  children: React.ReactNode
  href?: string
  onClick?: () => void
  variant?: "default" | "primary" | "ghost"
  size?: "sm" | "md" | "lg"
  className?: string
  active?: boolean
}

export function KeyboardButton({
  children,
  href,
  onClick,
  variant = "default",
  size = "md",
  className,
  active = false,
}: KeyboardButtonProps) {

  // All visual styling — including hover/active press states —
  // lives in globals.css classes so CSS specificity works correctly.
  const variantClass =
    active
      ? "keycap-pressed"
      : variant === "primary"
      ? "keycap-primary"
      : variant === "ghost"
      ? "keycap-ghost"
      : "keycap"

  const classes = cn(
    "relative inline-flex items-center justify-center font-medium select-none cursor-pointer",
    // Size
    size === "sm" && "px-4 py-2 text-sm",
    size === "md" && "px-5 py-2 text-sm",
    size === "lg" && "px-9 py-4 text-base font-semibold",
    // Ghost text color (default → muted, hovers to full foreground)
    variant === "ghost" && !active && "text-muted-foreground hover:text-foreground",
    variantClass,
    className
  )

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    )
  }

  return (
    <button onClick={onClick} className={classes}>
      {children}
    </button>
  )
}
