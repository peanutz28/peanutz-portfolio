"use client"

import { motion } from "framer-motion"
import { ArrowDown, Camera } from "lucide-react"
import { KeyboardButton } from "./keyboard-button"

const polaroids = [
  {
    id: 1,
    caption: "building things",
    rotate: -6,
    x: "0%",
    y: "2%",
    gradient: "linear-gradient(135deg, #1a1a2e 0%, #16213e 55%, #0f3460 100%)",
    delay: 0.10,
  },
  {
    id: 2,
    caption: "penn m&t '27",
    rotate: 3.5,
    x: "29%",
    y: "0%",
    gradient: "linear-gradient(135deg, #2d1b0e 0%, #3d2512 55%, #1a0f06 100%)",
    delay: 0.18,
  },
  {
    id: 3,
    caption: "philly, pa",
    rotate: 6,
    x: "57%",
    y: "3%",
    gradient: "linear-gradient(135deg, #1a0d0d 0%, #2e1a1a 55%, #180a0a 100%)",
    delay: 0.14,
  },
  {
    id: 4,
    caption: "hardware & code",
    rotate: -3,
    x: "5%",
    y: "53%",
    gradient: "linear-gradient(135deg, #0d2a1b 0%, #1a3d28 55%, #0a1f15 100%)",
    delay: 0.28,
  },
  {
    id: 5,
    caption: "always making",
    rotate: 4.5,
    x: "33%",
    y: "56%",
    gradient: "linear-gradient(135deg, #1f0a2a 0%, #2e1040 55%, #160820 100%)",
    delay: 0.34,
  },
  {
    id: 6,
    caption: "crocheting szn",
    rotate: -4.5,
    x: "61%",
    y: "50%",
    gradient: "linear-gradient(135deg, #0a1a2e 0%, #112540 55%, #081520 100%)",
    delay: 0.24,
  },
]

const POLAROID_W = 190
const POLAROID_H = 148

export function HeroSection() {
  return (
    <section className="relative flex min-h-screen items-center">
      <div className="relative z-10 mx-auto w-full max-w-7xl px-6">
        <div className="flex flex-col gap-16 lg:flex-row lg:items-center lg:gap-16">

          {/* ── Polaroid cluster ─────────────────────────────────────── */}
          <motion.div
            className="relative mx-auto shrink-0"
            style={{ width: 500, height: 460 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
          >
            {polaroids.map((p) => (
              <motion.div
                key={p.id}
                className="absolute cursor-default select-none"
                style={{
                  left: p.x,
                  top: p.y,
                  width: POLAROID_W,
                  zIndex: p.id,
                }}
                initial={{ opacity: 0, rotate: p.rotate - 10, y: 32 }}
                animate={{ opacity: 1, rotate: p.rotate, y: 0 }}
                transition={{ duration: 0.6, delay: p.delay, ease: "easeOut" }}
                whileHover={{ scale: 1.06, zIndex: 10, transition: { duration: 0.15 } }}
              >
                {/* Polaroid frame */}
                <div
                  className="shadow-[0_16px_48px_rgba(0,0,0,0.7)]"
                  style={{
                    background: "#ffffff",
                    padding: "10px",
                    paddingBottom: "44px",
                    borderRadius: "2px",
                  }}
                >
                  {/* Photo area */}
                  <div
                    style={{
                      width: POLAROID_W - 20,
                      height: POLAROID_H,
                      background: p.gradient,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      borderRadius: "1px",
                    }}
                  >
                    <Camera size={30} style={{ color: "rgba(255,255,255,0.08)" }} />
                  </div>

                  {/* Caption */}
                  <p
                    style={{
                      fontFamily: "Georgia, 'Times New Roman', serif",
                      fontStyle: "italic",
                      fontSize: "11.5px",
                      color: "#555",
                      textAlign: "center",
                      marginTop: "10px",
                      lineHeight: 1,
                    }}
                  >
                    {p.caption}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* ── Text content ─────────────────────────────────────────── */}
          <div className="flex flex-col gap-7 lg:max-w-lg">

            {/* Eyebrow */}
            <motion.p
              className="text-[11px] font-semibold uppercase tracking-[0.4em] text-primary"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.35 }}
            >
              Penn M&amp;T &rsquo;27 &middot; CompE &amp; Finance
            </motion.p>

            {/* Headline */}
            <motion.h1
              className="font-heading text-6xl font-bold tracking-tight text-foreground md:text-7xl"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.45 }}
            >
              Hi, I&apos;m{" "}
              <span className="text-primary glitch-text" data-text="Ria.">
                Ria.
              </span>
            </motion.h1>

            {/* Body */}
            <motion.div
              className="flex flex-col gap-4 text-base leading-relaxed text-muted-foreground"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.55 }}
            >
              <p>
                Freshman at Penn studying computer engineering and finance. There
                are endless problems worth solving — tech is how you build a
                solution, business is how you reach people, so I&apos;m pursuing both.
              </p>
              <p>
                Right now that looks like chip design, blockchain, and
                high-frequency trading. Outside of that: crocheting, messing
                with sensors and gadgets, volleyball, and meeting new people.
              </p>
            </motion.div>

            {/* CTAs */}
            <motion.div
              className="flex flex-wrap items-center gap-3"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.65 }}
            >
              <KeyboardButton href="/projects" variant="default" size="md">
                See my work
              </KeyboardButton>
              <KeyboardButton href="/about" variant="ghost" size="md">
                Let&apos;s connect
              </KeyboardButton>
            </motion.div>

            {/* Scroll hint */}
            <motion.div
              className="flex items-center gap-2 text-muted-foreground/40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 1.1 }}
            >
              <motion.div
                animate={{ y: [0, 5, 0] }}
                transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
              >
                <ArrowDown className="h-4 w-4" />
              </motion.div>
              <span className="font-mono text-[10px] uppercase tracking-widest">scroll</span>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  )
}
