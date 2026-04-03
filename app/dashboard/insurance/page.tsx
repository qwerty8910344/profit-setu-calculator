"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"

function formatInr(value: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value)
}

export default function InsuranceCalculatorPage() {
  const [annualIncome, setAnnualIncome] = useState(800000)
  const [coverYears, setCoverYears] = useState(15)
  const [premiumBudget, setPremiumBudget] = useState(25000)

  const suggestedCover = annualIncome * coverYears
  const affordableCover =
    annualIncome > 0 ? (premiumBudget / (annualIncome * 0.02 || 1)) * annualIncome : 0

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Insurance Cover Calculator</h1>
        <p className="mt-2 text-sm sm:text-base text-muted-foreground max-w-2xl">
          Get a rough idea of how much life insurance cover you may need and whether your premium budget is
          reasonable.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
        <Card>
          <CardHeader>
            <CardTitle>Inputs</CardTitle>
            <CardDescription>Basic income and budget details for a quick thumb‑rule check.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="ins-income">Annual income (₹)</Label>
              <Input
                id="ins-income"
                type="number"
                value={annualIncome}
                onChange={(e) => setAnnualIncome(Number(e.target.value) || 0)}
                min={0}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="ins-years">Years of income to protect</Label>
              <Input
                id="ins-years"
                type="number"
                value={coverYears}
                onChange={(e) => setCoverYears(Number(e.target.value) || 0)}
                min={0}
                step={1}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="ins-premium">Annual premium budget (₹)</Label>
              <Input
                id="ins-premium"
                type="number"
                value={premiumBudget}
                onChange={(e) => setPremiumBudget(Number(e.target.value) || 0)}
                min={0}
              />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-primary text-primary-foreground">
          <CardHeader>
            <CardTitle>Estimate</CardTitle>
            <CardDescription className="text-primary-foreground/80">
              Simple thumb‑rule for term life cover. Always check with a licensed advisor.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Suggested cover (income × years)</span>
              <span className="text-base sm:text-lg font-semibold font-mono">
                {isFinite(suggestedCover) ? formatInr(suggestedCover) : "—"}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Approx. affordable cover</span>
              <span className="text-base sm:text-lg font-semibold font-mono">
                {isFinite(affordableCover) ? formatInr(affordableCover) : "—"}
              </span>
            </div>
            <p className="mt-4 text-xs text-primary-foreground/80">
              Many planners suggest annual premium for term insurance be around 1–2% of income. This tool compares your
              budget with that thumb‑rule. It is not personalised financial advice.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

