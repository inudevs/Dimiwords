var express = require('express')
var router = express.Router()

var wordbook = require('./wordbook')
var random = require('./random')
var recent = require('./recent')
var stats = require('./stats')

router.use('/wordbook', wordbook)
router.use('/random', random)
router.use('/recent', recent)
router.use('/stats', stats)

module.exports = router
