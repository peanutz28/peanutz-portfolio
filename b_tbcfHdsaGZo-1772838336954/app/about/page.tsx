"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowLeft, MapPin, Mail, Github, Linkedin, Twitter } from "lucide-react"
import { Navigation } from "@/components/navigation"
import { BlueprintGrid } from "@/components/blueprint-grid"
import { Footer } from "@/components/footer"
import { KeyboardButton } from "@/components/keyboard-button"

const socialLinks = [
  { href: "https://github.com", icon: Github, label: "GitHub" },
  { href: "https://linkedin.com", icon: Linkedin, label: "LinkedIn" },
  { href: "https://twitter.com", icon: Twitter, label: "Twitter" },
  { href: "mailto:hello@ria.dev", icon: Mail, label: "Email" },
]

const interests = [
  {
    title: "Crocheting",
    description:
      "There's something deeply satisfying about making physical things with your hands. Crocheting is my analog reset — no screens, just yarn and pattern.",
  },
  {
    title: "Volleyball",
    description:
      "Club volleyball at Penn. I play outside hitter. It's one of the few things that genuinely clears my head.",
  },
  {
    title: "Gadgets & Experiments",
    description:
      "I buy too many components on Digi-Key. My room is part dorm, part electronics lab. If it plugs in or compiles, I've probably tried to take it apart.",
  },
  {
    title: "Meeting People",
    description:
      "I'm genuinely curious about what people are building and how they think. Coffee chats, hackathons, random conversations in the library — all of it.",
  },
  {
    title: "Random Curiosities",
    description:
      "Why does market structure exist the way it does? How does a proof-of-work system actually feel different from proof-of-stake? I go deep on weird questions.",
  },
]

export default function AboutPage() {
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

            <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.4em] text-primary">
              Life
            </p>
            <h1 className="font-heading text-6xl font-bold tracking-tight text-foreground md:text-7xl lg:text-8xl">
              Hi, I'm Ria.
            </h1>
          </motion.div>
        </div>
      </section>

      {/* Photo and intro */}
      <section className="relative z-10 pb-16">
        <div className="mx-auto max-w-4xl px-6">
          <div className="grid gap-12 md:grid-cols-5">
            {/* Photo */}
            <motion.div
              className="md:col-span-2"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-border bg-card">
                <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-secondary via-muted to-secondary">
                  <div className="text-center">
                    <div className="mx-auto mb-4 flex h-32 w-32 items-center justify-center rounded-full border border-border bg-card/80 backdrop-blur-sm">
                      <span className="font-heading text-5xl font-bold text-primary">R</span>
                    </div>
                    <p className="text-sm text-muted-foreground">Photo coming soon</p>
                  </div>
                </div>
              </div>

              {/* Location */}
              <div className="mt-6 flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4 text-primary" />
                <span>Philadelphia, PA — University of Pennsylvania</span>
              </div>

              {/* Social links */}
              <div className="mt-4 flex gap-2">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-9 w-9 items-center justify-center rounded-md border border-border/50 bg-card/50 text-muted-foreground shadow-[0_2px_0_0] shadow-border/30 transition-all hover:translate-y-[1px] hover:border-primary/30 hover:text-primary hover:shadow-[0_1px_0_0]"
                    aria-label={social.label}
                  >
                    <social.icon className="h-4 w-4" />
                  </a>
                ))}
              </div>
            </motion.div>

            {/* Intro text */}
            <motion.div
              className="md:col-span-3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <p className="text-xl leading-relaxed text-foreground md:text-2xl">
                Freshman at Penn studying computer engineering and finance. I believe tech is
                how you build solutions — and business is how you reach people.
              </p>

              <div className="mt-8 space-y-6 text-muted-foreground">
                <p className="leading-relaxed">
                  Right now I'm deep in chip design, learning how processors actually work
                  from the ground up. I'm also fascinated by the intersection of finance and
                  systems — how high-frequency trading firms are really just extremely well-optimized
                  hardware and software pipelines making millions of decisions per second.
                </p>
                <p className="leading-relaxed">
                  I came to Penn to build things I couldn't build anywhere else — with people
                  who push me to think differently about both the technical and the human sides
                  of what we create. So far, it's working.
                </p>
                <p className="leading-relaxed">
                  Outside the lab I crochet, play volleyball, and buy too many components from
                  Digi-Key. My room is part dorm, part electronics lab.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* What I'm exploring */}
      <section className="relative z-10 py-16">
        <div className="mx-auto max-w-4xl px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="mb-8 font-heading text-3xl font-bold text-foreground">
              What I'm Exploring
            </h2>

            <div className="rounded-xl border border-primary/30 bg-primary/5 p-8">
              <p className="text-lg leading-relaxed text-foreground">
                Chip design. Blockchain. High-frequency trading. These feel like separate
                worlds, but they're all really about the same thing: how do you design systems
                that operate at the limits of what's physically possible? I want to build at
                those limits.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Beyond engineering */}
      <section className="relative z-10 py-16">
        <div className="mx-auto max-w-4xl px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="mb-8 font-heading text-3xl font-bold text-foreground">
              Outside the Lab
            </h2>

            <div className="space-y-4">
              {interests.map((item, index) => (
                <motion.div
                  key={item.title}
                  className="group relative overflow-hidden rounded-xl border border-border bg-card/50 p-6 transition-all duration-300 hover:border-primary/30"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.07 }}
                >
                  <div className="absolute inset-0 bg-primary/[0.02] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                  <div className="absolute left-2 top-2 h-3 w-3 border-l border-t border-border/40 opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-hover:border-primary/30" />
                  <h3 className="relative mb-2 font-heading font-bold text-foreground">
                    {item.title}
                  </h3>
                  <p className="relative text-sm leading-relaxed text-muted-foreground">
                    {item.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative z-10 py-16">
        <div className="mx-auto max-w-4xl px-6">
          <motion.div
            className="rounded-sm border border-border/50 bg-card/80 p-8 text-center md:p-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="mb-4 font-heading text-2xl font-bold text-foreground md:text-3xl">
              Let's build something together
            </h2>
            <p className="mb-8 text-muted-foreground">
              I'm always open to collaborating, learning, or just talking about something
              interesting. Find me at Penn or reach out below.
            </p>
            <KeyboardButton href="mailto:hello@ria.dev" variant="primary" size="lg">
              <span className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                Get in touch
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
