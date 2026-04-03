import dynamic from 'next/dynamic'
import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { ProfitCalculator } from "@/components/profit-calculator"

// Dynamic imports for below-the-fold components to improve initial load speed (LCP/FCP)
const FeaturesSection = dynamic(() => import('@/components/features-section').then(mod => mod.FeaturesSection), { ssr: true })
const EngagementSection = dynamic(() => import('@/components/engagement-section').then(mod => mod.EngagementSection), { ssr: true })
const Footer = dynamic(() => import('@/components/footer').then(mod => mod.Footer), { ssr: true })

export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden bg-transparent w-full flex flex-col items-center">
      <div className="w-full relative z-10">
        <Header />
        <HeroSection />
        <ProfitCalculator />
        <FeaturesSection />
        <EngagementSection />
        <Footer />
      </div>
    </main>
  )
}
