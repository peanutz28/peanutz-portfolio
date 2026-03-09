"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowUpRight, Pin } from "lucide-react"
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

const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

function formatDate(dateString: string) {
  const [year, month, day] = dateString.split("-").map(Number)
  return `${months[month - 1]} ${day}, ${year}`
}

export function JournalPreview() {
  return (
    <section className="relative py-20">
      <div className="relative z-10 mx-auto max-w-7xl px-6">
        {/* Section header */}
        <motion.div
          className="mb-20 flex items-end justify-between"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <div>
            <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.4em] text-primary">
              Thinking Out Loud
            </p>
            <h2 className="font-heading text-5xl font-bold tracking-tight text-foreground md:text-6xl">
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

        {/* Entries as notebook rows */}
        <div className="space-y-2">
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
                className="group relative grid items-center gap-6 border-b border-border/30 py-6 transition-colors hover:border-primary/30 md:grid-cols-12"
              >
                {/* Spotlight on hover */}
                <div className="absolute inset-0 bg-gradient-to-r from-primary/[0.02] via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                {/* Date */}
                <div className="relative hidden md:col-span-2 md:block">
                  <span className="font-mono text-xs text-muted-foreground/60">
                    {formatDate(note.date)}
                  </span>
                </div>

                {/* Category with pin */}
                <div className="relative flex items-center gap-2 md:col-span-2">
                  <span className="rounded-sm bg-primary/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-primary">
                    {note.category}
                  </span>
                  {note.pinned && (
                    <Pin className="h-3 w-3 text-primary/60" />
                  )}
                </div>

                {/* Title */}
                <div className="relative md:col-span-4">
                  <h3 className="font-heading text-lg font-bold text-foreground transition-colors group-hover:text-primary">
                    {note.title}
                  </h3>
                </div>

                {/* Excerpt */}
                <div className="relative md:col-span-3">
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {note.excerpt}
                  </p>
                </div>

                {/* Arrow */}
                <div className="relative hidden items-center justify-end md:col-span-1 md:flex">
                  <ArrowUpRight className="h-4 w-4 text-muted-foreground/40 transition-all duration-300 group-hover:text-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>

                {/* Mobile date */}
                <div className="font-mono text-xs text-muted-foreground/60 md:hidden">
                  {formatDate(note.date)}
                </div>

                {/* Progress line */}
                <div className="absolute bottom-0 left-0 h-px w-0 bg-primary/40 transition-all duration-500 group-hover:w-full" />
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Mobile view all */}
        <motion.div
          className="mt-8 text-center sm:hidden"
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
  )
}
