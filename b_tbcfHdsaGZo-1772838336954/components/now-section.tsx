"use client"

import { motion } from "framer-motion"
import { Zap, BookOpen, Wrench } from "lucide-react"

const nowItems = [
  {
    icon: Wrench,
    label: "Building",
    content: "Silica — a pipelined RISC-V processor core in SystemVerilog",
  },
  {
    icon: BookOpen,
    label: "Learning",
    content: "Market microstructure, order flow, and latency optimization for HFT",
  },
  {
    icon: Zap,
    label: "Exploring",
    content: "Zero-knowledge proof systems and their applications in DeFi",
  },
]

export function NowSection() {
  return (
    <section className="relative py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-3xl">
          {/* Section header */}
          <motion.div
            className="mb-12 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <p className="mb-3 text-xs font-medium uppercase tracking-[0.3em] text-primary">
              Current Focus
            </p>
            <h2 className="font-heading text-4xl font-bold tracking-tight text-foreground md:text-5xl">
              Now
            </h2>
          </motion.div>

          {/* Now items */}
          <div className="space-y-6">
            {nowItems.map((item, index) => (
              <motion.div
                key={item.label}
                className="flex items-start gap-4 rounded-xl border border-border bg-card/50 p-6 transition-all hover:border-primary/30"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                {/* Icon */}
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <item.icon className="h-5 w-5" />
                </div>

                {/* Content */}
                <div>
                  <p className="mb-1 text-xs font-medium uppercase tracking-wider text-primary">
                    {item.label}
                  </p>
                  <p className="text-base text-foreground">
                    {item.content}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Last updated */}
          <motion.p
            className="mt-8 text-center text-xs text-muted-foreground"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            Last updated: March 2026
          </motion.p>
        </div>
      </div>
    </section>
  )
}
