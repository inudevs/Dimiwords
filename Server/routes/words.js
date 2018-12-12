var express = require('express');
var router = express.Router();
var words = require('../words.json');

router.get('/:id', function (req, res, next) { // list of words in word pack
    var id = parseInt(req.params.id, 10)
    var word = words.filter(function (word) {
        return word.id === id
    });
    res.send(word)
});

module.exports = router;
