import { createServer } from 'node:http'
import { readFileSync, existsSync } from 'node:fs'
import { join, extname } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = fileURLToPath(new URL('.', import.meta.url))
const distDir = join(__dirname, 'dist')

const { default: server } = await import(join(distDir, 'server', 'server.js'))

const MIME = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'text/javascript',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.woff2': 'font/woff2',
}

const PORT = Number(process.env.PORT) || 3000

createServer(async (req, res) => {
  try {
    const url = new URL(req.url, `http://localhost:${PORT}`)
    const filePath = join(distDir, 'client', url.pathname)

    if (existsSync(filePath) && !url.pathname.startsWith('/_serverFn')) {
      const ext = extname(filePath)
      const content = readFileSync(filePath)
      res.writeHead(200, { 'Content-Type': MIME[ext] || 'application/octet-stream' })
      res.end(content)
      return
    }

    const body = req.method === 'GET' || req.method === 'HEAD'
      ? undefined
      : await new Promise(r => { const c = []; req.on('data', d => c.push(d)); req.on('end', () => r(Buffer.concat(c))) })

    const request = new Request(url.href, { method: req.method, headers: req.headers, body })
    const response = await server.fetch(request)
    const responseBody = await response.text()

    res.writeHead(response.status, Object.fromEntries(response.headers))
    res.end(responseBody)
  } catch (err) {
    console.error('Request error:', err)
    res.writeHead(500, { 'Content-Type': 'text/plain' })
    res.end('Internal Server Error')
  }
}).listen(PORT, () => {
  console.log(`FrancPrep server running on port ${PORT}`)
})