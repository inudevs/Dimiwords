var express = require('express');
var router = express.Router();

var login = require('./login');
var points = require('./points');

router.use('/login', login);
router.use('/points', points);

module.exports = router;
