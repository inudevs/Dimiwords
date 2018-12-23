var express = require('express');
var router = express.Router();
var User = require('../../models/users.js');
var auth = require('../../auth.js');

// check user data and create access token
router.post('/', (req, res) => {
    var email = req.body.email;
    var password = req.body.password;
    User.findOne({email: email, password: password}, function (err, user) {
        if (err) {
            console.log(err)
            res.send({success: false, error: 'Error'})
        } else if (!user) {
            res.send({success: false, error: 'No User'})
        } else {
            console.log(user)
            const token = auth.sign(user.id)
            console.log(token)
            const id = auth.verify(token).id
            User.findById(id, function (error, user) {
                if (error) { console.error(error); }
                res.json({success: true, token: token, user: user})
            }).select("-password")
        }
    })
})

module.exports = router;
