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

export default function RetirementCalculatorPage() {
  const [monthlyNeed, setMonthlyNeed] = useState(60000)
  const [retireYears, setRetireYears] = useState(20)
  const [postRetReturn, setPostRetReturn] = useState(6)

  const annualNeed = monthlyNeed * 12
  const withdrawalRate = postRetReturn / 100
  const corpusRuleOf25 = annualNeed * 25
  const corpusSimple = withdrawalRate > 0 ? annualNeed / (withdrawalRate / 100) : corpusRuleOf25

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Retirement Corpus Calculator</h1>
        <p className="mt-2 text-sm sm:text-base text-muted-foreground max-w-2xl">
          Estimate how much money you may need at retirement to sustain your lifestyle, based on simple thumb‑rules.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
        <Card>
          <CardHeader>
            <CardTitle>Retirement needs</CardTitle>
            <CardDescription>Very high‑level estimate; does not adjust for future inflation.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="ret-monthly">Monthly expense need in retirement (₹)</Label>
              <Input
                id="ret-monthly"
                type="number"
                value={monthlyNeed}
                onChange={(e) => setMonthlyNeed(Number(e.target.value) || 0)}
                min={0}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="ret-years">Years you want income to last</Label>
              <Input
                id="ret-years"
                type="number"
                value={retireYears}
                onChange={(e) => setRetireYears(Number(e.target.value) || 0)}
                min={0}
                step={1}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="ret-return">Expected post‑retirement return (% per year)</Label>
              <Input
                id="ret-return"
                type="number"
                value={postRetReturn}
                onChange={(e) => setPostRetReturn(Number(e.target.value) || 0)}
                min={0}
                step={0.5}
              />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-primary text-primary-foreground">
          <CardHeader>
            <CardTitle>Corpus estimate</CardTitle>
            <CardDescription className="text-primary-foreground/80">
              Rule‑of‑thumb only. Please consult a planner for a detailed retirement plan.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Annual need (today)</span>
              <span className="text-base sm:text-lg font-semibold font-mono">
                {isFinite(annualNeed) ? formatInr(annualNeed) : "—"}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Corpus (25× annual need)</span>
              <span className="text-base sm:text-lg font-semibold font-mono">
                {isFinite(corpusRuleOf25) ? formatInr(corpusRuleOf25) : "—"}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Corpus (based on return)</span>
              <span className="text-base sm:text-lg font-semibold font-mono">
                {isFinite(corpusSimple) ? formatInr(corpusSimple) : "—"}
              </span>
            </div>
            <p className="mt-4 text-xs text-primary-foreground/80">
              This simple view does not adjust for inflation or changing expenses. Use it as a starting point, not a
              final plan.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

