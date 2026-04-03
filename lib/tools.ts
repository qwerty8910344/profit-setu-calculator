import { 
  TrendingUp, IndianRupee, Percent, ArrowUpRight, ArrowDownRight, 
  LineChart, Tag, CreditCard, BarChart3, Globe, Clock, HeartPulse, PieChart,
  Landmark, PiggyBank, Wallet, BadgePercent, Activity,
  BriefcaseBusiness, Building2, Car, Home, Zap, HeartPulse as HeartPulseIcon, 
  GraduationCap, Flame, Banknote, ReceiptCent, Building, Factory, Scale, 
  ArrowRightLeft, Briefcase, Coins, FileImage, FileText, FileCode2,
  Type, Key, Palette, Calculator, Minimize, Maximize
} from "lucide-react"

export type ToolType = 
  'profit' | 'compounding' | 'stocks' | 'currency' | 'discount' | 'emi' | 'trade' | 'gst' | 
  'margin' | 'breakeven' | 'percent' | 'bmi' | 'age' | 'fd' | 'rd' | 'ppf' | 'nps' | 'epf' | 
  'simple_int' | 'compound_int' | 'cagr' | 'swp' | 'lumpsum' | 'sip_stepup' | 'inflation' | 
  'fire' | 'post_office' | 'sukanya' | 'payday_loan' | 'credit_card' | 'income_tax' | 'roi' | 
  'markup' | 'ebitda' | 'depreciation' | 'operating_margin' | 'valuation' | 'inventory' | 
  'wacc' | 'cogs' | 'rental_yield' | 'mortgage' | 'auto_loan' | 'affordability' | 'stamp_duty' | 
  'calorie' | 'fuel' | 'electricity' | 'gpa' | 'salary';

export const ALL_TOOLS: { id: ToolType; label: string; icon: any; category: string }[] = [
  // Originally Implemented
  { id: 'profit', label: 'Business P/L', icon: BarChart3, category: 'business' },
  { id: 'trade', label: 'Trade P/L', icon: TrendingUp, category: 'business' },
  { id: 'gst', label: 'GST Check', icon: IndianRupee, category: 'finance' },
  { id: 'margin', label: 'Profit Margin', icon: Percent, category: 'business' },
  { id: 'breakeven', label: 'Break-Even', icon: ArrowUpRight, category: 'business' },
  { id: 'discount', label: 'Discount', icon: Tag, category: 'finance' },
  { id: 'emi', label: 'Loan EMI', icon: CreditCard, category: 'finance' },
  { id: 'compounding', label: 'SIP/Wealth', icon: LineChart, category: 'finance' },
  { id: 'stocks', label: 'Stock MultiRef', icon: Briefcase, category: 'finance' },
  { id: 'currency', label: 'Currency exchange', icon: Globe, category: 'finance' },
  { id: 'percent', label: 'Percentage', icon: Percent, category: 'study' },
  { id: 'bmi', label: 'BMI Health', icon: HeartPulse, category: 'life' },
  { id: 'age', label: 'Age Calculator', icon: Clock, category: 'life' },
  // Finance & Banking
  { id: 'fd', label: 'Fixed Deposit', icon: Landmark, category: 'finance' },
  { id: 'rd', label: 'Recurring Dep.', icon: ArrowRightLeft, category: 'finance' },
  { id: 'ppf', label: 'PPF Return', icon: PiggyBank, category: 'finance' },
  { id: 'nps', label: 'NPS Pension', icon: Wallet, category: 'finance' },
  { id: 'epf', label: 'EPF Calcul.', icon: Building, category: 'finance' },
  { id: 'simple_int', label: 'Simple Int.', icon: BadgePercent, category: 'finance' },
  { id: 'compound_int', label: 'Compound Int.', icon: Activity, category: 'finance' },
  { id: 'cagr', label: 'CAGR Growth', icon: TrendingUp, category: 'finance' },
  { id: 'swp', label: 'Mutual Fund SWP', icon: ArrowDownRight, category: 'finance' },
  { id: 'lumpsum', label: 'Lumpsum Inv.', icon: Coins, category: 'finance' },
  { id: 'sip_stepup', label: 'Step-up SIP', icon: LineChart, category: 'finance' },
  { id: 'inflation', label: 'Inflation Impact', icon: Flame, category: 'finance' },
  { id: 'fire', label: 'FIRE Retire.', icon: BriefcaseBusiness, category: 'finance' },
  { id: 'post_office', label: 'Post Office MIS', icon: Landmark, category: 'finance' },
  { id: 'sukanya', label: 'Sukanya Scheme', icon: PiggyBank, category: 'finance' },
  { id: 'payday_loan', label: 'Payday Loan', icon: Banknote, category: 'finance' },
  { id: 'credit_card', label: 'Credit Card', icon: CreditCard, category: 'finance' },
  { id: 'income_tax', label: 'Income Tax', icon: ReceiptCent, category: 'business' },
  // Business & Corporate
  { id: 'roi', label: 'Yield ROI', icon: Percent, category: 'business' },
  { id: 'markup', label: 'Price Markup', icon: Tag, category: 'business' },
  { id: 'ebitda', label: 'EBITDA', icon: Factory, category: 'business' },
  { id: 'depreciation', label: 'Depreciation', icon: ArrowDownRight, category: 'business' },
  { id: 'operating_margin', label: 'Operating Mgn.', icon: PieChart, category: 'business' },
  { id: 'valuation', label: 'Valuation', icon: Building2, category: 'business' },
  { id: 'inventory', label: 'Inventory Turn.', icon: BriefcaseBusiness, category: 'business' },
  { id: 'wacc', label: 'Cost Capital', icon: Scale, category: 'business' },
  { id: 'cogs', label: 'Goods COGS', icon: Banknote, category: 'business' },
  // Real Estate & Auto
  { id: 'rental_yield', label: 'Rental Yield', icon: Home, category: 'real_estate' },
  { id: 'mortgage', label: 'Home Mortg.', icon: Building, category: 'real_estate' },
  { id: 'auto_loan', label: 'Car Loan', icon: Car, category: 'real_estate' },
  { id: 'affordability', label: 'Home Afford.', icon: Home, category: 'real_estate' },
  { id: 'stamp_duty', label: 'Stamp Duty', icon: ReceiptCent, category: 'real_estate' },
  // Life, Math & Utility
  { id: 'calorie', label: 'Daily Calorie', icon: Flame, category: 'life' },
  { id: 'fuel', label: 'Fuel Journey', icon: Zap, category: 'life' },
  { id: 'electricity', label: 'Elec. Bill', icon: Zap, category: 'utility' },
  { id: 'gpa', label: 'GPA Score', icon: GraduationCap, category: 'study' },
  { id: 'salary', label: 'Salary/Hourly', icon: Wallet, category: 'study' },
  { id: 'image-converter' as ToolType, label: 'Image Convert', icon: FileImage, category: 'utility' },
  { id: 'image-to-pdf' as ToolType, label: 'IMG to PDF', icon: FileText, category: 'utility' },
  { id: 'html-to-pdf' as ToolType, label: 'HTML to PDF', icon: FileCode2, category: 'utility' },
  { id: 'html-to-png' as ToolType, label: 'HTML to PNG', icon: FileImage, category: 'utility' },
  { id: 'pdf-to-image' as ToolType, label: 'PDF to IMG', icon: FileImage, category: 'utility' },
  { id: 'image-compressor' as ToolType, label: 'Image Compress', icon: Minimize, category: 'utility' },
  { id: 'image-resizer' as ToolType, label: 'Image Resize', icon: Maximize, category: 'utility' },
  { id: 'text-to-pdf' as ToolType, label: 'Text to PDF', icon: FileText, category: 'utility' },
  { id: 'word-counter' as ToolType, label: 'Word Counter', icon: Type, category: 'utility' },
  { id: 'password-generator' as ToolType, label: 'Password Gen', icon: Key, category: 'utility' },
  { id: 'color-picker' as ToolType, label: 'Color Picker', icon: Palette, category: 'utility' },
  { id: 'basic-calculator' as ToolType, label: 'Calculator', icon: Calculator, category: 'utility' },
  { id: 'case-converter' as ToolType, label: 'Case Convert', icon: Type, category: 'utility' }
];
