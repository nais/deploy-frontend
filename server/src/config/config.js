exports.port = 8080

let loglevel
if (process.env['NODE_ENV'] === 'production') {
  //process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'
  exports.host = process.env['HOST'] || 'localhost'
  loglevel = process.env['LOG_LEVEL'] || 'info'
  //exports.sessionSecret = process.env['SESSION_SECRET'] || 'H3mligereEnnDetteBlirDetIkke!'
  //exports.cookieDomain = ''
} else {
  exports.host = 'localhost'
  loglevel = 'info'
}

exports.logger = require('pino')({ level: loglevel })
