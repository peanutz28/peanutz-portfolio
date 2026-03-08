"use client"

import { motion } from "framer-motion"
import { Cpu, Brain, TrendingUp, Layers } from "lucide-react"

const modules = [
  {
    icon: Cpu,
    title: "Hardware",
    description: "Chip design, embedded systems, FPGA, PCB prototyping, and physical computing at the silicon level.",
    code: "HW-01",
    // Hardware gets the hero slot
    featured: true,
    detail: "Specializations: VLSI · SystemVerilog · RISC-V · ARM · PCB layout",
  },
  {
    icon: Brain,
    title: "AI & ML",
    description: "Machine learning models, intelligent automation, and deploying inference at the edge.",
    code: "AI-02",
    featured: false,
    detail: null,
  },
  {
    icon: TrendingUp,
    title: "FinTech",
    description: "High-frequency trading systems, blockchain protocols, and quantitative financial infrastructure.",
    code: "FT-03",
    featured: false,
    detail: null,
  },
  {
    icon: Layers,
    title: "Product",
    description: "End-to-end development — from whiteboard sketch to shipped, real-world systems.",
    code: "PD-04",
    featured: false,
    detail: null,
  },
]

export function WhatIBuild() {
  const [featured, ...satellites] = modules

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

        {/* Block diagram layout — asymmetric */}
        <div className="relative grid grid-cols-1 gap-px bg-border/20 lg:grid-cols-5">

          {/* SVG connector traces — desktop only */}
          <svg
            className="pointer-events-none absolute inset-0 hidden h-full w-full lg:block"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
          >
            {/* Trace from featured module right edge to satellite left edges */}
            {/* These are decorative — they reinforce the block diagram metaphor */}
            <line x1="40%" y1="16.7%" x2="40%" y2="50%" stroke="oklch(0.70 0.18 46 / 0.12)" strokeWidth="1" strokeDasharray="4 4" />
            <line x1="40%" y1="50%"   x2="40%" y2="83%" stroke="oklch(0.70 0.18 46 / 0.08)" strokeWidth="1" strokeDasharray="4 4" />
          </svg>

          {/* ── Featured: Hardware ── big left block */}
          <motion.div
            className="group relative col-span-1 bg-background lg:col-span-2"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6 }}
          >
            {/* Warm glow on hover */}
            <div className="absolute inset-0 bg-primary/[0.025] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

            {/* Corner bracket markers */}
            <div className="absolute left-3 top-3 h-5 w-5 border-l-2 border-t-2 border-primary/20 transition-all duration-300 group-hover:border-primary/50" />
            <div className="absolute bottom-3 right-3 h-5 w-5 border-b-2 border-r-2 border-primary/20 transition-all duration-300 group-hover:border-primary/50" />

            <div className="relative px-8 pb-10 pt-7 lg:px-10 lg:pb-12 lg:pt-8">
              {/* Module code + status dot */}
              <div className="mb-6 flex items-center gap-3">
                <span className="font-mono text-[10px] tracking-[0.3em] text-muted-foreground/50">
                  {featured.code}
                </span>
                <div className="h-px flex-1 bg-border/40" />
                <div className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary/60" />
              </div>

              {/* Icon */}
              <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-lg border border-primary/20 bg-primary/8 transition-all duration-300 group-hover:border-primary/40 group-hover:bg-primary/12 group-hover:shadow-[0_0_24px_oklch(0.62_0.148_46/0.15)]">
                <featured.icon className="h-8 w-8 text-primary/80 transition-colors duration-300 group-hover:text-primary" />
              </div>

              {/* Title — big */}
              <h3 className="mb-4 font-heading text-4xl font-bold tracking-tight text-foreground transition-colors duration-300 group-hover:text-primary lg:text-5xl">
                {featured.title}
              </h3>

              {/* Description */}
              <p className="mb-5 max-w-sm text-base leading-relaxed text-muted-foreground">
                {featured.description}
              </p>

              {/* Specializations — only on featured */}
              {featured.detail && (
                <p className="font-mono text-[10px] tracking-wider text-muted-foreground/40">
                  {featured.detail}
                </p>
              )}
            </div>

            {/* Right edge connector dot */}
            <div className="absolute right-0 top-1/2 hidden h-2 w-2 -translate-y-1/2 translate-x-1 rounded-full border border-primary/30 bg-background lg:block" />
          </motion.div>

          {/* ── Satellites: right column, 3 stacked ── */}
          <div className="col-span-1 flex flex-col divide-y divide-border/20 lg:col-span-3">
            {satellites.map((mod, index) => (
              <motion.div
                key={mod.code}
                className="group relative bg-background"
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="absolute inset-0 bg-primary/[0.015] opacity-0 transition-opacity duration-400 group-hover:opacity-100" />

                {/* Left edge connector dot */}
                <div className="absolute left-0 top-1/2 hidden h-2 w-2 -translate-x-1 -translate-y-1/2 rounded-full border border-primary/30 bg-background lg:block" />

                <div className="relative flex flex-col gap-4 p-6 sm:flex-row sm:items-center sm:gap-6 sm:p-8">
                  {/* Module code */}
                  <span className="w-12 shrink-0 font-mono text-[10px] tracking-[0.25em] text-muted-foreground/40">
                    {mod.code}
                  </span>

                  {/* Icon + Title */}
                  <div className="flex w-44 shrink-0 items-center gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md border border-border/50 bg-card/80 transition-all duration-300 group-hover:border-primary/30 group-hover:bg-primary/[0.08]">
                      <mod.icon className="h-5 w-5 text-muted-foreground transition-colors duration-300 group-hover:text-primary" />
                    </div>
                    <h3 className="font-heading text-xl font-bold text-foreground transition-colors duration-300 group-hover:text-primary">
                      {mod.title}
                    </h3>
                  </div>

                  {/* Description */}
                  <p className="flex-1 text-sm leading-relaxed text-muted-foreground">
                    {mod.description}
                  </p>
                </div>

                {/* Bottom connector line on hover */}
                <div className="absolute bottom-0 left-0 h-px w-0 bg-primary/30 transition-all duration-600 group-hover:w-full" />
              </motion.div>
            ))}
          </div>
        </div>

        {/* Technical footer annotation */}
        <motion.div
          className="mt-6 flex items-center justify-between"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <span className="font-mono text-[10px] tracking-wider text-muted-foreground/25">
            BLOCK.DIAGRAM.v1
          </span>
          <span className="font-mono text-[10px] tracking-wider text-muted-foreground/25">
            4 MODULES · ACTIVE
          </span>
        </motion.div>
      </div>
    </section>
  )
}
