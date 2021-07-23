'use strict'

const { logger } = require('../../src/config')
const express = require('express')
const router = express.Router()
const path = require('path')
const httpLogger = require('morgan')
const morganBody = require('morgan-body')
const apiKeyMock = require('./apiKeyMock')
const userInfoMock = require('./userInfoMock')

const app = express()

async function configure() {
  morganBody(app)

  app.use(
    httpLogger('dev', {
      skip: function (req, res) {
        return res.statusCode < 400
      },
    })
  )

  app.use(express.json())
  app.use(express.urlencoded({ extended: true }))
  app.use('/', router)
  router.get('/me', userInfoMock.getUserInfo())
  router.get('/api/v1/apikey', apiKeyMock.getApiKeys())
  router.get('/downstream/api/v1/dashboard/deployments', apiKeyMock.getDeployments())
  router.get('/downstream/api/v1/apikey/', apiKeyMock.getApiKeys())
  router.post('/downstream/api/v1/apikey/:team', apiKeyMock.rotate())
  router.post('/api/v1/apikey/:team', apiKeyMock.rotate())
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
