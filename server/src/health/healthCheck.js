exports.isAlive = () => {
  console.log('Calling isalive')
  return (req, res) => {
    return res.status(200).send({ status: 'up' })
    //.json(200)
    //.end()
  }
}

/*exports.metrics = () => {
  return (req, res) => {
    res.set('Content-Type', prometheus.register.contentType)
    res.end(prometheus.register.metrics())
  }
}*/
