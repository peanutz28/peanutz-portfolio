"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion } from "framer-motion"
import { KeyboardButton } from "./keyboard-button"
import { HardwareSwitch } from "./hardware-switch"

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Projects" },
  { href: "/lab-notes", label: "Lab Notes" },
  { href: "/about", label: "Life" },
  { href: "/resume", label: "Resume" },
]

export function Navigation() {
  const pathname = usePathname()

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-40"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
    >
      <div className="mx-auto max-w-7xl px-6 py-6">
        <nav className="flex items-center justify-between">
          {/* Logo / Wordmark */}
          <Link href="/" className="group flex items-center gap-2">
            <div className="relative">
              {/*
                Peanut / ∞ motif — the peanut silhouette is a figure-8.
                Upright = peanut. Rotate 90° = infinity (∞).
                On hover it gently tips toward ∞.
              */}
              <svg
                width="20"
                height="28"
                viewBox="0 0 50 80"
                className="text-primary/60 transition-all duration-500 group-hover:text-primary"
                style={{ transformOrigin: "10px 14px" }}
              >
                {/* Tighter waist makes the figure-8 / ∞ connection clearer */}
                <path
                  d="M44 19 C44 7 34 1 25 1 C16 1 7 9 7 21 C7 31 13 36 14 40 C15 44 7 49 7 59 C7 71 16 79 25 79 C34 79 44 73 44 61 C44 51 37 46 36 40 C35 34 44 31 44 19 Z"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.8"
                  strokeLinejoin="round"
                />
                {/* Waist pinch line — hints at the ∞ crossover */}
                <line
                  x1="15"
                  y1="40"
                  x2="35"
                  y2="40"
                  stroke="currentColor"
                  strokeWidth="1"
                  opacity="0.3"
                  strokeDasharray="2 2"
                />
              </svg>
            </div>
            <span className="font-heading text-lg font-bold tracking-tight text-foreground">
              Ria
            </span>
          </Link>

          {/* Nav Links - Keyboard Buttons */}
          <div className="hidden items-center gap-2 md:flex">
            {navLinks.map((link) => (
              <KeyboardButton
                key={link.href}
                href={link.href}
                variant="ghost"
                size="sm"
                active={pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href))}
              >
                {link.label}
              </KeyboardButton>
            ))}
            
            {/* Separator */}
            <div className="mx-2 h-6 w-px bg-border/50" />
            
            {/* Theme Toggle - Hardware Switch */}
            <HardwareSwitch />
          </div>

          {/* Mobile Menu Button */}
          <button className="flex h-10 w-10 items-center justify-center rounded-md border border-border bg-card shadow-[0_3px_0_0] shadow-border/60 transition-all hover:translate-y-[2px] hover:shadow-[0_1px_0_0] active:translate-y-[3px] active:shadow-[0_0px_0_0] md:hidden">
            <svg
              width="18"
              height="12"
              viewBox="0 0 18 12"
              fill="none"
              className="text-foreground"
            >
              <path
                d="M0 0H18M0 6H18M0 12H18"
                stroke="currentColor"
                strokeWidth="1.5"
              />
            </svg>
          </button>
        </nav>
      </div>
    </motion.header>
  )
}
