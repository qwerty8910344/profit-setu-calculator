"use client"

import { ReactNode } from "react"
import { useTilt } from "@/hooks/use-tilt"

interface IsometricCardProps {
  children: ReactNode
  className?: string
  glowColor?: string
  depth?: number
}

export function IsometricCard({ children, className = "", glowColor = "accent", depth = 20 }: IsometricCardProps) {
  const { tiltStyle, handleMouseMove, handleMouseLeave } = useTilt(12)

  return (
    <div
      className={`relative group cursor-pointer ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        ...tiltStyle,
        transformStyle: 'preserve-3d',
      }}
    >
      {/* Shadow layer */}
      <div 
        className="absolute inset-0 bg-foreground/10 rounded-2xl blur-xl transition-all duration-300 group-hover:blur-2xl"
        style={{ 
          transform: `translateZ(-${depth}px) translateY(${depth}px)`,
          opacity: 0.5,
        }}
      />
      
      {/* Glow effect */}
      <div 
        className={`absolute -inset-1 bg-gradient-to-r from-${glowColor} via-chart-2 to-${glowColor} rounded-2xl opacity-0 group-hover:opacity-30 blur-xl transition-all duration-500`}
        style={{ transform: `translateZ(-5px)` }}
      />
      
      {/* Main card */}
      <div 
        className="relative bg-card/80 backdrop-blur-xl rounded-2xl border border-border/50 overflow-hidden"
        style={{ 
          transform: `translateZ(${depth}px)`,
          boxShadow: `
            0 ${depth}px ${depth * 2}px -${depth/2}px rgba(0,0,0,0.2),
            0 0 0 1px rgba(255,255,255,0.1) inset,
            0 -1px 0 0 rgba(255,255,255,0.1) inset
          `,
        }}
      >
        {/* Shine effect */}
        <div 
          className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        />
        {children}
      </div>
    </div>
  )
}
