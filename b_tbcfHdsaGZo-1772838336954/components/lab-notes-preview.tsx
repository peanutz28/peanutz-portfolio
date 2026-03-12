"use client"

import { motion, useMotionValue, useSpring, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { ArrowUpRight, Pin } from "lucide-react"
import { useState, useCallback } from "react"
import { KeyboardButton } from "./keyboard-button"

const journalEntries = [
  {
    id: "building-a-risc-v-core",
    title: "Building a RISC-V Core from Scratch",
    excerpt: "Week 3 notes on pipelining, hazard detection, and the specific pain of branch prediction.",
    date: "2026-02-28",
    category: "Hardware",
    pinned: true,
  },
  {
    id: "hft-latency-notes",
    title: "What Microseconds Actually Mean in HFT",
    excerpt: "Breaking down the hardware and software decisions that separate fast from fast enough.",
    date: "2026-02-12",
    category: "FinTech",
    pinned: false,
  },
  {
    id: "zk-proofs-explainer",
    title: "Zero-Knowledge Proofs: A Builder's Notes",
    excerpt: "How I actually started understanding ZK proofs — not from theory, but from building Meridian.",
    date: "2026-01-25",
    category: "Blockchain",
    pinned: false,
  },
]

// ── Per-category preview gradients ───────────────────────────
const categoryPreviews: Record<string, { bg: string; accent: string }> = {
  Hardware:   { bg: "linear-gradient(135deg, #0d1b2a 0%, #1e3a5f 60%, #0a3055 100%)", accent: "#60a5fa" },
  FinTech:    { bg: "linear-gradient(135deg, #1a1000 0%, #3d2800 60%, #2a1c00 100%)", accent: "#f59e0b" },
  Blockchain: { bg: "linear-gradient(135deg, #1a0d2a 0%, #3a1e5f 60%, #2d0a55 100%)", accent: "#c084fc" },
}

const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

function formatDate(dateString: string) {
  const [year, month, day] = dateString.split("-").map(Number)
  return `${months[month - 1]} ${day}, ${year}`
}

// ── Cursor-following preview card (desktop only) ──────────────
function JournalCursorPreview({
  entry,
  visible,
}: {
  entry: typeof journalEntries[0] | null
  visible: boolean
}) {
  const x = useMotionValue(-999)
  const y = useMotionValue(-999)
  const springX = useSpring(x, { stiffness: 220, damping: 28 })
  const springY = useSpring(y, { stiffness: 220, damping: 28 })

  if (typeof window !== "undefined") {
    // @ts-expect-error — intentional global for cross-component mouse sync
    window.__journalPreviewMove = (cx: number, cy: number) => {
      x.set(cx + 22)
      y.set(cy + 22)
    }
  }

  const preview = entry ? categoryPreviews[entry.category] : null

  return (
    <AnimatePresence>
      {visible && entry && preview && (
        <motion.div
          className="pointer-events-none fixed z-50 hidden md:block"
          style={{ left: springX, top: springY }}
          initial={{ opacity: 0, scale: 0.88 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.88 }}
          transition={{ duration: 0.14 }}
        >
          <div
            className="overflow-hidden rounded-xl border border-border/60 shadow-[0_24px_64px_rgba(0,0,0,0.8)]"
            style={{ width: 260, minHeight: 130 }}
          >
            <div className="relative h-full" style={{ background: preview.bg }}>
              {/* Noise texture */}
              <div
                className="absolute inset-0 opacity-[0.05]"
                style={{
                  backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")",
                  backgroundSize: "128px 128px",
                }}
              />
              <div className="relative p-4">
                {/* Category badge */}
                <span
                  className="rounded-full px-2.5 py-0.5 font-mono text-[9px] uppercase tracking-widest"
                  style={{ background: `${preview.accent}22`, color: preview.accent, border: `1px solid ${preview.accent}44` }}
                >
                  {entry.category}
                </span>
                {/* Title */}
                <p className="mt-2 font-heading text-sm font-bold leading-snug text-white/90">
                  {entry.title}
                </p>
                {/* Excerpt */}
                <p className="mt-1.5 line-clamp-2 font-sans text-[11px] leading-relaxed text-white/50">
                  {entry.excerpt}
                </p>
                {/* Date */}
                <p className="mt-3 font-mono text-[9px] text-white/30">
                  {formatDate(entry.date)}
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export function JournalPreview() {
  const [hoveredEntry, setHoveredEntry] = useState<typeof journalEntries[0] | null>(null)
  const [previewVisible, setPreviewVisible] = useState(false)

  const handleHover = useCallback((e: typeof journalEntries[0]) => {
    setHoveredEntry(e)
    setPreviewVisible(true)
  }, [])
  const handleLeave = useCallback(() => setPreviewVisible(false), [])
  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (typeof window !== "undefined") {
      // @ts-expect-error
      window.__journalPreviewMove?.(e.clientX, e.clientY)
    }
  }, [])

  return (
    <>
      <JournalCursorPreview entry={hoveredEntry} visible={previewVisible} />

      <section className="relative py-16 md:py-20">
        <div className="relative z-10 mx-auto max-w-7xl px-6">
          {/* Section header */}
          <motion.div
            className="mb-10 flex items-end justify-between md:mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <div>
              <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.4em] text-primary">
                Thinking Out Loud
              </p>
              <h2 className="heading-draw font-heading text-5xl font-bold tracking-tight text-foreground sm:text-6xl md:text-7xl">
                Journal
              </h2>
            </div>
            <KeyboardButton href="/lab-notes" variant="ghost" size="sm" className="hidden sm:inline-flex">
              <span className="flex items-center gap-2">
                View all
                <ArrowUpRight className="h-4 w-4" />
              </span>
            </KeyboardButton>
          </motion.div>

          {/* ── Mobile cards ──────────────────────────────────────── */}
          <div className="space-y-3 md:hidden">
            {journalEntries.map((note, index) => (
              <motion.div
                key={note.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.45, delay: index * 0.08 }}
              >
                <Link
                  href={`/lab-notes/${note.id}`}
                  className="group relative block overflow-hidden rounded-xl border border-border/40 bg-card/50 p-4 transition-all duration-300 hover:border-primary/30 hover:bg-card active:scale-[0.99]"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.04] to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  <div className="relative">
                    <div className="mb-2.5 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="rounded-sm bg-primary/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-primary">
                          {note.category}
                        </span>
                        {note.pinned && <Pin className="h-3 w-3 text-primary/60" />}
                      </div>
                      <ArrowUpRight className="h-4 w-4 text-muted-foreground/30 transition-all duration-300 group-hover:text-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </div>
                    <h3 className="font-heading text-lg font-bold leading-snug text-foreground transition-colors group-hover:text-primary">
                      {note.title}
                    </h3>
                    <p className="mt-1.5 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
                      {note.excerpt}
                    </p>
                    <p className="mt-3 font-mono text-[10px] text-muted-foreground/50">
                      {formatDate(note.date)}
                    </p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          {/* ── Desktop rows ──────────────────────────────────────── */}
          <div className="hidden space-y-0 md:block">
            {journalEntries.map((note, index) => (
              <motion.div
                key={note.id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Link
                  href={`/lab-notes/${note.id}`}
                  className="group relative grid items-center gap-6 border-b border-border/30 py-8 transition-colors hover:border-primary/30 md:grid-cols-12"
                  onMouseEnter={() => handleHover(note)}
                  onMouseLeave={handleLeave}
                  onMouseMove={handleMouseMove}
                >
                  {/* Spotlight on hover */}
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/[0.03] via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  {/* Left accent bar */}
                  <div
                    className="absolute left-0 top-0 h-0 w-0.5 transition-all duration-500 group-hover:h-full"
                    style={{ background: categoryPreviews[note.category]?.accent ?? "oklch(0.703 0.213 50)" }}
                  />

                  {/* Date */}
                  <div className="relative col-span-2">
                    <span className="font-mono text-xs text-muted-foreground/60">
                      {formatDate(note.date)}
                    </span>
                  </div>

                  {/* Category with pin */}
                  <div className="relative col-span-2 flex items-center gap-2">
                    <span
                      className="rounded-sm px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider"
                      style={{
                        background: `${categoryPreviews[note.category]?.accent ?? "#f97316"}18`,
                        color: categoryPreviews[note.category]?.accent ?? "oklch(0.703 0.213 50)",
                      }}
                    >
                      {note.category}
                    </span>
                    {note.pinned && <Pin className="h-3 w-3 text-primary/60" />}
                  </div>

                  {/* Title */}
                  <div className="relative col-span-4">
                    <h3 className="font-heading text-xl font-bold text-foreground transition-colors group-hover:text-primary">
                      {note.title}
                    </h3>
                  </div>

                  {/* Excerpt */}
                  <div className="relative col-span-3">
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      {note.excerpt}
                    </p>
                  </div>

                  {/* Arrow */}
                  <div className="relative col-span-1 flex items-center justify-end">
                    <ArrowUpRight className="h-4 w-4 text-muted-foreground/40 transition-all duration-300 group-hover:text-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>

                  {/* Progress line */}
                  <div className="absolute bottom-0 left-0 h-px w-0 bg-primary/40 transition-all duration-500 group-hover:w-full" />
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Mobile view all */}
          <motion.div
            className="mt-6 text-center sm:hidden"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <KeyboardButton href="/lab-notes" variant="default" size="sm">
              <span className="flex items-center gap-2">
                View all entries
                <ArrowUpRight className="h-4 w-4" />
              </span>
            </KeyboardButton>
          </motion.div>
        </div>
      </section>
    </>
  )
}
