"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowLeft, Calendar, Clock, Share2 } from "lucide-react"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { use } from "react"

const labNotesData: Record<string, {
  title: string
  date: string
  readTime: string
  category: string
  content: string[]
}> = {
  "building-cold-chain-ai": {
    title: "Building AI for Cold Chain Monitoring",
    date: "2026-02-28",
    readTime: "8 min",
    category: "AI",
    content: [
      "When I first started working on GuardianShot, I thought the hardest part would be the hardware. I was wrong. The real challenge was building an ML model that could run on a microcontroller with 256KB of RAM while still being accurate enough to save vaccines.",
      "## The Problem with Traditional Monitoring",
      "Traditional cold chain monitoring is reactive. A sensor reads the temperature, and if it's out of range, an alarm sounds. By then, it's often too late—the vaccines have been compromised, and the damage is done.",
      "What we needed was a predictive system. Something that could see a temperature anomaly coming 30 minutes before it happened, giving healthcare workers time to intervene.",
      "## Why TinyML?",
      "The obvious solution would be to stream sensor data to the cloud and run predictions there. But in remote clinics with unreliable internet? That's a non-starter. We needed edge inference.",
      "TinyML—machine learning optimized for microcontrollers—was the answer. But it came with serious constraints: limited memory, no floating-point unit, and power consumption that had to be measured in microwatts.",
      "## Training the Model",
      "We started with an LSTM architecture, which is great for time-series prediction. The challenge was compressing it from a 2MB model to something that could fit in 200KB while maintaining accuracy.",
      "The process involved: quantization (converting 32-bit floats to 8-bit integers), pruning (removing unnecessary connections), and knowledge distillation (training a smaller model to mimic a larger one).",
      "After weeks of iteration, we achieved 94% accuracy on anomaly prediction with a 30-minute lead time. The model runs in under 50ms on an ESP32.",
      "## Lessons Learned",
      "1. **Start with data**: We spent two months collecting temperature data from real cold chain scenarios before writing a single line of model code.",
      "2. **Optimize last**: Build a working model first, then optimize. Premature optimization wasted us weeks.",
      "3. **Test on hardware early**: Simulation doesn't catch everything. We discovered memory issues only when we deployed to actual devices.",
      "The GuardianShot system is now deployed in three pilot clinics, and the results have exceeded our expectations. But more importantly, I learned that the most impactful ML isn't always the most complex—sometimes it's the most constrained.",
    ],
  },
  "hackathon-reflections": {
    title: "Hackathon Reflections: 48 Hours to MVP",
    date: "2026-02-15",
    readTime: "5 min",
    category: "Building",
    content: [
      "Last month, our team won first place at University Hackathon with Nexus, a distributed edge computing platform. Here's what I learned from building something meaningful in 48 hours.",
      "## The First Four Hours",
      "We spent the first four hours not coding. Instead, we: identified a real problem (edge computing orchestration is a mess), validated it (quick research showed this was a common pain point), and scoped ruthlessly (one core feature, done well).",
      "This felt slow. Other teams were already pushing commits. But by hour six, we had a clear architecture while they were still pivoting.",
      "## Sleep is a Multiplier",
      "I made sure our team got at least 4 hours of sleep each night. Controversial? Maybe. But the bugs we caught with fresh eyes in hour 30 would have taken twice as long to find at 3 AM.",
      "## Ship Something Every 8 Hours",
      "We set internal milestones: working scheduler by hour 16, demo app by hour 32, polish by hour 44. Each milestone had to be demo-able. This kept us honest and prevented scope creep.",
      "## What I'd Do Differently",
      "1. **Better instrumentation**: We added logging too late and spent precious hours debugging blind.",
      "2. **Practice the demo earlier**: Our first run-through was at hour 46. Way too late.",
      "3. **Document as you go**: Writing docs at hour 47 is painful.",
      "Hackathons aren't about building the best product. They're about showing what's possible in constrained conditions. The skills transfer directly to real-world shipping: scope management, rapid iteration, and knowing when good enough is good enough.",
    ],
  },
  "embedded-rust": {
    title: "Why I'm Learning Embedded Rust",
    date: "2026-01-30",
    readTime: "6 min",
    category: "Learning",
    content: [
      "After years of writing embedded C, I'm making the switch to Rust for my next robotics project. Here's why, and the resources that are helping me make the transition.",
      "## The Pain Points of Embedded C",
      "Don't get me wrong—C is powerful. But after debugging my third memory corruption bug in Ferrum's control system, I started questioning if there was a better way.",
      "The issues: null pointer dereferences, buffer overflows, use-after-free bugs. All caught at runtime, often in production. In a robotics context, these bugs can mean physical damage.",
      "## What Rust Offers",
      "Rust's ownership system catches most memory bugs at compile time. No garbage collector, no runtime overhead—perfect for embedded systems where every microsecond counts.",
      "The embedded Rust ecosystem has matured significantly. The `embedded-hal` traits provide hardware abstraction, and the community has built peripheral access crates (PACs) for most major MCU families.",
      "## My Learning Path",
      "1. **The Rust Book**: Still the best starting point. Don't skip the ownership chapter.\n2. **Discovery Book**: Hands-on embedded Rust with actual hardware.\n3. **Ferrous Systems Training**: Excellent for embedded-specific patterns.\n4. **Real projects**: I'm rewriting a simple sensor driver to get comfortable.",
      "## The Challenges",
      "Learning Rust's borrow checker is humbling. Code that compiles fine in C gets rejected. But every rejected program is a potential bug caught early.",
      "The ecosystem is smaller than C's, and some niche MCUs lack support. For my ESP32 and STM32 projects, though, the tooling is solid.",
      "## First Impressions",
      "After two weeks, I'm slower than I was in C—but I'm also more confident in my code. The compiler is strict, but it's strict for good reasons.",
      "I'll write a follow-up once I've completed the sensor fusion module for Ferrum. Early results are promising.",
    ],
  },
}

function formatDate(dateString: string) {
  const date = new Date(dateString)
  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  })
}

export default function LabNotePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params)
  const note = labNotesData[slug]

  if (!note) {
    return (
      <main className="min-h-screen bg-background">
        <Navigation />
        <div className="flex min-h-[60vh] items-center justify-center">
          <div className="text-center">
            <h1 className="font-heading text-4xl font-bold text-foreground">Note not found</h1>
            <Link href="/lab-notes" className="mt-4 inline-flex items-center gap-2 text-primary hover:underline">
              <ArrowLeft className="h-4 w-4" />
              Back to Lab Notes
            </Link>
          </div>
        </div>
        <Footer />
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-background">
      <Navigation />
      
      {/* Header */}
      <section className="pb-8 pt-32">
        <div className="mx-auto max-w-3xl px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Link
              href="/lab-notes"
              className="mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              <ArrowLeft className="h-4 w-4" />
              All notes
            </Link>

            <span className="mb-4 inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
              {note.category}
            </span>
            
            <h1 className="font-heading text-4xl font-bold tracking-tight text-foreground md:text-5xl">
              {note.title}
            </h1>
            
            <div className="mt-6 flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-1.5">
                <Calendar className="h-4 w-4" />
                {formatDate(note.date)}
              </div>
              <div className="flex items-center gap-1.5">
                <Clock className="h-4 w-4" />
                {note.readTime}
              </div>
              <button className="ml-auto flex items-center gap-1.5 transition-colors hover:text-foreground">
                <Share2 className="h-4 w-4" />
                Share
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="pb-32">
        <div className="mx-auto max-w-3xl px-6">
          <motion.article
            className="prose prose-invert prose-lg max-w-none"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {note.content.map((paragraph, index) => {
              if (paragraph.startsWith("## ")) {
                return (
                  <h2 key={index} className="mb-4 mt-12 font-heading text-2xl font-bold text-foreground">
                    {paragraph.replace("## ", "")}
                  </h2>
                )
              }
              if (paragraph.includes("\n")) {
                return (
                  <div key={index} className="my-6">
                    {paragraph.split("\n").map((line, lineIndex) => (
                      <p key={lineIndex} className="mb-2 leading-relaxed text-muted-foreground">
                        {line}
                      </p>
                    ))}
                  </div>
                )
              }
              return (
                <p key={index} className="mb-6 leading-relaxed text-muted-foreground">
                  {paragraph}
                </p>
              )
            })}
          </motion.article>

          {/* Divider */}
          <motion.div
            className="my-16 h-px bg-border"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          />

          {/* Back link */}
          <motion.div
            className="text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Link
              href="/lab-notes"
              className="inline-flex items-center gap-2 text-muted-foreground transition-colors hover:text-foreground"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to all notes
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
