"use client"

import { useState } from "react"

export default function GSTCalculator() {
  const [price, setPrice] = useState(0)
  const [gst, setGst] = useState(18)
  const [total, setTotal] = useState(0)

  const calculateGST = () => {
    const gstAmount = (price * gst) / 100
    setTotal(price + gstAmount)
  }

  return (
    <div className="bg-white p-6 rounded shadow max-w-md">
      <h2 className="text-xl font-bold mb-4">GST Calculator</h2>

      <input
        type="number"
        className="border p-2 w-full mb-3 rounded"
        placeholder="Price"
        value={price || ""}
        onChange={(e) => setPrice(Number(e.target.value) || 0)}
      />

      <input
        type="number"
        className="border p-2 w-full mb-3 rounded"
        placeholder="GST %"
        value={gst || ""}
        onChange={(e) => setGst(Number(e.target.value) || 0)}
      />

      <button
        onClick={calculateGST}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Calculate
      </button>

      {total > 0 && (
        <p className="mt-4">Total Price: ₹{total.toFixed(2)}</p>
      )}
    </div>
  )
}
