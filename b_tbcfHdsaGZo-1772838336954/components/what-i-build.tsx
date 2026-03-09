"use client"

import { motion } from "framer-motion"
import { Cpu, Brain, TrendingUp, Layers } from "lucide-react"

const areas = [
  {
    icon: Cpu,
    title: "Hardware",
    description:
      "I design chips and embedded systems — from PCB layouts to processor architecture. Right now I'm deep in RISC-V and FPGA work, which is exactly as satisfying and frustrating as it sounds.",
  },
  {
    icon: Brain,
    title: "AI & ML",
    description:
      "I build ML models and think hard about inference on constrained hardware, where you can't just throw cloud compute at the problem. The constraints are what make it interesting.",
  },
  {
    icon: TrendingUp,
    title: "FinTech",
    description:
      "From HFT latency to zero-knowledge privacy protocols, I'm drawn to finance problems where the code has to be exact because the stakes are real.",
  },
  {
    icon: Layers,
    title: "Product",
    description:
      "I care about shipping. Not just building the thing, but making sure it actually works in the world — not just on my machine.",
  },
]

export function WhatIBuild() {
  return (
    <section className="relative py-32">
      <div className="mx-auto max-w-7xl px-6">

        {/* Section header */}
        <motion.div
          className="mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.4em] text-primary">
            Domains
          </p>
          <h2 className="font-heading text-5xl font-bold tracking-tight text-foreground md:text-6xl lg:text-7xl">
            What I Build
          </h2>
        </motion.div>

        {/* 2×2 grid */}
        <div className="grid gap-px bg-border/20 md:grid-cols-2">
          {areas.map((area, index) => (
            <motion.div
              key={area.title}
              className="group relative bg-background p-8 lg:p-10"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
            >
              {/* Orange hover wash */}
              <div className="absolute inset-0 bg-primary/[0.03] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

              {/* Corner brackets */}
              <div className="absolute left-3 top-3 h-4 w-4 border-l border-t border-primary/15 transition-all duration-300 group-hover:border-primary/40" />
              <div className="absolute bottom-3 right-3 h-4 w-4 border-b border-r border-primary/15 transition-all duration-300 group-hover:border-primary/40" />

              {/* Icon */}
              <div className="relative mb-6 inline-flex h-12 w-12 items-center justify-center rounded-lg border border-primary/20 bg-primary/[0.08] transition-all duration-300 group-hover:border-primary/40 group-hover:bg-primary/[0.12]">
                <area.icon className="h-5 w-5 text-primary/70 transition-colors duration-300 group-hover:text-primary" />
              </div>

              {/* Title */}
              <h3 className="relative mb-3 font-heading text-2xl font-bold text-foreground transition-colors duration-300 group-hover:text-primary lg:text-3xl">
                {area.title}
              </h3>

              {/* Description */}
              <p className="relative text-base leading-relaxed text-muted-foreground">
                {area.description}
              </p>

              {/* Bottom accent line */}
              <div className="absolute bottom-0 left-0 h-px w-0 bg-primary/40 transition-all duration-500 group-hover:w-full" />
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  )
}
