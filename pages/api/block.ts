import type { NextApiRequest, NextApiResponse } from 'next'
import Gun from 'gun'

const gun = Gun()

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { wallet, data } = req.body
  if (!wallet || !data) return res.status(400).json({ error: 'Missing wallet or data' })

  const timestamp = Date.now()
  const block = {
    wallet,
    data,
    timestamp,
    hash: `${wallet}-${timestamp}-${Math.random().toString(36).slice(2)}`
  }

  gun.get('nun-chain').get(block.hash).put(block)
  res.status(200).json({ block })
}
