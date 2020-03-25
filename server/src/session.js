const { host } = require('./config')
const session = require('express-session')

const SESSION_MAX_AGE_MILLISECONDS = 24 * 60 * 60 * 1000

const setup = app => {
  app.set('trust proxy', 1)
  app.use(
    session({
      cookie: {
        maxAge: SESSION_MAX_AGE_MILLISECONDS,
        sameSite: 'lax'
      },
      secret: host.sessionKey,
      name: host.cookieName,
      resave: false,
      saveUninitialized: true
    })
  )
}

exports.setup = setup
