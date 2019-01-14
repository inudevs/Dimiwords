var express = require('express')
var router = express.Router()

var words = require('./words')

router.use('/words', words)

module.exports = router
