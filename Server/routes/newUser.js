var express = require('express');
var router = express.Router();
var User = require('../models/users.js');

router.post('/user', (req, res) => { // add new user
    var name = req.body.name
    User.find({name: name}, function (err, docs) {
        if (docs.length){
            res.send({
                success: false,
                message: 'User exists'
            })
        } else {                
            var new_user = new User({
                name: name,
                intro: req.body.intro,
                password: req.body.password,
                points: 0,
                profile: req.body.profile
            })
            console.log(new_user)
            
            new_user.save(function (error) {
                if (error) { console.log(error) }
                res.send({
                    success: true,
                    message: 'User saved successfully'
                })
            })
        }
    });
})

module.exports = router;
