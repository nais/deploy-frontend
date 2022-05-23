const express = require('express')
const router = express.Router()
const authUtils = require('./auth/auth-utils')
const passport = require('passport')
const health = require('./healthCheck')
const session = require('express-session')
const reverseProxy = require('./reverse-proxy')
const path = require('path')
const { host, auth } = require('./config')

const ensureAuthenticated = async (req, res, next) => {
  if (req.isAuthenticated() && authUtils.hasValidAccessToken(req)) {
    next()
  } else {
    session.redirectTo = req.url
    res.redirect('/login')
  }
}

const doAuth = passport.authenticate(auth.providerName, {
  failureRedirect: '/login',
  failureMessage: true,
})

exports.setup = (authClient) => {
  // Unprotected
  router.get('/isalive', health.isAlive())
  router.get('/login', doAuth)
  router.use('/oauth2/callback', doAuth, (req, res) => {
    if (session.redirectTo) {
      res.redirect(session.redirectTo)
    } else {
      res.redirect('/')
    }
  })

  if (host.authenticationEnabled) {
    router.use(doAuth)
    router.get('/me', (req, res) => {
      authUtils
        .getUserInfoFromGraphApi(authClient, req)
        .then((userinfo) => res.send(userinfo))
        .catch((err) => res.status(500).json(err))
    })

    router.get('/logout', (req, res) => {
      req.logOut()
      res.redirect(
        authClient.endSessionUrl({ post_logout_redirect_uri: config.azureAd.logoutRedirectUri })
      )
    })
  }

  reverseProxy.setup(router, authClient)

  // serve static files
  router.use(express.static(path.join(process.cwd(), 'dist')))
  //app.use('/static', express.static(path.join(__dirname, '../../../dist')))
  router.use('*', (req, res) => {
    res.sendFile('index.html', { root: path.join(process.cwd(), 'dist') })
  })

  return router
}
