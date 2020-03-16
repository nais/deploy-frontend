'use strict'

const { client, strategy } = require('./src/auth/azure')
const { logger } = require('./src/config')
const express = require('express')
const favicon = require('serve-favicon')
const path = require('path')
const { cors } = require('./src/cors')
const { setup } = require('./src/routes')
const httpLogger = require('morgan')
const morganBody = require('morgan-body')
const passport = require('passport')
const session = require('./src/session')
//const prometheus = require('prom-client')
const helmet = require('helmet')

//prometheus.collectDefaultMetrics()

const app = express()

async function configure() {
  if (process.env !== 'production') {
    morganBody(app)
  }

  app.use(
    httpLogger('dev', {
      skip: function(req, res) {
        return res.statusCode < 400
      }
    })
  )
  session.setup(app)

  app.use(express.json())
  app.use(express.urlencoded({ extended: true }))
  app.use(helmet())
  app.use(cors)

  app.set('trust proxy', 1)
  app.use(passport.initialize())
  app.use(passport.session())
  const azureAuthClient = await client()
  const azureOidcStrategy = strategy(azureAuthClient)
  passport.use('azureOidc', azureOidcStrategy)
  passport.serializeUser((user, done) => done(null, user))
  passport.deserializeUser((user, done) => done(null, user))

  app.use('/', setup(azureAuthClient))

  app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')))

  

  // ERROR HANDLING
  app.use((err, req, res, next) => {
    console.error('ERRROR', err)
    res.locals.message = err.message
    res.locals.error = req.app.get('env') === 'development' ? err : {}
    logger.error('Error ' + err)
    res.status(err.status || 500).send(err)
    next()
  })
}

configure()

module.exports = app
