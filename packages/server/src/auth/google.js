const { Issuer, Strategy } = require('openid-client')
const { auth } = require('../config')

const metadata = {
  client_id: auth.clientId,
  client_secret: auth.clientSecret,
  redirect_uris: [auth.redirectUri],
  token_endpoint_auth_method: auth.tokenEndpointAuthMethod,
}

const client = async () => {
  const issuer = await Issuer.discover(auth.discoveryUrl)
  const client = new issuer.Client(metadata)
  return client
}

const strategy = (client) => {
  return new Strategy(
    {
      client: client,
      params: {
        clientID: auth.clientId,
        clientSecret: auth.clientSecret,
        callbackURL: auth.redirectUri,
        scope: 'openid profile email',
      },
    },
    function (tokenSet, profile, cb) {
      profile.tokenSet = tokenSet
      return cb(null, profile)
    }
  )
}

module.exports = {
  client: client,
  strategy: strategy,
}
