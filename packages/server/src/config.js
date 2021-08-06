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

const parseStringAsBool = (trueOrFalseString) => {
  return typeof trueOrFalseString === 'string' && trueOrFalseString.toLowerCase() === 'true'
}

const host = {
  name: envVar('HOST', false) || 'localhost',
  port: parseInt(envVar('PORT', false), 10) || 8081,
  sessionKey: envVar('COOKIE_KEY'),
  cookieName: 'deploy-frontend',
  authenticationEnabled: parseStringAsBool(envVar('AUTHENTICATION_ENABLED', false)),
}

const azureAd = {
  discoveryUrl: envVar('AZURE_APP_WELL_KNOWN_URL', host.authenticationEnabled),
  clientId: envVar('AZURE_APP_CLIENT_ID', host.authenticationEnabled),
  clientSecret: envVar('AZURE_APP_CLIENT_SECRET', host.authenticationEnabled),
  redirectUri: envVar('AAD_REDIRECT_URL', host.authenticationEnabled),
  logoutRedirectUri: envVar('AAD_LOGOUT_REDIRECT_URL', host.authenticationEnabled),
  tokenEndpointAuthMethod: 'client_secret_post',
  responseTypes: ['code'],
  responseMode: 'query',
}

const proxyConfig = () => {
  return {
    clientId: envVar('DOWNSTREAM_API_CLIENT_ID'),
    path: 'downstream',
    url: envVar('DOWNSTREAM_API_URL'),
  }
}

module.exports = {
  azureAd: azureAd,
  host: host,
  logger: logger,
  proxyConfig: proxyConfig(),
}