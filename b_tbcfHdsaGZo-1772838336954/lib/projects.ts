// ============================================================
// lib/projects.ts — SINGLE SOURCE OF TRUTH FOR ALL PROJECT DATA
// ============================================================
//
// This file drives three places at once:
//   - Homepage featured section  (featured: true projects)
//   - /projects listing page     (all projects, in order)
//   - /projects/[slug] detail    (full data per project)
//
// ── TO ADD A NEW PROJECT ─────────────────────────────────────
//   1. Copy the last project object and paste it at the end of
//      the `projects` array below
//   2. Fill in all the fields (see comments on each field)
//   3. Set featured: true to show it on the homepage, false to
//      list it only on the /projects page
//   That's it — no other files need to change.
//
// ── TO FEATURE / UNFEATURE A PROJECT ────────────────────────
//   Change `featured: true` → `featured: false` (or vice versa)
//   on any project object. The homepage will update automatically.
//
// ── TO REORDER PROJECTS ─────────────────────────────────────
//   Move project objects up/down in the array.
//   Order here = order on /projects page.
//   Featured projects appear on the homepage in the same order
//   they appear here (filtered to featured: true).
//
// ── SEARCH FOR ✏️ ────────────────────────────────────────────
//   Every editable field has a ✏️ comment. Search for it
//   to jump to each piece of content you might want to update.
// ============================================================

export interface Project {
  // Routing
  id: string             // URL slug → /projects/[id]  (no spaces, lowercase, hyphens ok)
  featured: boolean      // true = show on homepage featured section

  // List view (used by featured section + /projects page)
  title: string
  description: string    // short 1-sentence blurb for list rows
  tags: string[]
  status: "In Progress" | "Prototype" | "Deployed" | "Completed"
  year: string

  // Detail page content
  tagline: string        // punchy subtitle on the detail page
  why: string            // personal "why I built this" card
  overview: string       // paragraph intro
  problem: string        // "what's broken" card
  solution: string       // "what I built" card
  technicalApproach: string
  stack: string[]
  timeline: { phase: string; description: string }[]
  results: string[]
  imagePlaceholder: string   // reminder of what photo/screenshot to add
  logo?: string              // path to project logo, e.g. "/projects/nomi-logo.png"
  links?: { label: string; href: string; icon: "github" | "external" }[]
}

// ============================================================
// PROJECTS
// ============================================================

export const projects: Project[] = [

  // ────────────────────────────────────────────────────────
  // NOMI
  // ────────────────────────────────────────────────────────
  {
    // ✏️ ROUTING
    id: "nomi",
    featured: true,   // ✏️ set false to remove from homepage

    // ✏️ LIST VIEW
    title: "Nomi",
    description: "AI companion designed to feel genuinely present — context-aware conversations that remember, adapt, and grow with you.",
    tags: ["AI", "LLM", "Product"],
    status: "In Progress",
    year: "2026",

    // ✏️ DETAIL PAGE
    tagline: "An AI companion that actually remembers you",
    why: "I wanted to explore what it would feel like to have an AI that doesn't reset every conversation — one that builds a real picture of you over time. The companion-AI space is crowded, but most products treat memory as a feature checkbox, not the core design principle.",
    overview: "Nomi is an AI companion designed around persistent memory and genuine presence. Rather than treating each conversation as isolated, Nomi builds a longitudinal model of the user — remembering context, preferences, and emotional tone — so interactions feel continuous and real.",
    problem: "Most AI assistants feel transactional and stateless. Every session starts from zero. Users have to constantly re-explain themselves, and the experience never deepens over time.",
    solution: "A companion architecture that maintains a structured memory graph across sessions, allowing the AI to reference past conversations naturally and evolve its understanding of the person it's talking with.",
    technicalApproach: "I'm building a hybrid memory system: short-term context windows for recency, a vector embedding store for semantic recall, and a structured graph layer for relationships and recurring themes. The goal is recall that feels intuitive, not like a lookup.",
    stack: ["Next.js", "OpenAI API", "Pinecone", "PostgreSQL", "TypeScript", "Vercel"],
    timeline: [
      { phase: "Research", description: "Studied memory architectures in existing AI companion products and academic literature" },
      { phase: "Memory System Design", description: "Designed hybrid short/long-term memory with vector + graph storage" },
      { phase: "Core Prototype", description: "Built basic conversational loop with persistent session memory" },
      { phase: "UX Iteration", description: "Refining how memory surfaces in conversation — natural vs. uncanny" },
    ],
    results: [
      "Working prototype with cross-session memory persistence",
      "Users in early testing describe conversations as feeling 'more natural over time'",
      "Active development — shipping incrementally",
    ],
    imagePlaceholder: "Interface mockup or early screenshot",
    links: [
      { label: "GitHub", href: "#", icon: "github" },
    ],
  },

  // ────────────────────────────────────────────────────────
  // BEET
  // ────────────────────────────────────────────────────────
  {
    // ✏️ ROUTING
    id: "beet",
    featured: true,

    // ✏️ LIST VIEW
    title: "Beet",
    description: "Real-time health data aggregator that turns wearable signals into actionable insights — low-latency, edge-first.",
    tags: ["Hardware", "IoT", "Swift"],
    status: "Prototype",
    year: "2026",

    // ✏️ DETAIL PAGE
    tagline: "Wearable health data that actually tells you something",
    why: "I wear a bunch of trackers and I'm still confused about my health data. There's a gap between 'your resting HR was 62 bpm' and 'here's what that means for you today.' I wanted to close it.",
    overview: "Beet is a real-time health data aggregator that pulls from multiple wearable sensors and surfaces meaningful, actionable insights — not just raw numbers. It processes signals at the edge for low-latency feedback and works offline-first.",
    problem: "Wearable health apps drown users in metrics without context. Data is siloed across devices, and the insights layer is usually shallow or nonexistent. Most apps just repackage manufacturer data.",
    solution: "A unified aggregation layer that reads from multiple sources (Apple Health, BLE devices, custom sensors), processes locally for speed and privacy, and surfaces insights through a minimal, calm iOS interface.",
    technicalApproach: "The core is a Swift/SwiftUI iOS app that uses HealthKit and CoreBluetooth for data ingestion. A lightweight on-device inference model interprets patterns in real time — no cloud round-trips for basic insights. BLE peripherals communicate via custom GATT profiles I defined for a prototype sensor node.",
    stack: ["Swift", "SwiftUI", "HealthKit", "CoreBluetooth", "Core ML", "TensorFlow Lite"],
    timeline: [
      { phase: "Problem Mapping", description: "Identified the most meaningful signals to track and correlate" },
      { phase: "iOS Foundation", description: "Built HealthKit + CoreBluetooth data pipeline" },
      { phase: "Custom Sensor Node", description: "Prototyped a BLE peripheral for additional biometric sensing" },
      { phase: "Insights Layer", description: "Training lightweight on-device model for pattern interpretation" },
    ],
    results: [
      "Working iOS prototype with multi-source data aggregation",
      "Sub-100ms latency for real-time sensor feedback",
      "Custom BLE sensor node functional on breadboard",
      "Ongoing: refining the insight generation model",
    ],
    imagePlaceholder: "App screenshots or hardware prototype photo",
    links: [
      { label: "GitHub", href: "#", icon: "github" },
    ],
  },

  // ────────────────────────────────────────────────────────
  // GUARDIANSHOT
  // ────────────────────────────────────────────────────────
  {
    // ✏️ ROUTING
    id: "guardianshot",
    featured: true,

    // ✏️ LIST VIEW
    title: "GuardianShot",
    description: "Gunshot detection system using 3 CNNs on a Raspberry Pi — 98% accuracy, sub-1s alerts, verified at a live police gun range.",
    tags: ["ML", "Hardware", "PyTorch"],
    status: "Completed",
    year: "2023",

    // ✏️ DETAIL PAGE
    tagline: "A $100 gunshot detection system that outperforms $90,000 commercial alternatives",
    why: "While biking to the gas station for ice cream, my friends and I heard a gunshot. \"What was that?\" we wondered. \"I'm scared...\" We pedaled home fast. My high school was in Durham — one of the highest crime rate cities in America — and I'd already lived through gun threats and watched school shootings on the news. I felt compelled to do something. When I discovered that existing gunshot detection systems cost $90,000 per square mile per year — pricing out the exact schools that need them most — I knew what I had to build.",
    overview: "GuardianShot is a Raspberry Pi-based gunshot detection device that listens to audio in real time, analyzes it with three convolutional neural networks, and alerts security and law enforcement via email and SMS within one second of detecting a shot. It achieves 98% accuracy at a fraction of the cost of any commercial alternative.",
    problem: "Every day, 12 children die from gun violence in America. 74% of shootings don't stop until law enforcement intervenes — meaning faster detection directly saves lives. Yet the commercial gunshot detection systems used in cities cost $90,000 per square mile annually. Schools, especially in high-crime areas, simply can't afford them.",
    solution: "A portable Raspberry Pi device with a USB microphone and three trained CNNs that runs 24/7, costs roughly $100 in hardware, and alerts administrators within one second of detecting a gunshot. The hardest part wasn't the model — it was reducing false positives from everyday sounds like door slams, fireworks, and students. I solved it by collecting real-world audio in different environments and iterating on the training data until the system was reliable enough to deploy in a real school.",
    technicalApproach: "The system uses a cascade of three PyTorch convolutional neural networks trained on a custom dataset — a combination of online audio sources and real-world recordings I made across different environments. Audio is captured via USB mic on a Raspberry Pi Zero W, processed locally, and classified in real time without any cloud dependency. When a gunshot is detected, the system triggers immediate email and SMS alerts to pre-configured contacts. I validated the system live at the Cary Police Department gun range to confirm performance under real gunshot acoustics.",
    stack: ["Python", "PyTorch", "Raspberry Pi", "CNNs", "SMTP / Twilio", "NumPy", "Librosa"],
    timeline: [
      { phase: "Research", description: "Spoke with the police chief, city council members, and legislative experts to understand the problem space and what a realistic solution looked like." },
      { phase: "MVP 1 — Acoustic Sensing", description: "Built first prototype with an acoustic sensor + microcontroller, graphing amplitude values in real time on Arduino serial plotter to understand sound signatures." },
      { phase: "MVP 2 — Neural Network", description: "Trained a PyTorch CNN on audio data and ran it on a Raspberry Pi Zero W with an i2s MEMS microphone breakout. Got the model working but false positive rate was still too high." },
      { phase: "MVP 3 — Multi-Device System", description: "Scaled to multiple devices with consistent power supply, live dashboard, and real-time email/SMS alerting. Iterated on training data to hit 98% accuracy." },
      { phase: "Validation", description: "Tested at the Cary Police Department gun range with Chief Terry Sult and Councilmember Sarika Bansal. System performed under real gunshot acoustics." },
      { phase: "School & Policy Outreach", description: "Presented to school board for deployment consideration. Authored a research paper on gun violence prevalence in schools. Ran safety workshops and participated in school shooter drills." },
    ],
    results: [
      "98% gunshot detection accuracy with sub-1 second alert time",
      "Validated at Cary Police Department gun range with live fire",
      "Received Award for Excellence from Police Chief Terry Sult",
      "1st Place at NC Science and Engineering Fair (NCSEF) 2024",
      "1st Place at NCSAS Science Fair 2024",
      "Presented to school board for potential deployment",
      "Estimated hardware cost ~$100 vs. $90,000/sq mile for commercial systems",
    ],
    imagePlaceholder: "Photo with Police Chief Terry Sult or the GuardianShot device",
    links: [
      { label: "GitHub", href: "https://github.com/peanutz28/guardianshot", icon: "github" },
    ],
  },

  // ────────────────────────────────────────────────────────
  // SUPERMIC
  // ────────────────────────────────────────────────────────
  {
    // ✏️ ROUTING
    id: "supermic",
    featured: true,

    // ✏️ LIST VIEW
    title: "SuperMic",
    description: "Custom MEMS microphone array with onboard FPGA signal processing — built for far-field voice capture in noisy environments.",
    tags: ["Hardware", "DSP", "PCB Design"],
    status: "Prototype",
    year: "2025",

    // ✏️ DETAIL PAGE
    tagline: "A MEMS microphone array that listens better than you'd expect",
    why: "I was frustrated by how badly smart speakers perform when there's background noise — a problem I ran into working on a voice-interface project. Instead of working around cheap microphones, I wanted to understand the hardware deeply enough to build my own solution from the silicon up.",
    overview: "SuperMic is a custom MEMS microphone array with onboard signal processing, built for reliable far-field voice capture in noisy environments. The focus is on the full stack: PCB design, acoustic array geometry, and digital beamforming — not just plugging in off-the-shelf components.",
    problem: "Commercial far-field microphone arrays sacrifice either cost or performance. Cheap arrays rely on the host processor for all DSP. High-quality arrays are opaque black boxes. I wanted to understand every layer and optimize for a specific use case.",
    solution: "A custom 4-mic MEMS array on a designed PCB, paired with an onboard FPGA that handles real-time beamforming and noise suppression before any audio leaves the board. The result is clean, directional audio even in acoustically challenging environments.",
    technicalApproach: "PCB designed in KiCad with careful attention to microphone placement geometry for beamforming effectiveness. The FPGA (Lattice iCE40) runs a delay-and-sum beamformer implemented in SystemVerilog. I wrote custom Python tools for calibration and polar pattern measurement in my makeshift anechoic setup.",
    stack: ["KiCad", "SystemVerilog", "Lattice iCE40 FPGA", "Python", "MEMS Microphones", "I2S / PDM"],
    timeline: [
      { phase: "Acoustic Research", description: "Studied beamforming theory and array geometry tradeoffs for far-field voice" },
      { phase: "PCB Design v1", description: "First board in KiCad — 4-mic layout with iCE40 FPGA and power management" },
      { phase: "FPGA Firmware", description: "Implemented delay-and-sum beamformer in SystemVerilog on iCE40" },
      { phase: "Measurement & Tuning", description: "Built calibration rig, measured polar patterns, iterated on array geometry" },
      { phase: "PCB v2", description: "Revised layout based on signal integrity findings from v1 testing" },
    ],
    results: [
      "Functional 4-mic array with real-time FPGA beamforming",
      "Measurable directivity improvement over single-mic baseline",
      "PCB v2 currently being fabricated",
      "Planning voice activity detection (VAD) as next FPGA module",
    ],
    imagePlaceholder: "PCB photo or polar pattern measurement plot",
    links: [
      { label: "GitHub", href: "#", icon: "github" },
    ],
  },

  // ────────────────────────────────────────────────────────
  // ➕ ADD A NEW PROJECT HERE
  // ────────────────────────────────────────────────────────
  // Copy the block below, uncomment it, and fill in the fields.
  // Set featured: true to show it on the homepage.
  //
  // {
  //   id: "my-project",            // URL slug — no spaces, lowercase
  //   featured: false,             // true = shows on homepage
  //
  //   title: "My Project",
  //   description: "One-sentence summary for list rows.",
  //   tags: ["Tag1", "Tag2", "Tag3"],
  //   status: "In Progress",       // "In Progress" | "Prototype" | "Deployed" | "Completed"
  //   year: "2026",
  //
  //   tagline: "Punchy subtitle for the detail page",
  //   why: "Why you built it — personal, first person, casual.",
  //   overview: "What is it, who is it for, what does it do?",
  //   problem: "What's broken in the world that this fixes?",
  //   solution: "What did you build and how does it address the problem?",
  //   technicalApproach: "How does it work? What was interesting technically?",
  //   stack: ["Language", "Framework", "Tool"],
  //   timeline: [
  //     { phase: "Phase Name", description: "What you did in this phase." },
  //   ],
  //   results: [
  //     "Concrete outcome or metric",
  //   ],
  //   imagePlaceholder: "What photo/screenshot will go here",
  //   links: [
  //     { label: "GitHub", href: "https://github.com/...", icon: "github" },
  //   ],
  // },

]

// ============================================================
// DERIVED HELPERS — import these in your components/pages
// ============================================================

// All projects in order — for /projects listing page
export const allProjects = projects

// Homepage featured section — only projects with featured: true
export const featuredProjects = projects.filter((p) => p.featured)

// Look up a project by its URL slug — for /projects/[slug] detail page
export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.id === slug)
}

// Status badge colors — shared across components
export const statusColors: Record<string, string> = {
  "Deployed":    "text-emerald-400",
  "Prototype":   "text-primary",
  "In Progress": "text-blue-400",
  "Completed":   "text-muted-foreground",
}

// Status badge background colors (for pill badges on detail pages)
export const statusBadgeColors: Record<string, string> = {
  "Deployed":    "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
  "Prototype":   "bg-primary/20 text-primary border-primary/30",
  "In Progress": "bg-blue-500/20 text-blue-400 border-blue-500/30",
  "Completed":   "bg-muted text-muted-foreground border-border",
}
