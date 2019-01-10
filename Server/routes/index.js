var express = require('express')
var router = express.Router()

var auth = require('./auth')
var create = require('./create')
var get = require('./get')
var list = require('./list')
var search = require('./search')

router.use('/auth', auth)
router.use('/create', create)
router.use('/get', get)
router.use('/list', list)
router.use('/search', search)

module.exports = router
