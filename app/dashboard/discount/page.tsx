"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"

export default function DiscountCalculatorPage() {
  const [originalPrice, setOriginalPrice] = useState(1000)
  const [discountPercent, setDiscountPercent] = useState(20)
  const [desiredMargin, setDesiredMargin] = useState(30)

  const discountedPrice = originalPrice * (1 - discountPercent / 100)
  const requiredCostPrice =
    1 - desiredMargin / 100 !== 0 ? discountedPrice * (1 - desiredMargin / 100) : 0

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Discount & Margin Calculator</h1>
        <p className="mt-2 text-sm sm:text-base text-muted-foreground max-w-2xl">
          See selling price after discount and what cost price you need to maintain a target margin.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
        <Card>
          <CardHeader>
            <CardTitle>Inputs</CardTitle>
            <CardDescription>Useful for running discount campaigns without killing margins.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="disc-op">Original price</Label>
              <Input
                id="disc-op"
                type="number"
                value={originalPrice}
                onChange={(e) => setOriginalPrice(Number(e.target.value) || 0)}
                min={0}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="disc-pct">Discount %</Label>
              <Input
                id="disc-pct"
                type="number"
                value={discountPercent}
                onChange={(e) => setDiscountPercent(Number(e.target.value) || 0)}
                min={0}
                step={0.5}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="disc-margin">Desired margin % on discounted price</Label>
              <Input
                id="disc-margin"
                type="number"
                value={desiredMargin}
                onChange={(e) => setDesiredMargin(Number(e.target.value) || 0)}
                min={0}
                step={0.5}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Results</CardTitle>
            <CardDescription className="text-muted-foreground">
              Use these to plan sourcing and discounts.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Discounted price</span>
              <span className="text-base sm:text-lg font-semibold font-mono">
                {isFinite(discountedPrice) ? discountedPrice.toFixed(2) : "—"}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Required cost price</span>
              <span className="text-base sm:text-lg font-semibold font-mono">
                {isFinite(requiredCostPrice) ? requiredCostPrice.toFixed(2) : "—"}
              </span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

