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

export default function TransportCalculatorPage() {
  const [farePerTrip, setFarePerTrip] = useState(500)
  const [fuelCostPerTrip, setFuelCostPerTrip] = useState(200)
  const [otherCostPerTrip, setOtherCostPerTrip] = useState(100)
  const [tripsPerMonth, setTripsPerMonth] = useState(120)

  const profitPerTrip = farePerTrip - fuelCostPerTrip - otherCostPerTrip
  const monthlyProfit = profitPerTrip * tripsPerMonth

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Transport & Logistics Trip Calculator</h1>
        <p className="mt-2 text-sm sm:text-base text-muted-foreground max-w-2xl">
          Estimate profit per trip and per month for cabs, trucks or delivery vehicles.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
        <Card>
          <CardHeader>
            <CardTitle>Trip details</CardTitle>
            <CardDescription>Adjust for your typical route and utilisation.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="tr-fare">Average fare per trip (₹)</Label>
              <Input
                id="tr-fare"
                type="number"
                value={farePerTrip}
                onChange={(e) => setFarePerTrip(Number(e.target.value) || 0)}
                min={0}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="tr-fuel">Fuel cost per trip (₹)</Label>
              <Input
                id="tr-fuel"
                type="number"
                value={fuelCostPerTrip}
                onChange={(e) => setFuelCostPerTrip(Number(e.target.value) || 0)}
                min={0}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="tr-other">Tolls, maintenance etc. per trip (₹)</Label>
              <Input
                id="tr-other"
                type="number"
                value={otherCostPerTrip}
                onChange={(e) => setOtherCostPerTrip(Number(e.target.value) || 0)}
                min={0}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="tr-trips">Trips per month</Label>
              <Input
                id="tr-trips"
                type="number"
                value={tripsPerMonth}
                onChange={(e) => setTripsPerMonth(Number(e.target.value) || 0)}
                min={0}
              />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-primary text-primary-foreground">
          <CardHeader>
            <CardTitle>Profit</CardTitle>
            <CardDescription className="text-primary-foreground/80">
              See if your rates and utilisation make sense.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Profit per trip</span>
              <span className="text-base sm:text-lg font-semibold font-mono">
                {isFinite(profitPerTrip) ? formatInr(profitPerTrip) : "—"}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Profit per month</span>
              <span className="text-base sm:text-lg font-semibold font-mono">
                {isFinite(monthlyProfit) ? formatInr(monthlyProfit) : "—"}
              </span>
            </div>
            <p className="mt-4 text-xs text-primary-foreground/80">
              Try different trip counts and fares to see how more bookings or better pricing impact your bottom line.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

