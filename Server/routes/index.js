var express = require('express');
var router = express.Router();
var Wordbook = require('../models/wordbook.js');

router.get('/', function (req, res, next) { // list of word packs
    Wordbook.find({}, function (error, wordbooks) {
        if (error) { console.error(error); }
        res.send({wordbooks})
    }).sort({_id:-1})
});

module.exports = router;
