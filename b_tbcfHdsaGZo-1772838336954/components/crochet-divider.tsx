"use client"

import { useEffect, useRef, useState } from "react"

interface CrochetDividerProps {
  className?: string
  height?: number
}

export function CrochetDivider({ className = "", height = 28 }: CrochetDividerProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [count, setCount] = useState(80)
  const uid = useRef(`yarn-${Math.random().toString(36).slice(2, 7)}`)

  useEffect(() => {
    const update = () => {
      if (containerRef.current) {
        setCount(Math.ceil(containerRef.current.offsetWidth / 13) + 4)
      }
    }
    update()
    window.addEventListener("resize", update)
    return () => window.removeEventListener("resize", update)
  }, [])

  const pitch = 13     // horizontal distance between link centres
  const rx = 7.5       // half-width of each ellipse
  const ry = 4         // half-height
  const cy = height / 2
  const totalW = count * pitch
  const id = uid.current

  return (
    <div ref={containerRef} className={`w-full overflow-hidden ${className}`} aria-hidden="true">
      <svg
        width="100%"
        height={height}
        viewBox={`0 0 ${totalW} ${height}`}
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          {/* Subtle fiber/fuzz displacement — makes it feel spun, not printed */}
          <filter id={`${id}-fuzz`} x="-2%" y="-20%" width="104%" height="140%">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.9 0.4"
              numOctaves="4"
              seed="7"
              result="noise"
            />
            <feDisplacementMap
              in="SourceGraphic"
              in2="noise"
              scale="0.9"
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>

          {/* Each chain link: outer yarn body + inner twist highlight */}
          {Array.from({ length: count }).map((_, i) => {
            const cx = i * pitch + rx
            const rotate = i % 2 === 0 ? 20 : -20
            return (
              <g key={`def-${i}`} id={`${id}-link-${i}`} transform={`rotate(${rotate} ${cx} ${cy})`}>
                {/* Outer yarn body — thick */}
                <ellipse cx={cx} cy={cy} rx={rx} ry={ry} fill="none" stroke="currentColor" strokeWidth="2.2" opacity="0.85" />
                {/* Inner twist line — thinner, slightly offset, suggests yarn twist */}
                <ellipse cx={cx} cy={cy - 0.8} rx={rx * 0.72} ry={ry * 0.5} fill="none" stroke="currentColor" strokeWidth="0.9" opacity="0.35" />
                {/* Highlight arc — top of the yarn strand catches light */}
                <path
                  d={`M ${cx - rx * 0.7} ${cy - ry * 0.2}
                      Q ${cx} ${cy - ry * 1.1}
                        ${cx + rx * 0.7} ${cy - ry * 0.2}`}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="0.7"
                  opacity="0.5"
                />
              </g>
            )
          })}
        </defs>

        {/* Render all links with fuzz filter */}
        <g filter={`url(#${id}-fuzz)`}>
          {Array.from({ length: count }).map((_, i) => (
            <use key={i} href={`#${id}-link-${i}`} />
          ))}
        </g>
      </svg>
    </div>
  )
}
