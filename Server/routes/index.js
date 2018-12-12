var express = require('express');
var router = express.Router();
var words = require('../words.json');

router.get('/', function (req, res, next) { // list of word packs
    res.send(words)
});

module.exports = router;
