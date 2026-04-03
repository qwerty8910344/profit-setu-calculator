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

export default function SipCalculatorPage() {
  const [monthly, setMonthly] = useState(10000)
  const [rate, setRate] = useState(12)
  const [years, setYears] = useState(10)

  const months = years * 12
  const monthlyRate = rate / 12 / 100

  const futureValue =
    monthlyRate === 0
      ? monthly * months
      : monthly * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) * (1 + monthlyRate)

  const totalInvested = monthly * months
  const gain = futureValue - totalInvested

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-foreground">SIP Calculator</h1>
        <p className="mt-2 text-sm sm:text-base text-muted-foreground max-w-2xl">
          Estimate how much wealth your monthly SIP can create over time.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
        <Card>
          <CardHeader>
            <CardTitle>SIP details</CardTitle>
            <CardDescription>Enter your SIP amount, expected returns and time horizon.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="sip-amount">Monthly investment (₹)</Label>
              <Input
                id="sip-amount"
                type="number"
                value={monthly}
                onChange={(e) => setMonthly(Number(e.target.value) || 0)}
                min={0}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="sip-rate">Expected return (% per year)</Label>
              <Input
                id="sip-rate"
                type="number"
                value={rate}
                onChange={(e) => setRate(Number(e.target.value) || 0)}
                min={0}
                step={0.5}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="sip-years">Investment period (years)</Label>
              <Input
                id="sip-years"
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
              Approximate value assuming constant returns.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Total invested</span>
              <span className="text-base sm:text-lg font-semibold font-mono">
                {isFinite(totalInvested) ? formatInr(totalInvested) : "—"}
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
              Markets are volatile. This is a simplified projection, not a guarantee. Always consider risk and consult a
              financial advisor.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

