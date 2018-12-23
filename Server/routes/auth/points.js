var express = require('express');
var router = express.Router();
var auth = require('../../auth.js');
var User = require('../../models/users.js');

router.post('/', (req, res) => { // give points to user with token
    // 보안상 매우 취약하다.
    var points = req.body.points;
    var token = req.body.token;
    if (!token){
        res.send({
            success: false,
            message: 'No token provided'
        })
        return
    }
    try {
        var user_id = auth.verify(token).id;
    } catch(err) {
        res.send({
            success: false,
            message: 'failed to verify token'
        })
        return
    }  
    User.update({_id: user_id}, {$inc: {points: points}}, function (err, user) {
        if (err) {
            console.log(err)
            res.send({
                success: false,
                message: 'Error'
            })
        } else {
            res.send({
                success: true
            })
        }
    }); // give points to user
})

module.exports = router;
