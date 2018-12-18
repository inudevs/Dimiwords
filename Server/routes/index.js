var express = require('express');
var router = express.Router();
var Wordbook = require('../models/wordbooks.js');

router.get('/', function (req, res, next) { // list of wordbooks
    Wordbook.find({}).lean().exec(function (error, wordbooks) {
        if (error) { console.error(error); }
        wordbooks.forEach(function (wordbook, idx) {
            wordbooks[idx].len = wordbook.words.length;
            wordbooks[idx].words = wordbook.words.slice(0, 5);
        });
        res.send({wordbooks})
    })
});

module.exports = router;
