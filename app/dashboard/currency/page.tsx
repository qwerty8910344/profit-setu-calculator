"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"

export default function CurrencyCalculatorPage() {
  const [amount, setAmount] = useState(100)
  const [rate, setRate] = useState(83.5)

  const inrValue = amount * rate

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Currency Conversion Calculator</h1>
        <p className="mt-2 text-sm sm:text-base text-muted-foreground max-w-2xl">
          Simple conversion from foreign currency to INR using a manual rate you enter.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
        <Card>
          <CardHeader>
            <CardTitle>Inputs</CardTitle>
            <CardDescription>Use the live rate from your bank or broker.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="cur-amt">Amount in foreign currency</Label>
              <Input
                id="cur-amt"
                type="number"
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value) || 0)}
                min={0}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="cur-rate">Conversion rate (₹ per 1 unit)</Label>
              <Input
                id="cur-rate"
                type="number"
                value={rate}
                onChange={(e) => setRate(Number(e.target.value) || 0)}
                min={0}
                step={0.01}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Result</CardTitle>
            <CardDescription className="text-muted-foreground">
              Pure multiplication, doesn&apos;t include bank charges.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Value in INR</span>
              <span className="text-base sm:text-lg font-semibold font-mono">
                {isFinite(inrValue) ? inrValue.toFixed(2) : "—"}
              </span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

