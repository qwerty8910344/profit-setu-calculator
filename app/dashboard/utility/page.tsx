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

export default function UtilityBillsCalculatorPage() {
  const [electricity, setElectricity] = useState(2500)
  const [internet, setInternet] = useState(1000)
  const [water, setWater] = useState(800)
  const [others, setOthers] = useState(700)

  const total = electricity + internet + water + others

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Monthly Utility Bills Calculator</h1>
        <p className="mt-2 text-sm sm:text-base text-muted-foreground max-w-2xl">
          Track how much you spend each month on basic utilities and fixed services.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
        <Card>
          <CardHeader>
            <CardTitle>Bill details</CardTitle>
            <CardDescription>Fill in your typical monthly bills.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="util-elec">Electricity (₹)</Label>
              <Input
                id="util-elec"
                type="number"
                value={electricity}
                onChange={(e) => setElectricity(Number(e.target.value) || 0)}
                min={0}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="util-internet">Internet / broadband (₹)</Label>
              <Input
                id="util-internet"
                type="number"
                value={internet}
                onChange={(e) => setInternet(Number(e.target.value) || 0)}
                min={0}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="util-water">Water / society charges (₹)</Label>
              <Input
                id="util-water"
                type="number"
                value={water}
                onChange={(e) => setWater(Number(e.target.value) || 0)}
                min={0}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="util-other">Other fixed bills (₹)</Label>
              <Input
                id="util-other"
                type="number"
                value={others}
                onChange={(e) => setOthers(Number(e.target.value) || 0)}
                min={0}
              />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-primary text-primary-foreground">
          <CardHeader>
            <CardTitle>Total</CardTitle>
            <CardDescription className="text-primary-foreground/80">
              Useful for budgeting and tracking fixed commitments.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Total utilities per month</span>
              <span className="text-base sm:text-lg font-semibold font-mono">
                {isFinite(total) ? formatInr(total) : "—"}
              </span>
            </div>
            <p className="mt-4 text-xs text-primary-foreground/80">
              Combine this with your income and other expenses to see how much room you have for savings or lifestyle
              upgrades.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

