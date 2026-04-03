"use client"

import { useState } from "react"

export default function LoanCalculator() {
  const [amount, setAmount] = useState(0)
  const [rate, setRate] = useState(0)
  const [years, setYears] = useState(0)
  const [emi, setEmi] = useState(0)

  const calculateEMI = () => {
    const r = rate / 12 / 100
    const n = years * 12

    const emiValue =
      n > 0 && (r > 0 || amount > 0)
        ? r === 0
          ? amount / n
          : (amount * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1)
        : 0

    setEmi(emiValue)
  }

  return (
    <div className="max-w-xl bg-white p-6 rounded-xl shadow">
      <h2 className="text-xl font-bold mb-4">Loan EMI Calculator</h2>

      <input
        type="number"
        className="border p-2 w-full mb-3 rounded"
        placeholder="Loan Amount"
        value={amount || ""}
        onChange={(e) => setAmount(Number(e.target.value) || 0)}
      />

      <input
        type="number"
        className="border p-2 w-full mb-3 rounded"
        placeholder="Interest Rate (%)"
        value={rate || ""}
        onChange={(e) => setRate(Number(e.target.value) || 0)}
      />

      <input
        type="number"
        className="border p-2 w-full mb-3 rounded"
        placeholder="Years"
        value={years || ""}
        onChange={(e) => setYears(Number(e.target.value) || 0)}
      />

      <button
        onClick={calculateEMI}
        className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800"
      >
        Calculate
      </button>

      {emi > 0 && (
        <h3 className="mt-4">EMI: ₹{emi.toFixed(2)}</h3>
      )}
    </div>
  )
}
