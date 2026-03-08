"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { ChipDieBg } from "./chip-die-bg"
import { featuredProjects, statusColors } from "@/lib/projects"

// ── Featured Projects ────────────────────────────────────────
// Data lives in lib/projects.ts.
// To feature/unfeature a project: set featured: true/false there.
// To change content: edit the project object in lib/projects.ts.
// ────────────────────────────────────────────────────────────

export function FeaturedProjects() {
  return (
    <section className="relative py-32">
      <div className="relative z-10 mx-auto max-w-7xl px-6">
        {/* Section header */}
        <motion.div
          className="mb-20"
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

        {/* Project rows */}
        <div className="space-y-0">
          {featuredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Link
                href={`/projects/${project.id}`}
                className="group relative block overflow-hidden border-b border-border/40 py-10 transition-all duration-500 hover:border-primary/30 first:border-t first:border-border/40 md:py-12"
              >
                {/* Chip die shot on hover */}
                <div className="absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100">
                  <ChipDieBg seed={project.id} />
                </div>
                <div className="absolute inset-0 bg-gradient-to-r from-background/80 via-background/50 to-background/80 opacity-0 transition-opacity duration-700 group-hover:opacity-100" />

                {/* Content grid */}
                <div className="relative grid items-center gap-6 md:grid-cols-12">
                  {/* Year */}
                  <div className="hidden md:col-span-1 md:flex md:items-center">
                    <span className="font-mono text-sm font-semibold tracking-wider text-muted-foreground/75">
                      {project.year}
                    </span>
                  </div>

                  {/* Title */}
                  <div className="md:col-span-4">
                    <h3 className="font-heading text-3xl font-bold text-foreground transition-colors duration-300 group-hover:text-primary md:text-4xl lg:text-5xl">
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

        {/* View all link */}
        <motion.div
          className="mt-16 flex justify-center"
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
  )
}
