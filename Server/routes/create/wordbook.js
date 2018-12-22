var express = require('express');
var router = express.Router();
var auth = require('../../auth.js');
var Wordbook = require('../../models/wordbooks.js');

router.post('/', (req, res) => { // add new wordbook
    var db = req.db;
    var name = req.body.name;
    var intro = req.body.intro;
    var words = req.body.words;
    var token = req.body.token;
    if (!token){
        res.send({
            success: false,
            message: 'No token provided'
        })
    }
    try {
        var user_id = auth.verify(token).id;
    } catch(err) {
        res.send({
            success: false,
            message: 'failed to verify token'
        })
    }  
    var new_wordbook = new Wordbook({
        name: name,
        intro: intro,
        words: words,
        user_id: user_id
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
