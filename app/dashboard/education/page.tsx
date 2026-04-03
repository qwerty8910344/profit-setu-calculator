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

export default function EducationCalculatorPage() {
  const [currentCost, setCurrentCost] = useState(1500000)
  const [yearsAway, setYearsAway] = useState(10)
  const [inflation, setInflation] = useState(8)

  const futureCost = currentCost * Math.pow(1 + inflation / 100, yearsAway)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Education Goal Calculator</h1>
        <p className="mt-2 text-sm sm:text-base text-muted-foreground max-w-2xl">
          Estimate future education cost for your child based on current fees and education inflation.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
        <Card>
          <CardHeader>
            <CardTitle>Goal inputs</CardTitle>
            <CardDescription>Fees today, years left and expected inflation.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="edu-cost">Cost today (₹)</Label>
              <Input
                id="edu-cost"
                type="number"
                value={currentCost}
                onChange={(e) => setCurrentCost(Number(e.target.value) || 0)}
                min={0}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edu-years">Years until you need the money</Label>
              <Input
                id="edu-years"
                type="number"
                value={yearsAway}
                onChange={(e) => setYearsAway(Number(e.target.value) || 0)}
                min={0}
                step={1}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edu-inf">Education inflation (% per year)</Label>
              <Input
                id="edu-inf"
                type="number"
                value={inflation}
                onChange={(e) => setInflation(Number(e.target.value) || 0)}
                min={0}
                step={0.5}
              />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-primary text-primary-foreground">
          <CardHeader>
            <CardTitle>Future cost</CardTitle>
            <CardDescription className="text-primary-foreground/80">
              Plan SIPs or investments based on this target amount.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Estimated cost at start year</span>
              <span className="text-base sm:text-lg font-semibold font-mono">
                {isFinite(futureCost) ? formatInr(futureCost) : "—"}
              </span>
            </div>
            <p className="mt-4 text-xs text-primary-foreground/80">
              Combine this with the SIP calculator to see how much you may need to invest monthly to reach this goal.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

