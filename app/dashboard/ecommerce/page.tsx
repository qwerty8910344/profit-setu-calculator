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

export default function EcommerceCalculatorPage() {
  const [sellingPrice, setSellingPrice] = useState(999)
  const [productCost, setProductCost] = useState(400)
  const [marketplaceFee, setMarketplaceFee] = useState(15)
  const [shippingCost, setShippingCost] = useState(80)

  const feeAmount = (sellingPrice * marketplaceFee) / 100
  const profitPerOrder = sellingPrice - productCost - feeAmount - shippingCost
  const margin = sellingPrice > 0 ? (profitPerOrder / sellingPrice) * 100 : 0

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-foreground">E‑commerce Order Profit Calculator</h1>
        <p className="mt-2 text-sm sm:text-base text-muted-foreground max-w-2xl">
          Work out your per‑order profit after product cost, marketplace fees and shipping.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
        <Card>
          <CardHeader>
            <CardTitle>Order details</CardTitle>
            <CardDescription>Use typical marketplace fee % and shipping cost.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="sp">Selling price per order (₹)</Label>
              <Input
                id="sp"
                type="number"
                value={sellingPrice}
                onChange={(e) => setSellingPrice(Number(e.target.value) || 0)}
                min={0}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="pc">Product & packaging cost (₹)</Label>
              <Input
                id="pc"
                type="number"
                value={productCost}
                onChange={(e) => setProductCost(Number(e.target.value) || 0)}
                min={0}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="fee">% marketplace fee on selling price</Label>
              <Input
                id="fee"
                type="number"
                value={marketplaceFee}
                onChange={(e) => setMarketplaceFee(Number(e.target.value) || 0)}
                min={0}
                step={0.5}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="ship">Shipping & fulfilment cost (₹)</Label>
              <Input
                id="ship"
                type="number"
                value={shippingCost}
                onChange={(e) => setShippingCost(Number(e.target.value) || 0)}
                min={0}
              />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-primary text-primary-foreground">
          <CardHeader>
            <CardTitle>Per‑order profit</CardTitle>
            <CardDescription className="text-primary-foreground/80">
              Based on your current price and cost structure.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Marketplace fee per order</span>
              <span className="text-base sm:text-lg font-semibold font-mono">
                {isFinite(feeAmount) ? formatInr(feeAmount) : "—"}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Profit per order</span>
              <span className="text-base sm:text-lg font-semibold font-mono">
                {isFinite(profitPerOrder) ? formatInr(profitPerOrder) : "—"}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Margin on selling price</span>
              <span className="text-base sm:text-lg font-semibold font-mono">
                {isFinite(margin) ? `${margin.toFixed(1)}%` : "—"}
              </span>
            </div>
            <p className="mt-4 text-xs text-primary-foreground/80">
              Use this to decide discount levels and whether a product is worth scaling on marketplaces.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

