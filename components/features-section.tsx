"use client"

import { 
  Calculator, 
  LineChart, 
  Target, 
  Shield, 
  Zap, 
  Download,
  Sparkles
} from "lucide-react"
import { IsometricCard } from "./isometric-card"

const features = [
  {
    icon: Calculator,
    title: "Instant Calculations",
    description: "Real-time profit margin and ROI calculations as you type. No more spreadsheet formulas.",
    color: "from-accent to-chart-2",
    bgGlow: "bg-accent/20"
  },
  {
    icon: LineChart,
    title: "Visual Analytics",
    description: "See your cost breakdown visually with intuitive charts and progress bars.",
    color: "from-chart-2 to-chart-3",
    bgGlow: "bg-chart-2/20"
  },
  {
    icon: Target,
    title: "Smart Insights",
    description: "Get actionable recommendations based on your profit margins and industry benchmarks.",
    color: "from-chart-4 to-chart-5",
    bgGlow: "bg-chart-4/20"
  },
  {
    icon: Shield,
    title: "Data Privacy",
    description: "Your financial data stays private. All calculations happen locally in your browser.",
    color: "from-chart-3 to-accent",
    bgGlow: "bg-chart-3/20"
  },
  {
    icon: Zap,
    title: "Lightning Fast",
    description: "Zero loading time. Start calculating immediately without sign-up or downloads.",
    color: "from-chart-5 to-chart-4",
    bgGlow: "bg-chart-5/20"
  },
  {
    icon: Download,
    title: "Export Reports",
    description: "Download detailed PDF reports to share with stakeholders or your accountant.",
    color: "from-accent to-chart-4",
    bgGlow: "bg-accent/20"
  }
]

export function FeaturesSection() {
  return (
    <section id="features" className="relative py-24 sm:py-32 overflow-hidden bg-background/50 transition-all duration-700">
      {/* Background with lighter gradients */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-white/80 via-transparent to-white/80" />
        
        {/* Floating orbs - more subtle */}
        <div className="absolute top-1/4 -left-20 w-[400px] h-[400px] bg-accent/5 rounded-full blur-[120px] animate-float-slow" />
        <div className="absolute bottom-1/4 -right-20 w-[350px] h-[350px] bg-chart-2/5 rounded-full blur-[100px] animate-float-delayed" />
        
        {/* Modern Dot pattern */}
        <div 
          className="absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, var(--accent) 1px, transparent 0)`,
            backgroundSize: '40px 40px'
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-20 animate-in fade-in slide-in-from-bottom-10 duration-700">
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full glass-premium border border-accent/20 mb-8">
            <Sparkles className="w-4 h-4 text-accent" />
            <span className="text-sm font-black text-foreground uppercase tracking-wider">Powerful Features</span>
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-7xl font-black text-foreground tracking-tighter leading-[0.9]">
            Built for the <br />
            <span className="bg-gradient-to-r from-accent to-chart-2 bg-clip-text text-transparent underline decoration-accent/20">
              Modern Founder
            </span>
          </h2>
          <p className="mt-8 text-lg sm:text-xl text-muted-foreground leading-relaxed max-w-xl mx-auto font-bold">
            Intuitive tools that turn complex financial data into actionable insights for your business growth.
          </p>
        </div>

        {/* Features Grid - 3D Isometric Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <IsometricCard 
              key={index} 
              depth={12}
              className="h-full group"
            >
              <div className="relative p-10 h-full bg-white/40 backdrop-blur-3xl border border-border/20 rounded-[2rem] transition-all group-hover:border-accent/40 group-hover:bg-white/60">
                {/* Background glow */}
                <div className={`absolute top-6 left-6 w-20 h-20 ${feature.bgGlow} rounded-full blur-3xl opacity-30 group-hover:opacity-60 transition-opacity`} />
                
                {/* Icon with 3D effect */}
                <div className="relative mb-8">
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center shadow-2xl relative z-10 transition-transform group-hover:scale-110 group-hover:rotate-6`}>
                    <feature.icon className="w-8 h-8 text-white" />
                  </div>
                  {/* Icon shadow/glow */}
                  <div className={`absolute inset-0 w-16 h-16 bg-gradient-to-br ${feature.color} rounded-2xl blur-xl opacity-30 -z-10`} />
                </div>
                
                <h3 className="font-black text-2xl text-card-foreground mb-4 tracking-tight">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed text-lg font-bold">
                  {feature.description}
                </p>

                {/* Bottom accent line */}
                <div className={`absolute bottom-0 left-10 right-10 h-1.5 rounded-full bg-gradient-to-r ${feature.color} opacity-0 group-hover:opacity-50 transition-opacity translate-y-1`} />
              </div>
            </IsometricCard>
          ))}
        </div>

        {/* Stats Section with 3D */}
        <div className="mt-32 grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { value: "10K+", label: "Active Users" },
            { value: "₹2.4B", label: "Profits Tracked" },
            { value: "99.9%", label: "Accuracy" },
            { value: "4.9/5", label: "Satisfaction" },
          ].map((stat, index) => (
            <div key={index} className="relative group text-center space-y-3">
                <div className="absolute inset-0 bg-accent/5 rounded-[2rem] blur-xl opacity-0 group-hover:opacity-100 transition-all" />
                <p className="text-4xl sm:text-5xl font-black font-mono tracking-tighter bg-gradient-to-r from-accent to-chart-2 bg-clip-text text-transparent transition-transform group-hover:scale-110">
                  {stat.value}
                </p>
                <div className="w-8 h-1 bg-accent/20 mx-auto rounded-full" />
                <p className="text-sm text-foreground/70 font-black uppercase tracking-[0.2em]">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
