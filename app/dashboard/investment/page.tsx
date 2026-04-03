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

export default function InvestmentCalculatorPage() {
  const [lumpSum, setLumpSum] = useState(100000)
  const [rate, setRate] = useState(10)
  const [years, setYears] = useState(5)

  const futureValue = lumpSum * Math.pow(1 + rate / 100, years)
  const gain = futureValue - lumpSum

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Investment Growth Calculator</h1>
        <p className="mt-2 text-sm sm:text-base text-muted-foreground max-w-2xl">
          Check how a one‑time investment can grow over the years at a given return rate.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
        <Card>
          <CardHeader>
            <CardTitle>Investment details</CardTitle>
            <CardDescription>Enter lump sum amount, expected annual return and time horizon.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="lump-sum">Lump sum amount (₹)</Label>
              <Input
                id="lump-sum"
                type="number"
                value={lumpSum}
                onChange={(e) => setLumpSum(Number(e.target.value) || 0)}
                min={0}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="inv-rate">Expected return (% per year)</Label>
              <Input
                id="inv-rate"
                type="number"
                value={rate}
                onChange={(e) => setRate(Number(e.target.value) || 0)}
                min={0}
                step={0.5}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="inv-years">Investment period (years)</Label>
              <Input
                id="inv-years"
                type="number"
                value={years}
                onChange={(e) => setYears(Number(e.target.value) || 0)}
                min={0}
                step={1}
              />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-primary text-primary-foreground">
          <CardHeader>
            <CardTitle>Projection</CardTitle>
            <CardDescription className="text-primary-foreground/80">
              Approximate value with annual compounding.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Initial investment</span>
              <span className="text-base sm:text-lg font-semibold font-mono">
                {isFinite(lumpSum) ? formatInr(lumpSum) : "—"}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Estimated value</span>
              <span className="text-xl sm:text-2xl font-bold font-mono">
                {isFinite(futureValue) ? formatInr(futureValue) : "—"}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Estimated gain</span>
              <span className="text-base sm:text-lg font-semibold font-mono">
                {isFinite(gain) ? formatInr(gain) : "—"}
              </span>
            </div>
            <p className="mt-4 text-xs text-primary-foreground/80">
              This is a simple compound interest calculation and does not factor in taxes, charges or market volatility.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

