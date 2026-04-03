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

export default function RestaurantCalculatorPage() {
  const [avgBill, setAvgBill] = useState(500)
  const [coversPerDay, setCoversPerDay] = useState(80)
  const [foodCostPercent, setFoodCostPercent] = useState(35)
  const [operatingCostPerDay, setOperatingCostPerDay] = useState(15000)

  const dailyRevenue = avgBill * coversPerDay
  const foodCost = (dailyRevenue * foodCostPercent) / 100
  const dailyProfit = dailyRevenue - foodCost - operatingCostPerDay
  const margin = dailyRevenue > 0 ? (dailyProfit / dailyRevenue) * 100 : 0

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Restaurant Daily Profit Calculator</h1>
        <p className="mt-2 text-sm sm:text-base text-muted-foreground max-w-2xl">
          Estimate daily revenue, food cost and profit for your restaurant based on covers and average bill value.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
        <Card>
          <CardHeader>
            <CardTitle>Dining assumptions</CardTitle>
            <CardDescription>Adjust these to match your typical day.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="rest-bill">Average bill per cover (₹)</Label>
              <Input
                id="rest-bill"
                type="number"
                value={avgBill}
                onChange={(e) => setAvgBill(Number(e.target.value) || 0)}
                min={0}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="rest-covers">Covers per day</Label>
              <Input
                id="rest-covers"
                type="number"
                value={coversPerDay}
                onChange={(e) => setCoversPerDay(Number(e.target.value) || 0)}
                min={0}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="rest-food">Food cost % of revenue</Label>
              <Input
                id="rest-food"
                type="number"
                value={foodCostPercent}
                onChange={(e) => setFoodCostPercent(Number(e.target.value) || 0)}
                min={0}
                step={0.5}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="rest-ops">Operating cost per day (rent, staff etc.) (₹)</Label>
              <Input
                id="rest-ops"
                type="number"
                value={operatingCostPerDay}
                onChange={(e) => setOperatingCostPerDay(Number(e.target.value) || 0)}
                min={0}
              />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-primary text-primary-foreground">
          <CardHeader>
            <CardTitle>Daily summary</CardTitle>
            <CardDescription className="text-primary-foreground/80">
              Check if your menu pricing and occupancy are working for you.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Daily revenue</span>
              <span className="text-base sm:text-lg font-semibold font-mono">
                {isFinite(dailyRevenue) ? formatInr(dailyRevenue) : "—"}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Food cost</span>
              <span className="text-base sm:text-lg font-semibold font-mono">
                {isFinite(foodCost) ? formatInr(foodCost) : "—"}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Daily profit (before tax)</span>
              <span className="text-base sm:text-lg font-semibold font-mono">
                {isFinite(dailyProfit) ? formatInr(dailyProfit) : "—"}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Profit margin</span>
              <span className="text-base sm:text-lg font-semibold font-mono">
                {isFinite(margin) ? `${margin.toFixed(1)}%` : "—"}
              </span>
            </div>
            <p className="mt-4 text-xs text-primary-foreground/80">
              Try different average bills and covers to see how much promotions or pricing changes affect profit.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

