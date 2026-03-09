"use client"

export function BlueprintGrid() {
  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden" style={{ zIndex: -1 }}>
      {/* Minimal dot grid */}
      <svg
        className="absolute inset-0 h-full w-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern id="dotGrid" width="32" height="32" patternUnits="userSpaceOnUse">
            <circle cx="1" cy="1" r="0.8" fill="rgba(249,115,22,0.15)" />
          </pattern>
          <radialGradient id="dotFade" cx="50%" cy="35%" r="65%">
            <stop offset="0%"   stopColor="white" stopOpacity="1" />
            <stop offset="65%"  stopColor="white" stopOpacity="0.25" />
            <stop offset="100%" stopColor="white" stopOpacity="0" />
          </radialGradient>
          <mask id="dotMask">
            <rect width="100%" height="100%" fill="url(#dotFade)" />
          </mask>
        </defs>
        <rect width="100%" height="100%" fill="url(#dotGrid)" mask="url(#dotMask)" />
      </svg>

      {/* Orange ambient glow — upper right */}
      <div
        className="absolute -right-[15%] -top-[15%] h-[55%] w-[55%] rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(249,115,22,0.07) 0%, transparent 70%)",
          filter: "blur(100px)",
        }}
      />

      {/* Subtle lower-left warmth */}
      <div
        className="absolute -bottom-[10%] -left-[5%] h-[40%] w-[40%] rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(249,115,22,0.04) 0%, transparent 70%)",
          filter: "blur(80px)",
        }}
      />
    </div>
  )
}
