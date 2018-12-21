var express = require('express');
var router = express.Router();
var User = require('../../models/users.js');
var auth = require('../../auth.js');

// check user data and create access token
router.post('/', (req, res) => {
    var name = req.body.name;
    var password = req.body.password;
    User.findOne({name: name, password: password}, function (err, user) {
        if (err) {
            res.send({success: false, error: 'Error'})
        } else if (!user) {
            res.send({success: false, error: 'No User'})
        } else {
            const token = auth.sign(user.id)
            console.log(token)
            res.json({success: true, token: token})
            console.log(auth.verify(token).id) // user id
        }
    })
})

module.exports = router;
