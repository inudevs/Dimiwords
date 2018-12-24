var express = require('express');
var router = express.Router();

var login = require('./login');
var check = require('./check');

router.use('/login', login);
router.use('/check', check);

module.exports = router;
