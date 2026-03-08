"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useEffect, useState } from "react"

/**
 * Peanut loader — three phases:
 *  1. "drawing" — the peanut outline traces itself in (stroke-dashoffset)
 *  2. "reveal"  — the name fades up from inside, peanut glows orange
 *  3. "done"    — whole screen fades out
 */
export function PeanutLoader({ onComplete }: { onComplete: () => void }) {
  const [phase, setPhase] = useState<"drawing" | "reveal" | "done">("drawing")

  useEffect(() => {
    const t1 = setTimeout(() => setPhase("reveal"), 1000)
    const t2 = setTimeout(() => setPhase("done"),   1900)
    const t3 = setTimeout(onComplete,                2200)
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3) }
  }, [onComplete])

  // Peanut path total length (approximate for the shape below) — used for dasharray
  const pathLength = 220

  return (
    <AnimatePresence>
      {phase !== "done" && (
        <motion.div
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
        >
          {/* Ambient glow — blooms on reveal */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: phase === "reveal" ? 1 : 0 }}
            transition={{ duration: 0.5 }}
          >
            <div
              style={{
                width: "260px",
                height: "260px",
                borderRadius: "50%",
                background: "radial-gradient(circle, oklch(0.70 0.20 46 / 0.18) 0%, transparent 70%)",
                filter: "blur(40px)",
              }}
            />
          </motion.div>

          {/* Peanut + name lockup */}
          <div className="relative flex flex-col items-center gap-8">

            {/* Peanut SVG — draws itself */}
            <svg
              width="60"
              height="96"
              viewBox="0 0 50 80"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Outer shell */}
              <motion.path
                d="M45 20 C45 8 35 2 25 2 C15 2 8 10 8 22 C8 34 12 38 12 40 C12 42 8 46 8 58 C8 70 15 78 25 78 C35 78 45 72 45 60 C45 48 40 44 40 40 C40 36 45 32 45 20"
                stroke="oklch(0.70 0.20 46)"
                strokeWidth="2"
                strokeLinecap="round"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{
                  pathLength: phase === "drawing" || phase === "reveal" ? 1 : 1,
                  opacity: 1,
                  stroke: phase === "reveal"
                    ? "oklch(0.74 0.21 46)"
                    : "oklch(0.55 0.14 46)",
                }}
                transition={{
                  pathLength: { duration: 0.85, ease: "easeInOut" },
                  opacity:    { duration: 0.1 },
                  stroke:     { duration: 0.4 },
                }}
              />

              {/* Waist pinch line */}
              <motion.path
                d="M 13 40 Q 25 36 37 40"
                stroke="oklch(0.70 0.20 46)"
                strokeWidth="1"
                strokeLinecap="round"
                strokeDasharray="3 3"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{
                  pathLength: 1,
                  opacity: phase === "drawing" ? 0.3 : 0.5,
                }}
                transition={{ pathLength: { duration: 0.4, delay: 0.7, ease: "easeOut" }, opacity: { duration: 0.3, delay: 0.7 } }}
              />

              {/* Inner top kernel */}
              <motion.circle
                cx="25"
                cy="22"
                r="5"
                stroke="oklch(0.70 0.20 46)"
                strokeWidth="1"
                fill="none"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: phase === "reveal" ? 1 : 0, opacity: phase === "reveal" ? 0.5 : 0 }}
                transition={{ duration: 0.3, delay: 0.1 }}
                style={{ transformOrigin: "25px 22px" }}
              />

              {/* Inner bottom kernel */}
              <motion.circle
                cx="25"
                cy="58"
                r="5"
                stroke="oklch(0.70 0.20 46)"
                strokeWidth="1"
                fill="none"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: phase === "reveal" ? 1 : 0, opacity: phase === "reveal" ? 0.5 : 0 }}
                transition={{ duration: 0.3, delay: 0.2 }}
                style={{ transformOrigin: "25px 58px" }}
              />
            </svg>

            {/* Name reveal */}
            <motion.div
              className="flex items-center gap-3"
              initial={{ opacity: 0, y: 8 }}
              animate={{
                opacity: phase === "reveal" ? 1 : 0,
                y: phase === "reveal" ? 0 : 8,
              }}
              transition={{ duration: 0.35, ease: "easeOut" }}
            >
              <span className="font-heading text-3xl font-bold tracking-widest text-foreground">
                RIA
              </span>
            </motion.div>
          </div>

          {/* Drawing phase label */}
          <motion.p
            className="absolute bottom-12 font-mono text-[10px] uppercase tracking-[0.4em] text-muted-foreground/50"
            initial={{ opacity: 0 }}
            animate={{ opacity: phase === "drawing" ? 1 : 0 }}
            transition={{ duration: 0.3 }}
          >
            initializing
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
