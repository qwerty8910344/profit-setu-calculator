"use client"

import { useState, useCallback, MouseEvent } from 'react'

interface TiltState {
  rotateX: number
  rotateY: number
  scale: number
}

export function useTilt(maxTilt: number = 15) {
  const [tilt, setTilt] = useState<TiltState>({ rotateX: 0, rotateY: 0, scale: 1 })

  const handleMouseMove = useCallback((e: MouseEvent<HTMLDivElement>) => {
    const element = e.currentTarget
    const rect = element.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    const mouseX = e.clientX - centerX
    const mouseY = e.clientY - centerY
    
    const rotateX = (mouseY / (rect.height / 2)) * -maxTilt
    const rotateY = (mouseX / (rect.width / 2)) * maxTilt
    
    setTilt({ rotateX, rotateY, scale: 1.02 })
  }, [maxTilt])

  const handleMouseLeave = useCallback(() => {
    setTilt({ rotateX: 0, rotateY: 0, scale: 1 })
  }, [])

  const tiltStyle = {
    transform: `perspective(1000px) rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg) scale(${tilt.scale})`,
    transition: 'transform 0.15s ease-out',
  }

  return { tiltStyle, handleMouseMove, handleMouseLeave }
}
