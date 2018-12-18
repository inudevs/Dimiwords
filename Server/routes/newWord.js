var express = require('express');
var router = express.Router();
var Word = require('../models/words.js');

router.post('/word', (req, res) => { // add new word
    var db = req.db;
    var english = req.body.en;
    var korean = req.body.ko;
    console.log(req.body)
    Word.find({en: english, ko: korean}, function (err, docs) {
        // console.log(docs)
        if (docs.length){
            res.send({
                success: false,
                message: 'Word exists'
            })
        } else {                
            var new_word = new Word({
                en: english,
                ko: korean.sort()
                // sort Korean 
            })
            // console.log(new_word)
            
            new_word.save(function (error) {
                if (error) { console.log(error) }
                res.send({
                    success: true,
                    message: 'Word saved successfully'
                })
            })
        }
    });
})

module.exports = router;
