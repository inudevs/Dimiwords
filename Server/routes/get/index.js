var express = require('express')
var router = express.Router()

// var word = require('./word');
var wordbook = require('./wordbook')
var user = require('./user')

// router.use('/word', word);
router.use('/wordbook', wordbook)
router.use('/user', user)

module.exports = router
