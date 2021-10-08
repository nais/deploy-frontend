const jsonServer = require('json-server')
const server = jsonServer.create()
const router = jsonServer.router('db.json')
const middlewares = jsonServer.defaults()

const data = require('./db.json')

const filterComponent = (path) => {
  return path.split('=')[1].replace('&', '').trim()
}

// Set default middlewares (logger, static, cors and no-cache)
server.use(middlewares)

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
    '/api/v1/dashboard/deployments?': '/deployments',
    '/downstream/api/v1/dashboard/deployments?': '/deployments',
    '/downstream/api/v1/dashboard/deployments?*': '/deployments',
  })
)

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

server.get('/deployments', (req, res) => {
  teams = req.query['team']
  clusters = req.query['cluster']

  if (teams !== undefined) {
    teams = teams.split(',').filter((team) => team !== '')
  } else {
    teams = []
  }
  if (clusters !== undefined) {
    clusters = clusters.split(',').filter((cluster) => cluster !== '')
  } else {
    clusters = []
  }

  console.log(teams, clusters)

  const filtered = data.deployments.deployments
    .filter((d) => teams.length === 0 || teams.indexOf(d.deployment.team) !== -1)
    .filter((d) => clusters.length === 0 || clusters.indexOf(d.deployment.cluster) !== -1)

  res.status(200).send({ deployments: filtered })
})

// Use default router
server.use(router)
server.listen(4000, () => {
  console.log('JSON Server is running')
})
