'use strict'

const { host } = require('./server/config/config')
const express = require('express')
const favicon = require('serve-favicon')
var path = require('path')
const router = require('./server/routes/routes')
const logger = require('morgan')
//const prometheus = require('prom-client')
const helmet = require('helmet')

//prometheus.collectDefaultMetrics()

const app = express()
app.use(
  logger('dev', {
    skip: function(req, res) {
      return res.statusCode < 400
    }
  })
)
app.use('/', router)

app.use(helmet())
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')))
const cors = function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', host)
  res.setHeader('Access-Control-Allow-Credentials', 'true')
  res.setHeader('Access-Control-Allow-Methods', 'GET')
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, Content-Type, X-AUTHENTICATION, X-IP, Content-Type, Accept, Access-Control-Allow-Headers, Authorization, X-Requested-With'
  )
  return next()
}
app.use(cors)

app.use(express.json())
//app.set('trust proxy', 1)

// ROUTES
app.use('/static', express.static(path.join(__dirname, 'dist')))
//app.use('/', router)

app.get('*', (req, res) => {
  res.sendFile('index.html', { root: './dist' })
})

// ERROR HANDLING
app.use((err, req, res, next) => {
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}
  console.log('Error ' + err)
  res.status(err.status || 500).send(err)
  next()
})

module.exports = app
