var express = require('express');
var router = express.Router();
var User = require('../../models/users.js')

router.get('/', function (req, res, next) { // list of all words
    page = req.query.page;
    if (!page || page<1) page = 1;
    User.paginate({}, {
        page: page, 
        limit: 20, 
        select: '-password', 
        sort: {points:-1}
    }, function(error, pageCount, paginatedResults) {
        if (error) {
            res.send({success: false, error: 'error'})
        } else {
            res.send({success: true, result: pageCount})
        }
    });
});

module.exports = router;
