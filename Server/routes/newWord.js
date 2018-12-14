var express = require('express');
var router = express.Router();
var Word = require('../models/words.js');

router.post('/word', (req, res) => { // add new word
    var db = req.db;
    var english = req.body.en;
    var korean = req.body.ko;
    console.log(req.body)
    var new_word = new Word({
        en: english,
        ko: korean
    })
    console.log(new_word)    
    // todo: check exact duplicate for word and reject if existing
    
    new_word.save(function (error) {
        if (error) { console.log(error) }
        res.send({
            success: true,
            message: 'Word saved successfully'
        })
    })
})

module.exports = router;
