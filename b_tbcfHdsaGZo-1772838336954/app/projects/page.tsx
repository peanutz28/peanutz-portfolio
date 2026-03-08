"use client"

// ── /projects listing page ───────────────────────────────────
// Data lives in lib/projects.ts.
// To add / reorder / edit projects: edit that file.
// To show/hide from homepage: toggle featured: true/false there.
// ────────────────────────────────────────────────────────────

import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowUpRight, ArrowLeft } from "lucide-react"
import { Navigation } from "@/components/navigation"
import { BlueprintGrid } from "@/components/blueprint-grid"
import { Footer } from "@/components/footer"
import { allProjects, statusColors } from "@/lib/projects"

export default function ProjectsPage() {
  return (
    <main className="relative min-h-screen bg-background">
      <BlueprintGrid />
      <Navigation />

      {/* ── PAGE HEADER ── */}
      <section className="relative z-10 pb-16 pt-32">
        <div className="mx-auto max-w-7xl px-6">
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
              Portfolio
            </p>
            <h1 className="font-heading text-6xl font-bold tracking-tight text-foreground md:text-7xl lg:text-8xl">
              Projects
            </h1>
            {/* ✏️ Edit this subtitle in place, or go to lib/projects.ts for project data */}
            <p className="mt-6 max-w-xl text-base text-muted-foreground">
              Things I&apos;ve designed and built. Each project started with a real problem
              and ended with something that works.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── PROJECTS LIST ── */}
      <section className="relative z-10 pb-32">
        <div className="mx-auto max-w-7xl px-6">
          <div className="space-y-0">
            {allProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.08 }}
              >
                <Link
                  href={`/projects/${project.id}`}
                  className="group relative block overflow-hidden border-b border-border/40 py-10 transition-all duration-500 hover:border-primary/30 first:border-t first:border-border/40 md:py-12"
                >
                  {/* Hover spotlight */}
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/[0.03] via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                  {/* Content grid */}
                  <div className="relative grid items-center gap-6 md:grid-cols-12">
                    {/* Year */}
                    <div className="hidden md:col-span-1 md:flex md:items-center">
                      <span className="font-mono text-sm font-semibold tracking-wider text-muted-foreground/75">
                        {project.year}
                      </span>
                    </div>

                    {/* Title */}
                    <div className="md:col-span-3">
                      <h3 className="font-heading text-3xl font-bold text-foreground transition-colors duration-300 group-hover:text-primary md:text-4xl">
                        {project.title}
                      </h3>
                    </div>

                    {/* Description */}
                    <div className="md:col-span-5">
                      <p className="text-sm leading-relaxed text-muted-foreground">
                        {project.description}
                      </p>
                    </div>

                    {/* Status */}
                    <div className="md:col-span-2">
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
                  <div className="mt-4 flex flex-wrap gap-2 md:ml-[8.333%]">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground/60"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Hover underline sweep */}
                  <div className="absolute bottom-0 left-0 h-px w-0 bg-primary/50 transition-all duration-700 group-hover:w-full" />
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Technical annotation */}
          <motion.div
            className="mt-12 flex justify-end"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            <span className="font-mono text-[10px] text-muted-foreground/30">
              ARCHIVE.PROJECTS.v{allProjects.length}
            </span>
          </motion.div>
        </div>
      </section>

      <div className="relative z-10">
        <Footer />
      </div>
    </main>
  )
}
