const { Issuer, Strategy } = require('openid-client')
const authUtils = require('./auth-utils')
const { auth } = require('../config')

const metadata = {
  client_id: auth.clientId,
  client_secret: auth.clientSecret,
  redirect_uris: [auth.redirectUri],
  token_endpoint_auth_method: auth.tokenEndpointAuthMethod,
}

const client = async () => {
  const issuer = await Issuer.discover(auth.discoveryUrl)
  return new issuer.Client(metadata)
}

const strategy = (client) => {
  const verify = (tokenSet, done) => {
    if (tokenSet.expired()) {
      return done(null, false)
    }
    const user = {
      tokenSets: {
        [authUtils.tokenSetSelfId]: tokenSet,
      },
      claims: tokenSet.claims(),
    }
    return done(null, user)
  }
  const options = {
    client: client,
    params: {
      response_types: auth.responseTypes,
      response_mode: auth.responseMode,
      scope: `openid ${authUtils.appendDefaultScope(auth.clientId)}`,
    },
    passReqToCallback: false,
    usePKCE: 'S256',
  }
  return new Strategy(options, verify)
}

module.exports = {
  client: client,
  strategy: strategy,
}
