var express = require('express')
var router = express.Router()
var auth = require('../../auth.js')
var Word = require('../../models/words.js')
var User = require('../../models/users.js')

router.post('/', (req, res) => { // add new word
  var english = req.body.en
  var korean = req.body.ko
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
  // console.log(req.body)
  Word.find({ en: english, ko: korean }, function (err, docs) {
    if (err) {
      console.log(err)
      res.send({
        success: false,
        message: 'Error'
      })
    } else if (docs.length) {
      res.send({
        success: false,
        message: 'Word exists'
      })
    } else {
      var newWord = new Word({
        en: english,
        ko: korean.sort(),
        // sort Korean
        userId: userId
      })
      // console.log(newWord)
      User.update({ _id: userId }, { $inc: { points: 2 } }, function (err, user) {
        if (err) console.log(err)
      }) // give 2 points to user who created word
      newWord.save(function (error) {
        if (error) {
          console.log(error)
          res.send({
            success: false,
            message: 'Error'
          })
        }
        res.send({
          success: true,
          message: 'Word saved successfully'
        })
      })
    }
  })
})

module.exports = router
