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

export default function AgricultureCalculatorPage() {
  const [acreage, setAcreage] = useState(5)
  const [yieldPerAcre, setYieldPerAcre] = useState(20)
  const [pricePerUnit, setPricePerUnit] = useState(2500)
  const [costPerAcre, setCostPerAcre] = useState(30000)

  const totalYield = acreage * yieldPerAcre
  const revenue = totalYield * pricePerUnit
  const totalCost = acreage * costPerAcre
  const profit = revenue - totalCost

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Agriculture Profit Calculator</h1>
        <p className="mt-2 text-sm sm:text-base text-muted-foreground max-w-2xl">
          Estimate revenue and profit for a crop based on acreage, yield and cost of cultivation.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
        <Card>
          <CardHeader>
            <CardTitle>Farm details</CardTitle>
            <CardDescription>Use your expected yield and market price.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="ag-acre">Acreage (acres)</Label>
              <Input
                id="ag-acre"
                type="number"
                value={acreage}
                onChange={(e) => setAcreage(Number(e.target.value) || 0)}
                min={0}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="ag-yield">Yield per acre (units)</Label>
              <Input
                id="ag-yield"
                type="number"
                value={yieldPerAcre}
                onChange={(e) => setYieldPerAcre(Number(e.target.value) || 0)}
                min={0}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="ag-price">Price per unit (₹)</Label>
              <Input
                id="ag-price"
                type="number"
                value={pricePerUnit}
                onChange={(e) => setPricePerUnit(Number(e.target.value) || 0)}
                min={0}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="ag-cost">Cost of cultivation per acre (₹)</Label>
              <Input
                id="ag-cost"
                type="number"
                value={costPerAcre}
                onChange={(e) => setCostPerAcre(Number(e.target.value) || 0)}
                min={0}
              />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-primary text-primary-foreground">
          <CardHeader>
            <CardTitle>Output</CardTitle>
            <CardDescription className="text-primary-foreground/80">
              Helps compare crops and decide sowing plans.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Total yield (units)</span>
              <span className="text-base sm:text-lg font-semibold font-mono">
                {isFinite(totalYield) ? totalYield.toFixed(2) : "—"}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Revenue</span>
              <span className="text-base sm:text-lg font-semibold font-mono">
                {isFinite(revenue) ? formatInr(revenue) : "—"}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Total cost</span>
              <span className="text-base sm:text-lg font-semibold font-mono">
                {isFinite(totalCost) ? formatInr(totalCost) : "—"}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Profit</span>
              <span className="text-base sm:text-lg font-semibold font-mono">
                {isFinite(profit) ? formatInr(profit) : "—"}
              </span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

