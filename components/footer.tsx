"use client"

import Link from "next/link"
import { TrendingUp, Share2, Globe, Activity, Mail, Phone, Calculator, Rocket, BookOpen, ShieldCheck } from "lucide-react"

export function Footer() {
  return (
    <footer className="relative z-10 py-20 bg-background border-t border-border/10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Product Segment */}
          <div className="space-y-6">
            <h4 className="text-xl font-black text-foreground flex items-center gap-2">
              <Calculator className="w-5 h-5 text-accent" /> Product
            </h4>
            <div className="space-y-4">
              <div>
                <p className="font-black text-sm uppercase tracking-widest text-accent mb-1">Features</p>
                <p className="text-muted-foreground text-sm leading-relaxed font-bold">
                  ProfitSetu offers powerful and easy-to-use tools designed to simplify calculations across business, finance, study, and daily life. With a clean interface, fast performance, and accurate results.
                </p>
              </div>
              <div>
                <p className="font-black text-sm uppercase tracking-widest text-accent mb-1">Calculator</p>
                <p className="text-muted-foreground text-sm leading-relaxed font-bold">
                  Explore 50+ smart calculators covering profit & loss, GST, EMI, percentage, age, time, and more. Each is designed for quick input and instant results.
                </p>
              </div>
              <div>
                <p className="font-black text-sm uppercase tracking-widest text-accent mb-1">Integrations</p>
                <p className="text-muted-foreground text-sm leading-relaxed font-bold">
                  ProfitSetu supports integration with websites and apps, allowing developers to embed calculators easily. Future updates will include API access.
                </p>
              </div>
            </div>
          </div>

          {/* Company Segment */}
          <div className="space-y-6">
            <h4 className="text-xl font-black text-foreground flex items-center gap-2">
              <Rocket className="w-5 h-5 text-accent" /> Company
            </h4>
            <div className="space-y-4">
              <div>
                <p className="font-black text-sm uppercase tracking-widest text-accent mb-1">About</p>
                <p className="text-muted-foreground text-sm leading-relaxed font-bold">
                  ProfitSetu is a modern web platform created to make calculations simple for everyone.<br/>
                  <span className="text-foreground">Developer:</span> Niyaz Ahmed<br/>
                  <span className="text-foreground">Contact:</span> 8013818905
                </p>
              </div>
              <div>
                <p className="font-black text-sm uppercase tracking-widest text-accent mb-1">Blog</p>
                <p className="text-muted-foreground text-sm leading-relaxed font-bold">
                  Stay updated with the latest tips, guides, and insights on finance, business strategies, and smart calculation methods.
                </p>
              </div>
              <div>
                <p className="font-black text-sm uppercase tracking-widest text-accent mb-1">Careers</p>
                <p className="text-muted-foreground text-sm leading-relaxed font-bold">
                  Join our team and help build innovative digital tools. We are always looking for creative developers and designers.
                </p>
              </div>
              <div>
                <p className="font-black text-sm uppercase tracking-widest text-accent mb-1">Contact</p>
                <p className="text-muted-foreground text-sm leading-relaxed font-bold">
                  📞 Phone: 8013818905 <br/>
                  📧 Email: support@profitsetu.com
                </p>
              </div>
            </div>
          </div>

          {/* Resources Segment */}
          <div className="space-y-6">
            <h4 className="text-xl font-black text-foreground flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-accent" /> Resources
            </h4>
            <ul className="space-y-6">
              <li>
                <p className="font-black text-sm uppercase tracking-widest text-accent mb-1">Documentation</p>
                <p className="text-muted-foreground text-sm font-bold">Detailed guides on how to use each calculator and feature. Perfect for beginners.</p>
              </li>
              <li>
                <p className="font-black text-sm uppercase tracking-widest text-accent mb-1">Help Center</p>
                <p className="text-muted-foreground text-sm font-bold">Find answers to common questions and troubleshooting tips.</p>
              </li>
              <li>
                <p className="font-black text-sm uppercase tracking-widest text-accent mb-1">API</p>
                <p className="text-muted-foreground text-sm font-bold italic opacity-60">Coming Soon - Will allow developers to access calculator tools.</p>
              </li>
              <li>
                <p className="font-black text-sm uppercase tracking-widest text-accent mb-1">Status</p>
                <p className="text-muted-foreground text-sm font-bold">All systems are monitored to ensure smooth and reliable performance.</p>
              </li>
            </ul>
          </div>

          {/* Legal Segment */}
          <div className="space-y-6">
            <h4 className="text-xl font-black text-foreground flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-accent" /> Legal
            </h4>
            <ul className="space-y-6">
              <li className="text-sm text-muted-foreground font-bold">
                <strong className="text-foreground uppercase text-xs tracking-tighter">Privacy:</strong> We respect your privacy. ProfitSetu does not store personal data without permission.
              </li>
              <li className="text-sm text-muted-foreground font-bold">
                <strong className="text-foreground uppercase text-xs tracking-tighter">Terms:</strong> By using ProfitSetu, you agree to use the platform responsibly.
              </li>
              <li className="text-sm text-muted-foreground font-bold">
                <strong className="text-foreground uppercase text-xs tracking-tighter">Cookie Policy:</strong> We use cookies to improve user experience and analyze traffic.
              </li>
            </ul>
            <div className="pt-8 border-t border-border/10">
               <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 mb-3">
                  <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-accent">🔥 Pro Tip</p>
               </div>
               <p className="text-xs italic opacity-60 font-bold leading-relaxed">
                  "Calculated decisions are the cornerstone of sustainable wealth creation."
               </p>
            </div>
          </div>
        </div>

        <div className="pt-12 border-t border-border/10 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-4">
             <div className="w-10 h-10 rounded-xl bg-accent flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-white" />
             </div>
             <p className="text-xs font-black text-muted-foreground tracking-widest uppercase">
                © 2026 PROFIT SETU. ALL RIGHTS RESERVED.
             </p>
          </div>
          <div className="flex gap-8">
             <Share2 className="w-5 h-5 text-muted-foreground hover:text-accent cursor-pointer transition-all hover:-translate-y-1" />
             <Globe className="w-5 h-5 text-muted-foreground hover:text-accent cursor-pointer transition-all hover:-translate-y-1" />
             <Activity className="w-5 h-5 text-muted-foreground hover:text-accent cursor-pointer transition-all hover:-translate-y-1" />
          </div>
        </div>
      </div>
    </footer>
  )
}
