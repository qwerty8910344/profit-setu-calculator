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

export default function SalaryCalculatorPage() {
  const [ctc, setCtc] = useState(1200000)
  const [monthlyExpenses, setMonthlyExpenses] = useState(60000)

  const monthlyGross = ctc / 12
  const pf = monthlyGross * 0.12
  const taxEstimate = monthlyGross * 0.1
  const monthlyInHand = monthlyGross - pf - taxEstimate
  const surplus = monthlyInHand - monthlyExpenses

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Salary In‑Hand & Surplus Calculator</h1>
        <p className="mt-2 text-sm sm:text-base text-muted-foreground max-w-2xl">
          Rough breakdown of monthly in‑hand salary and how much you may have left after expenses.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
        <Card>
          <CardHeader>
            <CardTitle>Inputs</CardTitle>
            <CardDescription>Use simple assumptions to plan your cash flow.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="ctc">Annual CTC (₹)</Label>
              <Input
                id="ctc"
                type="number"
                value={ctc}
                onChange={(e) => setCtc(Number(e.target.value) || 0)}
                min={0}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="salary-expenses">Monthly expenses (₹)</Label>
              <Input
                id="salary-expenses"
                type="number"
                value={monthlyExpenses}
                onChange={(e) => setMonthlyExpenses(Number(e.target.value) || 0)}
                min={0}
              />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-primary text-primary-foreground">
          <CardHeader>
            <CardTitle>Monthly view</CardTitle>
            <CardDescription className="text-primary-foreground/80">
              Based on simplified PF (12%) and tax (10%) assumptions.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Gross (per month)</span>
              <span className="text-base sm:text-lg font-semibold font-mono">
                {isFinite(monthlyGross) ? formatInr(monthlyGross) : "—"}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">PF + tax (approx.)</span>
              <span className="text-base sm:text-lg font-semibold font-mono">
                {isFinite(pf + taxEstimate) ? formatInr(pf + taxEstimate) : "—"}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">In‑hand (approx.)</span>
              <span className="text-base sm:text-lg font-semibold font-mono">
                {isFinite(monthlyInHand) ? formatInr(monthlyInHand) : "—"}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Surplus after expenses</span>
              <span className="text-base sm:text-lg font-semibold font-mono">
                {isFinite(surplus) ? formatInr(surplus) : "—"}
              </span>
            </div>
            <p className="mt-4 text-xs text-primary-foreground/80">
              Actual salary structure, tax regime and deductions can change these numbers. This is only a planning tool,
              not tax advice.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

