"use client"

import { Button } from "@/components/ui/button"
import { Check, Sparkles, ArrowRight, Crown } from "lucide-react"
import { IsometricCard } from "./isometric-card"

const plans = [
  {
    name: "Free",
    price: "₹0",
    description: "Perfect for getting started",
    features: [
      "Basic profit calculator",
      "Gross margin calculations",
      "Up to 5 saved calculations",
      "Community support"
    ],
    cta: "Get started free",
    popular: false,
    gradient: "from-secondary to-secondary/80"
  },
  {
    name: "Pro",
    price: "₹12",
    period: "/month",
    description: "For growing businesses",
    features: [
      "Everything in Free",
      "Advanced ROI analytics",
      "Unlimited saved calculations",
      "Export PDF reports",
      "Historical tracking",
      "Priority support"
    ],
    cta: "Start free trial",
    popular: true,
    gradient: "from-accent to-chart-2"
  },
  {
    name: "Enterprise",
    price: "Custom",
    description: "For teams and agencies",
    features: [
      "Everything in Pro",
      "Team collaboration",
      "Custom integrations",
      "API access",
      "Dedicated account manager",
      "Custom onboarding"
    ],
    cta: "Contact sales",
    popular: false,
    gradient: "from-primary to-primary/80"
  }
]

export function PricingSection() {
  return (
    <section id="pricing" className="relative py-24 sm:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute bottom-0 left-1/4 w-[600px] h-[600px] bg-accent/10 rounded-full blur-[150px] animate-float-slow" />
        <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-chart-4/10 rounded-full blur-[120px] animate-float-delayed" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-chart-2/5 rounded-full blur-[200px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full glass-premium animated-border mb-8">
            <Sparkles className="w-4 h-4 text-accent" />
            <span className="text-sm font-semibold text-foreground">Pricing Plans</span>
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground text-balance leading-tight">
            Simple,{" "}
            <span className="bg-gradient-to-r from-accent to-chart-2 bg-clip-text text-transparent">
              transparent
            </span>{" "}
            pricing
          </h2>
          <p className="mt-6 text-lg text-muted-foreground leading-relaxed max-w-xl mx-auto">
            Start free and upgrade as your business grows. No hidden fees, ever.
          </p>
        </div>

        {/* Pricing Cards - 3D Stack */}
        <div className="grid md:grid-cols-3 gap-8 lg:gap-10 max-w-5xl mx-auto items-center preserve-3d">
          {plans.map((plan, index) => (
            <div 
              key={index}
              className={plan.popular ? 'md:-mt-6 md:mb-6 relative z-10' : 'relative'}
            >
              <IsometricCard 
                depth={plan.popular ? 30 : 18}
                glowColor={plan.popular ? "accent" : undefined}
              >
                <div 
                  className={`relative overflow-hidden h-full rounded-2xl ${
                    plan.popular 
                      ? 'border-2 border-accent/50' 
                      : 'border border-border/30'
                  }`}
                >
                  {plan.popular && (
                    <>
                      {/* Animated gradient background */}
                      <div className="absolute inset-0 holographic opacity-10" />
                      
                      {/* Popular badge */}
                      <div className="absolute -top-px left-1/2 -translate-x-1/2 z-20">
                        <div className="relative">
                          <div className="absolute inset-0 bg-gradient-to-r from-accent to-chart-2 blur-md opacity-70" />
                          <span className="relative flex items-center gap-2 bg-gradient-to-r from-accent to-chart-2 text-white text-xs font-bold px-5 py-2 rounded-b-xl uppercase tracking-wider">
                            <Crown className="w-3.5 h-3.5" />
                            Most popular
                          </span>
                        </div>
                      </div>

                      {/* Corner decorations */}
                      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-accent/20 to-transparent rounded-bl-full" />
                      <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-chart-2/20 to-transparent rounded-tr-full" />
                    </>
                  )}

                  <div className={`relative p-8 ${plan.popular ? 'pt-12' : ''}`}>
                    {/* Plan name */}
                    <div className="flex items-center gap-3 mb-6">
                      <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${plan.gradient}`} />
                      <span className="text-lg font-bold text-card-foreground">{plan.name}</span>
                    </div>

                    {/* Price */}
                    <div className="mb-6">
                      <span className={`text-5xl sm:text-6xl font-bold font-mono ${
                        plan.popular 
                          ? 'bg-gradient-to-r from-accent to-chart-2 bg-clip-text text-transparent' 
                          : 'text-card-foreground'
                      }`}>
                        {plan.price}
                      </span>
                      {plan.period && (
                        <span className="text-muted-foreground text-lg ml-1">{plan.period}</span>
                      )}
                    </div>

                    <p className="text-muted-foreground mb-8 text-base">{plan.description}</p>

                    {/* Features */}
                    <ul className="space-y-4 mb-10">
                      {plan.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-start gap-4">
                          <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${
                            plan.popular 
                              ? 'bg-gradient-to-r from-accent/30 to-chart-2/30' 
                              : 'bg-secondary'
                          }`}>
                            <Check className={`w-3.5 h-3.5 ${plan.popular ? 'text-accent' : 'text-muted-foreground'}`} />
                          </div>
                          <span className="text-sm text-muted-foreground leading-relaxed">{feature}</span>
                        </li>
                      ))}
                    </ul>

                    {/* CTA Button */}
                    <Button 
                      className={`w-full h-14 text-base font-bold group relative overflow-hidden ${
                        plan.popular 
                          ? 'bg-gradient-to-r from-accent to-chart-2 text-white hover:opacity-90 shadow-xl hover:shadow-2xl border-0' 
                          : 'bg-secondary text-secondary-foreground hover:bg-secondary/80 border-2 border-border/50'
                      }`}
                    >
                      <span className="relative z-10 flex items-center justify-center">
                        {plan.cta}
                        {plan.popular && (
                          <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        )}
                      </span>
                      {plan.popular && (
                        <div className="absolute inset-0 shimmer opacity-30" />
                      )}
                    </Button>
                  </div>
                </div>
              </IsometricCard>
            </div>
          ))}
        </div>

        {/* Trust note with 3D badge */}
        <div className="text-center mt-16">
          <IsometricCard className="inline-flex" depth={8}>
            <div className="px-8 py-4 flex items-center gap-4 text-sm text-muted-foreground">
              <div className="relative">
                <div className="w-3 h-3 rounded-full bg-accent" />
                <div className="absolute inset-0 w-3 h-3 rounded-full bg-accent animate-ping opacity-50" />
              </div>
              <span>All plans include a 14-day free trial. No credit card required.</span>
            </div>
          </IsometricCard>
        </div>
      </div>
    </section>
  )
}
