import Head from 'next/head'
import { useEffect, useState } from 'react'

export default function Home() {
  const [wallet, setWallet] = useState<string | null>(null)
  const [balance, setBalance] = useState<number>(0)

  useEffect(() => {
    const stored = localStorage.getItem('nun-wallet')
    if (stored) {
      setWallet(stored)
      fetch(`/api/balance?addr=${stored}`)
        .then(res => res.json())
        .then(data => setBalance(data.balance))
    }
  }, [])

  const handleMine = async () => {
    const res = await fetch('/api/mine', { method: 'POST' })
    const data = await res.json()
    alert(`Block mined! You earned 1 NUN.`)
    setBalance(prev => prev + 1)
  }

  return (
    <>
      <Head>
        <title>UnifiedNUN</title>
        <meta name="description" content="Zero-cost blockchain powered by Proof-of-Visit" />
      </Head>

      <main className="min-h-screen bg-gradient-to-br from-black via-[#0A0F2C] to-gray-900 text-white font-sans">
        <section className="text-center py-20 px-6">
          <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-purple-500">
            UnifiedNUN
          </h1>
          <p className="mt-4 text-xl text-gray-300">
            Mine NUN by simply visiting. No servers. No cost. Just you and the chain.
          </p>
          <button
            onClick={handleMine}
            className="mt-8 px-6 py-3 bg-yellow-500 text-black font-bold rounded-full hover:scale-105 transition"
          >
            Mine 1 NUN
          </button>
        </section>

        <section className="max-w-4xl mx-auto py-12 px-6 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-[#121212] rounded-xl p-6 shadow-lg border border-gray-700">
            <h2 className="text-2xl font-bold mb-2">Your Wallet</h2>
            <p className="text-sm text-gray-400 break-all">{wallet || 'No wallet found'}</p>
          </div>
          <div className="bg-[#121212] rounded-xl p-6 shadow-lg border border-gray-700">
            <h2 className="text-2xl font-bold mb-2">Your Balance</h2>
            <p className="text-3xl text-yellow-400">{balance} NUN</p>
          </div>
        </section>

        <footer className="text-center py-8 text-gray-500 text-sm">
          Built with ❤️ by Simona · Powered by Gun.js · Deployed on Vercel
        </footer>
      </main>
    </>
  )
}
