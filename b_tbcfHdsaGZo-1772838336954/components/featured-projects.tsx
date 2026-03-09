"use client"

import { motion, useMotionValue, useSpring, AnimatePresence } from "framer-motion"
import Link from "next/link"
import Image from "next/image"
import { ArrowUpRight } from "lucide-react"
import { useState, useCallback } from "react"
import { featuredProjects, statusColors } from "@/lib/projects"

// ── Per-project preview gradients ────────────────────────────
const projectPreviews: Record<string, { bg: string; label: string }> = {
  nomi: {
    bg: "linear-gradient(135deg, #0d1b2a 0%, #1e3a5f 60%, #0a3055 100%)",
    label: "AI · Memory · Chat",
  },
  beet: {
    bg: "linear-gradient(135deg, #0d2a1b 0%, #1e5f3a 60%, #0a5530 100%)",
    label: "iOS · Health · BLE",
  },
  guardianshot: {
    bg: "linear-gradient(135deg, #2a0d0d 0%, #5f1e1e 60%, #5f2010 100%)",
    label: "ML · Hardware · Safety",
  },
  supermic: {
    bg: "linear-gradient(135deg, #1a0d2a 0%, #3a1e5f 60%, #2d0a55 100%)",
    label: "PCB · FPGA · Audio",
  },
}

// ── Cursor-following preview card ─────────────────────────────
function CursorPreview({
  project,
  visible,
}: {
  project: typeof featuredProjects[0] | null
  visible: boolean
}) {
  const x = useMotionValue(-999)
  const y = useMotionValue(-999)
  const springX = useSpring(x, { stiffness: 200, damping: 28 })
  const springY = useSpring(y, { stiffness: 200, damping: 28 })

  if (typeof window !== "undefined") {
    // @ts-expect-error — intentional global for cross-component mouse sync
    window.__previewMove = (cx: number, cy: number) => {
      x.set(cx + 20)
      y.set(cy + 20)
    }
  }

  const preview = project ? projectPreviews[project.id] : null

  return (
    <AnimatePresence>
      {visible && project && preview && (
        <motion.div
          className="pointer-events-none fixed z-50"
          style={{ left: springX, top: springY }}
          initial={{ opacity: 0, scale: 0.88 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.88 }}
          transition={{ duration: 0.15 }}
        >
          <div
            className="overflow-hidden rounded-xl border border-border/60 shadow-[0_24px_64px_rgba(0,0,0,0.75)]"
            style={{ width: 280, height: 176 }}
          >
            <div className="relative h-full w-full" style={{ background: preview.bg }}>
              {/* Project logo if available */}
              {project.logo && (
                <div className="absolute right-3 top-3 flex h-10 w-10 items-center justify-center overflow-hidden rounded-lg bg-white/10 backdrop-blur-sm">
                  <Image src={project.logo} alt={project.title} width={32} height={32} className="object-contain" />
                </div>
              )}

              {/* Noise overlay */}
              <div
                className="absolute inset-0 opacity-[0.06]"
                style={{
                  backgroundImage:
                    "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")",
                  backgroundSize: "128px 128px",
                }}
              />

              <div className="absolute bottom-3 left-3">
                <span className="rounded-full bg-black/50 px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-white/70 backdrop-blur-sm">
                  {preview.label}
                </span>
              </div>

              {!project.logo && (
                <div className="absolute right-3 top-3">
                  <span className="font-heading text-sm font-bold text-white/35">
                    {project.title}
                  </span>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

// ── Logo cell ─────────────────────────────────────────────────
function ProjectLogo({ project }: { project: typeof featuredProjects[0] }) {
  const preview = projectPreviews[project.id]
  if (project.logo) {
    return (
      <div className="flex h-11 w-11 items-center justify-center overflow-hidden rounded-lg border border-border/60 bg-card shadow-sm">
        <Image src={project.logo} alt={project.title} width={36} height={36} className="object-contain" />
      </div>
    )
  }
  // Gradient placeholder
  return (
    <div
      className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-border/40 shadow-sm"
      style={{ background: preview?.bg ?? "var(--card)" }}
    >
      <span className="font-heading text-base font-bold text-white/30">
        {project.title[0]}
      </span>
    </div>
  )
}

// ── Single project row ────────────────────────────────────────
function ProjectRow({
  project,
  index,
  onHover,
  onLeave,
}: {
  project: typeof featuredProjects[0]
  index: number
  onHover: (p: typeof featuredProjects[0]) => void
  onLeave: () => void
}) {
  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (typeof window !== "undefined") {
      // @ts-expect-error — intentional global
      window.__previewMove?.(e.clientX, e.clientY)
    }
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
    >
      <Link
        href={`/projects/${project.id}`}
        className="group relative block border-b border-border/40 py-8 transition-all duration-500 hover:border-primary/30 first:border-t first:border-border/40 md:py-10"
        onMouseEnter={() => onHover(project)}
        onMouseLeave={onLeave}
        onMouseMove={handleMouseMove}
      >
        {/* Hover glow */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary/[0.03] via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

        {/* Content grid */}
        <div className="relative grid items-center gap-5 md:grid-cols-12">

          {/* Circuit trace — left decoration */}
          <div className="absolute -left-6 top-0 hidden h-full md:block" aria-hidden="true">
            <svg width="20" height="100%" className="overflow-visible opacity-0 transition-opacity duration-500 group-hover:opacity-100">
              <line x1="10" y1="0" x2="10" y2="100%" stroke="oklch(0.703 0.213 50)" strokeWidth="1" strokeDasharray="3 4" opacity="0.35" />
              <circle cx="10" cy="50%" r="3" fill="none" stroke="oklch(0.703 0.213 50)" strokeWidth="1" opacity="0.5" />
              <line x1="10" y1="50%" x2="20" y2="50%" stroke="oklch(0.703 0.213 50)" strokeWidth="1" opacity="0.4" />
            </svg>
          </div>

          {/* Logo */}
          <div className="hidden md:col-span-1 md:flex md:items-center">
            <ProjectLogo project={project} />
          </div>

          {/* Year */}
          <div className="hidden md:col-span-1 md:flex md:items-center">
            <span className="font-mono text-sm font-semibold tracking-wider text-muted-foreground">
              {project.year}
            </span>
          </div>

          {/* Title — glitch on hover */}
          <div className="md:col-span-3">
            <h3
              className="glitch-text font-heading text-3xl font-bold text-foreground transition-colors duration-300 group-hover:text-primary md:text-4xl lg:text-5xl"
              data-text={project.title}
            >
              {project.title}
            </h3>
          </div>

          {/* Description */}
          <div className="md:col-span-4">
            <p className="text-sm leading-relaxed text-muted-foreground">
              {project.description}
            </p>
          </div>

          {/* Status */}
          <div className="flex flex-wrap items-center gap-4 md:col-span-2">
            <span className={`text-xs font-medium uppercase tracking-wider ${statusColors[project.status]}`}>
              {project.status}
            </span>
          </div>

          {/* Arrow */}
          <div className="hidden items-center justify-end md:col-span-1 md:flex">
            <ArrowUpRight className="h-5 w-5 text-muted-foreground transition-all duration-300 group-hover:text-primary group-hover:translate-x-1 group-hover:-translate-y-1" />
          </div>
        </div>

        {/* Tags */}
        <div className="relative mt-3 flex flex-wrap gap-3 md:ml-[16.666%]">
          {project.tags.map((tag) => (
            <span key={tag} className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground/60">
              {tag}
            </span>
          ))}
        </div>

        {/* Hover underline sweep */}
        <div className="absolute bottom-0 left-0 h-px w-0 bg-primary/50 transition-all duration-700 group-hover:w-full" />
      </Link>
    </motion.div>
  )
}

// ── Main section ─────────────────────────────────────────────
export function FeaturedProjects() {
  const [hoveredProject, setHoveredProject] = useState<typeof featuredProjects[0] | null>(null)
  const [previewVisible, setPreviewVisible] = useState(false)

  const handleHover = useCallback((p: typeof featuredProjects[0]) => {
    setHoveredProject(p)
    setPreviewVisible(true)
  }, [])

  const handleLeave = useCallback(() => {
    setPreviewVisible(false)
  }, [])

  return (
    <>
      <CursorPreview project={hoveredProject} visible={previewVisible} />

      <section className="relative py-20">
        <div className="relative z-10 mx-auto max-w-7xl px-6">

          {/* Section header */}
          <motion.div
            className="mb-5"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.4em] text-primary">
              Featured Work
            </p>
            <h2 className="font-heading text-5xl font-bold tracking-tight text-foreground md:text-6xl lg:text-7xl">
              Selected Projects
            </h2>
          </motion.div>

          {/* Intro blurb */}
          <motion.p
            className="mb-16 max-w-xl text-base leading-relaxed text-muted-foreground"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            I&apos;ve built an AI companion, a wearable health platform, a gunshot
            detection system that won 1st at NCSEF, and a custom MEMS mic array
            with FPGA beamforming. Hover a project to preview it.
          </motion.p>

          {/* Project rows */}
          <div className="relative space-y-0">
            {featuredProjects.map((project, index) => (
              <ProjectRow
                key={project.id}
                project={project}
                index={index}
                onHover={handleHover}
                onLeave={handleLeave}
              />
            ))}
          </div>

          {/* View all link */}
          <motion.div
            className="mt-12 flex justify-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Link
              href="/projects"
              className="group flex items-center gap-3 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              <span className="relative">
                View all projects
                <span className="absolute -bottom-1 left-0 h-px w-0 bg-primary transition-all duration-300 group-hover:w-full" />
              </span>
              <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  )
}
