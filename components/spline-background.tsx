"use client"
import React from 'react'
import dynamic from 'next/dynamic'

const Spline = dynamic(() => import('@splinetool/react-spline/next'), { 
  ssr: false,
  loading: () => <div className="absolute inset-0 bg-black" />
})

export function SplineBackground() {
  const [shouldLoad, setShouldLoad] = React.useState(false)

  React.useEffect(() => {
    // Load Spline almost immediately to ensure it's seen
    const timer = setTimeout(() => {
      setShouldLoad(true)
    }, 100)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="fixed inset-0 z-[-1] pointer-events-none">
      <div className={`transition-opacity duration-1000 ${shouldLoad ? 'opacity-100' : 'opacity-0'}`}>
        {shouldLoad && (
          <Spline scene="https://prod.spline.design/xukIdfigLUMUmEvX/scene.splinecode" />
        )}
      </div>
      {/* Ultra-transparent premium overlay to ensure 3D visibility */}
      <div className="absolute inset-0 bg-gradient-to-tr from-black/40 via-transparent to-[#ccff0003]" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/30" />
    </div>
  )
}
