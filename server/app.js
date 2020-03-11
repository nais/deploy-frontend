'use strict'

const { client, strategy } = require('./src/auth/azure')
const { logger, server } = require('./src/config')
const express = require('express')
const favicon = require('serve-favicon')
const path = require('path')
const cors = require('./src/cors')
const { setup } = require('./src/routes/routes')
const httpLogger = require('morgan')
const morganBody = require('morgan-body')
const passport = require('passport')
const session = require('./src/session')
//const session = require('cookie-session')
//const azureAuthClient = require('ath')
//const prometheus = require('prom-client')
const helmet = require('helmet')

//prometheus.collectDefaultMetrics()

const app = express()

async function configureAzure() {
  const azureAuthClient = await client()
  const azureOidcStrategy = strategy(azureAuthClient)
  return azureOidcStrategy
}

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
//app.use(cors)

//app.use(cookieParser(sessionSecret))
//app.use(bodyParser.urlencoded({ extended: true }))
app.set('trust proxy', 1)

/*app.use(
  session({
    name: server.cookieName,
    maxAge: 24 * 60 * 60 * 1000, // 24 hours
    domain: '',
    sameSite: 'lax'
  })
)*/

app.use(passport.initialize())
app.use(passport.session())
const azureAuthClient = configureAzure()
passport.use('azureOidc', azureAuthClient)
passport.serializeUser((user, done) => done(null, user))
passport.deserializeUser((user, done) => done(null, user))

app.use('/', setup(azureAuthClient))

app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')))

// ROUTES
//app.use('/static', express.static(path.join(__dirname, '../dist')))
//app.use('/', router)

app.get('*', (req, res) => {
  res.sendFile('index.html', { root: './dist' })
})

// ERROR HANDLING
app.use((err, req, res, next) => {
  console.error('ERRROR', err)
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}
  logger.error('Error ' + err)
  res.status(err.status || 500).send(err)
  next()
})

module.exports = app
