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

export default function StartupCalculatorPage() {
  const [monthlyBurn, setMonthlyBurn] = useState(300000)
  const [cashInBank, setCashInBank] = useState(3600000)

  const runwayMonths = monthlyBurn > 0 ? cashInBank / monthlyBurn : 0

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Startup Runway Calculator</h1>
        <p className="mt-2 text-sm sm:text-base text-muted-foreground max-w-2xl">
          See how many months of runway you have based on current burn and cash in the bank.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
        <Card>
          <CardHeader>
            <CardTitle>Runway inputs</CardTitle>
            <CardDescription>Simple view for early‑stage founders.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="burn">Monthly burn (₹)</Label>
              <Input
                id="burn"
                type="number"
                value={monthlyBurn}
                onChange={(e) => setMonthlyBurn(Number(e.target.value) || 0)}
                min={0}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="cash">Cash in bank (₹)</Label>
              <Input
                id="cash"
                type="number"
                value={cashInBank}
                onChange={(e) => setCashInBank(Number(e.target.value) || 0)}
                min={0}
              />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-primary text-primary-foreground">
          <CardHeader>
            <CardTitle>Runway</CardTitle>
            <CardDescription className="text-primary-foreground/80">
              Approximate number of months before you run out of cash.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Cash in bank</span>
              <span className="text-base sm:text-lg font-semibold font-mono">
                {isFinite(cashInBank) ? formatInr(cashInBank) : "—"}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Runway (months)</span>
              <span className="text-base sm:text-lg font-semibold font-mono">
                {isFinite(runwayMonths) ? runwayMonths.toFixed(1) : "—"}
              </span>
            </div>
            <p className="mt-4 text-xs text-primary-foreground/80">
              This ignores future revenue and changes in burn. Use it for quick checks and scenario planning.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

