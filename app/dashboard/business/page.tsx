import { ProfitCalculator } from "@/components/profit-calculator"

export default function BusinessDashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Business Profit Calculator</h1>
        <p className="mt-2 text-sm sm:text-base text-muted-foreground max-w-2xl">
          Use 50+ ready-made business presets or enter your own numbers to understand revenue, costs, profit and ROI.
        </p>
      </div>
      <ProfitCalculator />
    </div>
  )
}

