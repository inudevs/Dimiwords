var express = require('express')
var router = express.Router()
var Word = require('../../../models/words')

router.get('/', function (req, res, next) {
  Word.count({}, function (err, count) {
    if (err) {
      return res.send({ success: false, error: 'Error' })
    } else {
      return res.send({
        success: true,
        count: count
      })
    }
  })
})

module.exports = router
