import type { NextApiRequest, NextApiResponse } from 'next'
import Gun from 'gun'

const gun = Gun()

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const wallet = Math.random().toString(36).substring(2, 15)
  gun.get('nun').get(wallet).put({ balance: 0 })
  res.status(200).json({ wallet })
}
