"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { TrendingUp, Menu, X, ArrowRight } from "lucide-react"
import { useState } from "react"

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="sticky top-4 z-50 mx-4 lg:mx-8">
      <div className="max-w-7xl mx-auto">
        <div className="glass-premium rounded-2xl border border-border/30 shadow-xl">
          <div className="px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              {/* Logo with 3D effect */}
              <Link href="/" className="flex items-center gap-3 group">
                <div className="relative preserve-3d">
                  <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-accent to-chart-2 flex items-center justify-center shadow-xl group-hover:shadow-2xl transition-all duration-300 group-hover:-translate-y-0.5"
                    style={{ transform: 'translateZ(5px)' }}
                  >
                    <TrendingUp className="w-5 h-5 text-white" />
                  </div>
                  {/* Logo glow */}
                  <div className="absolute inset-0 w-11 h-11 rounded-xl bg-gradient-to-br from-accent to-chart-2 blur-lg opacity-40 group-hover:opacity-60 transition-opacity" />
                </div>
                <span className="font-bold text-xl text-foreground">Profit Setu</span>
              </Link>

              {/* Desktop Navigation */}
              <nav className="hidden md:flex items-center gap-1">
                {['Features', 'Calculator'].map((item) => (
                  <Link 
                    key={item}
                    href={`#${item.toLowerCase()}`} 
                    className="relative px-5 py-2.5 text-sm font-semibold text-muted-foreground hover:text-foreground transition-all group rounded-xl hover:bg-secondary/50"
                  >
                    {item}
                    <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-accent to-chart-2 rounded-full group-hover:w-1/2 transition-all duration-300" />
                  </Link>
                ))}
              </nav>

              {/* Desktop CTA */}
              <div className="hidden md:flex items-center gap-3">
                <div className="relative group">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-accent to-chart-2 rounded-xl blur opacity-40 group-hover:opacity-70 transition-opacity" />
                  <Link href="#calculator">
                    <Button 
                      size="sm" 
                      className="relative bg-gradient-to-r from-accent to-chart-2 text-white hover:opacity-90 shadow-xl hover:shadow-2xl transition-all hover:-translate-y-0.5 rounded-xl font-semibold border-0"
                    >
                      Free Calculator
                      <ArrowRight className="ml-1.5 w-4 h-4" />
                    </Button>
                  </Link>
                </div>
              </div>

              {/* Mobile Menu Button */}
              <button
                className="md:hidden p-2.5 rounded-xl text-foreground hover:bg-secondary/50 transition-colors"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>

            {/* Mobile Menu */}
            {mobileMenuOpen && (
              <div className="md:hidden py-6 border-t border-border/30 animate-in slide-in-from-top-2 duration-200">
                <nav className="flex flex-col gap-2">
                  {['Features', 'Calculator'].map((item) => (
                    <Link 
                      key={item}
                      href={`#${item.toLowerCase()}`} 
                      className="px-4 py-3 rounded-xl text-sm font-semibold text-muted-foreground hover:text-foreground hover:bg-secondary/50 transition-colors"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item}
                    </Link>
                  ))}
                  <div className="flex flex-col gap-3 pt-4 mt-2 border-t border-border/30">
                    <Link href="#calculator" onClick={() => setMobileMenuOpen(false)}>
                      <Button size="sm" className="bg-gradient-to-r from-accent to-chart-2 text-white hover:opacity-90 rounded-xl font-semibold border-0 w-full">
                        Free Calculator
                        <ArrowRight className="ml-1.5 w-4 h-4" />
                      </Button>
                    </Link>
                  </div>
                </nav>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
