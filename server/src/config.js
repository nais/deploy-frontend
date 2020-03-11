require('dotenv').config()
const loglevel = process.env['LOG_LEVEL'] || 'info'
const logger = require('pino')({ level: loglevel })

const envVar = (name, required = true) => {
  if (!process.env[name] && required) {
    logger.error(`Missing required environment variable ${name}`)
    process.exit(1)
  }
  return process.env[name]
}

const host = {
  name: envVar('HOST', false) || 'localhost',
  port: 8080,
  sessionKey: envVar('COOKIE_KEY'),
  cookieName: 'deploy-frontend'
}

const azureAd = {
  discoveryUrl: envVar('AAD_DISCOVERY_URL'),
  clientId: envVar('CLIENT_ID'),
  clientSecret: envVar('CLIENT_SECRET'),
  redirectUri: envVar('AAD_REDIRECT_URL'),
  logoutRedirectUri: envVar('AAD_LOGOUT_REDIRECT_URL'),
  tokenEndpointAuthMethod: 'client_secret_post',
  responseTypes: ['code'],
  responseMode: 'query'
}

const loadReverseProxyConfig = () => {
  console.log(`Loading reverse proxy config from DOWNSTREAM_API_* [CLIENT_ID, PATH, URL]`)
  const scopes = envVar('DOWNSTREAM_API_SCOPES', false)
  console.log('Downstream api url ', envVar('DOWNSTREAM_API_URL'))
  return {
    apis: [
      {
        clientId: envVar('DOWNSTREAM_API_CLIENT_ID'),
        path: envVar('DOWNSTREAM_API_PATH', false) || 'downstream',
        url: envVar('DOWNSTREAM_API_URL'),
        scopes: scopes ? scopes.split(',') : []
      }
    ]
  }
}

const reverseProxyConfig = () => {
  const config = loadReverseProxyConfig()
  config.apis.forEach((entry, index) => {
    if (!entry.path) {
      console.error(`API entry ${index} is missing 'path'`)
      process.exit(1)
    }
    if (!entry.url) {
      console.error(`API entry ${index} is missing 'url'`)
      process.exit(1)
    }
    if (!entry.clientId) {
      console.error(`API entry ${index} is missing 'clientId'`)
      process.exit(1)
    }
  })
  return config
}

console.log('Exporting ', azureAd, host)

module.exports = {
  azureAd: azureAd,
  host: host,
  logger: logger,
  reverseProxy: reverseProxyConfig()
}
