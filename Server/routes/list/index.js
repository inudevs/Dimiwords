var express = require('express');
var router = express.Router();

var words = require('./words');
var wordbooks = require('./wordbooks');

router.use('/words', words);
router.use('/wordbooks', wordbooks);

module.exports = router;
