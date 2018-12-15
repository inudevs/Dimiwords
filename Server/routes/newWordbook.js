var express = require('express');
var router = express.Router();
var Wordbook = require('../models/wordbooks.js');

router.post('/wordbook', (req, res) => { // add new wordbook
    var db = req.db;
    var name = req.body.name;
    var intro = req.body.intro;
    var words = req.body.words;
    var new_wordbook = new Wordbook({
        name: name,
        intro: intro,
        words: words
    })

    new_wordbook.save(function (error) {
        if (error) { console.log(error) }
        res.send({
            success: true,
            message: 'Wordbook saved successfully'
        })
    })
})

module.exports = router;
