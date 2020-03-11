const { Issuer, Strategy } = require('openid-client')
const authUtils = require('./auth-utils')
const { azureAd } = require('../config')

const metadata = {
  client_id: azureAd.clientId,
  client_secret: azureAd.clientSecret,
  redirect_uris: [azureAd.redirectUri],
  token_endpoint_auth_method: azureAd.tokenEndpointAuthMethod
}

const client = async () => {
  const issuer = await Issuer.discover(azureAd.discoveryUrl)
  console.log(`Discovered issuer ${issuer.issuer}`)
  return new issuer.Client(metadata)
}

const strategy = client => {
  const verify = (tokenSet, done) => {
    console.log('Calling verify from strategy')
    if (tokenSet.expired()) {
      return done(null, false)
    }
    const user = {
      tokenSets: {
        [authUtils.tokenSetSelfId]: tokenSet
      },
      claims: tokenSet.claims()
    }
    return done(null, user)
  }
  const options = {
    client: client,
    params: {
      response_types: azureAd.responseTypes,
      response_mode: azureAd.responseMode,
      scope: `openid ${authUtils.appendDefaultScope(azureAd.clientId)}`
    },
    passReqToCallback: false,
    usePKCE: 'S256'
  }
  return new Strategy(options, verify)
}

module.exports = {
  client: client,
  strategy: strategy
}
