const authUtils = require('./auth/auth-utils')
const { proxyConfig, logger } = require('./config')
const proxy = require('express-http-proxy')

const options = (api, authClient) => ({
  parseReqBody: false,
  proxyReqOptDecorator: (options, req) => {
    return new Promise((resolve, reject) =>
      authUtils.getOnBehalfOfAccessToken(authClient, req, api).then(
        access_token => {
          options.headers.Authorization = `Bearer ${access_token}`
          resolve(options)
        },
        error => reject(error)
      )
    )
  },
  proxyReqPathResolver: req => {
    const newPath = req.originalUrl.replace(api.path, '').replace('//', '/')
    logger.debug(`Proxying request from '${req.originalUrl}' to '${newPath}'`)

    return newPath
  }
})

const setup = (router, authClient) => {
  const { path, url } = proxyConfig
  logger.info(`ReverseProxy setup: ${path} => ${url}`)
  const proxyOptions = options(proxyConfig, authClient)

  return router.use(`/${path}/*`, proxy(url, proxyOptions))
}

exports.setup = setup
