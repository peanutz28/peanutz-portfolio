"use client"

import { motion } from "framer-motion"
import { KeyboardButton } from "./keyboard-button"
import { ArrowRight, BookOpen } from "lucide-react"

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Large negative space and dark cinematic background handled by BlueprintGrid */}
      
      <div className="relative z-10 mx-auto max-w-7xl px-6 py-32 text-center">
        {/* Eyebrow label - small uppercase */}
        <motion.p
          className="mb-8 text-[10px] font-semibold uppercase tracking-[0.4em] text-primary"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <span className="cursor-blink">Penn M&T · CompE + Finance · Builder</span>
        </motion.p>

        {/* Main headline */}
        <motion.h1
          className="font-heading text-6xl font-bold leading-[0.95] tracking-tight text-foreground sm:text-7xl md:text-8xl lg:text-[10rem]"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <span className="block text-balance">
            Hi, I'm{" "}
            <span className="text-primary glitch-text" data-text="Ria.">Ria.</span>
          </span>
        </motion.h1>

        {/* Personal intro — in her own words, lowercase intentional */}
        <motion.p
          className="mx-auto mt-8 max-w-2xl text-lg leading-relaxed text-muted-foreground md:text-xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.75 }}
        >
          i&apos;m a student at penn m&t studying computer engineering &amp; finance.{" "}
          i spend most of my time{" "}
          <span className="relative inline-block">
            <span className="text-primary glitch-text" data-text="building things">building things</span>
            <motion.span
              className="absolute -bottom-0.5 left-0 h-px bg-primary/40"
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ duration: 0.6, delay: 1.3 }}
            />
          </span>{" "}
          and chasing interesting problems.{" "}
          <span className="mt-1 block text-base italic text-muted-foreground/60">
            take a scroll to see everything — ria :)
          </span>
        </motion.p>

        {/* CTAs - Tactile keyboard buttons */}
        <motion.div
          className="mt-14 flex flex-col items-center justify-center gap-4 sm:flex-row"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1 }}
        >
          <KeyboardButton href="/projects" variant="primary" size="lg">
            <span className="flex items-center gap-2">
              View Projects
              <ArrowRight className="h-4 w-4" />
            </span>
          </KeyboardButton>
          <KeyboardButton href="/lab-notes" variant="default" size="lg">
            <span className="flex items-center gap-2">
              <BookOpen className="h-4 w-4" />
              Read Lab Notes
            </span>
          </KeyboardButton>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-12 left-1/2 -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.4 }}
        >
          <motion.div
            className="flex flex-col items-center gap-2"
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <span className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
              Scroll
            </span>
            <div className="h-8 w-px bg-gradient-to-b from-muted-foreground/50 to-transparent" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
