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

const authEnabled = parseStringAsBool(envVar('AUTHENTICATION_ENABLED', false))
const authProvider = envVar('AUTHENTICATION_PROVIDER', authEnabled)

const isAuthEnabled = (provider) => {
  return provider === authProvider && authEnabled
}

const host = {
  name: envVar('HOST', false) || 'localhost',
  port: parseInt(envVar('PORT', false), 10) || 8081,
  sessionKey: envVar('COOKIE_KEY'),
  cookieName: 'deploy-frontend',
  authenticationEnabled: authEnabled,
  authProviderAzure: envVar('AUTHENTICATION_PROVIDER', authEnabled) === 'azure',
  authProviderGoogle: envVar('AUTHENTICATION_PROVIDER', authEnabled) === 'google',
}

const azureAd = {
  discoveryUrl: envVar('AZURE_APP_WELL_KNOWN_URL', isAuthEnabled('azure')),
  clientId: envVar('AZURE_APP_CLIENT_ID', isAuthEnabled('azure')),
  clientSecret: envVar('AZURE_APP_CLIENT_SECRET', isAuthEnabled('azure')),
  redirectUri: envVar('AAD_REDIRECT_URL', isAuthEnabled('azure')),
  logoutRedirectUri: envVar('AAD_LOGOUT_REDIRECT_URL', isAuthEnabled('azure')),
  tokenEndpointAuthMethod: 'client_secret_post',
  responseTypes: ['code'],
  responseMode: 'query',
  providerName: 'azureOidc',
}

const google = {
  discoveryUrl: envVar('GOOGLE_WELL_KNOWN_URL', isAuthEnabled('google')),
  clientId: envVar('GOOGLE_CLIENT_ID', isAuthEnabled('google')),
  clientSecret: envVar('GOOGLE_CLIENT_SECRET', isAuthEnabled('google')),
  redirectUri: envVar('GOOGLE_REDIRECT_URL', isAuthEnabled('google')),
  logoutRedirectUri: envVar('GOOGLE_LOGOUT_REDIRECT_URL', isAuthEnabled('google')),
  tokenEndpointAuthMethod: 'client_secret_post',
  responseTypes: ['code'],
  responseMode: 'query',
  providerName: 'googleOidc',
  overrideScopes: ['email', 'profile'],
}

const proxyConfig = {
  clientId: envVar('DOWNSTREAM_API_CLIENT_ID', isAuthEnabled('azure')),
  preSharedKey: envVar('DOWNSTREAM_API_PRE_SHARED_KEY', isAuthEnabled('google')),
  path: 'downstream',
  url: envVar('DOWNSTREAM_API_URL'),
}

module.exports = {
  auth: authProvider === 'google' ? google : azureAd,
  host: host,
  logger: logger,
  proxyConfig: proxyConfig,
}
