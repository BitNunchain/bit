import type { NextApiRequest, NextApiResponse } from 'next'
import Gun from 'gun'

const gun = Gun()

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const wallet = req.headers['x-wallet'] as string
  if (!wallet) return res.status(400).json({ error: 'Missing wallet' })

  gun.get('nun').get(wallet).once(data => {
    const current = data?.balance || 0
    gun.get('nun').get(wallet).put({ balance: current + 1 })
    res.status(200).json({ balance: current + 1 })
  })
}
