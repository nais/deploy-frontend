exports.isAlive = () => {
  return (req, res) => {
    return res.status(200).send({ status: 'up' })
  }
}

/*exports.metrics = () => {
  return (req, res) => {
    res.set('Content-Type', prometheus.register.contentType)
    res.end(prometheus.register.metrics())
  }
}*/
