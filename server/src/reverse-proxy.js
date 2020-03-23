const authUtils = require('./auth/auth-utils')
const config = require('./config')
const proxy = require('express-http-proxy')
const url = require('url')

const options = (api, authClient) => ({
  parseReqBody: false,
  proxyReqOptDecorator: (options, req) => {
    return new Promise((resolve, reject) =>
      authUtils.getOnBehalfOfAccessToken(authClient, req, api).then(
        access_token => {
          console.log('Got access token', access_token)
          options.headers.Authorization = `Bearer ${access_token}`
          resolve(options)
        },
        error => reject(error)
      )
    )
  },
  proxyReqPathResolver: req => {
    const urlFromApi = url.parse(api.url)
    const pathFromApi = urlFromApi.pathname === '/' ? '' : urlFromApi.pathname

    const urlFromRequest = url.parse(req.originalUrl)
    const pathFromRequest = urlFromRequest.pathname.replace(`/${api.path}/`, '/')

    const queryString = urlFromRequest.query
    const newPath =
      (pathFromApi ? pathFromApi : '') +
      (pathFromRequest ? pathFromRequest : '') +
      (queryString ? '?' + queryString : '')

    console.log(
      `Proxying request from '${req.originalUrl}' to '${stripTrailingSlash(
        urlFromApi.href
      )}${newPath}'`
    )
    return newPath
  }
})

const stripTrailingSlash = str => (str.endsWith('/') ? str.slice(0, -1) : str)

const setup = (router, authClient) => {
  config.reverseProxy.apis.forEach(api => {
    log.info(`ReverseProxy setup: ${api.path} => ${api.url}`, api.path, api.url)
    const proxyOptions = options(api, authClient)
    log.info('Proxy options', proxyOptions)

    return router.use(`/${api.path}/*`, proxy(api.url, proxyOptions))
  })
}

exports.setup = setup
