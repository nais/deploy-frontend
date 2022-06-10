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
  if (req.isAuthenticated()) {
    if (host.authProviderGoogle) {
      // TODO: check if user is still valid?
      return next()
    } else {
      if (authUtils.hasValidAccessToken(req)) {
        return next()
      }
    }
  } else {
    session.redirectTo = req.url
    res.redirect('/login')
  }
}

const login = () => {
  return passport.authenticate(auth.providerName, {
    failureRedirect: '/login',
    failureMessage: true,
  })
}

exports.setup = (authClient) => {
  // Unprotected
  router.get('/isalive', health.isAlive())
  router.get('/login', login())
  router.use('/oauth2/callback', login(), (req, res) => {
    if (session.redirectTo) {
      res.redirect(session.redirectTo)
    } else {
      res.redirect('/')
    }
  })

  if (host.authenticationEnabled) {
    router.use(ensureAuthenticated)
    router.get('/me', (req, res) => {
      if (host.authProviderGoogle) {
        res.send({
          givenName: req.user.name.givenName,
          surname: req.user.name.familyName,
        })
      } else {
        authUtils
          .getUserInfoFromGraphApi(authClient, req)
          .then((userinfo) => res.send(userinfo))
          .catch((err) => res.status(500).json(err))
      }
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
