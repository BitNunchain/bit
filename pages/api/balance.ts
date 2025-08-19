import type { NextApiRequest, NextApiResponse } from 'next'
import Gun from 'gun'

const gun = Gun()

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { addr } = req.query
  gun.get('nun').get(addr as string).once(data => {
    const balance = data?.balance || 0
    res.status(200).json({ balance })
  })
}
