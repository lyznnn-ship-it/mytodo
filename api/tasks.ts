import type { VercelRequest, VercelResponse } from '@vercel/node'
import Redis from 'ioredis'

// 连接复用：Vercel 会在热实例中缓存模块
const redis = new Redis(process.env.REDIS_URL!, {
  maxRetriesPerRequest: 3,
  lazyConnect: true,
  tls: process.env.REDIS_URL?.startsWith('rediss://') ? {} : undefined,
})

const KEY = 'todo:tasks'

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  if (req.method === 'OPTIONS') return res.status(200).end()

  try {
    if (req.method === 'GET') {
      const data = await redis.get(KEY)
      return res.status(200).json(data ? JSON.parse(data) : [])
    }

    if (req.method === 'POST') {
      await redis.set(KEY, JSON.stringify(req.body))
      return res.status(200).json({ ok: true })
    }

    return res.status(405).json({ error: 'Method not allowed' })
  } catch (err) {
    console.error('Redis error:', err)
    return res.status(500).json({ error: 'Internal server error' })
  }
}
