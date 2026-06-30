// Vercel serverless function adapter for TanStack Start SSR
import createHandler from '../dist/server/server.js'

export default createHandler as (req: Request) => Response | Promise<Response>