"use client"

export default function GlobalError({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <html>
      <body className="min-h-screen flex flex-col items-center justify-center bg-black text-white">
        <h1 className="text-4xl font-black mb-4">Something went wrong</h1>
        <button onClick={reset} className="px-6 py-3 bg-white text-black rounded-xl font-bold">
          Try again
        </button>
      </body>
    </html>
  )
}
