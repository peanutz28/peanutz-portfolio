"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { useState } from "react"
import { X } from "lucide-react"
import { KeyboardButton } from "./keyboard-button"
import { HardwareSwitch } from "./hardware-switch"

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Projects" },
  { href: "/lab-notes", label: "Journal" },
  { href: "/about", label: "About" },
  { href: "/resume", label: "Resume" },
]

export function Navigation() {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href)

  return (
    <>
      {/* ── Top bar ── */}
      <motion.header
        className="fixed top-0 left-0 right-0 z-40"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        <div className="mx-auto max-w-7xl px-6 py-5">
          <nav className="flex items-center justify-between">

            {/* Logo / Wordmark */}
            <Link href="/" className="group flex items-center gap-2">
              <div className="relative">
                {/*
                  Peanut / ∞ motif — the peanut silhouette is a figure-8.
                  Upright = peanut. Rotate 90° = infinity (∞).
                */}
                <svg
                  width="26"
                  height="36"
                  viewBox="0 0 50 80"
                  className="text-primary/70 transition-all duration-500 group-hover:text-primary"
                  style={{ transformOrigin: "13px 18px" }}
                >
                  <path
                    d="M44 19 C44 7 34 1 25 1 C16 1 7 9 7 21 C7 31 13 36 14 40 C15 44 7 49 7 59 C7 71 16 79 25 79 C34 79 44 73 44 61 C44 51 37 46 36 40 C35 34 44 31 44 19 Z"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.8"
                    strokeLinejoin="round"
                  />
                  <line
                    x1="15" y1="40" x2="35" y2="40"
                    stroke="currentColor" strokeWidth="1" opacity="0.3" strokeDasharray="2 2"
                  />
                </svg>
              </div>
              <span className="font-heading text-xl font-bold tracking-tight text-foreground">
                Ria
              </span>
            </Link>

            {/* Desktop nav links */}
            <div className="hidden items-center gap-2 md:flex">
              {navLinks.map((link) => (
                <KeyboardButton
                  key={link.href}
                  href={link.href}
                  variant="ghost"
                  size="sm"
                  active={isActive(link.href)}
                >
                  {link.label}
                </KeyboardButton>
              ))}
              <div className="mx-2 h-6 w-px bg-border/50" />
              <HardwareSwitch />
            </div>

            {/* Mobile: theme toggle + hamburger */}
            <div className="flex items-center gap-3 md:hidden">
              <HardwareSwitch />
              <button
                onClick={() => setMobileOpen(true)}
                aria-label="Open menu"
                className="flex h-10 w-10 items-center justify-center rounded-md border border-border bg-card shadow-[0_3px_0_0] shadow-border/60 transition-all hover:translate-y-[1px] hover:shadow-[0_2px_0_0] active:translate-y-[2px] active:shadow-[0_1px_0_0]"
              >
                <svg width="18" height="12" viewBox="0 0 18 12" fill="none" className="text-foreground">
                  <path d="M0 0H18M0 6H18M0 12H18" stroke="currentColor" strokeWidth="1.5" />
                </svg>
              </button>
            </div>

          </nav>
        </div>
      </motion.header>

      {/* ── Mobile drawer ── */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Backdrop — click to close */}
            <motion.div
              className="fixed inset-0 z-50 bg-background/70 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
            />

            {/* Slide-in panel */}
            <motion.div
              className="fixed right-0 top-0 bottom-0 z-50 flex w-72 flex-col border-l border-border bg-card px-8 py-8"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 280 }}
            >
              {/* Header */}
              <div className="flex items-center justify-between">
                <span className="font-heading text-base font-bold text-foreground">Menu</span>
                <button
                  onClick={() => setMobileOpen(false)}
                  aria-label="Close menu"
                  className="flex h-9 w-9 items-center justify-center rounded-md border border-border bg-background text-muted-foreground transition-colors hover:text-foreground"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              {/* Nav links */}
              <nav className="mt-10 flex flex-col gap-1">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 + 0.1 }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setMobileOpen(false)}
                      className={`flex items-center rounded-lg px-4 py-3 text-base font-medium transition-colors ${
                        isActive(link.href)
                          ? "bg-primary/10 text-primary"
                          : "text-muted-foreground hover:bg-muted/60 hover:text-foreground"
                      }`}
                    >
                      {link.label}
                      {isActive(link.href) && (
                        <span className="ml-auto h-1.5 w-1.5 rounded-full bg-primary" />
                      )}
                    </Link>
                  </motion.div>
                ))}
              </nav>

              {/* Footer */}
              <div className="mt-auto">
                <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground/40">
                  Ria · Penn M&T
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
