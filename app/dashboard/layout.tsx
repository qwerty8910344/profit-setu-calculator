import Link from "next/link"
import type { ReactNode } from "react"

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 text-white p-5">
        <h2 className="text-xl font-bold mb-6">Profit Setu</h2>
        <nav className="space-y-3">
          <Link href="/dashboard/business" className="block hover:text-gray-300">
            Business
          </Link>
          <Link href="/dashboard/gst-tax" className="block hover:text-gray-300">
            GST & Tax
          </Link>
          <Link href="/dashboard/loan" className="block hover:text-gray-300">
            Loan
          </Link>
          <Link href="/dashboard/insurance" className="block hover:text-gray-300">
            Insurance
          </Link>
          <Link href="/dashboard/investment" className="block hover:text-gray-300">
            Investment
          </Link>
          <Link href="/dashboard/sip" className="block hover:text-gray-300">
            SIP
          </Link>
          <Link href="/dashboard/startup" className="block hover:text-gray-300">
            Startup
          </Link>
          <Link href="/dashboard/ecommerce" className="block hover:text-gray-300">
            Ecommerce
          </Link>
          <Link href="/dashboard/salary" className="block hover:text-gray-300">
            Salary
          </Link>
          <Link href="/dashboard/real-estate" className="block hover:text-gray-300">
            Real Estate
          </Link>
          <Link href="/dashboard/finance" className="block hover:text-gray-300">
            Finance
          </Link>
          <Link href="/dashboard/retirement" className="block hover:text-gray-300">
            Retirement
          </Link>
          <Link href="/dashboard/education" className="block hover:text-gray-300">
            Education
          </Link>
          <Link href="/dashboard/finance" className="block hover:text-gray-300">
            Finance
          </Link>
          <Link href="/dashboard/restaurant" className="block hover:text-gray-300">
            Restaurant
          </Link>
          <Link href="/dashboard/transport" className="block hover:text-gray-300">
            Transport
          </Link>
          <Link href="/dashboard/agriculture" className="block hover:text-gray-300">
            Agriculture
          </Link>
          <Link href="/dashboard/discount" className="block hover:text-gray-300">
            Discount
          </Link>
          <Link href="/dashboard/currency" className="block hover:text-gray-300">
            Currency
          </Link>
          <Link href="/dashboard/utility" className="block hover:text-gray-300">
            Utility
          </Link>
        </nav>
      </aside>
      {/* Main */}
      <main className="flex-1 p-10 bg-gray-100">{children}</main>
    </div>
  )
}
