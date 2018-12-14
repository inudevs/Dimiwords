var express = require('express');
var router = express.Router();
var Word = require('../models/words.js')

router.get('/', function (req, res, next) { // list of all words
    Word.find({}, function (error, words) {
        if (error) { console.error(error); }
        res.send({words})
    }).sort({_id:-1})
});

module.exports = router;
