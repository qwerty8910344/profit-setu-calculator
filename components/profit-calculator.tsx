"use client"

import { useState, useMemo, useRef, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { 
  TrendingUp, IndianRupee, Percent, Calculator, PieChart, ArrowUpRight, ArrowDownRight, 
  Sparkles, FileDown, Loader2, Share2, Coins, Briefcase, Globe, LineChart, Tag, CreditCard, 
  BarChart3, Search, ChevronLeft, Landmark, PiggyBank, Wallet, BadgePercent, Activity,
  BriefcaseBusiness, Building2, Car, Home, Zap, HeartPulse, GraduationCap, Flame, Banknote,
  ReceiptCent, Building, Factory, Scale, ArrowRightLeft, BookOpen, Clock, Code, Copy, Check
} from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { BUSINESS_PRESETS } from "@/lib/business-presets"
// jspdf and html2canvas removed from static imports to use dynamic imports in the function for better runtime reliability
import { ALL_TOOLS, ToolType } from "@/lib/tools"
import { UtilityConverters } from "./utility-converters"

// Tool types and definitions moved to @/lib/tools

function formatCurrency(value: number, currency: string = "INR"): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value)
}

function formatPercent(value: number): string {
  if (!isFinite(value) || isNaN(value)) return "0.0%"
  return `${value.toFixed(1)}%`
}

function formatNumber(value: number, suffix: string = ''): string {
  if (!isFinite(value) || isNaN(value)) return `0${suffix}`
  return `${value.toFixed(1)}${suffix}`
}

export function ProfitCalculator({ initialPresetId }: { initialPresetId?: string }) {
  const [activeTool, setActiveTool] = useState<ToolType | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [showResult, setShowResult] = useState(false)
  const [showEmbed, setShowEmbed] = useState(false)
  const [copied, setCopied] = useState(false)
  const { toast } = useToast()

  const reportRef = useRef<HTMLDivElement>(null)
  const [isExporting, setIsExporting] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    if (initialPresetId) {
      const tool = ALL_TOOLS.find(t => t.id === initialPresetId)
      if (tool) {
        setActiveTool(tool.id)
        setShowResult(false)
      } else {
        const preset = BUSINESS_PRESETS.find(p => p.id === initialPresetId)
        if (preset) {
          setActiveTool('profit') // All business presets use the 'profit' tool
          setSelectedPresetId(preset.id)
          setRevenue(preset.revenue)
          setCostOfGoods(preset.costOfGoods)
          setOperatingExpenses(preset.operatingExpenses)
        }
      }
    }
  }, [initialPresetId])

  // --- Grid View Logic ---
  const filteredTools = useMemo(() => {
    return ALL_TOOLS.filter(t => {
      const matchesSearch = t.label.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesCategory = selectedCategory === 'all' || t.category === selectedCategory
      return matchesSearch && matchesCategory
    })
  }, [searchQuery, selectedCategory])

  // --- Tool 1: Business Profit Logic ---
  const defaultPreset = BUSINESS_PRESETS[0]
  const initialPreset = initialPresetId != null
      ? BUSINESS_PRESETS.find((preset) => preset.id === initialPresetId) ?? defaultPreset
      : defaultPreset
  const [selectedPresetId, setSelectedPresetId] = useState<string>(initialPreset.id)
  const [revenue, setRevenue] = useState(initialPreset.revenue)
  const [costOfGoods, setCostOfGoods] = useState(initialPreset.costOfGoods)
  const [operatingExpenses, setOperatingExpenses] = useState(initialPreset.operatingExpenses)

  const profitCalculations = useMemo(() => {
    const grossProfit = revenue - costOfGoods
    const netProfit = grossProfit - operatingExpenses
    const grossMargin = revenue > 0 ? (grossProfit / revenue) * 100 : 0
    const netMargin = revenue > 0 ? (netProfit / revenue) * 100 : 0
    const roi = operatingExpenses > 0 ? (netProfit / operatingExpenses) * 100 : 0
    return { grossProfit, netProfit, grossMargin, netMargin, roi }
  }, [revenue, costOfGoods, operatingExpenses])

  // --- Tool 2: Compounding Logic ---
  const [principal, setPrincipal] = useState(100000)
  const [monthlyContribution, setMonthlyContribution] = useState(10000)
  const [rate, setRate] = useState(12)
  const [years, setYears] = useState(10)

  const compoundingCalculations = useMemo(() => {
    const i = rate / 100 / 12
    const n = Math.max(years, 0) * 12
    const futureValuePrincipal = principal * Math.pow(1 + i, n)
    const futureValueSeries = i > 0 ? monthlyContribution * ((Math.pow(1 + i, n) - 1) / i) : monthlyContribution * n
    const totalValue = futureValuePrincipal + futureValueSeries
    const totalInvested = principal + (monthlyContribution * n)
    const totalWealth = totalValue - totalInvested
    return { totalValue, totalInvested, totalWealth }
  }, [principal, monthlyContribution, rate, years])

  // --- Tool 3: Stocks Logic ---
  const [buyPrice, setBuyPrice] = useState(1500)
  const [sellPrice, setSellPrice] = useState(1800)
  const [quantity, setQuantity] = useState(100)
  const [charges, setCharges] = useState(500)

  const stockCalculations = useMemo(() => {
    const totalBuy = buyPrice * quantity
    const totalSell = sellPrice * quantity
    const grossProfit = totalSell - totalBuy
    const netProfit = grossProfit - charges
    const returnPercent = totalBuy > 0 ? (netProfit / totalBuy) * 100 : 0
    return { totalBuy, totalSell, netProfit, returnPercent }
  }, [buyPrice, sellPrice, quantity, charges])

  // --- Tool 4: Currency Logic ---
  const [amount, setAmount] = useState(1000)
  const [exchangeRate, setExchangeRate] = useState(83.5)
  const [cur, setCur] = useState("USD")

  const currencyCalculations = useMemo(() => {
    const totalInInr = amount * exchangeRate
    return { totalInInr }
  }, [amount, exchangeRate])

  // --- Tool 5: Discount Logic ---
  const [origPrice, setOrigPrice] = useState(1999)
  const [discPercent, setDiscPercent] = useState(25)

  const discountCalculations = useMemo(() => {
    const amountOff = (origPrice * discPercent) / 100
    const finalPrice = origPrice - amountOff
    return { amountOff, finalPrice }
  }, [origPrice, discPercent])

  // --- Tool 6: EMI Logic ---
  const [loanAmount, setLoanAmount] = useState(500000)
  const [loanRate, setLoanRate] = useState(9.5)
  const [loanTenure, setLoanTenure] = useState(36)

  const emiCalculations = useMemo(() => {
    const r = loanRate / 12 / 100
    const n = loanTenure
    const emi = r > 0 ? (loanAmount * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1) : loanAmount / n
    const totalPayable = emi * n
    const totalInterest = totalPayable - loanAmount
    return { emi, totalPayable, totalInterest }
  }, [loanAmount, loanRate, loanTenure])

  // --- Tool 7: Trade P/L Logic ---
  const [tBuy, setTBuy] = useState(1000)
  const [tSell, setTSell] = useState(1200)
  const [tExpense, setTExpense] = useState(50)

  const tradeCalculations = useMemo(() => {
    const netProfit = tSell - tBuy - tExpense
    const margin = tSell > 0 ? (netProfit / tSell) * 100 : 0
    return { netProfit, margin }
  }, [tBuy, tSell, tExpense])

  // --- Tool 8: GST Logic ---
  const [gstAmount, setGstAmount] = useState(1000)
  const [gstRate, setGstRate] = useState(18)
  const [gstType, setGstType] = useState('exclusive') // 'exclusive' or 'inclusive'

  const gstCalculations = useMemo(() => {
    let finalAmount = 0
    let taxAmount = 0
    let originalAmount = gstAmount
    if (gstType === 'exclusive') {
      taxAmount = (gstAmount * gstRate) / 100
      finalAmount = gstAmount + taxAmount
    } else {
      taxAmount = gstAmount - (gstAmount / (1 + gstRate / 100))
      originalAmount = gstAmount - taxAmount
      finalAmount = gstAmount
    }
    return { originalAmount, taxAmount, finalAmount }
  }, [gstAmount, gstRate, gstType])

  // --- Tool 9: Margin Logic ---
  const [mngCost, setMngCost] = useState(100)
  const [mngMargin, setMngMargin] = useState(20) // target margin %

  const marginCalculations = useMemo(() => {
    // Selling Price = Cost / (1 - (Margin / 100))
    const requiredSellPrice = mngMargin < 100 ? mngCost / (1 - (mngMargin / 100)) : 0
    const grossProfit = requiredSellPrice - mngCost
    return { requiredSellPrice, grossProfit }
  }, [mngCost, mngMargin])

  // --- Tool 10: Break-Even Logic ---
  const [fixedCosts, setFixedCosts] = useState(50000)
  const [pricePerUnit, setPricePerUnit] = useState(100)
  const [variableCostPerUnit, setVariableCostPerUnit] = useState(40)

  const breakevenCalculations = useMemo(() => {
    const contributionMargin = pricePerUnit - variableCostPerUnit
    const breakevenUnits = contributionMargin > 0 ? Math.ceil(fixedCosts / contributionMargin) : 0
    const breakevenRevenue = breakevenUnits * pricePerUnit
    return { breakevenUnits, breakevenRevenue, contributionMargin }
  }, [fixedCosts, pricePerUnit, variableCostPerUnit])

  // --- Tool 11: Percentage Logic ---
  const [pctPart, setPctPart] = useState(25)
  const [pctTotal, setPctTotal] = useState(100)

  const percentCalculations = useMemo(() => {
    const percentage = pctTotal !== 0 ? (pctPart / pctTotal) * 100 : 0
    return { percentage }
  }, [pctPart, pctTotal])

  // --- Tool 12: BMI Logic ---
  const [weight, setWeight] = useState(70)
  const [heightCm, setHeightCm] = useState(175)

  const bmiCalculations = useMemo(() => {
    const heightM = heightCm / 100
    const bmi = heightM > 0 ? weight / (heightM * heightM) : 0
    let category = "Normal"
    if (bmi < 18.5) category = "Underweight"
    else if (bmi > 25 && bmi < 30) category = "Overweight"
    else if (bmi >= 30) category = "Obese"
    return { bmi, category }
  }, [weight, heightCm])

  // --- Tool 13: Age Logic ---
  const [birthDate, setBirthDate] = useState('1990-01-01')

  const ageCalculations = useMemo(() => {
    if (!mounted) return { years: 0 }
    const dob = new Date(birthDate)
    const diff_ms = Date.now() - dob.getTime()
    const age_dt = new Date(diff_ms)
    const years = Math.abs(age_dt.getUTCFullYear() - 1970)
    return { years }
  }, [birthDate, mounted])

  // --- Tool 14: FD Logic ---
  const [fdPrincipal, setFdPrincipal] = useState(100000)
  const [fdRate, setFdRate] = useState(7.0)
  const [fdYears, setFdYears] = useState(5)
  const fdCalculations = useMemo(() => {
    // Assuming quarterly compounding A = P(1+r/4)^(4n)
    const amount = fdPrincipal * Math.pow(1 + (fdRate/100)/4, 4 * fdYears)
    const interest = amount - fdPrincipal
    return { amount, interest }
  }, [fdPrincipal, fdRate, fdYears])

  // --- Tool 15: RD Logic ---
  const [rdMonthly, setRdMonthly] = useState(5000)
  const [rdRate, setRdRate] = useState(6.5)
  const [rdYears, setRdYears] = useState(5)
  const rdCalculations = useMemo(() => {
    // RD Math: P = monthly, r = rate/100/4. Formula is complex for exact quarterly compounded RD.
    const months = rdYears * 12
    const ratePerQuarter = rdRate / 100 / 4
    // Simplified standard RD formula approximation
    let maturity = 0;
    for(let i=0; i<months; i++) {
        maturity += rdMonthly * Math.pow(1 + ratePerQuarter, (months - i) / 3)
    }
    const invested = rdMonthly * months;
    const interest = maturity - invested;
    return { amount: maturity, interest, invested }
  }, [rdMonthly, rdRate, rdYears])

  // --- Tool 16: PPF Logic ---
  const [ppfYearly, setPpfYearly] = useState(150000)
  const [ppfYears, setPpfYears] = useState(15)
  const ppfCalculations = useMemo(() => {
    const rate = 7.1 / 100
    let balance = 0
    for(let i=0; i<ppfYears; i++){ balance = (balance + ppfYearly) * (1 + rate) }
    const invested = ppfYearly * ppfYears
    const interest = balance - invested
    return { amount: balance, invested, interest }
  }, [ppfYearly, ppfYears])

  // --- Tool 17: NPS Logic ---
  const [npsMonthly, setNpsMonthly] = useState(5000)
  const [npsYears, setNpsYears] = useState(30)
  const [npsRate, setNpsRate] = useState(10)
  const npsCalculations = useMemo(() => {
    const i = npsRate / 100 / 12
    const n = npsYears * 12
    const corpus = i > 0 ? npsMonthly * ((Math.pow(1 + i, n) - 1) / i) : npsMonthly * n
    const invested = npsMonthly * n
    return { amount: corpus, invested, interest: corpus - invested }
  }, [npsMonthly, npsYears, npsRate])

  // --- Tool 18: EPF Logic ---
  const [epfBasic, setEpfBasic] = useState(50000) // basic salary per month
  const [epfYears, setEpfYears] = useState(25)
  const [epfIncrease, setEpfIncrease] = useState(5) // yearly salary increase %
  const epfCalculations = useMemo(() => {
    let balance = 0
    let currentBasic = epfBasic
    let totalInvested = 0
    const rate = 8.25 / 100
    for (let y = 1; y <= epfYears; y++) {
      const yearlyContrib = currentBasic * 12 * 0.12 * 2 // approx employee 12% + employer 3.67% (simplified here as 12% total for math brevity or standard matching)
      // Actually standard is employee 12%, employer 3.67% to EPF, 8.33% to EPS. So total to EPF is 15.67%
      const exactYearlyEpf = currentBasic * 12 * 0.1567
      balance = (balance + exactYearlyEpf) * (1 + rate)
      totalInvested += exactYearlyEpf
      currentBasic *= (1 + epfIncrease/100)
    }
    return { amount: balance, invested: totalInvested, interest: balance - totalInvested }
  }, [epfBasic, epfYears, epfIncrease])

  // --- Tool 19: Simple Interest Logic ---
  const [siPrincipal, setSiPrincipal] = useState(100000)
  const [siRate, setSiRate] = useState(8)
  const [siYears, setSiYears] = useState(5)
  const siCalculations = useMemo(() => {
    const interest = (siPrincipal * siRate * siYears) / 100
    return { interest, amount: siPrincipal + interest }
  }, [siPrincipal, siRate, siYears])

  // --- Tool 20: Compound Interest Logic ---
  const [ciPrincipal, setCiPrincipal] = useState(100000)
  const [ciRate, setCiRate] = useState(8)
  const [ciYears, setCiYears] = useState(5)
  const [ciFreq, setCiFreq] = useState(1) // times per year
  const ciCalculations = useMemo(() => {
    const amount = ciPrincipal * Math.pow(1 + (ciRate/100)/ciFreq, ciFreq * ciYears)
    return { interest: amount - ciPrincipal, amount }
  }, [ciPrincipal, ciRate, ciYears, ciFreq])

  // --- Tool 21: CAGR Logic ---
  const [cagrStart, setCagrStart] = useState(10000)
  const [cagrEnd, setCagrEnd] = useState(20000)
  const [cagrYears, setCagrYears] = useState(5)
  const cagrCalculations = useMemo(() => {
    const cagr = cagrStart > 0 && cagrYears > 0 ? (Math.pow(cagrEnd/cagrStart, 1/cagrYears) - 1) * 100 : 0
    return { cagr, profit: cagrEnd - cagrStart }
  }, [cagrStart, cagrEnd, cagrYears])

  // --- Tool 22: SWP Logic ---
  const [swpPrincipal, setSwpPrincipal] = useState(5000000)
  const [swpMonthly, setSwpMonthly] = useState(30000)
  const [swpRate, setSwpRate] = useState(10)
  const [swpYears, setSwpYears] = useState(10)
  const swpCalculations = useMemo(() => {
    const r = swpRate / 100 / 12
    const n = swpYears * 12
    // Future value of remaining principal after SWP withdrawals
    const futureValue = (swpPrincipal * Math.pow(1+r, n)) - (swpMonthly * (Math.pow(1+r, n) - 1)/r)
    const totalWithdrawn = swpMonthly * n
    return { remaining: Math.max(0, futureValue), totalWithdrawn }
  }, [swpPrincipal, swpMonthly, swpRate, swpYears])

  // --- Tool 23: Lumpsum Logic ---
  const [lsPrincipal, setLsPrincipal] = useState(500000)
  const [lsRate, setLsRate] = useState(12)
  const [lsYears, setLsYears] = useState(10)
  const lsCalculations = useMemo(() => {
    const amount = lsPrincipal * Math.pow(1 + lsRate/100, lsYears)
    return { amount, interest: amount - lsPrincipal }
  }, [lsPrincipal, lsRate, lsYears])

  // --- Tool 24: Step-up SIP Logic ---
  const [stepSipMonthly, setStepSipMonthly] = useState(10000)
  const [stepSipUp, setStepSipUp] = useState(10) // annual percentage step-up
  const [stepSipRate, setStepSipRate] = useState(12)
  const [stepSipYears, setStepSipYears] = useState(10)
  const stepSipCalculations = useMemo(() => {
    let balance = 0
    let currentSip = stepSipMonthly
    let invested = 0
    const mRate = stepSipRate / 100 / 12
    for(let y=1; y<=stepSipYears; y++){
      for(let m=1; m<=12; m++) {
        balance = (balance + currentSip) * (1 + mRate)
        invested += currentSip
      }
      currentSip *= (1 + stepSipUp/100)
    }
    return { amount: balance, invested, interest: balance - invested }
  }, [stepSipMonthly, stepSipUp, stepSipRate, stepSipYears])

  // --- Tool 25: Inflation Logic ---
  const [infCost, setInfCost] = useState(100000)
  const [infRate, setInfRate] = useState(6)
  const [infYears, setInfYears] = useState(10)
  const infCalculations = useMemo(() => {
    const futureCost = infCost * Math.pow(1 + infRate/100, infYears)
    return { futureCost, difference: futureCost - infCost }
  }, [infCost, infRate, infYears])

  // --- Tool 26: FIRE Retirement Logic ---
  const [fireExpense, setFireExpense] = useState(1200000) // annual expense
  const [fireWithdrawalRate, setFireWithdrawalRate] = useState(4) // 4% rule
  const fireCalculations = useMemo(() => {
    const requiredCorpus = fireWithdrawalRate > 0 ? fireExpense / (fireWithdrawalRate / 100) : 0
    return { corpus: requiredCorpus }
  }, [fireExpense, fireWithdrawalRate])

  // --- Tool 27: Post Office MIS Logic ---
  const [pomisPrincipal, setPomisPrincipal] = useState(900000) // max for single account
  const [pomisRate, setPomisRate] = useState(7.4)
  const [pomisYears, setPomisYears] = useState(5)
  const pomisCalculations = useMemo(() => {
    const monthlyInterest = (pomisPrincipal * pomisRate / 100) / 12
    const totalInterest = monthlyInterest * 12 * pomisYears
    return { monthly: monthlyInterest, interest: totalInterest, amount: pomisPrincipal }
  }, [pomisPrincipal, pomisRate, pomisYears])

  // --- Tool 28: Sukanya Samriddhi Logic ---
  const [ssyYearly, setSsyYearly] = useState(150000) // max allowed
  const [ssyRate, setSsyRate] = useState(8.2) // current rate
  const ssyCalculations = useMemo(() => {
    // invest for 15 years, matures in 21 years
    let balance = 0
    let invested = 0
    for(let y=1; y<=21; y++){
      if(y <= 15) {
        balance += ssyYearly
        invested += ssyYearly
      }
      balance = balance * (1 + ssyRate/100)
    }
    return { amount: balance, invested, interest: balance - invested }
  }, [ssyYearly, ssyRate])

  // --- Tool 29: Payday Loan APR Logic ---
  const [paydayAmount, setPaydayAmount] = useState(10000)
  const [paydayFee, setPaydayFee] = useState(1500)
  const [paydayDays, setPaydayDays] = useState(14)
  const paydayCalculations = useMemo(() => {
    const apr = paydayAmount > 0 && paydayDays > 0 ? (paydayFee / paydayAmount) * (365 / paydayDays) * 100 : 0
    return { apr, totalRepayment: paydayAmount + paydayFee }
  }, [paydayAmount, paydayFee, paydayDays])

  // --- Tool 30: Credit Card Payoff Logic ---
  const [ccBalance, setCcBalance] = useState(50000)
  const [ccRate, setCcRate] = useState(36) // annual rate
  const [ccPayment, setCcPayment] = useState(5000)
  const ccCalculations = useMemo(() => {
    const r = ccRate / 100 / 12
    let months = 0
    let interest = 0
    let balance = ccBalance
    if (ccPayment <= balance * r) {
      // payment too small
      months = -1
    } else {
      while (balance > 0 && months < 600) {
        const accInterest = balance * r
        interest += accInterest
        balance = balance + accInterest - ccPayment
        months++
      }
    }
    return { months, interest, totalPaid: ccBalance + Math.max(0, interest) }
  }, [ccBalance, ccRate, ccPayment])

  // --- Tool 31: Income Tax (Simplified India) ---
  const [taxIncome, setTaxIncome] = useState(1200000)
  const [taxDeductions, setTaxDeductions] = useState(150000)
  const taxCalculations = useMemo(() => {
    // Highly simplified old regime calculation for illustrative purposes
    const taxableOld = Math.max(0, taxIncome - taxDeductions - 50000) // 50k standard
    let oldTax = 0
    if(taxableOld > 1000000) oldTax = 112500 + (taxableOld - 1000000)*0.3
    else if(taxableOld > 500000) oldTax = 12500 + (taxableOld - 500000)*0.2
    else if(taxableOld > 250000) oldTax = (taxableOld - 250000)*0.05
    if(taxableOld <= 500000) oldTax = 0 // rebate 87A

    // Simplified new regime
    const taxableNew = Math.max(0, taxIncome - 50000)
    let newTax = 0
    if(taxableNew > 1500000) newTax = 150000 + (taxableNew - 1500000)*0.3
    else if(taxableNew > 1200000) newTax = 90000 + (taxableNew - 1200000)*0.2
    else if(taxableNew > 900000) newTax = 45000 + (taxableNew - 900000)*0.15
    else if(taxableNew > 600000) newTax = 15000 + (taxableNew - 600000)*0.1
    else if(taxableNew > 300000) newTax = (taxableNew - 300000)*0.05
    if(taxableNew <= 700000) newTax = 0 // rebate
    
    // Add 4% cess
    oldTax *= 1.04
    newTax *= 1.04

    return { oldTax, newTax, recommended: oldTax < newTax ? 'Old Regime' : 'New Regime' }
  }, [taxIncome, taxDeductions])

  // --- Tool 32: ROI Logic ---
  const [roiInvested, setRoiInvested] = useState(100000)
  const [roiReturned, setRoiReturned] = useState(125000)
  const roiCalculations = useMemo(() => {
    const profit = roiReturned - roiInvested
    const roi = roiInvested > 0 ? (profit / roiInvested) * 100 : 0
    return { roi, profit }
  }, [roiInvested, roiReturned])

  // --- Tool 33: Markup Logic ---
  const [mkCost, setMkCost] = useState(100)
  const [mkPercent, setMkPercent] = useState(50)
  const mkCalculations = useMemo(() => {
    const price = mkCost + (mkCost * mkPercent / 100)
    const profit = price - mkCost
    const margin = price > 0 ? (profit/price)*100 : 0
    return { price, profit, margin }
  }, [mkCost, mkPercent])

  // --- Tool 34: EBITDA Logic ---
  const [ebNet, setEbNet] = useState(500000)
  const [ebInterest, setEbInterest] = useState(50000)
  const [ebTax, setEbTax] = useState(100000)
  const [ebDa, setEbDa] = useState(80000)
  const ebitdaCalculations = useMemo(() => {
    const ebitda = ebNet + ebInterest + ebTax + ebDa
    return { ebitda }
  }, [ebNet, ebInterest, ebTax, ebDa])

  // --- Tool 35: Depreciation Logic ---
  const [depCost, setDepCost] = useState(100000)
  const [depSalvage, setDepSalvage] = useState(10000)
  const [depLife, setDepLife] = useState(10)
  const depCalculations = useMemo(() => {
    const annual = depLife > 0 ? (depCost - depSalvage) / depLife : 0
    return { annual }
  }, [depCost, depSalvage, depLife])

  // --- Tool 36: Operating Margin Logic ---
  const [omRevenue, setOmRevenue] = useState(1000000)
  const [omOperatingIncome, setOmOperatingIncome] = useState(250000)
  const omCalculations = useMemo(() => {
    const margin = omRevenue > 0 ? (omOperatingIncome / omRevenue) * 100 : 0
    return { margin }
  }, [omRevenue, omOperatingIncome])

  // --- Tool 37: Valuation Logic ---
  const [valEarnings, setValEarnings] = useState(1000000)
  const [valMultiple, setValMultiple] = useState(5)
  const valCalculations = useMemo(() => {
    const valuation = valEarnings * valMultiple
    return { valuation }
  }, [valEarnings, valMultiple])

  // --- Tool 38: Inventory Turnover Logic ---
  const [invCogs, setInvCogs] = useState(500000)
  const [invAvg, setInvAvg] = useState(100000)
  const invCalculations = useMemo(() => {
    const turnover = invAvg > 0 ? invCogs / invAvg : 0
    const days = turnover > 0 ? 365 / turnover : 0
    return { turnover, days }
  }, [invCogs, invAvg])

  // --- Tool 39: WACC Logic ---
  const [waccEquity, setWaccEquity] = useState(600000)
  const [waccDebt, setWaccDebt] = useState(400000)
  const [waccCostEq, setWaccCostEq] = useState(12)
  const [waccCostDebt, setWaccCostDebt] = useState(8)
  const [waccTax, setWaccTax] = useState(30)
  const waccCalculations = useMemo(() => {
    const total = waccEquity + waccDebt
    const weightEq = total > 0 ? waccEquity / total : 0
    const weightDebt = total > 0 ? waccDebt / total : 0
    const wacc = (weightEq * waccCostEq) + (weightDebt * waccCostDebt * (1 - waccTax/100))
    return { wacc }
  }, [waccEquity, waccDebt, waccCostEq, waccCostDebt, waccTax])

  // --- Tool 40: COGS Logic ---
  const [cogsBegin, setCogsBegin] = useState(50000)
  const [cogsPurchases, setCogsPurchases] = useState(200000)
  const [cogsEnd, setCogsEnd] = useState(40000)
  const cogsCalculations = useMemo(() => {
    const cogsValue = cogsBegin + cogsPurchases - cogsEnd
    return { cogs: Math.max(0, cogsValue) }
  }, [cogsBegin, cogsPurchases, cogsEnd])

  // --- Tool 41: Rental Yield Logic ---
  const [ryPropValue, setRyPropValue] = useState(5000000)
  const [ryMonthlyRent, setRyMonthlyRent] = useState(20000)
  const ryCalculations = useMemo(() => {
    const annualRent = ryMonthlyRent * 12
    const yieldPct = ryPropValue > 0 ? (annualRent / ryPropValue) * 100 : 0
    return { yieldPct, annualRent }
  }, [ryPropValue, ryMonthlyRent])

  // --- Tool 42: Mortgage Logic ---
  const [mortHomePrice, setMortHomePrice] = useState(5000000)
  const [mortDownPayment, setMortDownPayment] = useState(1000000)
  const [mortRate, setMortRate] = useState(8.5)
  const [mortYears, setMortYears] = useState(20)
  const mortCalculations = useMemo(() => {
    const principal = Math.max(0, mortHomePrice - mortDownPayment)
    const r = mortRate / 12 / 100
    const n = mortYears * 12
    const emi = r > 0 ? (principal * r * Math.pow(1+r, n)) / (Math.pow(1+r, n) - 1) : principal / n
    const totalPayable = emi * n
    return { emi, principal, interest: totalPayable - principal }
  }, [mortHomePrice, mortDownPayment, mortRate, mortYears])

  // --- Tool 43: Auto Loan Logic ---
  const [autoPrice, setAutoPrice] = useState(1000000)
  const [autoDown, setAutoDown] = useState(200000)
  const [autoTrade, setAutoTrade] = useState(0)
  const [autoRate, setAutoRate] = useState(9)
  const [autoMonths, setAutoMonths] = useState(60)
  const autoCalculations = useMemo(() => {
    const principal = Math.max(0, autoPrice - autoDown - autoTrade)
    const r = autoRate / 12 / 100
    const emi = r > 0 ? (principal * r * Math.pow(1+r, autoMonths)) / (Math.pow(1+r, autoMonths) - 1) : principal / autoMonths
    return { emi, principal, totalInterest: (emi * autoMonths) - principal }
  }, [autoPrice, autoDown, autoTrade, autoRate, autoMonths])

  // --- Tool 44: Affordability Logic ---
  const [affIncome, setAffIncome] = useState(1200000) // annual
  const [affDebts, setAffDebts] = useState(20000) // monthly debts
  const [affDown, setAffDown] = useState(1000000)
  const affCalculations = useMemo(() => {
    // 28/36 rule approximation. Max monthly housing payment = 28% of gross, or 36% minus other debts.
    const monthlyIncome = affIncome / 12
    const maxPayment28 = monthlyIncome * 0.28
    const maxPayment36 = (monthlyIncome * 0.36) - affDebts
    const maxEmi = Math.max(0, Math.min(maxPayment28, maxPayment36))
    // reverse EMI for P (assuming 8.5% over 20 yrs for estimation)
    const r = 8.5 / 12 / 100
    const n = 20 * 12
    const maxLoan = maxEmi > 0 ? (maxEmi * (Math.pow(1+r, n) - 1)) / (r * Math.pow(1+r, n)) : 0
    return { maxHomeReq: maxLoan + affDown, maxEmi }
  }, [affIncome, affDebts, affDown])

  // --- Tool 45: Stamp Duty Logic ---
  const [stampValue, setStampValue] = useState(5000000)
  const [stampRate, setStampRate] = useState(6)
  const [regRate, setRegRate] = useState(1)
  const stampCalculations = useMemo(() => {
    const stampFixed = (stampValue * stampRate) / 100
    const regFixed = (stampValue * regRate) / 100
    return { duty: stampFixed, registration: regFixed, total: stampFixed + regFixed }
  }, [stampValue, stampRate, regRate])

  // --- Tool 46: Calorie Logic ---
  const [calWeight, setCalWeight] = useState(70)
  const [calHeight, setCalHeight] = useState(175)
  const [calAge, setCalAge] = useState(30)
  const [calGender, setCalGender] = useState('male')
  const [calActivity, setCalActivity] = useState(1.55) // moderate
  const calCalculations = useMemo(() => {
    // Mifflin-St Jeor Equation
    let bmr = (10 * calWeight) + (6.25 * calHeight) - (5 * calAge)
    bmr += calGender === 'male' ? 5 : -161
    const tdee = bmr * calActivity
    return { bmr, tdee }
  }, [calWeight, calHeight, calAge, calGender, calActivity])

  // --- Tool 47: Fuel Cost Logic ---
  const [fuelDist, setFuelDist] = useState(100)
  const [fuelMileage, setFuelMileage] = useState(15)
  const [fuelPrice, setFuelPrice] = useState(100)
  const fuelCalculations = useMemo(() => {
    const liters = fuelMileage > 0 ? fuelDist / fuelMileage : 0
    const cost = liters * fuelPrice
    return { liters, cost }
  }, [fuelDist, fuelMileage, fuelPrice])

  // --- Tool 48: Electricity Logic ---
  const [elecUnits, setElecUnits] = useState(250)
  const [elecRate, setElecRate] = useState(8)
  const [elecFixed, setElecFixed] = useState(150)
  const elecCalculations = useMemo(() => {
    const variable = elecUnits * elecRate
    const total = variable + elecFixed
    return { variable, total }
  }, [elecUnits, elecRate, elecFixed])

  // --- Tool 49: GPA Logic ---
  const [gpaP1, setGpaP1] = useState(9) // points (1-10 scale usually)
  const [gpaC1, setGpaC1] = useState(3) // credits
  const [gpaP2, setGpaP2] = useState(8)
  const [gpaC2, setGpaC2] = useState(4)
  const [gpaP3, setGpaP3] = useState(10)
  const [gpaC3, setGpaC3] = useState(3)
  const gpaCalculations = useMemo(() => {
    const totalCredits = gpaC1 + gpaC2 + gpaC3
    const totalPoints = (gpaP1 * gpaC1) + (gpaP2 * gpaC2) + (gpaP3 * gpaC3)
    const gpa = totalCredits > 0 ? totalPoints / totalCredits : 0
    return { gpa, totalCredits }
  }, [gpaP1, gpaC1, gpaP2, gpaC2, gpaP3, gpaC3])

  // --- Tool 50: Salary Logic ---
  const [salHourly, setSalHourly] = useState(500)
  const [salHours, setSalHours] = useState(40)
  const salCalculations = useMemo(() => {
    const weekly = salHourly * salHours
    const annual = weekly * 52
    const monthly = annual / 12
    return { weekly, monthly, annual }
  }, [salHourly, salHours])



  const exportPDF = async () => {
    if (typeof window === 'undefined' || !reportRef.current) return
    setIsExporting(true)
    try {
      // Dynamic imports for library reliability
      const { jsPDF } = await import('jspdf')
      const html2canvas = (await import('html2canvas')).default
      
      const element = reportRef.current
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        backgroundColor: '#ffffff',
        logging: false,
        width: element.scrollWidth,
        height: element.scrollHeight,
        onclone: (clonedDoc) => {
          const clonedElement = clonedDoc.getElementById('report-container');
          if (clonedElement) {
             clonedElement.style.background = 'white';
             clonedElement.style.padding = '40px';
             clonedElement.style.color = 'black';
             // Ensure all text is visible in cloned report
             const allText = clonedElement.querySelectorAll('*');
             allText.forEach((el: any) => {
               if (el.style) el.style.color = 'black';
             });
          }
        }
      })
      const imgData = canvas.toDataURL('image/png')
      const pdf = new jsPDF({
        orientation: 'p',
        unit: 'mm',
        format: 'a4',
      })
      const imgProps = pdf.getImageProperties(imgData)
      const pdfWidth = pdf.internal.pageSize.getWidth()
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width
      
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight)
      pdf.save(`ProfitSetu_${activeTool}_Report.pdf`)
      
      toast({
        title: "PDF Downloaded",
        description: "Your report has been generated successfully.",
      })
    } catch (error) {
      console.error('Export failed:', error)
      alert("Export failed. Please try again. Detailed error: " + (error as Error).message)
    } finally {
      setIsExporting(false)
    }
  }

  const shareToEmail = () => {
    let reportText = "";
    if (activeTool === 'profit') reportText = `✅ Net Profit: ${formatCurrency(profitCalculations.netProfit)}`;
    else if (activeTool === 'compounding') reportText = `💎 Wealth: ${formatCurrency(compoundingCalculations.totalValue)}`;
    else if (activeTool === 'stocks') reportText = `📊 Stock Net: ${formatCurrency(stockCalculations.netProfit)}`;
    else if (activeTool === 'currency') reportText = `💵 Total: ${formatCurrency(currencyCalculations.totalInInr)}`;
    else if (activeTool === 'discount') reportText = `🏷️ Final Price: ${formatCurrency(discountCalculations.finalPrice)} (Saved: ${formatCurrency(discountCalculations.amountOff)})`;
    else if (activeTool === 'emi') reportText = `💳 Monthly EMI: ${formatCurrency(emiCalculations.emi)}`;
    else if (activeTool === 'trade') reportText = `📈 Trade Profit: ${formatCurrency(tradeCalculations.netProfit)}`;
    else if (activeTool === 'gst') reportText = `🧾 GST Result: Final Amount ${formatCurrency(gstCalculations.finalAmount)}`;
    else if (activeTool === 'margin') reportText = `📈 Margin: Target Selling Price ${formatCurrency(marginCalculations.requiredSellPrice)}`;
    else if (activeTool === 'breakeven') reportText = `⚖️ Break-even: Target Revenue ${formatCurrency(breakevenCalculations.breakevenRevenue)}`;
    else if (activeTool === 'percent') reportText = `📊 Percentage: ${formatPercent(percentCalculations.percentage)}`;
    else if (activeTool === 'bmi') reportText = `🩺 BMI: ${formatNumber(bmiCalculations.bmi)} (${bmiCalculations.category})`;
    else if (activeTool === 'age') reportText = `🎂 Age: ${ageCalculations.years} Years`;

    const subject = `Profit Setu Report: ${ALL_TOOLS.find(t => t.id === activeTool)?.label}`;
    const body = `📊 Profit Setu Result Summary:
${reportText}

Check more tools at Profit Setu.`;
    window.open(`mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`);
  }

  const shareToWhatsApp = () => {
    let reportText = "";
    if (activeTool === 'profit') reportText = `✅ Net Profit: ${formatCurrency(profitCalculations.netProfit)}`;
    else if (activeTool === 'compounding') reportText = `💎 Wealth: ${formatCurrency(compoundingCalculations.totalValue)}`;
    else if (activeTool === 'stocks') reportText = `📊 Stock Net: ${formatCurrency(stockCalculations.netProfit)}`;
    else if (activeTool === 'currency') reportText = `💵 Total: ${formatCurrency(currencyCalculations.totalInInr)}`;
    else if (activeTool === 'discount') reportText = `🏷️ Final Price: ${formatCurrency(discountCalculations.finalPrice)} (Saved: ${formatCurrency(discountCalculations.amountOff)})`;
    else if (activeTool === 'emi') reportText = `💳 Monthly EMI: ${formatCurrency(emiCalculations.emi)}`;
    else if (activeTool === 'trade') reportText = `📈 Trade Profit: ${formatCurrency(tradeCalculations.netProfit)}`;
    else if (activeTool === 'gst') reportText = `🧾 GST Result: Final Amount ${formatCurrency(gstCalculations.finalAmount)}`;
    else if (activeTool === 'margin') reportText = `📈 Margin: Target Selling Price ${formatCurrency(marginCalculations.requiredSellPrice)}`;
    else if (activeTool === 'breakeven') reportText = `⚖️ Break-even: Target Revenue ${formatCurrency(breakevenCalculations.breakevenRevenue)}`;
    else if (activeTool === 'percent') reportText = `📊 Percentage: ${formatPercent(percentCalculations.percentage)}`;
    else if (activeTool === 'bmi') reportText = `🩺 BMI: ${formatNumber(bmiCalculations.bmi)} (${bmiCalculations.category})`;
    else if (activeTool === 'age') reportText = `🎂 Age: ${ageCalculations.years} Years`;

    const text = `📊 *Profit Setu Report*
${reportText}
Check it now on Profit Setu!`;
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
  }

  const copyLink = () => {
    const url = `${window.location.origin}/calculators/${activeTool}`
    navigator.clipboard.writeText(url)
    toast({
      title: "Link Copied!",
      description: "Calculator link copied to clipboard.",
    })
  }

  const copyEmbedCode = () => {
    const embedCode = `<iframe src="https://profit-setu-calculator.netlify.app/?tool=${activeTool}" width="100%" height="600" frameborder="0"></iframe>`
    navigator.clipboard.writeText(embedCode)
    setCopied(true)
    toast({
      title: "Code Copied!",
      description: "You can now paste this iframe into your website.",
    })
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <section id="calculator" className="relative py-12 sm:py-24 lg:py-32 bg-transparent overflow-hidden transition-all duration-500">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="mb-12 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-premium border border-accent/20 mb-6 animate-pulse">
                <Sparkles className="w-4 h-4 text-accent" />
                <span className="text-[10px] sm:text-xs font-black text-foreground uppercase tracking-widest">Finance Suite v2.0</span>
            </div>
            <h2 className="text-4xl sm:text-6xl font-black text-foreground mb-10 tracking-tighter text-glow px-2 uppercase">
                Finance <span className="text-accent underline decoration-accent/30 decoration-8">Setu</span>
            </h2>
            
            {activeTool === null ? (
              <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
                <div className="flex flex-wrap justify-center gap-3">
                    {['all', 'finance', 'business', 'real_estate', 'life', 'study', 'utility'].map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setSelectedCategory(cat)}
                            className={`px-6 py-3 rounded-2xl font-black text-xs uppercase tracking-widest transition-all duration-300 border ${
                                selectedCategory === cat 
                                ? 'bg-accent text-accent-foreground border-accent shadow-lg shadow-accent/20 scale-105' 
                                : 'bg-card/40 text-muted-foreground border-border/50 hover:border-accent/40'
                            }`}
                        >
                            {cat === 'all' ? 'All Tools' : cat.replace('_', ' ')}
                        </button>
                    ))}
                </div>

                <div className="flex flex-col sm:flex-row gap-4 max-w-2xl mx-auto">
                    <div className="relative flex-1">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                        <Input 
                            placeholder="Search 50+ smart calculators..." 
                            className="h-16 pl-12 bg-card/60 backdrop-blur-md border-border/50 text-foreground rounded-2xl font-bold shadow-sm focus:ring-2 focus:ring-accent/50 transition-all"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                </div>
                
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 text-left">
                    {filteredTools.map((tool) => (
                        <button
                            key={tool.id}
                            onClick={() => {
                                setActiveTool(tool.id as ToolType);
                                setShowResult(false);
                            }}
                            className="elite-tilt group flex flex-col gap-4 p-5 sm:p-6 rounded-[2.5rem] bg-card/40 hover:bg-card border border-border/20 hover:border-accent/50 transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1 text-left relative overflow-hidden"
                        >
                            <div className="absolute inset-0 shimmer-premium opacity-0 group-hover:opacity-10 transition-opacity" />
                            <div className="absolute -right-4 -top-4 w-24 h-24 bg-accent/5 rounded-full blur-2xl group-hover:bg-accent/20 transition-all duration-500" />
                            <div className="w-12 h-12 rounded-2xl bg-accent/10 border border-accent/20 flex items-center justify-center text-accent group-hover:scale-110 transition-transform duration-300">
                                <tool.icon className="w-6 h-6" />
                            </div>
                            <div>
                                <h3 className="font-black text-sm sm:text-base text-foreground leading-tight mb-1">{tool.label}</h3>
                                <p className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-muted-foreground opacity-70">{tool.category}</p>
                            </div>
                        </button>
                    ))}
                    {filteredTools.length === 0 && (
                        <div className="col-span-full py-12 text-center text-muted-foreground font-bold">
                            No calculators found matching your search.
                        </div>
                    )}
                </div>
              </div>
            ) : (
              <div className="relative flex flex-col items-center gap-4 mb-8 w-full">
                  {/* Navigation Back Button - Move to absolute viewport position */}
                  <button 
                      onClick={() => setActiveTool(null)}
                      className="fixed left-4 top-24 sm:left-8 sm:top-28 group flex items-center gap-2 px-6 py-3 rounded-full bg-secondary/90 hover:bg-accent hover:text-accent-foreground text-foreground font-black text-xs transition-all shadow-2xl z-[100] border border-border/20 backdrop-blur-xl elite-tilt"
                  >
                      <ChevronLeft className="w-5 h-5 transition-transform group-hover:-translate-x-1" />
                      BACK
                  </button>

                  <h3 className="text-2xl sm:text-4xl font-black text-foreground uppercase tracking-tighter mt-4 sm:mt-0">
                      {ALL_TOOLS.find(t => t.id === activeTool)?.label} Result
                  </h3>
              </div>
            )}
        </div>

        {activeTool !== null && (
          <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {['image-converter', 'image-to-pdf', 'html-to-pdf', 'html-to-png', 'pdf-to-image', 'image-compressor', 'image-resizer', 'text-to-pdf', 'word-counter', 'password-generator', 'color-picker', 'basic-calculator', 'case-converter'].includes(activeTool) ? (
              <UtilityConverters activeTool={activeTool} />
            ) : (
            <>
            {/* TOOL SPECIFIC INPUTS */}
            <div className="relative">
              <Card className="relative glass-premium border border-border/30 shadow-2xl overflow-visible p-4 sm:p-10 rounded-[1.5rem] sm:rounded-[2.5rem]">
                <CardContent className="space-y-8 pt-4 relative px-0">
                  
                  {activeTool === 'profit' && (
                    <div className="space-y-8">
                       <Select value={selectedPresetId} onValueChange={(id) => {
                           const preset = BUSINESS_PRESETS.find(p => p.id === id);
                           if(preset) { setSelectedPresetId(id); setRevenue(preset.revenue); setCostOfGoods(preset.costOfGoods); setOperatingExpenses(preset.operatingExpenses); }
                       }}>
                            <SelectTrigger className="w-full h-16 bg-secondary/50 border-2 border-border/20 text-foreground text-lg font-black rounded-xl">
                                <SelectValue placeholder="Industry Benchmark..." />
                            </SelectTrigger>
                            <SelectContent className="rounded-xl border-accent/20 bg-card/95 backdrop-blur-2xl">
                                {BUSINESS_PRESETS.map((p) => (
                                    <SelectItem key={p.id} value={p.id} className="py-4 font-bold">{p.name}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        <div className="grid sm:grid-cols-2 gap-8">
                          <div className="space-y-3">
                              <Label className="font-black text-sm uppercase opacity-70">Monthly Revenue</Label>
                              <Input type="number" value={revenue} onChange={e => setRevenue(Number(e.target.value))} className="h-16 bg-secondary/30 font-black text-xl rounded-xl" />
                          </div>
                          <div className="space-y-3">
                              <Label className="font-black text-sm uppercase opacity-70">Product Cost</Label>
                              <Input type="number" value={costOfGoods} onChange={e => setCostOfGoods(Number(e.target.value))} className="h-16 bg-secondary/30 font-black text-xl rounded-xl" />
                          </div>
                          <div className="sm:col-span-2 space-y-3">
                              <Label className="font-black text-sm uppercase opacity-70">Operations & Marketing</Label>
                              <Input type="number" value={operatingExpenses} onChange={e => setOperatingExpenses(Number(e.target.value))} className="h-16 bg-secondary/30 font-black text-xl rounded-xl" />
                          </div>
                        </div>
                    </div>
                  )}

                  {activeTool === 'trade' && (
                    <div className="grid sm:grid-cols-2 gap-8">
                      <div className="space-y-3 font-black">
                          <Label className="uppercase opacity-70">Buying Price</Label>
                          <Input type="number" value={tBuy} onChange={e => setTBuy(Number(e.target.value))} className="h-16 bg-secondary/30 text-xl font-black rounded-xl" />
                      </div>
                      <div className="space-y-3 font-black">
                          <Label className="uppercase opacity-70">Selling Price</Label>
                          <Input type="number" value={tSell} onChange={e => setTSell(Number(e.target.value))} className="h-16 bg-secondary/30 text-xl font-black rounded-xl" />
                      </div>
                      <div className="sm:col-span-2 space-y-3 font-black">
                          <Label className="uppercase opacity-70">Overhead Expenses</Label>
                          <Input type="number" value={tExpense} onChange={e => setTExpense(Number(e.target.value))} className="h-16 bg-secondary/30 text-xl font-black rounded-xl" />
                      </div>
                    </div>
                  )}

                  {activeTool === 'discount' && (
                    <div className="grid sm:grid-cols-2 gap-8">
                      <div className="space-y-3 font-black">
                          <Label className="uppercase opacity-70">Original Price</Label>
                          <Input type="number" value={origPrice} onChange={e => setOrigPrice(Number(e.target.value))} className="h-16 bg-secondary/30 text-xl font-black rounded-xl" />
                      </div>
                      <div className="space-y-3 font-black">
                          <Label className="uppercase opacity-70">Discount Percentage (%)</Label>
                          <Input type="number" value={discPercent} onChange={e => setDiscPercent(Number(e.target.value))} className="h-16 bg-secondary/30 text-xl font-black rounded-xl" />
                      </div>
                    </div>
                  )}

                  {activeTool === 'emi' && (
                    <div className="grid sm:grid-cols-2 gap-8">
                      <div className="space-y-3 font-black">
                          <Label className="uppercase opacity-70">Loan Amount</Label>
                          <Input type="number" value={loanAmount} onChange={e => setLoanAmount(Number(e.target.value))} className="h-16 bg-secondary/30 text-xl font-black rounded-xl" />
                      </div>
                      <div className="space-y-3 font-black">
                          <Label className="uppercase opacity-70">Interest Rate (% p.a.)</Label>
                          <Input type="number" value={loanRate} onChange={e => setLoanRate(Number(e.target.value))} className="h-16 bg-secondary/30 text-xl font-black rounded-xl" />
                      </div>
                      <div className="sm:col-span-2 space-y-3 font-black">
                          <Label className="uppercase opacity-70">Tenure (Months)</Label>
                          <Input type="number" value={loanTenure} onChange={e => setLoanTenure(Number(e.target.value))} className="h-16 bg-secondary/30 text-xl font-black rounded-xl" />
                      </div>
                    </div>
                  )}

                  {activeTool === 'compounding' && (
                    <div className="grid sm:grid-cols-2 gap-8">
                      <div className="space-y-3 font-black">
                          <Label className="uppercase opacity-70">Starting Capital</Label>
                          <Input type="number" value={principal} onChange={e => setPrincipal(Number(e.target.value))} className="h-16 bg-secondary/30 text-xl font-black rounded-xl" />
                      </div>
                      <div className="space-y-3 font-black">
                          <Label className="uppercase opacity-70">Monthly SIP</Label>
                          <Input type="number" value={monthlyContribution} onChange={e => setMonthlyContribution(Number(e.target.value))} className="h-16 bg-secondary/30 text-xl font-black rounded-xl" />
                      </div>
                      <div className="space-y-3 font-black">
                          <Label className="uppercase opacity-70">Return (%)</Label>
                          <Input type="number" value={rate} onChange={e => setRate(Number(e.target.value))} className="h-16 bg-secondary/30 text-xl font-black rounded-xl" />
                      </div>
                      <div className="space-y-3 font-black">
                          <Label className="uppercase opacity-70">Years</Label>
                          <Input type="number" value={years} onChange={e => setYears(Number(e.target.value))} className="h-16 bg-secondary/30 text-xl font-black rounded-xl" />
                      </div>
                    </div>
                  )}

                  {activeTool === 'stocks' && (
                    <div className="grid sm:grid-cols-2 gap-8">
                      <div className="space-y-3 font-black">
                          <Label className="uppercase opacity-70">Buying Price</Label>
                          <Input type="number" value={buyPrice} onChange={e => setBuyPrice(Number(e.target.value))} className="h-16 bg-secondary/30 text-xl font-black rounded-xl" />
                      </div>
                      <div className="space-y-3 font-black">
                          <Label className="uppercase opacity-70">Selling Price</Label>
                          <Input type="number" value={sellPrice} onChange={e => setSellPrice(Number(e.target.value))} className="h-16 bg-secondary/30 text-xl font-black rounded-xl" />
                      </div>
                      <div className="space-y-3 font-black">
                          <Label className="uppercase opacity-70">Quantity</Label>
                          <Input type="number" value={quantity} onChange={e => setQuantity(Number(e.target.value))} className="h-16 bg-secondary/30 text-xl font-black rounded-xl" />
                      </div>
                      <div className="space-y-3 font-black">
                          <Label className="uppercase opacity-70">Charges</Label>
                          <Input type="number" value={charges} onChange={e => setCharges(Number(e.target.value))} className="h-16 bg-secondary/30 text-xl font-black rounded-xl" />
                      </div>
                    </div>
                  )}

                  {activeTool === 'currency' && (
                    <div className="grid sm:grid-cols-2 gap-8">
                      <div className="space-y-3 font-black">
                          <Label className="uppercase opacity-70">Foreign Amount</Label>
                          <Input type="number" value={amount} onChange={e => setAmount(Number(e.target.value))} className="h-16 bg-secondary/30 text-xl font-black rounded-xl" />
                      </div>
                      <div className="space-y-3 font-black">
                          <Label className="uppercase opacity-70">Currency</Label>
                          <Select value={cur} onValueChange={setCur}>
                              <SelectTrigger className="h-16 bg-secondary/30 font-black text-xl rounded-xl"><SelectValue /></SelectTrigger>
                              <SelectContent className="rounded-xl font-bold"><SelectItem value="USD">USD</SelectItem><SelectItem value="EUR">EUR</SelectItem><SelectItem value="GBP">GBP</SelectItem></SelectContent>
                          </Select>
                      </div>
                      <div className="sm:col-span-2 space-y-3 font-black">
                          <Label className="uppercase opacity-70">Rate (vs INR)</Label>
                          <Input type="number" value={exchangeRate} onChange={e => setExchangeRate(Number(e.target.value))} className="h-16 bg-secondary/30 text-xl font-black rounded-xl" />
                      </div>
                    </div>
                  )}

                  {activeTool === 'gst' && (
                    <div className="grid sm:grid-cols-2 gap-8">
                      <div className="space-y-3 font-black">
                          <Label className="uppercase opacity-70">Base Amount</Label>
                          <Input type="number" value={gstAmount} onChange={e => setGstAmount(Number(e.target.value))} className="h-16 bg-secondary/30 text-xl font-black rounded-xl" />
                      </div>
                      <div className="space-y-3 font-black">
                          <Label className="uppercase opacity-70">GST Component</Label>
                          <Select value={gstType} onValueChange={setGstType}>
                              <SelectTrigger className="h-16 bg-secondary/30 font-black text-xl rounded-xl"><SelectValue /></SelectTrigger>
                              <SelectContent className="rounded-xl font-bold">
                                  <SelectItem value="exclusive">Add GST (Exclusive)</SelectItem>
                                  <SelectItem value="inclusive">Remove GST (Inclusive)</SelectItem>
                              </SelectContent>
                          </Select>
                      </div>
                      <div className="sm:col-span-2 space-y-3 font-black">
                          <Label className="uppercase opacity-70">GST Rate (%)</Label>
                          <Input type="number" value={gstRate} onChange={e => setGstRate(Number(e.target.value))} className="h-16 bg-secondary/30 text-xl font-black rounded-xl" />
                      </div>
                    </div>
                  )}

                  {activeTool === 'margin' && (
                    <div className="grid sm:grid-cols-2 gap-8">
                      <div className="space-y-3 font-black">
                          <Label className="uppercase opacity-70">Cost to Make</Label>
                          <Input type="number" value={mngCost} onChange={e => setMngCost(Number(e.target.value))} className="h-16 bg-secondary/30 text-xl font-black rounded-xl" />
                      </div>
                      <div className="space-y-3 font-black">
                          <Label className="uppercase opacity-70">Target Margin (%)</Label>
                          <Input type="number" value={mngMargin} onChange={e => setMngMargin(Number(e.target.value))} className="h-16 bg-secondary/30 text-xl font-black rounded-xl" />
                      </div>
                    </div>
                  )}

                  {activeTool === 'breakeven' && (
                    <div className="grid sm:grid-cols-2 gap-8">
                      <div className="sm:col-span-2 space-y-3 font-black">
                          <Label className="uppercase opacity-70">Total Fixed Costs</Label>
                          <Input type="number" value={fixedCosts} onChange={e => setFixedCosts(Number(e.target.value))} className="h-16 bg-secondary/30 text-xl font-black rounded-xl" />
                      </div>
                      <div className="space-y-3 font-black">
                          <Label className="uppercase opacity-70">Selling Price Per Unit</Label>
                          <Input type="number" value={pricePerUnit} onChange={e => setPricePerUnit(Number(e.target.value))} className="h-16 bg-secondary/30 text-xl font-black rounded-xl" />
                      </div>
                      <div className="space-y-3 font-black">
                          <Label className="uppercase opacity-70">Variable Cost Per Unit</Label>
                          <Input type="number" value={variableCostPerUnit} onChange={e => setVariableCostPerUnit(Number(e.target.value))} className="h-16 bg-secondary/30 text-xl font-black rounded-xl" />
                      </div>
                    </div>
                  )}

                  {activeTool === 'percent' && (
                    <div className="grid sm:grid-cols-2 gap-8">
                      <div className="space-y-3 font-black">
                          <Label className="uppercase opacity-70">Value</Label>
                          <Input type="number" value={pctPart} onChange={e => setPctPart(Number(e.target.value))} className="h-16 bg-secondary/30 text-xl font-black rounded-xl" />
                      </div>
                      <div className="space-y-3 font-black">
                          <Label className="uppercase opacity-70">Total</Label>
                          <Input type="number" value={pctTotal} onChange={e => setPctTotal(Number(e.target.value))} className="h-16 bg-secondary/30 text-xl font-black rounded-xl" />
                      </div>
                    </div>
                  )}

                  {activeTool === 'bmi' && (
                    <div className="grid sm:grid-cols-2 gap-8">
                      <div className="space-y-3 font-black">
                          <Label className="uppercase opacity-70">Weight (kg)</Label>
                          <Input type="number" value={weight} onChange={e => setWeight(Number(e.target.value))} className="h-16 bg-secondary/30 text-xl font-black rounded-xl" />
                      </div>
                      <div className="space-y-3 font-black">
                          <Label className="uppercase opacity-70">Height (cm)</Label>
                          <Input type="number" value={heightCm} onChange={e => setHeightCm(Number(e.target.value))} className="h-16 bg-secondary/30 text-xl font-black rounded-xl" />
                      </div>
                    </div>
                  )}

                  {activeTool === 'age' && (
                    <div className="grid sm:grid-cols-2 gap-8">
                      <div className="sm:col-span-2 space-y-3 font-black">
                          <Label className="uppercase opacity-70">Birth Date</Label>
                          <Input type="date" value={birthDate} onChange={e => setBirthDate(e.target.value)} className="h-16 bg-secondary/30 text-xl font-black rounded-xl" />
                      </div>
                    </div>
                  )}

                  {/* FINANCE 14-30 */}
                  {activeTool === 'fd' && (
                    <div className="grid sm:grid-cols-2 gap-8">
                      <div className="space-y-3 font-black"><Label className="uppercase opacity-70">Principal</Label><Input type="number" value={fdPrincipal} onChange={e => setFdPrincipal(Number(e.target.value))} className="h-16 bg-secondary/30 text-xl font-black rounded-xl" /></div>
                      <div className="space-y-3 font-black"><Label className="uppercase opacity-70">Rate (%)</Label><Input type="number" value={fdRate} onChange={e => setFdRate(Number(e.target.value))} className="h-16 bg-secondary/30 text-xl font-black rounded-xl" /></div>
                      <div className="sm:col-span-2 space-y-3 font-black"><Label className="uppercase opacity-70">Years</Label><Input type="number" value={fdYears} onChange={e => setFdYears(Number(e.target.value))} className="h-16 bg-secondary/30 text-xl font-black rounded-xl" /></div>
                    </div>
                  )}

                  {activeTool === 'rd' && (
                    <div className="grid sm:grid-cols-2 gap-8">
                      <div className="space-y-3 font-black"><Label className="uppercase opacity-70">Monthly Deposit</Label><Input type="number" value={rdMonthly} onChange={e => setRdMonthly(Number(e.target.value))} className="h-16 bg-secondary/30 text-xl font-black rounded-xl" /></div>
                      <div className="space-y-3 font-black"><Label className="uppercase opacity-70">Rate (%)</Label><Input type="number" value={rdRate} onChange={e => setRdRate(Number(e.target.value))} className="h-16 bg-secondary/30 text-xl font-black rounded-xl" /></div>
                      <div className="sm:col-span-2 space-y-3 font-black"><Label className="uppercase opacity-70">Years</Label><Input type="number" value={rdYears} onChange={e => setRdYears(Number(e.target.value))} className="h-16 bg-secondary/30 text-xl font-black rounded-xl" /></div>
                    </div>
                  )}

                  {activeTool === 'ppf' && (
                    <div className="grid sm:grid-cols-2 gap-8">
                      <div className="space-y-3 font-black"><Label className="uppercase opacity-70">Yearly Investment</Label><Input type="number" value={ppfYearly} onChange={e => setPpfYearly(Number(e.target.value))} className="h-16 bg-secondary/30 text-xl font-black rounded-xl" /></div>
                      <div className="space-y-3 font-black"><Label className="uppercase opacity-70">Years</Label><Input type="number" value={ppfYears} onChange={e => setPpfYears(Number(e.target.value))} className="h-16 bg-secondary/30 text-xl font-black rounded-xl" /></div>
                    </div>
                  )}

                  {activeTool === 'nps' && (
                    <div className="grid sm:grid-cols-2 gap-8">
                      <div className="space-y-3 font-black"><Label className="uppercase opacity-70">Monthly Invest</Label><Input type="number" value={npsMonthly} onChange={e => setNpsMonthly(Number(e.target.value))} className="h-16 bg-secondary/30 text-xl font-black rounded-xl" /></div>
                      <div className="space-y-3 font-black"><Label className="uppercase opacity-70">Years</Label><Input type="number" value={npsYears} onChange={e => setNpsYears(Number(e.target.value))} className="h-16 bg-secondary/30 text-xl font-black rounded-xl" /></div>
                      <div className="sm:col-span-2 space-y-3 font-black"><Label className="uppercase opacity-70">Expected Return (%)</Label><Input type="number" value={npsRate} onChange={e => setNpsRate(Number(e.target.value))} className="h-16 bg-secondary/30 text-xl font-black rounded-xl" /></div>
                    </div>
                  )}

                  {activeTool === 'epf' && (
                    <div className="grid sm:grid-cols-2 gap-8">
                      <div className="space-y-3 font-black"><Label className="uppercase opacity-70">Basic Salary/Mo</Label><Input type="number" value={epfBasic} onChange={e => setEpfBasic(Number(e.target.value))} className="h-16 bg-secondary/30 text-xl font-black rounded-xl" /></div>
                      <div className="space-y-3 font-black"><Label className="uppercase opacity-70">Years to Retire</Label><Input type="number" value={epfYears} onChange={e => setEpfYears(Number(e.target.value))} className="h-16 bg-secondary/30 text-xl font-black rounded-xl" /></div>
                      <div className="sm:col-span-2 space-y-3 font-black"><Label className="uppercase opacity-70">Annual Salary Hike (%)</Label><Input type="number" value={epfIncrease} onChange={e => setEpfIncrease(Number(e.target.value))} className="h-16 bg-secondary/30 text-xl font-black rounded-xl" /></div>
                    </div>
                  )}

                  {activeTool === 'simple_int' && (
                    <div className="grid sm:grid-cols-2 gap-8">
                      <div className="space-y-3 font-black"><Label className="uppercase opacity-70">Principal</Label><Input type="number" value={siPrincipal} onChange={e => setSiPrincipal(Number(e.target.value))} className="h-16 bg-secondary/30 text-xl font-black rounded-xl" /></div>
                      <div className="space-y-3 font-black"><Label className="uppercase opacity-70">Rate (%)</Label><Input type="number" value={siRate} onChange={e => setSiRate(Number(e.target.value))} className="h-16 bg-secondary/30 text-xl font-black rounded-xl" /></div>
                      <div className="sm:col-span-2 space-y-3 font-black"><Label className="uppercase opacity-70">Years</Label><Input type="number" value={siYears} onChange={e => setSiYears(Number(e.target.value))} className="h-16 bg-secondary/30 text-xl font-black rounded-xl" /></div>
                    </div>
                  )}

                  {activeTool === 'compound_int' && (
                    <div className="grid sm:grid-cols-2 gap-8">
                      <div className="space-y-3 font-black"><Label className="uppercase opacity-70">Principal</Label><Input type="number" value={ciPrincipal} onChange={e => setCiPrincipal(Number(e.target.value))} className="h-16 bg-secondary/30 text-xl font-black rounded-xl" /></div>
                      <div className="space-y-3 font-black"><Label className="uppercase opacity-70">Rate (%)</Label><Input type="number" value={ciRate} onChange={e => setCiRate(Number(e.target.value))} className="h-16 bg-secondary/30 text-xl font-black rounded-xl" /></div>
                      <div className="space-y-3 font-black"><Label className="uppercase opacity-70">Years</Label><Input type="number" value={ciYears} onChange={e => setCiYears(Number(e.target.value))} className="h-16 bg-secondary/30 text-xl font-black rounded-xl" /></div>
                      <div className="space-y-3 font-black"><Label className="uppercase opacity-70">Freq/Year</Label><Input type="number" value={ciFreq} onChange={e => setCiFreq(Number(e.target.value))} className="h-16 bg-secondary/30 text-xl font-black rounded-xl" /></div>
                    </div>
                  )}

                  {activeTool === 'cagr' && (
                    <div className="grid sm:grid-cols-2 gap-8">
                      <div className="space-y-3 font-black"><Label className="uppercase opacity-70">Start Value</Label><Input type="number" value={cagrStart} onChange={e => setCagrStart(Number(e.target.value))} className="h-16 bg-secondary/30 text-xl font-black rounded-xl" /></div>
                      <div className="space-y-3 font-black"><Label className="uppercase opacity-70">End Value</Label><Input type="number" value={cagrEnd} onChange={e => setCagrEnd(Number(e.target.value))} className="h-16 bg-secondary/30 text-xl font-black rounded-xl" /></div>
                      <div className="sm:col-span-2 space-y-3 font-black"><Label className="uppercase opacity-70">Years</Label><Input type="number" value={cagrYears} onChange={e => setCagrYears(Number(e.target.value))} className="h-16 bg-secondary/30 text-xl font-black rounded-xl" /></div>
                    </div>
                  )}

                  {activeTool === 'swp' && (
                    <div className="grid sm:grid-cols-2 gap-8">
                      <div className="space-y-3 font-black"><Label className="uppercase opacity-70">Total Corpus</Label><Input type="number" value={swpPrincipal} onChange={e => setSwpPrincipal(Number(e.target.value))} className="h-16 bg-secondary/30 text-xl font-black rounded-xl" /></div>
                      <div className="space-y-3 font-black"><Label className="uppercase opacity-70">Monthly Withdraw</Label><Input type="number" value={swpMonthly} onChange={e => setSwpMonthly(Number(e.target.value))} className="h-16 bg-secondary/30 text-xl font-black rounded-xl" /></div>
                      <div className="space-y-3 font-black"><Label className="uppercase opacity-70">Rate (%)</Label><Input type="number" value={swpRate} onChange={e => setSwpRate(Number(e.target.value))} className="h-16 bg-secondary/30 text-xl font-black rounded-xl" /></div>
                      <div className="space-y-3 font-black"><Label className="uppercase opacity-70">Years</Label><Input type="number" value={swpYears} onChange={e => setSwpYears(Number(e.target.value))} className="h-16 bg-secondary/30 text-xl font-black rounded-xl" /></div>
                    </div>
                  )}

                  {activeTool === 'lumpsum' && (
                    <div className="grid sm:grid-cols-2 gap-8">
                      <div className="space-y-3 font-black"><Label className="uppercase opacity-70">Investment</Label><Input type="number" value={lsPrincipal} onChange={e => setLsPrincipal(Number(e.target.value))} className="h-16 bg-secondary/30 text-xl font-black rounded-xl" /></div>
                      <div className="space-y-3 font-black"><Label className="uppercase opacity-70">Rate (%)</Label><Input type="number" value={lsRate} onChange={e => setLsRate(Number(e.target.value))} className="h-16 bg-secondary/30 text-xl font-black rounded-xl" /></div>
                      <div className="sm:col-span-2 space-y-3 font-black"><Label className="uppercase opacity-70">Years</Label><Input type="number" value={lsYears} onChange={e => setLsYears(Number(e.target.value))} className="h-16 bg-secondary/30 text-xl font-black rounded-xl" /></div>
                    </div>
                  )}

                  {activeTool === 'sip_stepup' && (
                    <div className="grid sm:grid-cols-2 gap-8">
                      <div className="space-y-3 font-black"><Label className="uppercase opacity-70">Start SIP</Label><Input type="number" value={stepSipMonthly} onChange={e => setStepSipMonthly(Number(e.target.value))} className="h-16 bg-secondary/30 text-xl font-black rounded-xl" /></div>
                      <div className="space-y-3 font-black"><Label className="uppercase opacity-70">Step-up/Yr (%)</Label><Input type="number" value={stepSipUp} onChange={e => setStepSipUp(Number(e.target.value))} className="h-16 bg-secondary/30 text-xl font-black rounded-xl" /></div>
                      <div className="space-y-3 font-black"><Label className="uppercase opacity-70">Rate (%)</Label><Input type="number" value={stepSipRate} onChange={e => setStepSipRate(Number(e.target.value))} className="h-16 bg-secondary/30 text-xl font-black rounded-xl" /></div>
                      <div className="space-y-3 font-black"><Label className="uppercase opacity-70">Years</Label><Input type="number" value={stepSipYears} onChange={e => setStepSipYears(Number(e.target.value))} className="h-16 bg-secondary/30 text-xl font-black rounded-xl" /></div>
                    </div>
                  )}

                  {activeTool === 'inflation' && (
                    <div className="grid sm:grid-cols-2 gap-8">
                      <div className="space-y-3 font-black"><Label className="uppercase opacity-70">Current Cost</Label><Input type="number" value={infCost} onChange={e => setInfCost(Number(e.target.value))} className="h-16 bg-secondary/30 text-xl font-black rounded-xl" /></div>
                      <div className="space-y-3 font-black"><Label className="uppercase opacity-70">Inflation Rate (%)</Label><Input type="number" value={infRate} onChange={e => setInfRate(Number(e.target.value))} className="h-16 bg-secondary/30 text-xl font-black rounded-xl" /></div>
                      <div className="sm:col-span-2 space-y-3 font-black"><Label className="uppercase opacity-70">Years from now</Label><Input type="number" value={infYears} onChange={e => setInfYears(Number(e.target.value))} className="h-16 bg-secondary/30 text-xl font-black rounded-xl" /></div>
                    </div>
                  )}

                  {activeTool === 'fire' && (
                    <div className="grid sm:grid-cols-2 gap-8">
                      <div className="space-y-3 font-black"><Label className="uppercase opacity-70">Annual Expense</Label><Input type="number" value={fireExpense} onChange={e => setFireExpense(Number(e.target.value))} className="h-16 bg-secondary/30 text-xl font-black rounded-xl" /></div>
                      <div className="space-y-3 font-black"><Label className="uppercase opacity-70">Withdrawal Rate (%)</Label><Input type="number" value={fireWithdrawalRate} onChange={e => setFireWithdrawalRate(Number(e.target.value))} className="h-16 bg-secondary/30 text-xl font-black rounded-xl" /></div>
                    </div>
                  )}

                  {activeTool === 'post_office' && (
                    <div className="grid sm:grid-cols-2 gap-8">
                      <div className="space-y-3 font-black"><Label className="uppercase opacity-70">Deposit</Label><Input type="number" value={pomisPrincipal} onChange={e => setPomisPrincipal(Number(e.target.value))} className="h-16 bg-secondary/30 text-xl font-black rounded-xl" /></div>
                      <div className="space-y-3 font-black"><Label className="uppercase opacity-70">Rate (%)</Label><Input type="number" value={pomisRate} onChange={e => setPomisRate(Number(e.target.value))} className="h-16 bg-secondary/30 text-xl font-black rounded-xl" /></div>
                      <div className="sm:col-span-2 space-y-3 font-black"><Label className="uppercase opacity-70">Years</Label><Input type="number" value={pomisYears} onChange={e => setPomisYears(Number(e.target.value))} className="h-16 bg-secondary/30 text-xl font-black rounded-xl" /></div>
                    </div>
                  )}

                  {activeTool === 'sukanya' && (
                    <div className="grid sm:grid-cols-2 gap-8">
                      <div className="space-y-3 font-black"><Label className="uppercase opacity-70">Yearly Deposit</Label><Input type="number" value={ssyYearly} onChange={e => setSsyYearly(Number(e.target.value))} className="h-16 bg-secondary/30 text-xl font-black rounded-xl" /></div>
                      <div className="space-y-3 font-black"><Label className="uppercase opacity-70">Rate (%)</Label><Input type="number" value={ssyRate} onChange={e => setSsyRate(Number(e.target.value))} className="h-16 bg-secondary/30 text-xl font-black rounded-xl" /></div>
                    </div>
                  )}

                  {activeTool === 'payday_loan' && (
                    <div className="grid sm:grid-cols-2 gap-8">
                      <div className="space-y-3 font-black"><Label className="uppercase opacity-70">Amount Borrowed</Label><Input type="number" value={paydayAmount} onChange={e => setPaydayAmount(Number(e.target.value))} className="h-16 bg-secondary/30 text-xl font-black rounded-xl" /></div>
                      <div className="space-y-3 font-black"><Label className="uppercase opacity-70">Total Fee</Label><Input type="number" value={paydayFee} onChange={e => setPaydayFee(Number(e.target.value))} className="h-16 bg-secondary/30 text-xl font-black rounded-xl" /></div>
                      <div className="sm:col-span-2 space-y-3 font-black"><Label className="uppercase opacity-70">Days to Repay</Label><Input type="number" value={paydayDays} onChange={e => setPaydayDays(Number(e.target.value))} className="h-16 bg-secondary/30 text-xl font-black rounded-xl" /></div>
                    </div>
                  )}

                  {activeTool === 'credit_card' && (
                    <div className="grid sm:grid-cols-2 gap-8">
                      <div className="space-y-3 font-black"><Label className="uppercase opacity-70">Card Balance</Label><Input type="number" value={ccBalance} onChange={e => setCcBalance(Number(e.target.value))} className="h-16 bg-secondary/30 text-xl font-black rounded-xl" /></div>
                      <div className="space-y-3 font-black"><Label className="uppercase opacity-70">APR (%)</Label><Input type="number" value={ccRate} onChange={e => setCcRate(Number(e.target.value))} className="h-16 bg-secondary/30 text-xl font-black rounded-xl" /></div>
                      <div className="sm:col-span-2 space-y-3 font-black"><Label className="uppercase opacity-70">Fixed Monthly Pay</Label><Input type="number" value={ccPayment} onChange={e => setCcPayment(Number(e.target.value))} className="h-16 bg-secondary/30 text-xl font-black rounded-xl" /></div>
                    </div>
                  )}

                  {/* BUSINESS 31-40 */}
                  {activeTool === 'income_tax' && (
                    <div className="grid sm:grid-cols-2 gap-8">
                      <div className="space-y-3 font-black"><Label className="uppercase opacity-70">Annual Income</Label><Input type="number" value={taxIncome} onChange={e => setTaxIncome(Number(e.target.value))} className="h-16 bg-secondary/30 text-xl font-black rounded-xl" /></div>
                      <div className="space-y-3 font-black"><Label className="uppercase opacity-70">80C/Other Deductions</Label><Input type="number" value={taxDeductions} onChange={e => setTaxDeductions(Number(e.target.value))} className="h-16 bg-secondary/30 text-xl font-black rounded-xl" /></div>
                    </div>
                  )}

                  {activeTool === 'roi' && (
                    <div className="grid sm:grid-cols-2 gap-8">
                      <div className="space-y-3 font-black"><Label className="uppercase opacity-70">Amount Invested</Label><Input type="number" value={roiInvested} onChange={e => setRoiInvested(Number(e.target.value))} className="h-16 bg-secondary/30 text-xl font-black rounded-xl" /></div>
                      <div className="space-y-3 font-black"><Label className="uppercase opacity-70">Amount Returned</Label><Input type="number" value={roiReturned} onChange={e => setRoiReturned(Number(e.target.value))} className="h-16 bg-secondary/30 text-xl font-black rounded-xl" /></div>
                    </div>
                  )}

                  {activeTool === 'markup' && (
                    <div className="grid sm:grid-cols-2 gap-8">
                      <div className="space-y-3 font-black"><Label className="uppercase opacity-70">Cost</Label><Input type="number" value={mkCost} onChange={e => setMkCost(Number(e.target.value))} className="h-16 bg-secondary/30 text-xl font-black rounded-xl" /></div>
                      <div className="space-y-3 font-black"><Label className="uppercase opacity-70">Markup (%)</Label><Input type="number" value={mkPercent} onChange={e => setMkPercent(Number(e.target.value))} className="h-16 bg-secondary/30 text-xl font-black rounded-xl" /></div>
                    </div>
                  )}

                  {activeTool === 'ebitda' && (
                    <div className="grid sm:grid-cols-2 gap-8">
                      <div className="space-y-3 font-black"><Label className="uppercase opacity-70">Net Income</Label><Input type="number" value={ebNet} onChange={e => setEbNet(Number(e.target.value))} className="h-16 bg-secondary/30 text-xl font-black rounded-xl" /></div>
                      <div className="space-y-3 font-black"><Label className="uppercase opacity-70">Interest Exp</Label><Input type="number" value={ebInterest} onChange={e => setEbInterest(Number(e.target.value))} className="h-16 bg-secondary/30 text-xl font-black rounded-xl" /></div>
                      <div className="space-y-3 font-black"><Label className="uppercase opacity-70">Taxes</Label><Input type="number" value={ebTax} onChange={e => setEbTax(Number(e.target.value))} className="h-16 bg-secondary/30 text-xl font-black rounded-xl" /></div>
                      <div className="space-y-3 font-black"><Label className="uppercase opacity-70">D&A</Label><Input type="number" value={ebDa} onChange={e => setEbDa(Number(e.target.value))} className="h-16 bg-secondary/30 text-xl font-black rounded-xl" /></div>
                    </div>
                  )}

                  {activeTool === 'depreciation' && (
                    <div className="grid sm:grid-cols-2 gap-8">
                      <div className="space-y-3 font-black"><Label className="uppercase opacity-70">Asset Cost</Label><Input type="number" value={depCost} onChange={e => setDepCost(Number(e.target.value))} className="h-16 bg-secondary/30 text-xl font-black rounded-xl" /></div>
                      <div className="space-y-3 font-black"><Label className="uppercase opacity-70">Salvage Value</Label><Input type="number" value={depSalvage} onChange={e => setDepSalvage(Number(e.target.value))} className="h-16 bg-secondary/30 text-xl font-black rounded-xl" /></div>
                      <div className="sm:col-span-2 space-y-3 font-black"><Label className="uppercase opacity-70">Useful Life (Years)</Label><Input type="number" value={depLife} onChange={e => setDepLife(Number(e.target.value))} className="h-16 bg-secondary/30 text-xl font-black rounded-xl" /></div>
                    </div>
                  )}

                  {activeTool === 'operating_margin' && (
                    <div className="grid sm:grid-cols-2 gap-8">
                      <div className="space-y-3 font-black"><Label className="uppercase opacity-70">Operating Income</Label><Input type="number" value={omOperatingIncome} onChange={e => setOmOperatingIncome(Number(e.target.value))} className="h-16 bg-secondary/30 text-xl font-black rounded-xl" /></div>
                      <div className="space-y-3 font-black"><Label className="uppercase opacity-70">Total Revenue</Label><Input type="number" value={omRevenue} onChange={e => setOmRevenue(Number(e.target.value))} className="h-16 bg-secondary/30 text-xl font-black rounded-xl" /></div>
                    </div>
                  )}

                  {activeTool === 'valuation' && (
                    <div className="grid sm:grid-cols-2 gap-8">
                      <div className="space-y-3 font-black"><Label className="uppercase opacity-70">Annual Earnings</Label><Input type="number" value={valEarnings} onChange={e => setValEarnings(Number(e.target.value))} className="h-16 bg-secondary/30 text-xl font-black rounded-xl" /></div>
                      <div className="space-y-3 font-black"><Label className="uppercase opacity-70">Industry Multiple</Label><Input type="number" value={valMultiple} onChange={e => setValMultiple(Number(e.target.value))} className="h-16 bg-secondary/30 text-xl font-black rounded-xl" /></div>
                    </div>
                  )}

                  {activeTool === 'inventory' && (
                    <div className="grid sm:grid-cols-2 gap-8">
                      <div className="space-y-3 font-black"><Label className="uppercase opacity-70">COGS</Label><Input type="number" value={invCogs} onChange={e => setInvCogs(Number(e.target.value))} className="h-16 bg-secondary/30 text-xl font-black rounded-xl" /></div>
                      <div className="space-y-3 font-black"><Label className="uppercase opacity-70">Avg Inventory</Label><Input type="number" value={invAvg} onChange={e => setInvAvg(Number(e.target.value))} className="h-16 bg-secondary/30 text-xl font-black rounded-xl" /></div>
                    </div>
                  )}

                  {activeTool === 'wacc' && (
                    <div className="grid sm:grid-cols-2 gap-8">
                      <div className="space-y-3 font-black"><Label className="uppercase opacity-70">Total Equity</Label><Input type="number" value={waccEquity} onChange={e => setWaccEquity(Number(e.target.value))} className="h-16 bg-secondary/30 text-xl font-black rounded-xl" /></div>
                      <div className="space-y-3 font-black"><Label className="uppercase opacity-70">Total Debt</Label><Input type="number" value={waccDebt} onChange={e => setWaccDebt(Number(e.target.value))} className="h-16 bg-secondary/30 text-xl font-black rounded-xl" /></div>
                      <div className="space-y-3 font-black"><Label className="uppercase opacity-70">Cost of Equity (%)</Label><Input type="number" value={waccCostEq} onChange={e => setWaccCostEq(Number(e.target.value))} className="h-16 bg-secondary/30 text-xl font-black rounded-xl" /></div>
                      <div className="space-y-3 font-black"><Label className="uppercase opacity-70">Cost of Debt (%)</Label><Input type="number" value={waccCostDebt} onChange={e => setWaccCostDebt(Number(e.target.value))} className="h-16 bg-secondary/30 text-xl font-black rounded-xl" /></div>
                      <div className="sm:col-span-2 space-y-3 font-black"><Label className="uppercase opacity-70">Corp Tax Rate (%)</Label><Input type="number" value={waccTax} onChange={e => setWaccTax(Number(e.target.value))} className="h-16 bg-secondary/30 text-xl font-black rounded-xl" /></div>
                    </div>
                  )}

                  {activeTool === 'cogs' && (
                    <div className="grid sm:grid-cols-2 gap-8">
                      <div className="space-y-3 font-black"><Label className="uppercase opacity-70">Begin Inventory</Label><Input type="number" value={cogsBegin} onChange={e => setCogsBegin(Number(e.target.value))} className="h-16 bg-secondary/30 text-xl font-black rounded-xl" /></div>
                      <div className="space-y-3 font-black"><Label className="uppercase opacity-70">End Inventory</Label><Input type="number" value={cogsEnd} onChange={e => setCogsEnd(Number(e.target.value))} className="h-16 bg-secondary/30 text-xl font-black rounded-xl" /></div>
                      <div className="sm:col-span-2 space-y-3 font-black"><Label className="uppercase opacity-70">Purchases</Label><Input type="number" value={cogsPurchases} onChange={e => setCogsPurchases(Number(e.target.value))} className="h-16 bg-secondary/30 text-xl font-black rounded-xl" /></div>
                    </div>
                  )}

                  {/* REAL ESTATE & MISC 41-50 */}
                  {activeTool === 'rental_yield' && (
                    <div className="grid sm:grid-cols-2 gap-8">
                      <div className="space-y-3 font-black"><Label className="uppercase opacity-70">Property Value</Label><Input type="number" value={ryPropValue} onChange={e => setRyPropValue(Number(e.target.value))} className="h-16 bg-secondary/30 text-xl font-black rounded-xl" /></div>
                      <div className="space-y-3 font-black"><Label className="uppercase opacity-70">Monthly Rent</Label><Input type="number" value={ryMonthlyRent} onChange={e => setRyMonthlyRent(Number(e.target.value))} className="h-16 bg-secondary/30 text-xl font-black rounded-xl" /></div>
                    </div>
                  )}

                  {activeTool === 'mortgage' && (
                    <div className="grid sm:grid-cols-2 gap-8">
                      <div className="space-y-3 font-black"><Label className="uppercase opacity-70">Home Price</Label><Input type="number" value={mortHomePrice} onChange={e => setMortHomePrice(Number(e.target.value))} className="h-16 bg-secondary/30 text-xl font-black rounded-xl" /></div>
                      <div className="space-y-3 font-black"><Label className="uppercase opacity-70">Down Payment</Label><Input type="number" value={mortDownPayment} onChange={e => setMortDownPayment(Number(e.target.value))} className="h-16 bg-secondary/30 text-xl font-black rounded-xl" /></div>
                      <div className="space-y-3 font-black"><Label className="uppercase opacity-70">Rate (%)</Label><Input type="number" value={mortRate} onChange={e => setMortRate(Number(e.target.value))} className="h-16 bg-secondary/30 text-xl font-black rounded-xl" /></div>
                      <div className="space-y-3 font-black"><Label className="uppercase opacity-70">Years</Label><Input type="number" value={mortYears} onChange={e => setMortYears(Number(e.target.value))} className="h-16 bg-secondary/30 text-xl font-black rounded-xl" /></div>
                    </div>
                  )}

                  {activeTool === 'auto_loan' && (
                    <div className="grid sm:grid-cols-2 gap-8">
                      <div className="space-y-3 font-black"><Label className="uppercase opacity-70">Car Price</Label><Input type="number" value={autoPrice} onChange={e => setAutoPrice(Number(e.target.value))} className="h-16 bg-secondary/30 text-xl font-black rounded-xl" /></div>
                      <div className="space-y-3 font-black"><Label className="uppercase opacity-70">Down / Trade-in</Label><Input type="number" value={autoDown} onChange={e => setAutoDown(Number(e.target.value))} className="h-16 bg-secondary/30 text-xl font-black rounded-xl" /></div>
                      <div className="space-y-3 font-black"><Label className="uppercase opacity-70">Rate (%)</Label><Input type="number" value={autoRate} onChange={e => setAutoRate(Number(e.target.value))} className="h-16 bg-secondary/30 text-xl font-black rounded-xl" /></div>
                      <div className="space-y-3 font-black"><Label className="uppercase opacity-70">Months</Label><Input type="number" value={autoMonths} onChange={e => setAutoMonths(Number(e.target.value))} className="h-16 bg-secondary/30 text-xl font-black rounded-xl" /></div>
                    </div>
                  )}

                  {activeTool === 'affordability' && (
                    <div className="grid sm:grid-cols-2 gap-8">
                      <div className="space-y-3 font-black"><Label className="uppercase opacity-70">Annual Gross Income</Label><Input type="number" value={affIncome} onChange={e => setAffIncome(Number(e.target.value))} className="h-16 bg-secondary/30 text-xl font-black rounded-xl" /></div>
                      <div className="space-y-3 font-black"><Label className="uppercase opacity-70">Total Monthly Debts</Label><Input type="number" value={affDebts} onChange={e => setAffDebts(Number(e.target.value))} className="h-16 bg-secondary/30 text-xl font-black rounded-xl" /></div>
                      <div className="sm:col-span-2 space-y-3 font-black"><Label className="uppercase opacity-70">Down Payment Savings</Label><Input type="number" value={affDown} onChange={e => setAffDown(Number(e.target.value))} className="h-16 bg-secondary/30 text-xl font-black rounded-xl" /></div>
                    </div>
                  )}

                  {activeTool === 'stamp_duty' && (
                    <div className="grid sm:grid-cols-2 gap-8">
                      <div className="space-y-3 font-black"><Label className="uppercase opacity-70">Property Value</Label><Input type="number" value={stampValue} onChange={e => setStampValue(Number(e.target.value))} className="h-16 bg-secondary/30 text-xl font-black rounded-xl" /></div>
                      <div className="space-y-3 font-black"><Label className="uppercase opacity-70">Stamp Rate (%)</Label><Input type="number" value={stampRate} onChange={e => setStampRate(Number(e.target.value))} className="h-16 bg-secondary/30 text-xl font-black rounded-xl" /></div>
                      <div className="sm:col-span-2 space-y-3 font-black"><Label className="uppercase opacity-70">Registration Rate (%)</Label><Input type="number" value={regRate} onChange={e => setRegRate(Number(e.target.value))} className="h-16 bg-secondary/30 text-xl font-black rounded-xl" /></div>
                    </div>
                  )}

                  {activeTool === 'calorie' && (
                    <div className="grid sm:grid-cols-2 gap-8">
                      <div className="space-y-3 font-black"><Label className="uppercase opacity-70">Weight (kg)</Label><Input type="number" value={calWeight} onChange={e => setCalWeight(Number(e.target.value))} className="h-16 bg-secondary/30 text-xl font-black rounded-xl" /></div>
                      <div className="space-y-3 font-black"><Label className="uppercase opacity-70">Height (cm)</Label><Input type="number" value={calHeight} onChange={e => setCalHeight(Number(e.target.value))} className="h-16 bg-secondary/30 text-xl font-black rounded-xl" /></div>
                      <div className="space-y-3 font-black"><Label className="uppercase opacity-70">Age</Label><Input type="number" value={calAge} onChange={e => setCalAge(Number(e.target.value))} className="h-16 bg-secondary/30 text-xl font-black rounded-xl" /></div>
                      <div className="space-y-3 font-black"><Label className="uppercase opacity-70">Gender</Label>
                        <Select value={calGender} onValueChange={setCalGender}>
                           <SelectTrigger className="h-16 bg-secondary/30 font-black text-xl rounded-xl"><SelectValue /></SelectTrigger>
                           <SelectContent className="rounded-xl font-bold"><SelectItem value="male">Male</SelectItem><SelectItem value="female">Female</SelectItem></SelectContent>
                        </Select>
                      </div>
                    </div>
                  )}

                  {activeTool === 'fuel' && (
                    <div className="grid sm:grid-cols-2 gap-8">
                      <div className="space-y-3 font-black"><Label className="uppercase opacity-70">Distance (KM)</Label><Input type="number" value={fuelDist} onChange={e => setFuelDist(Number(e.target.value))} className="h-16 bg-secondary/30 text-xl font-black rounded-xl" /></div>
                      <div className="space-y-3 font-black"><Label className="uppercase opacity-70">Mileage (KM/L)</Label><Input type="number" value={fuelMileage} onChange={e => setFuelMileage(Number(e.target.value))} className="h-16 bg-secondary/30 text-xl font-black rounded-xl" /></div>
                      <div className="sm:col-span-2 space-y-3 font-black"><Label className="uppercase opacity-70">Fuel Price (per L)</Label><Input type="number" value={fuelPrice} onChange={e => setFuelPrice(Number(e.target.value))} className="h-16 bg-secondary/30 text-xl font-black rounded-xl" /></div>
                    </div>
                  )}

                  {activeTool === 'electricity' && (
                    <div className="grid sm:grid-cols-2 gap-8">
                      <div className="space-y-3 font-black"><Label className="uppercase opacity-70">Units Consumed (kWh)</Label><Input type="number" value={elecUnits} onChange={e => setElecUnits(Number(e.target.value))} className="h-16 bg-secondary/30 text-xl font-black rounded-xl" /></div>
                      <div className="space-y-3 font-black"><Label className="uppercase opacity-70">Rate per Unit</Label><Input type="number" value={elecRate} onChange={e => setElecRate(Number(e.target.value))} className="h-16 bg-secondary/30 text-xl font-black rounded-xl" /></div>
                      <div className="sm:col-span-2 space-y-3 font-black"><Label className="uppercase opacity-70">Fixed Charges</Label><Input type="number" value={elecFixed} onChange={e => setElecFixed(Number(e.target.value))} className="h-16 bg-secondary/30 text-xl font-black rounded-xl" /></div>
                    </div>
                  )}

                  {activeTool === 'gpa' && (
                    <div className="grid sm:grid-cols-2 gap-8">
                      <div className="space-y-3 font-black"><Label className="uppercase opacity-70">Subject 1 Grade Pts</Label><Input type="number" value={gpaP1} onChange={e => setGpaP1(Number(e.target.value))} className="h-16 bg-secondary/30 text-xl font-black rounded-xl" /></div>
                      <div className="space-y-3 font-black"><Label className="uppercase opacity-70">Credits</Label><Input type="number" value={gpaC1} onChange={e => setGpaC1(Number(e.target.value))} className="h-16 bg-secondary/30 text-xl font-black rounded-xl" /></div>
                      <div className="space-y-3 font-black"><Label className="uppercase opacity-70">Subject 2 Grade Pts</Label><Input type="number" value={gpaP2} onChange={e => setGpaP2(Number(e.target.value))} className="h-16 bg-secondary/30 text-xl font-black rounded-xl" /></div>
                      <div className="space-y-3 font-black"><Label className="uppercase opacity-70">Credits</Label><Input type="number" value={gpaC2} onChange={e => setGpaC2(Number(e.target.value))} className="h-16 bg-secondary/30 text-xl font-black rounded-xl" /></div>
                    </div>
                  )}

                  {activeTool === 'salary' && (
                    <div className="grid sm:grid-cols-2 gap-8">
                      <div className="space-y-3 font-black"><Label className="uppercase opacity-70">Hourly Rate</Label><Input type="number" value={salHourly} onChange={e => setSalHourly(Number(e.target.value))} className="h-16 bg-secondary/30 text-xl font-black rounded-xl" /></div>
                      <div className="space-y-3 font-black"><Label className="uppercase opacity-70">Hours/Week</Label><Input type="number" value={salHours} onChange={e => setSalHours(Number(e.target.value))} className="h-16 bg-secondary/30 text-xl font-black rounded-xl" /></div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* SHARED RESULTS SECTION */}
            <div className="space-y-12" id="report-container" ref={reportRef}>
              <div className="flex flex-col sm:flex-row items-center gap-6 bg-card/40 p-4 rounded-[2rem] border border-border/20 backdrop-blur-sm">
                  <p className="flex-1 font-black uppercase tracking-widest text-xs opacity-70 text-center sm:text-left">Live Calculation</p>
                  <div className="flex flex-wrap gap-3 w-full sm:w-auto justify-center sm:justify-end">
                      <button onClick={exportPDF} disabled={isExporting} className="h-10 sm:h-14 px-4 sm:px-6 bg-accent text-accent-foreground rounded-2xl font-black shadow-lg flex items-center gap-2 hover:brightness-110 text-sm sm:text-base">
                          {isExporting ? <Loader2 className="w-4 h-4 sm:w-5 sm:h-5 animate-spin" /> : <FileDown className="w-4 h-4 sm:w-5 sm:h-5" />} PDF
                      </button>
                      <button onClick={shareToWhatsApp} className="h-10 sm:h-14 px-4 sm:px-6 bg-[#25D366] text-white rounded-2xl font-black shadow-lg flex items-center gap-2 hover:brightness-110 text-sm sm:text-base">
                          <Share2 className="w-4 h-4 sm:w-5 sm:h-5" /> WA
                      </button>
                      <button onClick={shareToEmail} className="h-10 sm:h-14 px-4 sm:px-6 bg-blue-600 text-white rounded-2xl font-black shadow-lg flex items-center gap-2 hover:brightness-110 text-sm sm:text-base">
                          Email
                      </button>
                      <button onClick={copyLink} className="h-10 sm:h-14 px-4 sm:px-6 bg-zinc-800 text-white rounded-2xl font-black shadow-lg flex items-center gap-2 hover:brightness-110 text-sm sm:text-base">
                          <Copy className="w-4 h-4 sm:w-5 sm:h-5" /> Link
                      </button>
                  </div>
              </div>

              <div className="space-y-12">
                  {/* Main Hero Result */}
                  <Card className="relative overflow-hidden bg-gradient-to-br from-accent to-chart-2 text-white p-10 sm:p-14 rounded-[2.5rem] border-4 border-white/20 shadow-2xl elite-tilt">
                      <div className="absolute inset-0 shimmer-premium opacity-20 pointer-events-none" />
                      <div className="absolute top-0 right-0 w-80 h-80 bg-white/10 rounded-full blur-[100px]" />
                      <div className="absolute -top-4 -right-4"> <Sparkles className="w-12 h-12 text-white/20 animate-pulse" /> </div>
                      <p className="text-sm font-black uppercase tracking-[0.3em] opacity-90 mb-4 flex items-center gap-2">
                        <Sparkles className="w-4 h-4" />
                          {activeTool === 'profit' || activeTool === 'trade' ? 'Net Profit / Loss' 
                           : activeTool === 'emi' || activeTool === 'mortgage' || activeTool === 'auto_loan' ? 'Monthly EMI' 
                           : activeTool === 'discount' ? 'Final Payable' 
                           : ['fd','rd','ppf','nps','epf','simple_int','compound_int','lumpsum','sip_stepup','sukanya'].includes(activeTool as string) ? 'Maturity Amount'
                           : activeTool === 'post_office' ? 'Monthly Payout'
                           : activeTool === 'cagr' ? 'CAGR (%)'
                           : activeTool === 'swp' ? 'Remaining Corpus'
                           : activeTool === 'inflation' ? 'Future Cost'
                           : activeTool === 'fire' ? 'Target FIRE Corpus'
                           : activeTool === 'payday_loan' ? 'Total Payback'
                           : activeTool === 'credit_card' ? 'Months to Pay Off'
                           : activeTool === 'income_tax' ? 'Old vs New Tax'
                           : activeTool === 'roi' ? 'ROI (%)'
                           : activeTool === 'markup' ? 'Selling Price'
                           : activeTool === 'ebitda' ? 'EBITDA'
                           : activeTool === 'depreciation' ? 'Annual Depreciation'
                           : activeTool === 'operating_margin' ? 'Operating Margin (%)'
                           : activeTool === 'valuation' ? 'Business Valuation'
                           : activeTool === 'inventory' ? 'Inventory Turnover Ratio'
                           : activeTool === 'wacc' ? 'WACC (%)'
                           : activeTool === 'cogs' ? 'Cost of Goods Sold'
                           : activeTool === 'rental_yield' ? 'Rental Yield (%)'
                           : activeTool === 'affordability' ? 'Max Home Price'
                           : activeTool === 'stamp_duty' ? 'Total Duty & Reg Fee'
                           : ['calorie','fuel','electricity','gpa','salary','gst','margin','breakeven','percent','bmi','age'].includes(activeTool as string) ? 
                              (activeTool === 'gst' ? 'Final Amount (with GST)'
                             : activeTool === 'margin' ? 'Target Selling Price'
                             : activeTool === 'breakeven' ? 'Break-even Units'
                             : activeTool === 'percent' ? 'Percentage'
                             : activeTool === 'bmi' ? 'Body Mass Index (BMI)'
                             : activeTool === 'age' ? 'Current Age'
                             : activeTool === 'calorie' ? 'Daily Calorie Needs'
                             : activeTool === 'fuel' ? 'Total Fuel Cost'
                             : activeTool === 'electricity' ? 'Total Bill'
                             : activeTool === 'gpa' ? 'Semester GPA'
                             : activeTool === 'salary' ? 'Annual Salary' : '')
                           : 'Calculated Value'}
                      </p>
                      <div className="flex items-center justify-between">
                          <p className="text-4xl sm:text-6xl md:text-8xl font-black font-mono tracking-tighter">
                              {activeTool === 'profit' ? formatCurrency(profitCalculations.netProfit) :
                               activeTool === 'trade' ? formatCurrency(tradeCalculations.netProfit) :
                               activeTool === 'discount' ? formatCurrency(discountCalculations.finalPrice) :
                               activeTool === 'emi' ? formatCurrency(emiCalculations.emi) :
                               activeTool === 'compounding' ? formatCurrency(compoundingCalculations.totalValue) :
                               activeTool === 'stocks' ? formatCurrency(stockCalculations.netProfit) :
                               activeTool === 'currency' ? formatCurrency(currencyCalculations.totalInInr) :
                               activeTool === 'gst' ? formatCurrency(gstCalculations.finalAmount) :
                               activeTool === 'margin' ? formatCurrency(marginCalculations.requiredSellPrice) :
                               activeTool === 'breakeven' ? formatNumber(breakevenCalculations.breakevenUnits, ' Units') :
                               activeTool === 'percent' ? formatPercent(percentCalculations.percentage) :
                               activeTool === 'bmi' ? formatNumber(bmiCalculations.bmi) :
                               activeTool === 'age' ? formatNumber(ageCalculations.years, ' Yrs') :
                               activeTool === 'fd' ? formatCurrency(fdCalculations.amount) :
                               activeTool === 'rd' ? formatCurrency(rdCalculations.amount) :
                               activeTool === 'ppf' ? formatCurrency(ppfCalculations.amount) :
                               activeTool === 'nps' ? formatCurrency(npsCalculations.amount) :
                               activeTool === 'epf' ? formatCurrency(epfCalculations.amount) :
                               activeTool === 'simple_int' ? formatCurrency(siCalculations.amount) :
                               activeTool === 'compound_int' ? formatCurrency(ciCalculations.amount) :
                               activeTool === 'lumpsum' ? formatCurrency(lsCalculations.amount) :
                               activeTool === 'sip_stepup' ? formatCurrency(stepSipCalculations.amount) :
                               activeTool === 'post_office' ? formatCurrency(pomisCalculations.monthly) :
                               activeTool === 'sukanya' ? formatCurrency(ssyCalculations.amount) :
                               activeTool === 'cagr' ? formatPercent(cagrCalculations.cagr) :
                               activeTool === 'swp' ? formatCurrency(swpCalculations.remaining) :
                               activeTool === 'inflation' ? formatCurrency(infCalculations.futureCost) :
                               activeTool === 'fire' ? formatCurrency(fireCalculations.corpus) :
                               activeTool === 'payday_loan' ? formatCurrency(paydayCalculations.totalRepayment) :
                               activeTool === 'credit_card' ? formatNumber(ccCalculations.months, ' Mos') :
                               activeTool === 'income_tax' ? taxCalculations.recommended :
                               activeTool === 'roi' ? formatPercent(roiCalculations.roi) :
                               activeTool === 'markup' ? formatCurrency(mkCalculations.price) :
                               activeTool === 'ebitda' ? formatCurrency(ebitdaCalculations.ebitda) :
                               activeTool === 'depreciation' ? formatCurrency(depCalculations.annual) :
                               activeTool === 'operating_margin' ? formatPercent(omCalculations.margin) :
                               activeTool === 'valuation' ? formatCurrency(valCalculations.valuation) :
                               activeTool === 'inventory' ? formatNumber(invCalculations.turnover) :
                               activeTool === 'wacc' ? formatPercent(waccCalculations.wacc) :
                               activeTool === 'cogs' ? formatCurrency(cogsCalculations.cogs) :
                               activeTool === 'rental_yield' ? formatPercent(ryCalculations.yieldPct) :
                               activeTool === 'mortgage' ? formatCurrency(mortCalculations.emi) :
                               activeTool === 'auto_loan' ? formatCurrency(autoCalculations.emi) :
                               activeTool === 'affordability' ? formatCurrency(affCalculations.maxHomeReq) :
                               activeTool === 'stamp_duty' ? formatCurrency(stampCalculations.total) :
                               activeTool === 'calorie' ? formatNumber(calCalculations.tdee, ' kcal') :
                               activeTool === 'fuel' ? formatCurrency(fuelCalculations.cost) :
                               activeTool === 'electricity' ? formatCurrency(elecCalculations.total) :
                               activeTool === 'gpa' ? formatNumber(gpaCalculations.gpa) :
                               activeTool === 'salary' ? formatCurrency(salCalculations.annual) :
                               formatCurrency(0)}
                          </p>
                          <PieChart className="w-16 h-16 opacity-30 hidden sm:block" />
                      </div>
                  </Card>

                  {/* Sub Stats Cards */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                    <div className="p-10 bg-white/80 rounded-[2.5rem] text-center border border-border/20 shadow-xl">
                      <p className="text-xs font-black uppercase tracking-widest text-muted-foreground mb-2">
                          {['emi','mortgage','auto_loan','fd','rd','ppf','nps','epf','simple_int','compound_int','lumpsum','sip_stepup','sukanya','post_office'].includes(activeTool as string) ? 'Total Interest' 
                           : activeTool === 'discount' ? 'Savings' 
                           : ['gst','income_tax'].includes(activeTool as string) ? 'Tax Amount'
                           : activeTool === 'margin' || activeTool === 'roi' || activeTool === 'cagr' || activeTool === 'markup' ? 'Total Profit'
                           : activeTool === 'breakeven' ? 'Break-even Revenue'
                           : activeTool === 'bmi' ? 'Category'
                           : activeTool === 'swp' ? 'Total Withdrawn'
                           : activeTool === 'inflation' ? 'Value Difference'
                           : activeTool === 'fire' ? 'Annual Withdrawal'
                           : activeTool === 'payday_loan' ? 'APR (%)'
                           : activeTool === 'credit_card' ? 'Total Paid'
                           : activeTool === 'inventory' ? 'Days to Sell'
                           : activeTool === 'rental_yield' ? 'Annual Rent'
                           : activeTool === 'affordability' ? 'Max Monthly EMI'
                           : activeTool === 'calorie' ? 'Base BMR'
                           : activeTool === 'fuel' ? 'Fuel Required'
                           : activeTool === 'electricity' ? 'Variable Charges'
                           : activeTool === 'gpa' ? 'Total Credits'
                           : activeTool === 'salary' ? 'Monthly Salary'
                           : 'Metric 1'}
                      </p>
                      <p className="text-3xl font-black font-mono">
                          {activeTool === 'profit' ? formatPercent(profitCalculations.netMargin) :
                           activeTool === 'trade' ? formatPercent(tradeCalculations.margin) :
                           activeTool === 'discount' ? formatCurrency(discountCalculations.amountOff) :
                           activeTool === 'emi' ? formatCurrency(emiCalculations.totalInterest) :
                           activeTool === 'stocks' ? formatPercent(stockCalculations.returnPercent) :
                           activeTool === 'gst' ? formatCurrency(gstCalculations.taxAmount) :
                           activeTool === 'margin' ? formatCurrency(marginCalculations.grossProfit) :
                           activeTool === 'breakeven' ? formatCurrency(breakevenCalculations.breakevenRevenue) :
                           activeTool === 'bmi' ? bmiCalculations.category :
                           activeTool === 'fd' ? formatCurrency(fdCalculations.interest) :
                           activeTool === 'rd' ? formatCurrency(rdCalculations.interest) :
                           activeTool === 'ppf' ? formatCurrency(ppfCalculations.interest) :
                           activeTool === 'nps' ? formatCurrency(npsCalculations.interest) :
                           activeTool === 'epf' ? formatCurrency(epfCalculations.interest) :
                           activeTool === 'simple_int' ? formatCurrency(siCalculations.interest) :
                           activeTool === 'compound_int' ? formatCurrency(ciCalculations.interest) :
                           activeTool === 'lumpsum' ? formatCurrency(lsCalculations.interest) :
                           activeTool === 'sip_stepup' ? formatCurrency(stepSipCalculations.interest) :
                           activeTool === 'sukanya' ? formatCurrency(ssyCalculations.interest) :
                           activeTool === 'post_office' ? formatCurrency(pomisCalculations.interest) :
                           activeTool === 'cagr' ? formatCurrency(cagrCalculations.profit) :
                           activeTool === 'swp' ? formatCurrency(swpCalculations.totalWithdrawn) :
                           activeTool === 'inflation' ? formatCurrency(infCalculations.difference) :
                           activeTool === 'fire' ? formatCurrency(fireExpense) :
                           activeTool === 'payday_loan' ? formatPercent(paydayCalculations.apr) :
                           activeTool === 'credit_card' ? formatCurrency(ccCalculations.totalPaid) :
                           activeTool === 'income_tax' ? formatCurrency(taxCalculations.newTax) :
                           activeTool === 'roi' ? formatCurrency(roiCalculations.profit) :
                           activeTool === 'markup' ? formatCurrency(mkCalculations.profit) :
                           activeTool === 'inventory' ? formatNumber(invCalculations.days, ' Days') :
                           activeTool === 'rental_yield' ? formatCurrency(ryCalculations.annualRent) :
                           activeTool === 'mortgage' ? formatCurrency(mortCalculations.interest) :
                           activeTool === 'auto_loan' ? formatCurrency(autoCalculations.totalInterest) :
                           activeTool === 'affordability' ? formatCurrency(affCalculations.maxEmi) :
                           activeTool === 'calorie' ? formatNumber(calCalculations.bmr, ' kcal') :
                           activeTool === 'fuel' ? formatNumber(fuelCalculations.liters, ' L') :
                           activeTool === 'electricity' ? formatCurrency(elecCalculations.variable) :
                           activeTool === 'gpa' ? formatNumber(gpaCalculations.totalCredits) :
                           activeTool === 'salary' ? formatCurrency(salCalculations.monthly) :
                           'N/A'}
                      </p>
                    </div>

                    <div className="p-10 bg-white/80 rounded-[2.5rem] text-center border border-border/20 shadow-xl">
                      <p className="text-xs font-black uppercase tracking-widest text-muted-foreground mb-2">
                          {['emi','mortgage','auto_loan','payday_loan'].includes(activeTool as string) ? 'Total Payable' 
                           : activeTool === 'gst' ? 'Original Base Amount'
                           : ['margin','markup'].includes(activeTool as string) ? 'Cost'
                           : activeTool === 'breakeven' ? 'Contribution Margin'
                           : ['fd','rd','ppf','nps','epf','simple_int','compound_int','lumpsum','sip_stepup','sukanya'].includes(activeTool as string) ? 'Total Invested'
                           : activeTool === 'income_tax' ? 'Old Tax'
                           : activeTool === 'credit_card' ? 'Interest Paid'
                           : activeTool === 'affordability' ? 'Down Payment'
                           : activeTool === 'stamp_duty' ? 'Stamp Duty Fee'
                           : activeTool === 'electricity' ? 'Fixed Charges'
                           : activeTool === 'salary' ? 'Weekly Salary'
                           : 'Metric 2'}
                      </p>
                      <p className="text-3xl font-black font-mono">
                          {activeTool === 'emi' ? formatCurrency(emiCalculations.totalPayable) :
                           activeTool === 'mortgage' ? formatCurrency(mortCalculations.principal + mortCalculations.interest) :
                           activeTool === 'auto_loan' ? formatCurrency(autoCalculations.principal + autoCalculations.totalInterest) :
                           activeTool === 'payday_loan' ? formatCurrency(paydayCalculations.totalRepayment) :
                           activeTool === 'gst' ? formatCurrency(gstCalculations.originalAmount) :
                           activeTool === 'margin' ? formatCurrency(mngCost) :
                           activeTool === 'markup' ? formatCurrency(mkCost) :
                           activeTool === 'breakeven' ? formatCurrency(breakevenCalculations.contributionMargin) :
                           activeTool === 'fd' ? formatCurrency(fdPrincipal) :
                           activeTool === 'rd' ? formatCurrency(rdCalculations.invested) :
                           activeTool === 'ppf' ? formatCurrency(ppfCalculations.invested) :
                           activeTool === 'nps' ? formatCurrency(npsCalculations.invested) :
                           activeTool === 'epf' ? formatCurrency(epfCalculations.invested) :
                           activeTool === 'simple_int' ? formatCurrency(siPrincipal) :
                           activeTool === 'compound_int' ? formatCurrency(ciPrincipal) :
                           activeTool === 'lumpsum' ? formatCurrency(lsPrincipal) :
                           activeTool === 'sip_stepup' ? formatCurrency(stepSipCalculations.invested) :
                           activeTool === 'sukanya' ? formatCurrency(ssyCalculations.invested) :
                           activeTool === 'income_tax' ? formatCurrency(taxCalculations.oldTax) :
                           activeTool === 'credit_card' ? formatCurrency(ccCalculations.interest) :
                           activeTool === 'affordability' ? formatCurrency(affDown) :
                           activeTool === 'stamp_duty' ? formatCurrency(stampCalculations.duty) :
                           activeTool === 'electricity' ? formatCurrency(elecFixed) :
                           activeTool === 'salary' ? formatCurrency(salCalculations.weekly) :
                           activeTool === 'profit' ? 'Industry Avg' : 'Target'}
                      </p>
                    </div>
                  </div>

                  {/* Embed Feature */}
                  <div className="relative group">
                    <div className="absolute -inset-1 bg-gradient-to-r from-accent/20 to-chart-2/20 rounded-[2rem] blur opacity-0 group-hover:opacity-100 transition duration-500" />
                    <Card className="relative bg-white/40 backdrop-blur-md border border-white/20 rounded-[2rem] p-6 overflow-hidden">
                      <div className="flex items-center justify-between gap-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
                            <Code className="w-5 h-5 text-accent" />
                          </div>
                          <div>
                            <p className="font-black text-sm uppercase tracking-wider">Embed on Website</p>
                            <p className="text-xs text-muted-foreground font-bold italic">Integrate this tool into your own platform</p>
                          </div>
                        </div>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => setShowEmbed(!showEmbed)}
                          className="rounded-xl font-black text-[10px] uppercase tracking-widest border-accent/20 hover:bg-accent hover:text-white transition-all h-8"
                        >
                          {showEmbed ? 'Close' : 'Get Code'}
                        </Button>
                      </div>

                      {showEmbed && (
                        <div className="mt-6 space-y-4 animate-in fade-in slide-in-from-top-2 duration-300">
                          <div className="relative">
                            <pre className="p-4 bg-black/5 rounded-xl text-[10px] font-mono text-muted-foreground break-all whitespace-pre-wrap border border-black/5 max-h-32 overflow-y-auto">
                              {`<iframe src="https://profit-setu-calculator.netlify.app/?tool=${activeTool}" width="100%" height="600" frameborder="0"></iframe>`}
                            </pre>
                            <Button
                              size="icon"
                              variant="ghost"
                              className="absolute top-2 right-2 hover:bg-accent/10 h-8 w-8"
                              onClick={copyEmbedCode}
                            >
                              {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4 text-accent" />}
                            </Button>
                          </div>
                          <p className="text-[10px] text-center text-muted-foreground font-bold italic opacity-60">
                            ✨ Boost engagement by embedding our calculation engine.
                          </p>
                        </div>
                      )}
                    </Card>
                  </div>

                   {/* Insight */}
                   <Card className="border-4 border-accent/40 bg-card rounded-[2.5rem] p-8 sm:p-14 flex items-center gap-8 shadow-2xl">
                       <div className="w-20 h-20 rounded-3xl bg-accent/20 flex items-center justify-center flex-shrink-0">
                           <Sparkles className="w-10 h-10 text-accent" />
                       </div>
                       <div>
                           <p className="font-black text-2xl mb-2">Expert Insight</p>
                           <p className="text-lg text-muted-foreground font-bold leading-relaxed">
                               {activeTool === 'emi' || activeTool === 'mortgage' || activeTool === 'auto_loan' ? 'Shorten your tenure to save massive interest over time.' : 
                                activeTool === 'discount' ? 'Great deals are only great if the product adds real value.' :
                                activeTool === 'bmi' || activeTool === 'calorie' ? 'A healthy lifestyle is the best wealth you can create.' :
                                activeTool === 'gst' || activeTool === 'income_tax' ? 'Always maintain clear records for tax purposes and leverage deductions.' :
                                activeTool === 'breakeven' ? 'Lower your fixed costs to reach profitability faster.' :
                                ['fd','rd','ppf','nps','epf','simple_int','compound_int','lumpsum','sip_stepup','sukanya','post_office'].includes(activeTool as string) ? 'The magic of compounding happens when you stay invested for the long term.' :
                                activeTool === 'fire' || activeTool === 'swp' ? 'Financial independence is built on consistent withdrawals and stable returns.' :
                                activeTool === 'payday_loan' || activeTool === 'credit_card' ? 'High-interest debt destroys wealth. Pay it off as fast as possible.' :
                                'Leverage numbers to make calculated, emotionally-detached decisions.'}
                           </p>
                       </div>
                   </Card>
               </div>
             </div>
             </>
            )}
          </div>
        )}
      </div>
    </section>
  )
}
