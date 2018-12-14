var express = require('express');
var router = express.Router();
var Word = require('../models/words.js')

router.get('/:id', function (req, res, next) { // list of words in word pack
    var id = req.params.id;
    Word.findById(id, function (error, wordbook) {
        if (error) { console.error(error); }
        res.send({wordbook})
    }).sort({_id:-1})
});

module.exports = router;
