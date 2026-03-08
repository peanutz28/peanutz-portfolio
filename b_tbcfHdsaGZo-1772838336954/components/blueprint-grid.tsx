"use client"

export function BlueprintGrid() {
  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden" style={{ zIndex: -1 }}>
      <svg
        className="absolute inset-0 h-full w-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Fine grid — every 40px */}
          <pattern id="fineGrid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path
              d="M 40 0 L 0 0 0 40"
              fill="none"
              stroke="oklch(0.72 0.10 55 / 0.07)"
              strokeWidth="0.5"
            />
          </pattern>

          {/* Major grid — every 200px, bolder warm lines */}
          <pattern id="majorGrid" width="200" height="200" patternUnits="userSpaceOnUse">
            <rect width="200" height="200" fill="url(#fineGrid)" />
            <path
              d="M 200 0 L 0 0 0 200"
              fill="none"
              stroke="oklch(0.72 0.10 55 / 0.14)"
              strokeWidth="0.75"
            />
          </pattern>

          {/* Fade — strong center, soft at edges */}
          <radialGradient id="gridFade" cx="50%" cy="40%" r="65%">
            <stop offset="0%"   stopColor="white" stopOpacity="1" />
            <stop offset="60%"  stopColor="white" stopOpacity="0.55" />
            <stop offset="100%" stopColor="white" stopOpacity="0" />
          </radialGradient>
          <mask id="gridMask">
            <rect width="100%" height="100%" fill="url(#gridFade)" />
          </mask>
        </defs>

        {/* Main grid */}
        <rect width="100%" height="100%" fill="url(#majorGrid)" mask="url(#gridMask)" />

        {/* ── Technical annotations ──────────────────────── */}

        {/* Top-left registration crosshair */}
        <g stroke="oklch(0.70 0.18 46)" strokeWidth="0.7" opacity="0.22">
          <line x1="60" y1="38" x2="60" y2="82" />
          <line x1="38" y1="60" x2="82" y2="60" />
          <circle cx="60" cy="60" r="5" fill="none" />
          <circle cx="60" cy="60" r="1.5" fill="oklch(0.70 0.18 46)" />
        </g>

        {/* Top-right registration crosshair */}
        <g stroke="oklch(0.70 0.18 46)" strokeWidth="0.7" opacity="0.15">
          <line x1="calc(100% - 60px)" y1="38" x2="calc(100% - 60px)" y2="82" />
          <line x1="calc(100% - 82px)" y1="60" x2="calc(100% - 38px)" y2="60" />
          <circle cx="calc(100% - 60px)" cy="60" r="5" fill="none" />
        </g>

        {/* Bottom-left registration crosshair */}
        <g stroke="oklch(0.70 0.18 46)" strokeWidth="0.7" opacity="0.10">
          <line x1="60" y1="calc(100% - 82px)" x2="60" y2="calc(100% - 38px)" />
          <line x1="38" y1="calc(100% - 60px)" x2="82" y2="calc(100% - 60px)" />
          <circle cx="60" cy="calc(100% - 60px)" r="5" fill="none" />
        </g>

        {/* Horizontal dimension line — top center, like a drawing annotation */}
        <g stroke="oklch(0.70 0.18 46)" strokeWidth="0.5" opacity="0.12">
          <line x1="28%" y1="22" x2="72%" y2="22" />
          <line x1="28%" y1="16" x2="28%" y2="28" />
          <line x1="72%" y1="16" x2="72%" y2="28" />
          {/* Arrow tips */}
          <path d="M 28% 22 L calc(28% + 6px) 19 M 28% 22 L calc(28% + 6px) 25" fill="none" />
          <path d="M 72% 22 L calc(72% - 6px) 19 M 72% 22 L calc(72% - 6px) 25" fill="none" />
        </g>

        {/* Vertical dimension line — left edge */}
        <g stroke="oklch(0.70 0.18 46)" strokeWidth="0.5" opacity="0.09">
          <line x1="16" y1="22%" x2="16" y2="78%" />
          <line x1="10" y1="22%" x2="22" y2="22%" />
          <line x1="10" y1="78%" x2="22" y2="78%" />
        </g>

        {/* Scattered annotation nodes */}
        {[
          { x: "25%", y: "32%" },
          { x: "73%", y: "22%" },
          { x: "50%", y: "58%" },
          { x: "82%", y: "65%" },
          { x: "18%", y: "68%" },
          { x: "60%", y: "79%" },
          { x: "38%", y: "16%" },
          { x: "88%", y: "40%" },
        ].map((pos, i) => (
          <g key={i}>
            <circle cx={pos.x} cy={pos.y} r="1.5" fill="oklch(0.70 0.20 46)" opacity="0.22" />
            <circle cx={pos.x} cy={pos.y} r="6" fill="none" stroke="oklch(0.70 0.20 46)" strokeWidth="0.4" opacity="0.09" />
          </g>
        ))}
      </svg>

      {/* Pulsing orange circuit waypoints */}
      <div className="absolute inset-0">
        {[
          { left: "18%",  top: "22%",  delay: "0s",    dur: "3.8s" },
          { left: "72%",  top: "18%",  delay: "0.9s",  dur: "4.3s" },
          { left: "48%",  top: "55%",  delay: "1.7s",  dur: "3.6s" },
          { left: "83%",  top: "63%",  delay: "0.4s",  dur: "4.8s" },
          { left: "14%",  top: "69%",  delay: "2.2s",  dur: "3.3s" },
          { left: "58%",  top: "79%",  delay: "1.1s",  dur: "4.1s" },
          { left: "37%",  top: "14%",  delay: "0.6s",  dur: "3.9s" },
          { left: "88%",  top: "40%",  delay: "1.5s",  dur: "4.5s" },
        ].map((node, i) => (
          <div
            key={i}
            className="absolute rounded-full"
            style={{
              left: node.left,
              top: node.top,
              width: "6px",
              height: "6px",
              marginLeft: "-3px",
              marginTop: "-3px",
              background: "oklch(0.70 0.20 46)",
              boxShadow: "0 0 12px 4px oklch(0.70 0.20 46 / 0.25)",
              animation: `gridNodePulse ${node.dur} ease-in-out infinite`,
              animationDelay: node.delay,
            }}
          />
        ))}
      </div>

      {/* Warm ambient glow — upper right */}
      <div
        className="absolute -right-[15%] -top-[15%] h-[55%] w-[55%] rounded-full"
        style={{
          background: "radial-gradient(circle, oklch(0.70 0.18 46 / 0.05) 0%, transparent 70%)",
          filter: "blur(90px)",
        }}
      />
      {/* Lower left warmth */}
      <div
        className="absolute -bottom-[10%] -left-[5%] h-[40%] w-[40%] rounded-full"
        style={{
          background: "radial-gradient(circle, oklch(0.55 0.10 55 / 0.07) 0%, transparent 70%)",
          filter: "blur(70px)",
        }}
      />

      {/* gridNodePulse keyframes defined in globals.css */}
    </div>
  )
}
