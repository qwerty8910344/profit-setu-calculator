"use client"

import { useEffect, useState } from "react"

interface Shape {
  id: number
  type: 'cube' | 'sphere' | 'pyramid' | 'ring' | 'torus'
  x: number
  y: number
  size: number
  rotation: number
  speed: number
  delay: number
  color: string
}

const colors = [
  'from-accent/40 to-accent/10',
  'from-chart-2/40 to-chart-2/10',
  'from-chart-4/40 to-chart-4/10',
  'from-primary/30 to-primary/5',
]

export function FloatingShapes() {
  const [shapes, setShapes] = useState<Shape[]>([])
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const generatedShapes: Shape[] = Array.from({ length: 8 }, (_, i) => ({
      id: i,
      type: (['cube', 'sphere', 'pyramid', 'ring', 'torus'] as const)[Math.floor(Math.random() * 5)],
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: 40 + Math.random() * 60,
      rotation: Math.random() * 360,
      speed: 15 + Math.random() * 20,
      delay: Math.random() * 5,
      color: colors[Math.floor(Math.random() * colors.length)],
    }))
    setShapes(generatedShapes)
  }, [])

  if (!mounted) return null

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {shapes.map((shape) => (
        <div
          key={shape.id}
          className="absolute"
          style={{
            left: `${shape.x}%`,
            top: `${shape.y}%`,
            width: shape.size,
            height: shape.size,
            animation: `float-3d ${shape.speed}s ease-in-out infinite`,
            animationDelay: `${shape.delay}s`,
          }}
        >
          {shape.type === 'cube' && (
            <div 
              className="w-full h-full preserve-3d"
              style={{
                transform: `rotateX(${shape.rotation}deg) rotateY(${shape.rotation}deg)`,
                animation: `spin-3d ${shape.speed}s linear infinite`,
              }}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${shape.color} backdrop-blur-sm rounded-lg border border-white/20`} 
                style={{ transform: 'translateZ(20px)' }} />
              <div className={`absolute inset-0 bg-gradient-to-br ${shape.color} backdrop-blur-sm rounded-lg border border-white/20`} 
                style={{ transform: 'rotateY(90deg) translateZ(20px)' }} />
              <div className={`absolute inset-0 bg-gradient-to-br ${shape.color} backdrop-blur-sm rounded-lg border border-white/20`} 
                style={{ transform: 'rotateX(90deg) translateZ(20px)' }} />
            </div>
          )}
          {shape.type === 'sphere' && (
            <div 
              className={`w-full h-full rounded-full bg-gradient-to-br ${shape.color} backdrop-blur-sm border border-white/30 shadow-2xl`}
              style={{
                boxShadow: `inset -10px -10px 30px rgba(0,0,0,0.2), inset 5px 5px 20px rgba(255,255,255,0.3)`,
              }}
            />
          )}
          {shape.type === 'pyramid' && (
            <div 
              className="w-full h-full preserve-3d"
              style={{
                animation: `spin-3d ${shape.speed * 1.5}s linear infinite`,
              }}
            >
              <div 
                className={`absolute w-0 h-0 border-l-[30px] border-r-[30px] border-b-[50px] border-l-transparent border-r-transparent border-b-accent/30`}
                style={{ transform: 'translateZ(10px)' }}
              />
            </div>
          )}
          {shape.type === 'ring' && (
            <div 
              className={`w-full h-full rounded-full border-4 border-accent/30`}
              style={{
                animation: `spin-flat ${shape.speed}s linear infinite`,
                boxShadow: `0 0 20px rgba(var(--accent), 0.3)`,
              }}
            />
          )}
          {shape.type === 'torus' && (
            <div 
              className={`w-full h-full rounded-full border-8 bg-gradient-to-br ${shape.color}`}
              style={{
                animation: `wobble ${shape.speed}s ease-in-out infinite`,
                borderRadius: '50%',
              }}
            />
          )}
        </div>
      ))}
    </div>
  )
}
