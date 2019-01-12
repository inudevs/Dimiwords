var express = require('express')
var router = express.Router()

var wordbook = require('./wordbook')
var random = require('./random')

router.use('/wordbook', wordbook)
router.use('/random', random)

module.exports = router
