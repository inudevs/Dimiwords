var express = require('express');
var router = express.Router();
var User = require('../../models/users.js');

router.get('/:id', function (req, res, next) { // wordbook infomation
    var id = req.params.id;
    User.findById(id, function (error, user) {
        if (error) { console.error(error); }
        res.send(user)
    }).select("-password")
});

module.exports = router;
