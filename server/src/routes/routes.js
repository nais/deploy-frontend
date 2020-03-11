const express = require('express')
const router = express.Router()
const authUtils = require('../auth/auth-utils')
const passport = require('passport')
const health = require('../healthCheck')
const session = require('express-session')
const reverseProxy = require('../proxy/reverse-proxy')
const path = require('path')

const ensureAuthenticated = async (req, res, next) => {
  if (req.isAuthenticated() && authUtils.hasValidAccessToken(req)) {
    next()
  } else {
    session.redirectTo = req.url
    res.redirect('/login')
  }
}

exports.setup = authClient => {
  // Unprotected
  router.get('/isalive', health.isAlive())
  router.get('/login', passport.authenticate('azureOidc', { failureRedirect: '/login' }))
  router.use(
    '/callback',
    passport.authenticate('azureOidc', { failureRedirect: '/login' }),
    (req, res) => {
      console.log('in redirect callback')
      if (session.redirectTo) {
        res.redirect(session.redirectTo)
      } else {
        res.redirect('/')
      }
    }
  )

  router.use(ensureAuthenticated)

  // Protected
  router.get('/', (req, res) => {
    res.json(req.user)
  })
  router.get('/me', (req, res) => {
    authUtils
      .getUserInfoFromGraphApi(authClient, req)
      .then(userinfo => res.send(userinfo))
      .catch(err => res.status(500).json(err))
  })

  router.get('/logout', (req, res) => {
    req.logOut()
    res.redirect(
      authClient.endSessionUrl({ post_logout_redirect_uri: config.azureAd.logoutRedirectUri })
    )
  })

  reverseProxy.setup(router, authClient)

  // serve static files
  router.use(express.static(path.join(__dirname, '../dist')))
  //app.use('/static', express.static(path.join(__dirname, '../dist')))
  /*router.use('*', (req, res) => {
    res.sendFile('index.html', { root: path.join(__dirname, '../website/production') })
  })*/

  return router
}
