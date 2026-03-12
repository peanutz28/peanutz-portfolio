"use client"

import { useRef } from "react"
import { motion, useMotionValue, useSpring } from "framer-motion"
import { ArrowDown, Camera } from "lucide-react"
import { KeyboardButton } from "./keyboard-button"

// ── Desktop: 6 large polaroids ────────────────────────────────
const desktopPolaroids = [
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
    x: "56%",
    y: "3%",
    gradient: "linear-gradient(135deg, #1a0d0d 0%, #2e1a1a 55%, #180a0a 100%)",
    delay: 0.14,
  },
  {
    id: 4,
    caption: "hardware & code",
    rotate: -3,
    x: "5%",
    y: "52%",
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
    x: "58%",
    y: "50%",
    gradient: "linear-gradient(135deg, #0a1a2e 0%, #112540 55%, #081520 100%)",
    delay: 0.24,
  },
]

// ── Mobile: 3 compact polaroids ───────────────────────────────
const mobilePolaroids = [
  {
    id: 1,
    caption: "building things",
    rotate: -5,
    x: "0%",
    y: "5%",
    gradient: "linear-gradient(135deg, #1a1a2e 0%, #16213e 55%, #0f3460 100%)",
    delay: 0.10,
  },
  {
    id: 2,
    caption: "penn m&t '27",
    rotate: 3,
    x: "30%",
    y: "0%",
    gradient: "linear-gradient(135deg, #2d1b0e 0%, #3d2512 55%, #1a0f06 100%)",
    delay: 0.16,
  },
  {
    id: 3,
    caption: "philly, pa",
    rotate: -2.5,
    x: "57%",
    y: "7%",
    gradient: "linear-gradient(135deg, #0d2a1b 0%, #1a3d28 55%, #0a1f15 100%)",
    delay: 0.12,
  },
]

// ── Sizes ──────────────────────────────────────────────────────
const DW = 275   // desktop polaroid width
const DH = 212   // desktop photo height

const MW = 132   // mobile polaroid width
const MH = 100   // mobile photo height

// ── Magnetic button wrapper ────────────────────────────────────
function MagneticWrap({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 280, damping: 22 })
  const sy = useSpring(y, { stiffness: 280, damping: 22 })

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const r = ref.current?.getBoundingClientRect()
    if (!r) return
    x.set((e.clientX - r.left - r.width / 2) * 0.30)
    y.set((e.clientY - r.top - r.height / 2) * 0.30)
  }
  const onLeave = () => { x.set(0); y.set(0) }

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ x: sx, y: sy }}
    >
      {children}
    </motion.div>
  )
}

// ── Desktop cluster ────────────────────────────────────────────
function DesktopCluster() {
  return (
    <div
      className="relative hidden shrink-0 lg:block"
      style={{ width: 740, height: 640 }}
    >
      {desktopPolaroids.map((p) => (
        <motion.div
          key={p.id}
          className="absolute cursor-default select-none"
          style={{ left: p.x, top: p.y, width: DW, zIndex: p.id }}
          initial={{ opacity: 0, rotate: p.rotate - 10, y: 36 }}
          animate={{ opacity: 1, rotate: p.rotate, y: 0 }}
          transition={{ duration: 0.65, delay: p.delay, ease: "easeOut" }}
          whileHover={{ scale: 1.07, zIndex: 10, transition: { duration: 0.15 } }}
        >
          <div
            className="shadow-[0_24px_64px_rgba(0,0,0,0.78)]"
            style={{ background: "#fff", padding: "12px", paddingBottom: "52px", borderRadius: "2px" }}
          >
            <div
              style={{
                width: DW - 24,
                height: DH,
                background: p.gradient,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "1px",
              }}
            >
              <Camera size={34} style={{ color: "rgba(255,255,255,0.07)" }} />
            </div>
            <p
              style={{
                fontFamily: "Georgia,'Times New Roman',serif",
                fontStyle: "italic",
                fontSize: "12px",
                color: "#555",
                textAlign: "center",
                marginTop: "12px",
                lineHeight: 1,
              }}
            >
              {p.caption}
            </p>
          </div>
        </motion.div>
      ))}
    </div>
  )
}

// ── Mobile cluster ─────────────────────────────────────────────
function MobileCluster() {
  return (
    <div
      className="relative mx-auto block shrink-0 lg:hidden"
      style={{ width: 340, height: 220 }}
    >
      {mobilePolaroids.map((p) => (
        <motion.div
          key={p.id}
          className="absolute cursor-default select-none"
          style={{ left: p.x, top: p.y, width: MW, zIndex: p.id }}
          initial={{ opacity: 0, rotate: p.rotate - 8, y: 20 }}
          animate={{ opacity: 1, rotate: p.rotate, y: 0 }}
          transition={{ duration: 0.6, delay: p.delay, ease: "easeOut" }}
          whileHover={{ scale: 1.05, zIndex: 10, transition: { duration: 0.15 } }}
        >
          <div
            className="shadow-[0_12px_36px_rgba(0,0,0,0.65)]"
            style={{ background: "#fff", padding: "8px", paddingBottom: "36px", borderRadius: "2px" }}
          >
            <div
              style={{
                width: MW - 16,
                height: MH,
                background: p.gradient,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "1px",
              }}
            >
              <Camera size={22} style={{ color: "rgba(255,255,255,0.07)" }} />
            </div>
            <p
              style={{
                fontFamily: "Georgia,'Times New Roman',serif",
                fontStyle: "italic",
                fontSize: "10px",
                color: "#555",
                textAlign: "center",
                marginTop: "9px",
                lineHeight: 1,
              }}
            >
              {p.caption}
            </p>
          </div>
        </motion.div>
      ))}
    </div>
  )
}

// ── Keyword highlight span ────────────────────────────────────
function KW({ children }: { children: React.ReactNode }) {
  return (
    <span className="keyword-highlight">
      {children}
    </span>
  )
}

// ── Hero section ───────────────────────────────────────────────
export function HeroSection() {
  return (
    <section className="relative flex min-h-screen items-center">
      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 py-24 lg:py-0">
        <div className="flex flex-col items-center gap-12 lg:flex-row lg:items-center lg:gap-8 xl:gap-16">

          {/* Polaroid cluster — mobile top, desktop left */}
          <MobileCluster />
          <DesktopCluster />

          {/* Text content */}
          <div className="flex w-full flex-col gap-7 text-center lg:max-w-xl lg:text-left">

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
              className="whitespace-nowrap font-heading text-6xl font-bold tracking-tight text-foreground sm:text-7xl lg:text-8xl"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.45 }}
            >
              Hi, I&apos;m{" "}
              <span className="text-primary glitch-text" data-text="Ria.">
                Ria.
              </span>
            </motion.h1>

            {/* Bio */}
            <motion.div
              className="flex flex-col gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.55 }}
            >
              {/* Lead tagline — the brand statement */}
              <p className="text-xl font-semibold text-foreground sm:text-2xl">
                Inventing my corner of the world,{" "}
                <span className="italic text-primary">with pizzazz.</span>
              </p>

              {/* Body */}
              <p className="text-base leading-relaxed text-muted-foreground lg:text-lg">
                Freshman at Penn — <KW>computer engineering</KW> + <KW>finance</KW>.
                Hardware gets you to the metal; business gets you to people.
                Right now that means{" "}
                <KW>RISC-V core design</KW>,{" "}
                <KW>zero-knowledge proofs</KW>, and{" "}
                <KW>latency-critical trading systems</KW>.
              </p>

              <p className="text-base leading-relaxed text-muted-foreground lg:text-lg">
                Also <KW>crocheting</KW>. Turns out the same brain
                that loves finite state machines loves yarn tension.
              </p>
            </motion.div>

            {/* CTAs */}
            <motion.div
              className="flex flex-wrap items-center justify-center gap-4 lg:justify-start"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.65 }}
            >
              <MagneticWrap>
                <KeyboardButton href="/projects" variant="default" size="md">
                  See my work
                </KeyboardButton>
              </MagneticWrap>
              <MagneticWrap>
                <KeyboardButton href="/about" variant="ghost" size="md">
                  Let&apos;s connect
                </KeyboardButton>
              </MagneticWrap>
            </motion.div>

            {/* Scroll hint — hide on mobile */}
            <motion.div
              className="hidden items-center gap-2 text-muted-foreground/40 lg:flex"
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
