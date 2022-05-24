const { Issuer } = require('openid-client')
const { auth } = require('../config')
const { Strategy } = require('passport-google-oauth20')

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

const strategy = () => {
  return new Strategy(
    {
      clientID: auth.clientId,
      clientSecret: auth.clientSecret,
      callbackURL: auth.redirectUri,
    },
    function (accessToken, refreshToken, profile, cb) {
      profile.accessToken = accessToken
      return cb(null, profile)
    }
  )
}

module.exports = {
  client: client,
  strategy: strategy,
}
