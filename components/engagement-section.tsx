"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { IsometricCard } from "./isometric-card"
import { Sparkles, MessageCircle, Star } from "lucide-react"

const VISIT_KEY = "profitsetu_visit_count"

export function EngagementSection() {
  const [shouldShow, setShouldShow] = useState(false)

  useEffect(() => {
    try {
      const raw = typeof window !== "undefined" ? window.localStorage.getItem(VISIT_KEY) : null
      const current = raw ? Number(raw) || 0 : 0
      const next = current + 1
      window.localStorage.setItem(VISIT_KEY, String(next))
      if (next > 2) {
        setShouldShow(true)
      }
    } catch {
      // If localStorage is not available, just always show the section
      setShouldShow(true)
    }
  }, [])

  if (!shouldShow) return null

  const shareText = encodeURIComponent(
    "I found this free profit calculator for Indian small businesses. Try it here:",
  )
  const shareUrl = typeof window !== "undefined" ? window.location.href : "https://profitsetu.example"

  const whatsappHref = `https://wa.me/?text=${shareText}%20${encodeURIComponent(shareUrl)}`

  return (
    <section className="relative py-20 sm:py-24 overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-secondary/40 via-background to-secondary/40" />
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full glass-premium animated-border mb-6">
            <Sparkles className="w-4 h-4 text-accent" />
            <span className="text-sm font-semibold text-foreground">Enjoying ProfitSetu?</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
            Help other founders discover this calculator
          </h2>
          <p className="mt-4 text-sm sm:text-base text-muted-foreground max-w-xl mx-auto">
            You have used ProfitSetu multiple times. If it&apos;s helpful, share it with a friend or leave a quick
            review.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          <IsometricCard depth={14}>
            <div className="p-6 sm:p-8 flex flex-col gap-4 h-full justify-between">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-accent to-chart-2 flex items-center justify-center shadow-lg">
                  <MessageCircle className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-foreground">Share on WhatsApp</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                Send this calculator to a friend, client, or team member directly on WhatsApp.
              </p>
              <div>
                <Button
                  asChild
                  className="w-full mt-4 bg-[#25D366] hover:bg-[#1ebe5b] text-white font-semibold"
                >
                  <a href={whatsappHref} target="_blank" rel="noopener noreferrer">
                    Share on WhatsApp
                  </a>
                </Button>
              </div>
            </div>
          </IsometricCard>

          <IsometricCard depth={14}>
            <div className="p-6 sm:p-8 flex flex-col gap-4 h-full justify-between">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-chart-4 to-chart-5 flex items-center justify-center shadow-lg">
                  <Star className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-foreground">Review this website</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                Tell us what&apos;s working and what we can improve. Your feedback helps shape ProfitSetu.
              </p>
              <div className="mt-2 flex flex-col gap-3">
                <textarea
                  className="min-h-[96px] rounded-xl border border-border bg-background/60 px-3 py-2 text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40"
                  placeholder="Share your feedback here (this is local only in this demo)."
                />
                <Button
                  type="button"
                  disabled
                  className="w-full h-11 text-sm font-semibold bg-secondary text-secondary-foreground border border-border/60 cursor-not-allowed"
                >
                  Submit review (coming soon)
                </Button>
              </div>
            </div>
          </IsometricCard>
        </div>
      </div>
    </section>
  )
}

