const express = require('express')
var router = express.Router()
const health = require('../health/healthCheck')

// APPLICATION HEALTH
router.get('/isalive', health.isAlive())

//router.get('/metrics', health.metrics())

module.exports = router
