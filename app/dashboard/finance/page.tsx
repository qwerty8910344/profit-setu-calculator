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

export default function PersonalFinanceCalculatorPage() {
  const [income, setIncome] = useState(100000)
  const [needs, setNeeds] = useState(50000)
  const [wants, setWants] = useState(20000)

  const savings = income - needs - wants
  const savingsRate = income > 0 ? (savings / income) * 100 : 0

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Personal Finance 50‑30‑20 Calculator</h1>
        <p className="mt-2 text-sm sm:text-base text-muted-foreground max-w-2xl">
          Quickly check how your monthly budget lines up with the 50‑30‑20 rule (needs, wants, savings).
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
        <Card>
          <CardHeader>
            <CardTitle>Monthly budget</CardTitle>
            <CardDescription>Enter your total income and planned spending.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="pf-income">Monthly income (₹)</Label>
              <Input
                id="pf-income"
                type="number"
                value={income}
                onChange={(e) => setIncome(Number(e.target.value) || 0)}
                min={0}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="pf-needs">Needs (rent, groceries, EMIs) (₹)</Label>
              <Input
                id="pf-needs"
                type="number"
                value={needs}
                onChange={(e) => setNeeds(Number(e.target.value) || 0)}
                min={0}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="pf-wants">Wants (dining out, shopping) (₹)</Label>
              <Input
                id="pf-wants"
                type="number"
                value={wants}
                onChange={(e) => setWants(Number(e.target.value) || 0)}
                min={0}
              />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-primary text-primary-foreground">
          <CardHeader>
            <CardTitle>Summary</CardTitle>
            <CardDescription className="text-primary-foreground/80">
              Compare your plan against the 50‑30‑20 guideline.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Savings per month</span>
              <span className="text-base sm:text-lg font-semibold font-mono">
                {isFinite(savings) ? formatInr(savings) : "—"}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Savings rate</span>
              <span className="text-base sm:text-lg font-semibold font-mono">
                {isFinite(savingsRate) ? `${savingsRate.toFixed(1)}%` : "—"}
              </span>
            </div>
            <p className="mt-4 text-xs text-primary-foreground/80">
              Classic 50‑30‑20 says ~50% to needs, ~30% to wants, ~20%+ to savings. Use this as a sense‑check, not a
              hard rule.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

