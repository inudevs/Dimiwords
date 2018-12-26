var express = require('express')
var router = express.Router()

var wordbook = require('./wordbook')

router.use('/wordbook', wordbook)

module.exports = router
