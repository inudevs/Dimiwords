var express = require('express')
var router = express.Router()

var words = require('./words')
var wordbooks = require('./wordbooks')
var rank = require('./rank')

router.use('/words', words)
router.use('/wordbooks', wordbooks)
router.use('/rank', rank)

module.exports = router
