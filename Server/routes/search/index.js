var express = require('express')
var router = express.Router()

var words = require('./word')

router.use('/words', words)

module.exports = router
