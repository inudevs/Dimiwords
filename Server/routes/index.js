var express = require('express');
var router = express.Router();
var Wordbook = require('../models/wordbooks.js');

router.get('/', function (req, res, next) { // list of wordbooks
    Wordbook.find({}, function (error, wordbooks) {
        if (error) { console.error(error); }
        res.send({wordbooks})
    }).sort({_id:-1})
});

module.exports = router;
