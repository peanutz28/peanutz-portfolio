"use client"

// ============================================================
// PROJECT DETAIL PAGE — app/projects/[slug]/page.tsx
// ============================================================
//
// HOW THIS WORKS:
//   - Each project lives in the `projectData` object below
//   - The URL /projects/nomi loads the "nomi" entry
//   - The URL /projects/beet loads the "beet" entry, etc.
//   - To add a new project: add a new key/object to `projectData`
//     AND add it to the listing page at app/projects/page.tsx
//
// QUICK EDIT GUIDE:
//   All your edits will be in the `projectData` section below.
//   Each field has a comment explaining what it does.
//   Search for "✏️" to jump to each editable field.
// ============================================================

import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowLeft, ExternalLink, Github } from "lucide-react"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { BlueprintGrid } from "@/components/blueprint-grid"
import { use } from "react"

// ============================================================
// PROJECT DATA
// ============================================================
// Add / edit all project content here. The page template below
// will automatically render whatever you put in these objects.
// ============================================================

const projectData: Record<string, {
  title: string
  tagline: string
  status: string
  year: string
  tags: string[]
  why: string
  overview: string
  problem: string
  solution: string
  technicalApproach: string
  stack: string[]
  timeline: { phase: string; description: string }[]
  results: string[]
  imagePlaceholder: string
  links?: { label: string; href: string; icon: "github" | "external" }[]
}> = {

  // ----------------------------------------------------------
  // PROJECT: NOMI
  // URL: /projects/nomi
  // ----------------------------------------------------------
  nomi: {

    // ✏️ TITLE — shows in big heading at top of page
    title: "Nomi",

    // ✏️ TAGLINE — one-liner under the title, slightly larger text
    // Keep it punchy — this is what people remember
    tagline: "An AI-powered home companion for elder care and daily safety",

    // ✏️ STATUS — shows as a colored badge
    // Options: "In Progress" (blue) | "Prototype" (copper) | "Deployed" (green) | "Completed" (gray)
    status: "Prototype",

    // ✏️ YEAR — shows small, next to the status badge
    year: "2025",

    // ✏️ TAGS — short labels that appear under the title
    // Keep each tag 1-3 words, max ~5 tags
    tags: ["AI", "IoT", "Agentic Systems", "Health Tech"],

    // ✏️ WHY I BUILT THIS — most personal section, shown in a highlighted copper card at the top
    // Write in first person, casual voice. This is the "ria speaking" section.
    // 2-4 sentences is ideal. No need to be technical here.
    why: "We wanted to build something that could make independent living safer and less stressful for older adults and the people caring for them. My own grandmother fell down the stairs in India and we had no idea until she was able to get to her phone. A lot of elder-care tools out there are reactive, fragmented, or difficult to use, and they often miss the everyday patterns that signal when something is off. \n\n I was interested in creating something that could preserve privacy WHILE continuously observing home activity, connecting sensor data, and gather meaningful conclusions before small issues become bigger problems.",

    // ✏️ OVERVIEW — paragraph-length summary shown under the section header
    // 2-4 sentences. What is this thing? Who is it for? What does it do?
    overview: "Nomi is an AI-powered elder-care companion that uses a network of sensors and intelligent agents to monitor daily routines, detect unusual patterns, and provide caregivers with useful updates. It’s designed to be proactive, not just reactive - catching small issues before they become emergencies, while respecting the user’s privacy and autonomy.",

    // ✏️ PROBLEM — shown in the left card of the Problem/Solution pair
    // What's the gap in the world that this fills? Be specific.
    problem: "Many older adults want to live independently, but families often have limited visibility into how they are actually doing day to day. Existing solutions are often expensive, intrusive, or too narrow in scope. A fall button or camera alone does not tell the full story.",

    // ✏️ SOLUTION — shown in the right card (copper-tinted), labeled "What I built"
    // Contrast this with the problem above. What does your thing do differently?
    solution: "We built an AI-assisted monitoring system that connects sensor data from the home into an intelligent care platform. Nomi tracks patterns across multiple devices, identifies irregular behavior, and helps caregivers understand when something may need attention. Rather than flooding users with raw data, the system is designed to interpret signals and turn them into useful alerts, summaries, and insights. It’s much more than a fall detector - it’s a daily companion that learns the rhythms of the home and looks out for the people in it.",

    // ✏️ TECHNICAL APPROACH — longer paragraph, shown as its own section
    // This is where you can get into the how. Good place to mention specific
    // decisions, tradeoffs, algorithms, or interesting engineering choices.
    technicalApproach: "Nomi uses a multi-sensor architecture paired with AI agents to process home activity data and generate context-aware outputs. \n We turned low-cost sensors on an ESP32 into caregiver-ready insights by streaming data to DynamoDB, fusing it in a FastAPI service, and asking NVIDIA’s Nemotron-based NIM to produce clear, structured summaries that render live in a React dashboard, with optional on-device OpenCV/MediaPipe fall detection for privacy.",

    // ✏️ STACK — list of tools/languages/frameworks used
    // Each item becomes a pill/tag. Order doesn't matter.
    stack: ["ESP32", "Python", "FastAPI", "AWS DynamoDB", "NVIDIA NIM", "React"],

    // ✏️ TIMELINE / PROCESS — ordered list of phases shown as a numbered vertical list
    // Each item has:
    //   phase: short name (shows bold) — e.g. "Research", "MVP Build", "Testing"
    //   description: 1-2 sentences about what happened in that phase
    // Add or remove phases as needed.
    timeline: [
      { phase: "Problem Framing", description: "Researched elder-care challenges and focused on the gap between emergency-response devices and true day-to-day monitoring." },
      { phase: "System Design", description: "Designed a multi-sensor home monitoring architecture that could capture routine activity without being overly invasive." },
      { phase: "Agentic Layer", description: "Built an agent-based intelligence layer to interpret sensor activity+ generate meaningful updates from patterns." },
      { phase: "User Experience", description: "Created a user-facing interface for caregivers to view activity and alerts in a way that feels clear and actionable." },
    ],

    // ✏️ RESULTS — bullet points shown under "Results & Impact"
    // Be specific where you can (numbers, metrics, quotes).
    // If the project is still in progress, that's fine — say what you have so far.
    results: [
      "Won Grand Prize at NVIDIA x AWS Agentic AI Hackathon out of 1900+ participants",
      "Brought home $7k GPU, swag, and mentorship!'",
      "Active development on Nomi - shipping incrementally",
    ],

    // ✏️ IMAGE PLACEHOLDER — this shows in the hero image area until you add a real photo
    // Describe what photo/screenshot you'll swap in later, e.g.:
    //   "App screenshot — chat interface"
    //   "Hardware prototype photo"
    //   "Demo video thumbnail"
    imagePlaceholder: "Interface mockup or early screenshot",

    // ✏️ LINKS (optional) — buttons shown in the hero under the title
    // icon: "github" shows the GitHub logo | "external" shows an arrow-out icon
    // Set href: "#" to leave as a placeholder (won't navigate anywhere)
    // Delete this entire block if you have no links yet
    links: [
      { label: "GitHub", href: "https://github.com/Crustaly/nomi", icon: "github" },
    ],
  },

  // ----------------------------------------------------------
  // PROJECT: BEET
  // URL: /projects/beet
  // ----------------------------------------------------------
  beet: {

    // ✏️ TITLE
    title: "Beet",

    // ✏️ TAGLINE
    tagline: "Wearable health data that actually tells you something",

    // ✏️ STATUS — "In Progress" | "Prototype" | "Deployed" | "Completed"
    status: "Prototype",

    // ✏️ YEAR
    year: "2026",

    // ✏️ TAGS
    tags: ["Hardware", "IoT", "Swift"],

    // ✏️ WHY I BUILT THIS — personal, first-person, casual
    why: "I wear a bunch of trackers and I'm still confused about my health data. There's a gap between 'your resting HR was 62 bpm' and 'here's what that means for you today.' I wanted to close it.",

    // ✏️ OVERVIEW
    overview: "Beet is a real-time health data aggregator that pulls from multiple wearable sensors and surfaces meaningful, actionable insights — not just raw numbers. It processes signals at the edge for low-latency feedback and works offline-first.",

    // ✏️ PROBLEM
    problem: "Wearable health apps drown users in metrics without context. Data is siloed across devices, and the insights layer is usually shallow or nonexistent. Most apps just repackage manufacturer data.",

    // ✏️ SOLUTION
    solution: "A unified aggregation layer that reads from multiple sources (Apple Health, BLE devices, custom sensors), processes locally for speed and privacy, and surfaces insights through a minimal, calm iOS interface.",

    // ✏️ TECHNICAL APPROACH
    technicalApproach: "The core is a Swift/SwiftUI iOS app that uses HealthKit and CoreBluetooth for data ingestion. A lightweight on-device inference model interprets patterns in real time — no cloud round-trips for basic insights. BLE peripherals communicate via custom GATT profiles I defined for a prototype sensor node.",

    // ✏️ STACK
    stack: ["Swift", "SwiftUI", "HealthKit", "CoreBluetooth", "Core ML", "TensorFlow Lite"],

    // ✏️ TIMELINE
    timeline: [
      { phase: "Problem Mapping", description: "Identified the most meaningful signals to track and correlate" },
      { phase: "iOS Foundation", description: "Built HealthKit + CoreBluetooth data pipeline" },
      { phase: "Custom Sensor Node", description: "Prototyped a BLE peripheral for additional biometric sensing" },
      { phase: "Insights Layer", description: "Training lightweight on-device model for pattern interpretation" },
    ],

    // ✏️ RESULTS
    results: [
      "Working iOS prototype with multi-source data aggregation",
      "Sub-100ms latency for real-time sensor feedback",
      "Custom BLE sensor node functional on breadboard",
      "Ongoing: refining the insight generation model",
    ],

    // ✏️ IMAGE PLACEHOLDER — swap with: "App screenshots or hardware prototype photo"
    imagePlaceholder: "App screenshots or hardware prototype photo",

    // ✏️ LINKS — update hrefs when you're ready, or delete the whole block
    links: [
      { label: "GitHub", href: "#", icon: "github" },
    ],
  },

  // ----------------------------------------------------------
  // PROJECT: GUARDIANSHOT
  // URL: /projects/guardianshot
  // ----------------------------------------------------------
  guardianshot: {

    // ✏️ TITLE
    title: "GuardianShot",

    // ✏️ TAGLINE
    tagline: "AI-powered cold chain monitoring for vaccine integrity",

    // ✏️ STATUS — "In Progress" | "Prototype" | "Deployed" | "Completed"
    status: "Deployed",

    // ✏️ YEAR
    year: "2025",

    // ✏️ TAGS
    tags: ["AI", "IoT", "Health Tech"],

    // ✏️ WHY I BUILT THIS
    why: "I came across data showing that up to 50% of vaccines are wasted due to cold chain failures in developing regions. The alarming part wasn't the waste — it was that most failures are only detected after the vaccines are already administered. I wanted to build something that catches the problem before it becomes a tragedy.",

    // ✏️ OVERVIEW
    overview: "GuardianShot is an intelligent monitoring system designed to ensure vaccine integrity throughout the cold chain. Using edge ML and IoT sensors, it predicts temperature anomalies before they compromise vaccine efficacy — giving healthcare workers time to act.",

    // ✏️ PROBLEM
    problem: "In remote healthcare settings, vaccine spoilage due to cold chain breaks wastes billions of dollars annually and puts lives at risk. Traditional monitoring systems only alert after damage has occurred — it's reactive, not preventive.",

    // ✏️ SOLUTION
    solution: "A predictive monitoring system with lightweight ML models running directly on edge devices. It forecasts temperature anomalies 30+ minutes before they happen, giving healthcare workers time to intervene before any doses are compromised.",

    // ✏️ TECHNICAL APPROACH
    technicalApproach: "The system uses a custom-trained LSTM model optimized for microcontroller deployment via TensorFlow Lite. Sensor data is processed locally — only anomaly predictions are transmitted, which dramatically reduces power consumption and bandwidth requirements. The mobile app handles alerting and historical visualization.",

    // ✏️ STACK
    stack: ["TensorFlow Lite", "ESP32", "Python", "MQTT", "React Native", "PostgreSQL"],

    // ✏️ TIMELINE
    timeline: [
      { phase: "Research & Design", description: "Analyzed cold chain failure modes and designed sensor architecture for remote clinic constraints" },
      { phase: "ML Development", description: "Trained and compressed LSTM model for deployment on ESP32 with TensorFlow Lite" },
      { phase: "Hardware Prototyping", description: "Built custom sensor nodes with ESP32 and precision temperature probes" },
      { phase: "Mobile App", description: "Developed React Native monitoring app with offline-capable alerting" },
      { phase: "Field Deployment", description: "Deployed and validated in 3 rural clinic environments" },
    ],

    // ✏️ RESULTS — update these with real numbers from your project!
    results: [
      "94% anomaly prediction accuracy with 30-minute lead time",
      "73% reduction in vaccine spoilage in pilot clinics",
      "6+ months battery life per sensor node on a single charge",
      "Successfully deployed and running in 3 healthcare facilities",
    ],

    // ✏️ IMAGE PLACEHOLDER — swap with: "Hardware prototype photo" or "deployment site photo"
    imagePlaceholder: "Hardware prototype photo or deployment site",

    // ✏️ LINKS — add case study link, demo, devpost, etc.
    links: [
      { label: "GitHub", href: "#", icon: "github" },
      { label: "Case Study", href: "#", icon: "external" },
    ],
  },

  // ----------------------------------------------------------
  // PROJECT: SUPERMIC
  // URL: /projects/supermic
  // ----------------------------------------------------------
  supermic: {

    // ✏️ TITLE
    title: "SuperMic",

    // ✏️ TAGLINE
    tagline: "A MEMS microphone array that listens better than you'd expect",

    // ✏️ STATUS — "In Progress" | "Prototype" | "Deployed" | "Completed"
    status: "Prototype",

    // ✏️ YEAR
    year: "2025",

    // ✏️ TAGS
    tags: ["Hardware", "DSP", "PCB Design"],

    // ✏️ WHY I BUILT THIS
    why: "I was frustrated by how badly smart speakers perform when there's background noise — a problem I ran into working on a voice-interface project. Instead of working around cheap microphones, I wanted to understand the hardware deeply enough to build my own solution from the silicon up.",

    // ✏️ OVERVIEW
    overview: "SuperMic is a custom MEMS microphone array with onboard signal processing, built for reliable far-field voice capture in noisy environments. The focus is on the full stack: PCB design, acoustic array geometry, and digital beamforming — not just plugging in off-the-shelf components.",

    // ✏️ PROBLEM
    problem: "Commercial far-field microphone arrays sacrifice either cost or performance. Cheap arrays rely on the host processor for all DSP. High-quality arrays are opaque black boxes. I wanted to understand every layer and optimize for a specific use case.",

    // ✏️ SOLUTION
    solution: "A custom 4-mic MEMS array on a designed PCB, paired with an onboard FPGA that handles real-time beamforming and noise suppression before any audio leaves the board. The result is clean, directional audio even in acoustically challenging environments.",

    // ✏️ TECHNICAL APPROACH
    technicalApproach: "PCB designed in KiCad with careful attention to microphone placement geometry for beamforming effectiveness. The FPGA (Lattice iCE40) runs a delay-and-sum beamformer implemented in SystemVerilog. I wrote custom Python tools for calibration and polar pattern measurement in my makeshift anechoic setup.",

    // ✏️ STACK
    stack: ["KiCad", "SystemVerilog", "Lattice iCE40 FPGA", "Python", "MEMS Microphones", "I2S / PDM"],

    // ✏️ TIMELINE
    timeline: [
      { phase: "Acoustic Research", description: "Studied beamforming theory and array geometry tradeoffs for far-field voice" },
      { phase: "PCB Design v1", description: "First board in KiCad — 4-mic layout with iCE40 FPGA and power management" },
      { phase: "FPGA Firmware", description: "Implemented delay-and-sum beamformer in SystemVerilog on iCE40" },
      { phase: "Measurement & Tuning", description: "Built calibration rig, measured polar patterns, iterated on array geometry" },
      { phase: "PCB v2", description: "Revised layout based on signal integrity findings from v1 testing" },
    ],

    // ✏️ RESULTS
    results: [
      "Functional 4-mic array with real-time FPGA beamforming",
      "Measurable directivity improvement over single-mic baseline",
      "PCB v2 currently being fabricated",
      "Planning voice activity detection (VAD) as next FPGA module",
    ],

    // ✏️ IMAGE PLACEHOLDER — swap with: "PCB photo" or "polar pattern measurement plot"
    imagePlaceholder: "PCB photo or polar pattern measurement plot",

    // ✏️ LINKS
    links: [
      { label: "GitHub", href: "#", icon: "github" },
    ],
  },

  // ----------------------------------------------------------
  // ➕ ADD A NEW PROJECT HERE
  // ----------------------------------------------------------
  // Copy this template and paste it above this comment.
  // Replace "my-project" with a URL-friendly slug (no spaces, lowercase).
  // Then add it to app/projects/page.tsx too.
  //
  // my-project: {
  //   title: "My Project",
  //   tagline: "One sentence that sells it",
  //   status: "In Progress",   // "In Progress" | "Prototype" | "Deployed" | "Completed"
  //   year: "2026",
  //   tags: ["Tag1", "Tag2", "Tag3"],
  //   why: "Why you built it — personal, first person",
  //   overview: "What is it, who is it for, what does it do?",
  //   problem: "What's broken in the world that this fixes?",
  //   solution: "What did you build and how does it address the problem?",
  //   technicalApproach: "How does it work technically? What was interesting?",
  //   stack: ["Language", "Framework", "Tool"],
  //   timeline: [
  //     { phase: "Phase Name", description: "What you did in this phase" },
  //   ],
  //   results: [
  //     "Concrete outcome or metric",
  //     "Another result",
  //   ],
  //   imagePlaceholder: "What photo you'll add here",
  //   links: [
  //     { label: "GitHub", href: "https://github.com/...", icon: "github" },
  //   ],
  // },

}

// ============================================================
// STATUS BADGE COLORS — no need to edit unless you add new statuses
// ============================================================
const statusColors: Record<string, string> = {
  "Deployed":     "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
  "Prototype":    "bg-primary/20 text-primary border-primary/30",
  "In Progress":  "bg-blue-500/20 text-blue-400 border-blue-500/30",
  "Completed":    "bg-muted text-muted-foreground border-border",
}

// ============================================================
// PAGE TEMPLATE — renders for any /projects/[slug] URL
// You generally won't need to edit anything below this line.
// ============================================================
export default function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params)
  const project = projectData[slug]

  if (!project) {
    return (
      <main className="min-h-screen bg-background">
        <Navigation />
        <div className="flex min-h-[60vh] items-center justify-center">
          <div className="text-center">
            <h1 className="font-heading text-4xl font-bold text-foreground">Project not found</h1>
            <Link href="/projects" className="mt-4 inline-flex items-center gap-2 text-primary hover:underline">
              <ArrowLeft className="h-4 w-4" />
              Back to projects
            </Link>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="relative min-h-screen bg-background">
      <BlueprintGrid />
      <Navigation />

      {/* ── HERO: Title, status, tags, links ── */}
      <section className="relative pb-12 pt-32">
        <div className="mx-auto max-w-4xl px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Link
              href="/projects"
              className="mb-10 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              <ArrowLeft className="h-4 w-4" />
              All projects
            </Link>

            {/* Status badge + year + tags row */}
            <div className="mb-6 flex flex-wrap items-center gap-3">
              <span className={`rounded-full border px-3 py-1 text-xs font-medium ${statusColors[project.status]}`}>
                {project.status}
              </span>
              <span className="font-mono text-sm font-semibold text-muted-foreground/75">{project.year}</span>
              <div className="h-1 w-1 rounded-full bg-border" />
              {project.tags.map((tag) => (
                <span key={tag} className="text-xs text-muted-foreground/60 uppercase tracking-wider font-medium">
                  {tag}
                </span>
              ))}
            </div>

            {/* Title */}
            <h1 className="font-heading text-5xl font-bold tracking-tight text-foreground md:text-6xl lg:text-7xl">
              {project.title}
            </h1>

            {/* Tagline */}
            <p className="mt-6 text-xl leading-relaxed text-muted-foreground md:text-2xl">
              {project.tagline}
            </p>

            {/* Link buttons (GitHub, case study, etc.) */}
            {project.links && (
              <div className="mt-8 flex flex-wrap gap-3">
                {project.links.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    className="inline-flex items-center gap-2 rounded-full border border-border bg-card/80 px-4 py-2 text-sm font-medium text-foreground transition-all hover:border-primary/50 hover:bg-primary/10 hover:text-primary"
                  >
                    {link.icon === "github" ? <Github className="h-4 w-4" /> : <ExternalLink className="h-4 w-4" />}
                    {link.label}
                  </a>
                ))}
              </div>
            )}
          </motion.div>
        </div>
      </section>

      {/* ── HERO IMAGE — swap with a real image when ready ── */}
      {/* To add a real image:
          1. Put your image in /public/projects/[slug].jpg (or .png)
          2. Replace the <div> below with:
             <img src={`/projects/${slug}.jpg`} alt={project.title} className="h-full w-full object-cover" />
      */}
      <section className="pb-16">
        <div className="mx-auto max-w-5xl px-6">
          <motion.div
            className="aspect-[16/9] overflow-hidden rounded-2xl border border-border bg-card"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-secondary/80 via-card to-muted/60">
              <div className="text-center px-6">
                <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-2xl border border-primary/20 bg-primary/8 backdrop-blur-sm">
                  <span className="font-heading text-3xl font-bold text-primary">
                    {project.title.charAt(0)}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground/60 font-mono tracking-wider uppercase">
                  {project.imagePlaceholder}
                </p>
                <p className="mt-1 text-xs text-muted-foreground/40 font-mono">
                  photo / screenshot coming soon
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── CONTENT SECTIONS ── */}
      <section className="pb-32">
        <div className="mx-auto max-w-4xl px-6 space-y-16">

          {/* WHY I BUILT THIS — the personal card at top */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="rounded-2xl border border-primary/20 bg-primary/[0.04] px-8 py-7">
              <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.4em] text-primary/70">
                Why I built this
              </p>
              <p className="text-lg leading-relaxed text-foreground/90">
                {project.why}
              </p>
            </div>
          </motion.div>

          {/* OVERVIEW */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.4em] text-primary">
              Overview
            </p>
            <p className="text-lg leading-relaxed text-muted-foreground">{project.overview}</p>
          </motion.div>

          {/* PROBLEM + SOLUTION (side by side on desktop) */}
          <motion.div
            className="grid gap-6 md:grid-cols-2"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="rounded-xl border border-border bg-card/60 p-7">
              <p className="mb-1 text-[9px] font-semibold uppercase tracking-[0.35em] text-muted-foreground/60">
                The Problem
              </p>
              <h3 className="mb-3 font-heading text-xl font-bold text-foreground">What&apos;s broken</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">{project.problem}</p>
            </div>
            <div className="rounded-xl border border-primary/25 bg-primary/[0.05] p-7">
              <p className="mb-1 text-[9px] font-semibold uppercase tracking-[0.35em] text-primary/60">
                The Solution
              </p>
              <h3 className="mb-3 font-heading text-xl font-bold text-primary">What I built</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">{project.solution}</p>
            </div>
          </motion.div>

          {/* TECHNICAL APPROACH */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.4em] text-primary">
              Technical Approach
            </p>
            <p className="text-lg leading-relaxed text-muted-foreground">{project.technicalApproach}</p>
          </motion.div>

          {/* STACK */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.4em] text-primary">
              Stack
            </p>
            <div className="flex flex-wrap gap-3">
              {project.stack.map((tech) => (
                <span
                  key={tech}
                  className="rounded-lg border border-border bg-card px-4 py-2 text-sm font-medium text-foreground"
                >
                  {tech}
                </span>
              ))}
            </div>
          </motion.div>

          {/* PROCESS / TIMELINE */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="mb-6 text-[10px] font-semibold uppercase tracking-[0.4em] text-primary">
              Process
            </p>
            <div className="space-y-0">
              {project.timeline.map((item, index) => (
                <div key={index} className="flex gap-5 border-b border-border/30 pb-6 pt-6 first:pt-0 last:border-0">
                  <div className="flex flex-col items-center pt-1">
                    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-primary/25 bg-primary/8 text-xs font-bold text-primary">
                      {index + 1}
                    </div>
                    {index < project.timeline.length - 1 && (
                      <div className="mt-2 h-full w-px bg-border/40" />
                    )}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-heading font-bold text-foreground">{item.phase}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* RESULTS & IMPACT */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="mb-6 text-[10px] font-semibold uppercase tracking-[0.4em] text-primary">
              Results &amp; Impact
            </p>
            <ul className="space-y-4">
              {project.results.map((result, index) => (
                <li key={index} className="flex items-start gap-4">
                  <div className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                  <span className="text-base leading-relaxed text-muted-foreground">{result}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* BACK NAVIGATION */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to all projects
            </Link>
          </motion.div>

        </div>
      </section>

      <Footer />
    </main>
  )
}
