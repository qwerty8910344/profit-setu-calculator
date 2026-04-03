import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { BUSINESS_PRESETS } from "@/lib/business-presets"

export default function CalculatorsIndexPage() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <section className="py-16 sm:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-sm font-semibold text-accent">Calculator Library</p>
            <h1 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground">
              50+ profit calculators for real businesses
            </h1>
            <p className="mt-4 text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
              Pick a business type to open a dedicated calculator page with preset numbers you can fine‑tune for your
              own scenario.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {BUSINESS_PRESETS.map((preset) => (
              <Link key={preset.id} href={`/calculators/${preset.id}`} className="group">
                <Card className="h-full border-border/60 hover:border-accent/60 transition-colors glass-premium">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg font-semibold group-hover:text-accent transition-colors">
                      {preset.name}
                    </CardTitle>
                    <CardDescription className="text-xs sm:text-sm line-clamp-3">
                      {preset.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <p className="text-xs text-muted-foreground">
                      Open calculator →
                    </p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </main>
  )
}

