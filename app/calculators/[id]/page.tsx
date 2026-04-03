import { notFound } from "next/navigation"
import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ProfitCalculator } from "@/components/profit-calculator"
import { ALL_TOOLS } from "@/lib/tools"
import { BUSINESS_PRESETS } from "@/lib/business-presets"

type CalculatorPageProps = {
  params: {
    id: string
  }
}

export function generateStaticParams() {
  const ids = new Set([
    ...BUSINESS_PRESETS.map(p => p.id),
    ...ALL_TOOLS.map(t => t.id),
    "business-profit",
    "loan-emi"
  ])
  return Array.from(ids).map(id => ({ id }))
}

export async function generateMetadata({ params }: CalculatorPageProps): Promise<Metadata> {
  const { id } = await params
  const resolvedId = id === "business-profit" ? "profit" : id === "loan-emi" ? "emi" : id
  const preset = BUSINESS_PRESETS.find((p) => p.id === resolvedId)
  const tool = ALL_TOOLS.find((t) => t.id === resolvedId)

  if (!preset && !tool) {
    return {
      title: "Calculator not found | Profit Setu",
    }
  }

  const name = preset?.name || tool?.label || "Financial"
  const description = preset?.description || `Free online ${name} calculator for instant results.`

  return {
    title: `${name} Calculator | Profit Setu`,
    description: description,
    alternates: {
      canonical: `/calculators/${id}`,
    },
  }
}

export default async function CalculatorPage({ params }: CalculatorPageProps) {
  const { id } = await params
  const resolvedId = id === "business-profit" ? "profit" : id === "loan-emi" ? "emi" : id
  const preset = BUSINESS_PRESETS.find((p) => p.id === resolvedId)
  const tool = ALL_TOOLS.find((t) => t.id === resolvedId)

  if (!preset && !tool) {
    notFound()
  }

  const name = preset?.name || tool?.label || "Financial"
  const description = preset?.description || `Use this smart ${name} calculator to get accurate financial insights.`

  const toolJsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": `${name} Calculator`,
    "description": description,
    "applicationCategory": "FinanceApplication",
    "operatingSystem": "Web, Android, iOS",
    "url": `https://profitsetu.com/calculators/${id}`,
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "INR"
    }
  }

  return (
    <main className="min-h-screen bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(toolJsonLd) }}
      />
      <Header />
      <section className="pt-16 sm:pt-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-10 text-center">
            <p className="text-xs sm:text-sm font-semibold text-accent uppercase tracking-wide">
              Dedicated calculator
            </p>
            <h1 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground">
              {name} Calculator
            </h1>
            <p className="mt-4 text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
              {description} Adjust the numbers to match your situation and instantly see accurate results.
            </p>
          </div>
        </div>
      </section>

      {preset ? (
        <ProfitCalculator initialPresetId={preset.id} />
      ) : (
        <ProfitCalculator initialPresetId={resolvedId} />
      )}

      <Footer />
    </main>
  )
}

