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

export default function RealEstateCalculatorPage() {
  const [propertyPrice, setPropertyPrice] = useState(8000000)
  const [monthlyRent, setMonthlyRent] = useState(30000)
  const [annualExpenses, setAnnualExpenses] = useState(60000)

  const annualRent = monthlyRent * 12
  const netRent = annualRent - annualExpenses
  const rentalYield = propertyPrice > 0 ? (netRent / propertyPrice) * 100 : 0

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Real Estate Rental Yield Calculator</h1>
        <p className="mt-2 text-sm sm:text-base text-muted-foreground max-w-2xl">
          Understand the annual rental yield of a property after basic expenses.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
        <Card>
          <CardHeader>
            <CardTitle>Property & rent</CardTitle>
            <CardDescription>Approximate numbers are fine for quick comparison.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="re-price">Property price (₹)</Label>
              <Input
                id="re-price"
                type="number"
                value={propertyPrice}
                onChange={(e) => setPropertyPrice(Number(e.target.value) || 0)}
                min={0}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="re-rent">Monthly rent (₹)</Label>
              <Input
                id="re-rent"
                type="number"
                value={monthlyRent}
                onChange={(e) => setMonthlyRent(Number(e.target.value) || 0)}
                min={0}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="re-exp">Annual expenses (maintenance, tax etc.) (₹)</Label>
              <Input
                id="re-exp"
                type="number"
                value={annualExpenses}
                onChange={(e) => setAnnualExpenses(Number(e.target.value) || 0)}
                min={0}
              />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-primary text-primary-foreground">
          <CardHeader>
            <CardTitle>Yield</CardTitle>
            <CardDescription className="text-primary-foreground/80">
              Compare different properties using net rental yield.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Net annual rent</span>
              <span className="text-base sm:text-lg font-semibold font-mono">
                {isFinite(netRent) ? formatInr(netRent) : "—"}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Rental yield</span>
              <span className="text-base sm:text-lg font-semibold font-mono">
                {isFinite(rentalYield) ? `${rentalYield.toFixed(2)}%` : "—"}
              </span>
            </div>
            <p className="mt-4 text-xs text-primary-foreground/80">
              Yield is one piece of the puzzle. Also consider appreciation potential, vacancy risk and financing costs.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

