import Link from "next/link"

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white">
      <h1 className="text-6xl font-black mb-4">404</h1>
      <p className="text-xl opacity-70 mb-8">Page not found</p>
      <Link href="/" className="px-6 py-3 bg-white text-black rounded-xl font-bold hover:bg-white/90 transition-colors">
        Go Home
      </Link>
    </div>
  )
}
