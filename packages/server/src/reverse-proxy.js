const authUtils = require('./auth/auth-utils')
const { host, proxyConfig, logger } = require('./config')
const proxy = require('express-http-proxy')

const options = (api, authClient) => ({
  parseReqBody: false,
  proxyReqOptDecorator: (options, req) => {
    if (host.authenticationEnabled) {
      if (host.authProviderAzure) {
        return new Promise((resolve, reject) => {
          authUtils.getOnBehalfOfAccessToken(authClient, req, api).then(
            (access_token) => {
              options.headers.Authorization = `Bearer ${access_token}`
              resolve(options)
            },
            (error) => reject(error)
          )
        })
      } else if (host.authProviderGoogle) {
        return new Promise((resolve, reject) => {
          options.headers['X-PSK'] = proxyConfig.preSharedKey
          options.headers['Authorization'] = `Bearer ${req.user.tokenSet.id_token}`
          resolve(options)
        })
      }
    } else {
      return new Promise((resolve, reject) => resolve(options))
    }
  },
  proxyReqPathResolver: (req) => {
    const newPath = req.originalUrl.replace(api.path, '').replace('//', '/')
    logger.debug(`Proxying request from '${req.originalUrl}' to '${newPath}'`)

    return newPath
  },
})

const setup = (router, authClient) => {
  const { path, url } = proxyConfig
  logger.info(`ReverseProxy setup: ${path} => ${url}`)
  const proxyOptions = options(proxyConfig, authClient)

  return router.use(`/${path}/*`, proxy(url, proxyOptions))
}

exports.setup = setup
