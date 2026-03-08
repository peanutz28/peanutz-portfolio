"use client"

// Deterministic seeded PRNG so each project gets a consistent, unique layout
function makeRng(seed: string) {
  let h = 0
  for (let i = 0; i < seed.length; i++) {
    h = (Math.imul(31, h) + seed.charCodeAt(i)) | 0
  }
  return function () {
    h = (Math.imul(h ^ (h >>> 16), 0x45d9f3b)) | 0
    h = (Math.imul(h ^ (h >>> 16), 0x45d9f3b)) | 0
    return ((h ^ (h >>> 16)) >>> 0) / 0xffffffff
  }
}

// Palette of chip-die block colors — warm muted silicon hues
const BLOCK_COLORS = [
  "#c86418", // copper / orange — IO ring
  "#7a5030", // amber trace
  "#3a4a5a", // blue-grey — SRAM bank
  "#2e4838", // sage — analog block
  "#4a3860", // dim violet — PLL
  "#5a4020", // warm brown — decode unit
  "#384050", // steel blue — cache
  "#1e3028", // deep teal — power domain
]

interface Block {
  x: number
  y: number
  w: number
  h: number
  color: string
  opacity: number
  isTrace: boolean
}

function generateDie(seed: string, W = 400, H = 180): Block[] {
  const rng = makeRng(seed)
  const blocks: Block[] = []
  const pad = 4

  // Outer ring of small IO pads — two rows top & bottom
  for (let i = 0; i < 18; i++) {
    const size = 8 + rng() * 6
    blocks.push({
      x: pad + i * ((W - pad * 2) / 18),
      y: pad,
      w: size,
      h: size,
      color: BLOCK_COLORS[0],
      opacity: 0.55 + rng() * 0.2,
      isTrace: false,
    })
    blocks.push({
      x: pad + i * ((W - pad * 2) / 18),
      y: H - pad - size,
      w: size,
      h: size,
      color: BLOCK_COLORS[0],
      opacity: 0.55 + rng() * 0.2,
      isTrace: false,
    })
  }
  // Left & right IO columns
  for (let i = 0; i < 7; i++) {
    const size = 8 + rng() * 5
    blocks.push({
      x: pad,
      y: pad + 12 + i * ((H - pad * 2 - 24) / 7),
      w: size,
      h: size,
      color: BLOCK_COLORS[0],
      opacity: 0.55 + rng() * 0.2,
      isTrace: false,
    })
    blocks.push({
      x: W - pad - size,
      y: pad + 12 + i * ((H - pad * 2 - 24) / 7),
      w: size,
      h: size,
      color: BLOCK_COLORS[0],
      opacity: 0.55 + rng() * 0.2,
      isTrace: false,
    })
  }

  // Core functional blocks — the meaty interior rectangles
  const coreX = pad + 20
  const coreY = pad + 20
  const coreW = W - pad * 2 - 40
  const coreH = H - pad * 2 - 40
  const blockCount = 6 + Math.floor(rng() * 5)

  for (let i = 0; i < blockCount; i++) {
    const bw = 28 + rng() * (coreW / blockCount) * 1.4
    const bh = 14 + rng() * (coreH * 0.6)
    const bx = coreX + rng() * (coreW - bw)
    const by = coreY + rng() * (coreH - bh)
    blocks.push({
      x: bx,
      y: by,
      w: bw,
      h: bh,
      color: BLOCK_COLORS[1 + Math.floor(rng() * (BLOCK_COLORS.length - 1))],
      opacity: 0.45 + rng() * 0.35,
      isTrace: false,
    })
  }

  // Thin horizontal/vertical metal traces
  const traceCount = 8 + Math.floor(rng() * 6)
  for (let i = 0; i < traceCount; i++) {
    const horiz = rng() > 0.5
    blocks.push(
      horiz
        ? {
            x: coreX + rng() * coreW * 0.4,
            y: coreY + rng() * coreH,
            w: 30 + rng() * 80,
            h: 1 + (rng() > 0.7 ? 1 : 0),
            color: BLOCK_COLORS[1],
            opacity: 0.25 + rng() * 0.2,
            isTrace: true,
          }
        : {
            x: coreX + rng() * coreW,
            y: coreY + rng() * coreH * 0.4,
            w: 1 + (rng() > 0.7 ? 1 : 0),
            h: 20 + rng() * 60,
            color: BLOCK_COLORS[1],
            opacity: 0.25 + rng() * 0.2,
            isTrace: true,
          }
    )
  }

  return blocks
}

interface ChipDieBgProps {
  seed: string
  className?: string
}

export function ChipDieBg({ seed, className = "" }: ChipDieBgProps) {
  const W = 400
  const H = 180
  const blocks = generateDie(seed, W, H)

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      preserveAspectRatio="xMidYMid slice"
      className={`absolute inset-0 h-full w-full ${className}`}
      aria-hidden="true"
    >
      {/* Dark substrate */}
      <rect width={W} height={H} fill="#0c0a07" />
      {/* Faint grid — metal layer lines */}
      <defs>
        <pattern id={`grid-${seed}`} width="12" height="12" patternUnits="userSpaceOnUse">
          <path
            d="M 12 0 L 0 0 0 12"
            fill="none"
            stroke="#2a2010"
            strokeWidth="0.5"
          />
        </pattern>
      </defs>
      <rect width={W} height={H} fill={`url(#grid-${seed})`} opacity={0.6} />

      {/* All die blocks */}
      {blocks.map((b, i) => (
        <rect
          key={i}
          x={b.x}
          y={b.y}
          width={b.w}
          height={b.h}
          fill={b.color}
          opacity={b.opacity}
          rx={b.isTrace ? 0 : 1}
        />
      ))}

      {/* Vignette — dark edge fade so it blends into the card */}
      <defs>
        <radialGradient id={`vig-${seed}`} cx="50%" cy="50%" r="60%">
          <stop offset="30%" stopColor="transparent" />
          <stop offset="100%" stopColor="#0c0a07" stopOpacity="0.85" />
        </radialGradient>
      </defs>
      <rect width={W} height={H} fill={`url(#vig-${seed})`} />
    </svg>
  )
}
