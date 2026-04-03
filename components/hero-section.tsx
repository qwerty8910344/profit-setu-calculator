"use client"

import Link from 'next/link'

export function HeroSection() {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-transparent border-b border-border/10 pt-20 pb-12 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <div className="max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 sm:px-6 py-2 rounded-full bg-accent/20 border border-accent/30 mb-6 sm:mb-8 animate-pulse">
            <span className="w-2 h-2 rounded-full bg-accent" />
            <span className="text-[10px] sm:text-sm font-bold text-foreground uppercase tracking-widest">Global Access Tools</span>
          </div>
          
          <h1 id="headline" className="text-4xl sm:text-7xl lg:text-9xl font-black tracking-tighter text-foreground text-balance leading-[1.1] mb-6 sm:mb-8 text-glow">
            Know Your Profit Before You Invest
          </h1>
          
          <p id="subheadline" className="text-lg sm:text-2xl lg:text-3xl text-muted-foreground max-w-3xl mx-auto leading-relaxed font-semibold mb-10 sm:mb-12 px-2">
            The ultimate free calculator suite for Indian businesses and entrepreneurs.
          </p>

          <div className="flex flex-col items-center gap-6 sm:gap-8">
            <Link 
              href="#calculator" 
              id="cta"
              className="px-10 sm:px-16 py-6 sm:py-8 bg-gradient-to-r from-accent to-chart-2 text-white text-xl sm:text-3xl font-black rounded-2xl sm:rounded-3xl shadow-2xl hover:scale-105 transition-all shadow-accent/40 border-0 flex items-center justify-center w-full sm:w-auto min-w-[280px]"
            >
              Free Calculator
            </Link>
            
            <div className="glass-premium p-6 sm:p-8 rounded-[1.5rem] sm:rounded-[2rem] border border-white/10 max-w-lg shadow-2xl mx-2">
              <h3 className="font-black text-foreground mb-2 sm:mb-3 text-xl sm:text-2xl">Export Reports</h3>
              <p className="text-muted-foreground text-base sm:text-xl leading-relaxed">
                Download detailed PDF reports to share with stakeholders or your accountant instantly.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
