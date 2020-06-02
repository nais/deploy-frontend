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
  clientId: envVar('AZURE_APP_CLIENT_ID'),
  clientSecret: envVar('AZURE_APP_CLIENT_SECRET'),
  redirectUri: envVar('AAD_REDIRECT_URL'),
  logoutRedirectUri: envVar('AAD_LOGOUT_REDIRECT_URL'),
  tokenEndpointAuthMethod: 'client_secret_post',
  responseTypes: ['code'],
  responseMode: 'query'
}

const proxyConfig = () => {
  return {
    clientId: envVar('DOWNSTREAM_API_CLIENT_ID'),
    path: 'downstream',
    url: envVar('DOWNSTREAM_API_URL')
  }
}



module.exports = {
  azureAd: azureAd,
  host: host,
  logger: logger,
  proxyConfig: proxyConfig()
}
