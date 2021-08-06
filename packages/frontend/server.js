const jsonServer = require('json-server')
const server = jsonServer.create()
const router = jsonServer.router('db.json')
const middlewares = jsonServer.defaults()

// Set default middlewares (logger, static, cors and no-cache)
server.use(middlewares)

// Add custom routes before JSON Server router
server.post('/downstream/api/v1/apikey/:team', (req, res) => {
  setTimeout(() => res.status(201).send(), 1000)
  // 'This is a hardcoded error (in apiKeyMock.js). Do not panic. We only use this for testing how error handling works in the frontend. And to make sure we can see this error message.'
  // res.status(500).send()
})

server.post('/api/v1/apikey/:team', (req, res) => {
  setTimeout(() => res.status(201).send(), 1000)
  // 'This is a hardcoded error (in apiKeyMock.js). Do not panic. We only use this for testing how error handling works in the frontend. And to make sure we can see this error message.'
  // res.status(500).send()
})

// To handle POST, PUT and PATCH you need to use a body-parser
// You can use the one used by JSON Server
server.use(jsonServer.bodyParser)
server.use((req, res, next) => {
  if (req.method === 'POST') {
    req.body.createdAt = Date.now()
  }
  // Continue to JSON Server router
  next()
})

server.use(
  jsonServer.rewriter({
    '/api/v1/apikey': '/apikeys',
    '/downstream/api/v1/apikey/': '/apikeys',
    '/api/v1/dashboard/deployments': '/deployments',
    '/api/v1/dashboard/deployments?': '/deployments',
    '/downstream/api/v1/dashboard/deployments': '/deployments',
    '/downstream/api/v1/dashboard/deployments?': '/deployments',
  })
)

// Use default router
server.use(router)
server.listen(4000, () => {
  console.log('JSON Server is running')
})
