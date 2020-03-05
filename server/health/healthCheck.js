exports.isAlive = () => {
  return (req, res) => {
    res
      .status(200)
      .send('UP')
      .end()
  }
}

/*exports.metrics = () => {
  return (req, res) => {
    res.set('Content-Type', prometheus.register.contentType)
    res.end(prometheus.register.metrics())
  }
}*/
