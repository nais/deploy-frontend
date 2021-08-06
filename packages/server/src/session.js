const { host } = require('./config')
const session = require('express-session')
const MemoryStore = require('memorystore')(session)
const TWENTY_FOUR_HOURS = 24 * 60 * 60 * 1000

const setup = (app) => {
  app.set('trust proxy', 1)
  app.use(
    session({
      cookie: {
        maxAge: TWENTY_FOUR_HOURS,
        sameSite: 'lax',
      },
      store: new MemoryStore({ checkPeriod: TWENTY_FOUR_HOURS }),
      secret: host.sessionKey,
      name: host.cookieName,
      resave: false,
      saveUninitialized: true,
    })
  )
}

exports.setup = setup
