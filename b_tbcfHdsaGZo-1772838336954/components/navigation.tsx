"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { useState, useRef, useCallback } from "react"
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

// ── Text scramble hook ─────────────────────────────────────────
const SCRAMBLE_CHARS = "!@#$%&RIAria♦◈⟡"
function useScramble(target: string) {
  const [text, setText] = useState(target)
  const rafRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const scramble = useCallback(() => {
    if (rafRef.current) clearTimeout(rafRef.current)
    let step = 0
    const totalSteps = target.length + 4

    const tick = () => {
      setText(
        target
          .split("")
          .map((char, i) =>
            i < step - 2
              ? char
              : SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)]
          )
          .join("")
      )
      step++
      if (step <= totalSteps) {
        rafRef.current = setTimeout(tick, 52)
      } else {
        setText(target)
      }
    }
    tick()
  }, [target])

  const reset = useCallback(() => {
    if (rafRef.current) clearTimeout(rafRef.current)
    setText(target)
  }, [target])

  return { text, scramble, reset }
}

// ── Real infinity SVG ─────────────────────────────────────────
// Two fully-round loops meeting at center (44,20)
// Each loop is a bezier-approximated circle of radius ~20
// viewBox "0 0 88 40" — center at (44, 20)
const INFINITY_PATH =
  "M44 20 C44 8,54 2,64 2 C74 2,82 10,82 20 C82 30,74 38,64 38 C54 38,44 32,44 20 C44 8,34 2,24 2 C14 2,6 10,6 20 C6 30,14 38,24 38 C34 38,44 32,44 20"

export function Navigation() {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [logoHovered, setLogoHovered] = useState(false)
  const [showTooltip, setShowTooltip] = useState(false)
  const hasShownTooltip = useRef(false)
  const tooltipTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  const { text: firstName, scramble: scrambleFirst, reset: resetFirst } = useScramble("Ria")
  const { text: lastName, scramble: scrambleLast, reset: resetLast } = useScramble("Saheta")

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href)

  const handleLogoEnter = useCallback(() => {
    setLogoHovered(true)
    scrambleFirst()
    scrambleLast()

    if (!hasShownTooltip.current) {
      hasShownTooltip.current = true
      setShowTooltip(true)
      tooltipTimer.current = setTimeout(() => setShowTooltip(false), 2600)
    }
  }, [scrambleFirst, scrambleLast])

  const handleLogoLeave = useCallback(() => {
    setLogoHovered(false)
    resetFirst()
    resetLast()
  }, [resetFirst, resetLast])

  return (
    <>
      {/* ── Top bar — solid so it never bleeds into page content ── */}
      <motion.header
        className="fixed left-0 right-0 top-0 z-40 border-b border-border/15 bg-background/92 backdrop-blur-md"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        <div className="mx-auto max-w-7xl px-6 py-4">
          <nav className="flex items-center justify-between">

            {/* ── Logo / Wordmark ── */}
            <Link
              href="/"
              className="group flex items-center gap-3"
              onMouseEnter={handleLogoEnter}
              onMouseLeave={handleLogoLeave}
            >
              {/* Icon container — fixed 46px wide, only x animates (no width shift = no jank) */}
              <div className="relative flex-shrink-0">
                <motion.div
                  className="relative"
                  animate={{ x: logoHovered ? -5 : 0 }}
                  transition={{ duration: 0.38, ease: [0.34, 1.56, 0.64, 1] }}
                  style={{ width: 46, height: 36 }}
                >
                  <AnimatePresence mode="wait">
                    {!logoHovered ? (
                      /* ── Peanut — left:10 centers it in the 46px box (46-26)/2=10 ── */
                      <motion.svg
                        key="peanut"
                        width="26"
                        height="36"
                        viewBox="0 0 50 80"
                        className="absolute text-primary/70"
                        style={{ left: 10, top: 0 }}
                        initial={{ opacity: 0, scale: 0.85 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.85 }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
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
                          stroke="currentColor" strokeWidth="1"
                          opacity="0.3" strokeDasharray="2 2"
                        />
                      </motion.svg>
                    ) : (
                      /* ── True lemniscate ∞ — top:5 centers it vertically (36-26)/2=5 ── */
                      <motion.svg
                        key="infinity"
                        width="46"
                        height="26"
                        viewBox="0 0 88 40"
                        className="absolute"
                        style={{ left: 0, top: 5 }}
                        initial={{ opacity: 0, scale: 0.65 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.65 }}
                        transition={{ duration: 0.26, ease: [0.34, 1.56, 0.64, 1] }}
                      >
                        <defs>
                          <filter id="inf-glow" x="-40%" y="-40%" width="180%" height="180%">
                            <feGaussianBlur stdDeviation="2.5" result="blur" />
                            <feMerge>
                              <feMergeNode in="blur" />
                              <feMergeNode in="SourceGraphic" />
                            </feMerge>
                          </filter>
                        </defs>
                        {/* Outer glow */}
                        <path
                          d={INFINITY_PATH}
                          fill="none"
                          stroke="oklch(0.703 0.213 50 / 0.3)"
                          strokeWidth="7"
                          strokeLinecap="round"
                        />
                        {/* Core stroke */}
                        <path
                          d={INFINITY_PATH}
                          fill="none"
                          stroke="oklch(0.703 0.213 50)"
                          strokeWidth="3"
                          strokeLinecap="round"
                          filter="url(#inf-glow)"
                        />
                        {/* Center dot — the crossing point */}
                        <circle cx="44" cy="20" r="1.8" fill="oklch(0.703 0.213 50 / 0.6)" />
                      </motion.svg>
                    )}
                  </AnimatePresence>
                </motion.div>

                {/* "To infinity and beyond" tooltip — first hover only */}
                <AnimatePresence>
                  {showTooltip && (
                    <motion.div
                      className="pointer-events-none absolute z-10"
                      style={{
                        bottom: "calc(100% + 12px)",
                        left: "50%",
                        transform: "translateX(-50%)",
                        whiteSpace: "nowrap",
                      }}
                      initial={{ opacity: 0, y: 6, scale: 0.88 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -4, scale: 0.94 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="rounded-full border border-border/60 bg-card px-3 py-1.5 shadow-xl">
                        <span className="font-mono text-[11px] text-foreground/80">
                          to infinity and beyond! 🚀
                        </span>
                      </div>
                      {/* Caret */}
                      <div
                        className="absolute left-1/2 top-full -translate-x-1/2"
                        style={{
                          width: 0, height: 0,
                          borderLeft: "5px solid transparent",
                          borderRight: "5px solid transparent",
                          borderTop: "5px solid oklch(0.18 0 0)",
                        }}
                      />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* ── "Ria Saheta" ── */}
              <div className="flex items-baseline gap-[0.25ch]">
                {/* First name scrambles + turns primary on hover */}
                <span
                  className="font-heading text-xl font-bold tracking-tight text-foreground transition-colors duration-200 group-hover:text-primary"
                  style={{ fontVariantNumeric: "tabular-nums", minWidth: "2.5ch" }}
                >
                  {firstName}
                </span>
                {/* Last name — subtle shimmer animation, full primary on hover */}
                <span
                  className="nav-shimmer font-heading text-xl font-bold tracking-tight transition-colors duration-200 group-hover:text-primary"
                  style={{ fontVariantNumeric: "tabular-nums", minWidth: "4.5ch" }}
                >
                  {lastName}
                </span>
              </div>
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
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 z-50 bg-background/70 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
            />

            {/* Slide-in panel */}
            <motion.div
              className="fixed bottom-0 right-0 top-0 z-50 flex w-72 flex-col border-l border-border bg-card px-8 py-8"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 280 }}
            >
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

              <div className="mt-auto">
                <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground/40">
                  Ria Saheta · Penn M&T
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
