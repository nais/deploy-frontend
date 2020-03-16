'use strict'

const { logger } = require('../../src/config')
const express = require('express')
const router = express.Router()
const path = require('path')
const httpLogger = require('morgan')
const morganBody = require('morgan-body')
const apiKeyMock = require('./apiKeyMock')

const app = express()

async function configure() {
  morganBody(app)

  app.use(
    httpLogger('dev', {
      skip: function(req, res) {
        return res.statusCode < 400
      }
    })
  )

  app.use(express.json())
  app.use(express.urlencoded({ extended: true }))
  app.use('/', router)
  router.get('/api/apikey', apiKeyMock.getApiKeys())
  router.use(express.static('dist'))
  router.use('*', (req, res) => {
    res.sendFile('index.html', { root: path.join(__dirname, '../../../dist') })
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
}

configure()

module.exports = app
