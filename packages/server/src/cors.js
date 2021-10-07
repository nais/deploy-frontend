const { host } = require('./config')

const cors = (req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', host.name)
  res.setHeader('Access-Control-Allow-Credentials', 'true')
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS')
  res.setHeader('Content-Security-Policy', "script-src https://cdn.amplitude.com 'self'")
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, Content-Type, X-AUTHENTICATION, X-IP, Content-Type, Accept, Access-Control-Allow-Headers, Authorization, X-Requested-With'
  )
  res.setHeader('Access-Control-Expose-Headers', 'Location')
  return next()
}

module.exports = {
  cors: cors,
}
