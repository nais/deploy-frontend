const { TokenSet } = require('openid-client')
const got = require('got')

const tokenSetSelfId = 'self'

const getOnBehalfOfAccessToken = (authClient, req, api) => {
  return new Promise((resolve, reject) => {
    if (hasValidAccessToken(req, api.clientId)) {
      const tokenSets = getTokenSetsFromSession(req)
      resolve(tokenSets[api.clientId].access_token)
    } else {
      authClient
        .grant({
          grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
          client_assertion_type: 'urn:ietf:params:oauth:client-assertion-type:jwt-bearer',
          requested_token_use: 'on_behalf_of',
          scope: createOnBehalfOfScope(api),
          assertion: req.user.tokenSets[tokenSetSelfId].access_token
        })
        .then(tokenSet => {
          req.user.tokenSets[api.clientId] = tokenSet
          resolve(tokenSet.access_token)
        })
        .catch(err => {
          console.error(err)
          reject(err)
        })
    }
  })
}

const getUserInfoFromGraphApi = (authClient, req) => {
  return new Promise((resolve, reject) => {
    const api = {
      scopes: ['https://graph.microsoft.com/.default'],
      clientId: 'https://graph.microsoft.com'
    }
    const query =
      'onPremisesSamAccountName,displayName,givenName,mail,officeLocation,surname,userPrincipalName,id'
    const graphUrl = `https://graph.microsoft.com/v1.0/me?$select=${query}`
    getOnBehalfOfAccessToken(authClient, req, api)
      .then(accessToken =>
        got(graphUrl, {
          headers: { Authorization: `Bearer ${accessToken}` },
          responseType: 'json',
          resolveBodyOnly: true
        })
      )
      .then(response => resolve(response.body))
      .catch(err => {
        if (err instanceof got.HTTPError) {
          reject({
            error: err,
            response: err.response.body
          })
        }
        reject(err)
      })
  })
}

const appendDefaultScope = scope => `${scope}/.default`

const formatClientIdScopeForV2Clients = clientId => appendDefaultScope(`api://${clientId}`)

const createOnBehalfOfScope = api => {
  return `${formatClientIdScopeForV2Clients(api.clientId)}`
}

const getTokenSetsFromSession = req => {
  if (req && req.user) {
    return req.user.tokenSets
  }
  return null
}

const hasValidAccessToken = (req, key = tokenSetSelfId) => {
  const tokenSets = getTokenSetsFromSession(req)
  if (!tokenSets) {
    return false
  }
  const tokenSet = tokenSets[key]
  if (!tokenSet) {
    return false
  }
  return new TokenSet(tokenSet).expired() === false
}

module.exports = {
  getOnBehalfOfAccessToken: getOnBehalfOfAccessToken,
  getUserInfoFromGraphApi: getUserInfoFromGraphApi,
  appendDefaultScope: appendDefaultScope,
  hasValidAccessToken: hasValidAccessToken,
  tokenSetSelfId: tokenSetSelfId
}
