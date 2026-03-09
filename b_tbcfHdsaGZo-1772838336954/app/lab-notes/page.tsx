"use client"

// ============================================================
// JOURNAL PAGE — app/lab-notes/page.tsx
// ============================================================
//
// This is the /lab-notes page (displayed as "Journal") — your writing,
// technical deep-dives, project reflections, and anything you want
// to document publicly.
//
// HOW TO ADD A NEW ENTRY:
//   1. Add a new object to `journalEntries` below
//   2. Make sure the `id` is URL-friendly (lowercase, hyphens, no spaces)
//   3. The actual entry content lives in:
//      app/lab-notes/[slug]/page.tsx
//      (you'll need to create that file separately and add content)
//
// HOW TO REORDER:
//   Move objects up/down in the array. First = top of page.
//
// PINNED ENTRIES:
//   Set pinned: true to show a pin icon on the card.
//
// ANNOTATIONS:
//   Set annotation: "some note" to show a small italic scribble
//   on the card. Set annotation: null to skip it.
// ============================================================

import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowLeft, Pin, Paperclip } from "lucide-react"
import { Navigation } from "@/components/navigation"
import { BlueprintGrid } from "@/components/blueprint-grid"
import { Footer } from "@/components/footer"

// ============================================================
// JOURNAL ENTRIES
// ============================================================
const journalEntries = [
  // ✏️ ENTRY 1 — pinned entries show with a pin icon in the top corner
  {
    id: "building-cold-chain-ai",
    // ✏️ TITLE — shown large on the card
    title: "Building AI for Cold Chain Monitoring",
    // ✏️ EXCERPT — shown as a preview on the card
    // Keep to 1-2 sentences. Hooks the reader without giving everything away.
    excerpt: "How I trained a lightweight ML model to predict temperature anomalies before they happen — a deep dive into TinyML and edge deployment for GuardianShot.",
    // ✏️ DATE — format: "YYYY-MM-DD"
    date: "2026-02-28",
    // ✏️ READ TIME — estimate, shown small
    readTime: "8 min",
    // ✏️ CATEGORY — short label, shown as a colored badge
    category: "AI",
    // ✏️ PINNED — true = pin icon on card; use for featured/favorite entries
    pinned: true,
    // ✏️ ANNOTATION — small italic scribble shown on card, or null to skip
    annotation: "Key breakthrough!",
  },
  // ✏️ ENTRY 2
  {
    id: "my-first-custom-pcb",
    title: "My First Custom PCB: Lessons Learned",
    excerpt: "From schematic to manufactured board — all the mistakes I made designing the SuperMic PCB and how to avoid them on your first hardware project.",
    date: "2026-02-10",
    readTime: "10 min",
    category: "Hardware",
    pinned: true,
    annotation: "Still learning",
  },
  // ✏️ ENTRY 3
  {
    id: "memory-in-ai-companions",
    title: "Memory Architectures for AI Companions",
    excerpt: "Exploring vector stores, knowledge graphs, and the tradeoffs in building persistent memory for Nomi — what works, what's uncanny, and what's still unsolved.",
    date: "2026-01-30",
    readTime: "7 min",
    category: "AI",
    pinned: false,
    annotation: null,
  },
  // ✏️ ENTRY 4
  {
    id: "beamforming-basics",
    title: "Beamforming: From Theory to FPGA",
    excerpt: "Breaking down delay-and-sum beamforming and how I implemented it in SystemVerilog on a Lattice iCE40 for SuperMic.",
    date: "2026-01-15",
    readTime: "12 min",
    category: "Technical",
    pinned: false,
    annotation: null,
  },
  // ✏️ ENTRY 5
  {
    id: "wearables-health-data",
    title: "What Wearable Data Actually Tells You",
    excerpt: "Digging into what HealthKit and BLE sensors can realistically surface — and the gap between raw biometrics and meaningful health insight. The problem Beet is solving.",
    date: "2025-12-20",
    readTime: "6 min",
    category: "Building",
    pinned: false,
    annotation: "Draft 2",
  },
  // ✏️ ENTRY 6
  {
    id: "hackathon-reflections",
    title: "Hackathon Reflections: 48 Hours to MVP",
    excerpt: "Lessons from building under pressure — on scope, sleep, systems thinking, and why the most important thing isn't the code.",
    date: "2025-11-10",
    readTime: "5 min",
    category: "Reflection",
    pinned: false,
    annotation: null,
  },

  // ➕ TO ADD A NEW ENTRY:
  // Copy one of the objects above, paste it here, and edit the fields.
  // Then create the actual entry content at app/lab-notes/[slug]/page.tsx
  //
  // {
  //   id: "my-entry-slug",           // ← becomes /lab-notes/my-entry-slug
  //   title: "Entry Title",
  //   excerpt: "Preview sentence that makes people want to click.",
  //   date: "2026-03-01",           // YYYY-MM-DD
  //   readTime: "5 min",
  //   category: "Technical",
  //   pinned: false,
  //   annotation: null,             // or "some scribble"
  // },
]

// ============================================================
// DATE FORMATTER — no need to edit
// ============================================================
const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

function formatDate(dateString: string) {
  const [year, month, day] = dateString.split("-").map(Number)
  return `${months[month - 1]} ${day}, ${year}`
}

// ============================================================
// PAGE TEMPLATE
// ============================================================
export default function JournalPage() {
  return (
    <main className="relative min-h-screen bg-background">
      <BlueprintGrid />
      <Navigation />

      {/* Notebook paper overlay */}
      <div className="pointer-events-none fixed inset-0 z-[1]">
        <svg className="h-full w-full opacity-[0.03]">
          <pattern id="notebookLines" width="100%" height="32" patternUnits="userSpaceOnUse">
            <line x1="0" y1="31" x2="100%" y2="31" stroke="currentColor" strokeWidth="1" className="text-foreground" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#notebookLines)" />
        </svg>
        <div className="absolute inset-y-0 left-16 w-px bg-primary/10 md:left-24" />
      </div>

      {/* ── HEADER ── */}
      <section className="relative z-10 pb-16 pt-32">
        <div className="mx-auto max-w-5xl px-6 md:pl-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Link
              href="/"
              className="mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              <ArrowLeft className="h-4 w-4" />
              Back home
            </Link>

            <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.4em] text-primary">
              Thinking Out Loud
            </p>
            <h1 className="font-heading text-6xl font-bold tracking-tight text-foreground md:text-7xl lg:text-8xl">
              Journal
            </h1>

            {/* Quote */}
            <motion.blockquote
              className="mt-8 max-w-lg border-l-2 border-primary/40 pl-5"
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <p
                className="text-base leading-relaxed text-muted-foreground"
                style={{ fontFamily: "Georgia, 'Times New Roman', serif", fontStyle: "italic" }}
              >
                &ldquo;Every great thinker keeps a journal, you know.&rdquo;
              </p>
              <footer className="mt-2 font-mono text-[10px] uppercase tracking-widest text-muted-foreground/50">
                — Trenton Lee Stewart, <span className="not-italic">The Mysterious Benedict Society</span>
              </footer>
            </motion.blockquote>

            <div className="mt-6 -rotate-2 font-mono text-xs text-primary/60">
              ~ where ideas take shape ~
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── ENTRIES GRID ── */}
      <section className="relative z-10 pb-32">
        <div className="mx-auto max-w-5xl px-6 md:pl-32">
          <div className="grid gap-6 md:grid-cols-2">
            {journalEntries.map((note, index) => (
              <motion.div
                key={note.id}
                initial={{ opacity: 0, y: 20, rotate: index % 2 === 0 ? -1 : 1 }}
                animate={{ opacity: 1, y: 0, rotate: index % 2 === 0 ? -0.5 : 0.5 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group"
              >
                <Link
                  href={`/lab-notes/${note.id}`}
                  className="relative block overflow-hidden rounded-sm border border-border/50 bg-card/80 p-6 shadow-lg transition-all duration-300 hover:border-primary/30 hover:shadow-xl hover:-translate-y-1"
                >
                  {/* Tape strip at top */}
                  <div className="absolute -top-1 left-1/2 h-4 w-16 -translate-x-1/2 bg-primary/10 opacity-60" />

                  {/* Pin icon for pinned entries */}
                  {note.pinned && (
                    <div className="absolute -right-1 -top-1 flex h-6 w-6 items-center justify-center rounded-full bg-primary/20 text-primary">
                      <Pin className="h-3 w-3" />
                    </div>
                  )}

                  {/* Category + read time */}
                  <div className="mb-4 flex items-center gap-3">
                    <span className="rounded-sm bg-primary/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-primary">
                      {note.category}
                    </span>
                    <span className="font-mono text-[10px] text-muted-foreground/50">
                      {note.readTime}
                    </span>
                  </div>

                  {/* Title */}
                  <h2 className="mb-3 font-heading text-xl font-bold text-foreground transition-colors group-hover:text-primary">
                    {note.title}
                  </h2>

                  {/* Excerpt */}
                  <p className="mb-4 text-sm leading-relaxed text-muted-foreground">
                    {note.excerpt}
                  </p>

                  {/* Date + annotation */}
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs text-muted-foreground/60">
                      {formatDate(note.date)}
                    </span>
                    {note.annotation && (
                      <span className="flex items-center gap-1 -rotate-2 text-[10px] italic text-primary/60">
                        <Paperclip className="h-3 w-3" />
                        {note.annotation}
                      </span>
                    )}
                  </div>

                  {/* Notebook lines overlay */}
                  <div className="pointer-events-none absolute inset-0 opacity-[0.02]">
                    {Array.from({ length: 10 }).map((_, i) => (
                      <div key={i} className="border-b border-foreground" style={{ marginTop: `${i * 24 + 60}px` }} />
                    ))}
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          <motion.div
            className="mt-12 flex justify-end"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            <div className="flex items-center gap-2 font-mono text-[10px] text-muted-foreground/40">
              <span>more entries in progress...</span>
              <svg width="24" height="12" viewBox="0 0 24 12" className="text-primary/30">
                <path d="M0 6 Q 6 0 12 6 T 24 6" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="2 2" />
              </svg>
            </div>
          </motion.div>
        </div>
      </section>

      <div className="relative z-10">
        <Footer />
      </div>
    </main>
  )
}
