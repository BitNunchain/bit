import type { NextApiRequest, NextApiResponse } from 'next'
import Gun from 'gun'

const gun = Gun()

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const blocks: any[] = []

  gun.get('nun-chain').map().once(data => {
    if (data) blocks.push(data)
  })

  setTimeout(() => {
    const sorted = blocks.sort((a, b) => a.timestamp - b.timestamp)
    const valid = sorted.every((block, i, arr) => {
      if (i === 0) return true
      return typeof block.hash === 'string' && block.timestamp > arr[i - 1].timestamp
    })

    res.status(200).json({ valid, length: sorted.length })
  }, 500)
}
