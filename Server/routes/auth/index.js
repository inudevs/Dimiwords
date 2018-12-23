var express = require('express');
var router = express.Router();

var login = require('./login');

router.use('/login', login);

module.exports = router;
