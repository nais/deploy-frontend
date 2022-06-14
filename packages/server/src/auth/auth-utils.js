const { TokenSet } = require('openid-client')
const axios = require('axios')

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
          assertion: req.user.tokenSets[tokenSetSelfId].access_token,
        })
        .then((tokenSet) => {
          req.user.tokenSets[api.clientId] = tokenSet
          resolve(tokenSet.access_token)
        })
        .catch((err) => {
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
      clientId: 'https://graph.microsoft.com',
    }
    const query =
      'onPremisesSamAccountName,displayName,givenName,mail,officeLocation,surname,userPrincipalName,id'
    const graphUrl = `https://graph.microsoft.com/v1.0/me?$select=${query}`
    getOnBehalfOfAccessToken(authClient, req, api)
      .then((accessToken) =>
        axios.get(graphUrl, { headers: { Authorization: `Bearer ${accessToken}` } })
      )
      .then((response) => resolve(response.data))
      .catch((err) => {
        if (err.response.data) reject(err.response.data)
        else reject(err)
      })
  })
}

const appendDefaultScope = (scope) => `${scope}/.default`

const formatClientIdScopeForV2Clients = (clientId) => appendDefaultScope(`api://${clientId}`)

const createOnBehalfOfScope = (api) => {
  if (api.scopes && api.scopes.length > 0) {
    return `${api.scopes.join(' ')}`
  } else {
    return `${formatClientIdScopeForV2Clients(api.clientId)}`
  }
}

const getTokenSetsFromSession = (req) => {
  if (req && req.user) {
    return req.user.tokenSets
  }
  return null
}

const getTokenSetFromSession = (req) => {
  if (req && req.user && req.user.tokenSet) {
    return req.user.tokenSet
  }
}

const hasValidAccessToken = (req, key = tokenSetSelfId) => {
  let tokenSet

  const tokenSets = getTokenSetsFromSession(req)
  if (tokenSets) {
    tokenSet = tokenSets[key]
  } else {
    tokenSet = getTokenSetFromSession(req)
  }

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
  tokenSetSelfId: tokenSetSelfId,
}
