import type { NextApiRequest, NextApiResponse } from 'next'
import Gun from 'gun'

const gun = Gun()

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const chain: any[] = []

  gun.get('nun-chain').map().once(data => {
    if (data) chain.push(data)
  })

  // Wait briefly to collect all blocks
  setTimeout(() => {
    const sorted = chain.sort((a, b) => a.timestamp - b.timestamp)
    res.status(200).json({ chain: sorted })
  }, 500)
}
