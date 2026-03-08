"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowLeft, Download, ExternalLink } from "lucide-react"
import { Navigation } from "@/components/navigation"
import { BlueprintGrid } from "@/components/blueprint-grid"
import { Footer } from "@/components/footer"
import { KeyboardButton } from "@/components/keyboard-button"

const experience = [
  {
    title: "Engineering Intern",
    company: "HealthTech Startup",
    period: "Summer 2025",
    description: "Built ML pipeline for predictive analytics. Developed embedded firmware for IoT devices.",
    tags: ["Python", "TensorFlow", "C++", "AWS"],
  },
  {
    title: "Research Assistant",
    company: "University Robotics Lab",
    period: "2024 – Present",
    description: "Developing real-time control systems for industrial robotics applications.",
    tags: ["ROS", "Rust", "FPGA", "Control Systems"],
  },
  {
    title: "Freelance Developer",
    company: "Various Clients",
    period: "2023 – 2024",
    description: "Full-stack development for web and mobile applications. Focus on IoT integration.",
    tags: ["React", "Node.js", "React Native", "PostgreSQL"],
  },
]

const education = [
  {
    degree: "B.S. Electrical Engineering & Computer Science",
    school: "University",
    period: "2022 – 2026 (Expected)",
    details: "Focus on Embedded Systems and Machine Learning. Dean's List.",
  },
]

const skills = {
  "Languages": ["Python", "Rust", "C/C++", "TypeScript", "Go"],
  "ML/AI": ["TensorFlow", "PyTorch", "TinyML", "Edge Deployment"],
  "Hardware": ["PCB Design", "Embedded Systems", "FPGA", "Sensor Integration"],
  "Tools": ["Docker", "Kubernetes", "AWS", "Git", "Linux"],
}

export default function ResumePage() {
  return (
    <main className="relative min-h-screen bg-background">
      <BlueprintGrid />
      <Navigation />
      
      {/* Header */}
      <section className="relative z-10 pb-16 pt-32">
        <div className="mx-auto max-w-4xl px-6">
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
            
            <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
              <div>
                <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.4em] text-primary">
                  Resume
                </p>
                <h1 className="font-heading text-6xl font-bold tracking-tight text-foreground md:text-7xl">
                  Jia
                </h1>
                <p className="mt-4 text-lg text-muted-foreground">
                  Engineer & Builder
                </p>
              </div>
              
              <KeyboardButton variant="primary" size="md">
                <span className="flex items-center gap-2">
                  <Download className="h-4 w-4" />
                  Download PDF
                </span>
              </KeyboardButton>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Experience */}
      <section className="relative z-10 pb-16">
        <div className="mx-auto max-w-4xl px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="mb-8 font-heading text-2xl font-bold text-foreground">Experience</h2>
            
            <div className="space-y-8">
              {experience.map((job, index) => (
                <motion.div
                  key={index}
                  className="relative border-l border-border/50 pl-6"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <div className="absolute -left-1.5 top-0 h-3 w-3 rounded-sm border border-primary/50 bg-background" />
                  
                  <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                    <h3 className="font-heading text-lg font-bold text-foreground">{job.title}</h3>
                    <span className="font-mono text-xs text-muted-foreground/60">{job.period}</span>
                  </div>
                  
                  <p className="mt-1 text-sm text-primary">{job.company}</p>
                  
                  <p className="mt-3 text-sm text-muted-foreground">{job.description}</p>
                  
                  <div className="mt-4 flex flex-wrap gap-2">
                    {job.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground/60"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Education */}
      <section className="relative z-10 pb-16">
        <div className="mx-auto max-w-4xl px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="mb-8 font-heading text-2xl font-bold text-foreground">Education</h2>
            
            {education.map((edu, index) => (
              <div key={index} className="rounded-sm border border-border/50 bg-card/50 p-6">
                <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                  <h3 className="font-heading text-lg font-bold text-foreground">{edu.degree}</h3>
                  <span className="font-mono text-xs text-muted-foreground/60">{edu.period}</span>
                </div>
                <p className="mt-1 text-sm text-primary">{edu.school}</p>
                <p className="mt-3 text-sm text-muted-foreground">{edu.details}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Skills */}
      <section className="relative z-10 pb-16">
        <div className="mx-auto max-w-4xl px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="mb-8 font-heading text-2xl font-bold text-foreground">Skills</h2>
            
            <div className="grid gap-px bg-border/30 sm:grid-cols-2">
              {Object.entries(skills).map(([category, items]) => (
                <div key={category} className="bg-background p-6">
                  <h3 className="mb-4 text-[10px] font-semibold uppercase tracking-[0.3em] text-primary">
                    {category}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {items.map((skill) => (
                      <span
                        key={skill}
                        className="rounded-sm border border-border/50 bg-card/50 px-3 py-1.5 text-sm text-foreground"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Projects CTA */}
      <section className="relative z-10 pb-32">
        <div className="mx-auto max-w-4xl px-6">
          <motion.div
            className="flex items-center justify-between rounded-sm border border-border/50 bg-card/50 p-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-sm text-muted-foreground">
              Want to see my work in action?
            </p>
            <KeyboardButton href="/projects" variant="ghost" size="sm">
              <span className="flex items-center gap-2">
                View projects
                <ExternalLink className="h-4 w-4" />
              </span>
            </KeyboardButton>
          </motion.div>
        </div>
      </section>

      <div className="relative z-10">
        <Footer />
      </div>
    </main>
  )
}
