// Vercel serverless function adapter for TanStack Start SSR
import server from '../dist/server/server.js'

export default async function handler(req: Request): Promise<Response> {
  return server.fetch(req)
}