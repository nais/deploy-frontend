exports.port = 8080

if (process.env['NODE_ENV'] === 'production') {
  //process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'
  exports.host = process.env['HOST'] || 'localhost'
  //exports.sessionSecret = process.env['SESSION_SECRET'] || 'H3mligereEnnDetteBlirDetIkke!'
  //exports.cookieDomain = ''
} else if (process.env['NODE_ENV'] === 'development') {
  exports.host = 'localhost'
}
