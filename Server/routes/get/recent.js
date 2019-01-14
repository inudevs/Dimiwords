var express = require('express')
var router = express.Router()
var auth = require('../../auth.js')
var Word = require('../../models/words.js')

router.post('/', function (req, res, next) { // wordbook infomation
  var token = req.body.token
  if (!token) {
    res.send({
      success: false,
      message: 'No token provided'
    })
    return
  }
  try {
    var userId = auth.verify(token).id
  } catch (err) {
    console.log(err)
    res.send({
      success: false,
      message: 'failed to verify token'
    })
    return
  }
  Word.find({ userId: userId }, function (err, words) {
    if (err) {
      res.send({
        success: false,
        message: 'Error'
      })
    } else {
      res.send({
        success: true,
        recents: words
      })
    }
  }).sort({ _id: -1 }).limit(10)
})

module.exports = router
