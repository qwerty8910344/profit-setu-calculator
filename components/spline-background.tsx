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
    // Delay Spline loading slightly to prioritize initial page render, but keep it responsive
    const timer = setTimeout(() => {
      setShouldLoad(true)
    }, 800) // Reduced from 3000 to 800ms for better balance
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="fixed inset-0 z-0 pointer-events-none bg-black">
      <div className={`transition-opacity duration-1000 ${shouldLoad ? 'opacity-100' : 'opacity-0'}`}>
        {shouldLoad && (
          <Spline scene="https://prod.spline.design/xukIdfigLUMUmEvX/scene.splinecode" />
        )}
      </div>
      {/* Premium overlay with lighter gradient to allow 3D visibility */}
      <div className="absolute inset-0 bg-gradient-to-tr from-black/80 via-black/40 to-[#ccff0008]" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/60" />
    </div>
  )
}
