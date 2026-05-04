import type { VercelRequest, VercelResponse } from '@vercel/node'
import { Redis } from '@upstash/redis'

const redis = Redis.fromEnv()
const KEY = 'todo:tasks'

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // CORS headers (for local dev)
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  if (req.method === 'OPTIONS') return res.status(200).end()

  if (req.method === 'GET') {
    const tasks = (await redis.get(KEY)) ?? []
    return res.status(200).json(tasks)
  }

  if (req.method === 'POST') {
    await redis.set(KEY, req.body)
    return res.status(200).json({ ok: true })
  }

  return res.status(405).json({ error: 'Method not allowed' })
}
