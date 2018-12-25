var express = require('express')
var router = express.Router()
var auth = require('../../auth.js')
var User = require('../../models/users.js')
var Word = require('../../models/words.js')

router.post('/', (req, res) => { // give points to user with token
  var word = req.body.word
  var answer = req.body.answer
  var token = req.body.token
  // console.log({word, answer, token})
  // word(word_id), answer, token을 받아서 word에 해당하는 word.en==answer이면 token.id의 유저에게 포인트 지급
  if (!token || !word || !answer) {
    res.send({
      success: false,
      message: 'No token provided'
    })
    return
  }
  try {
    var userId = auth.verify(token).id
  } catch (err) {
    res.send({
      success: false,
      message: 'failed to verify token'
    })
    return
  }
  Word.findById(word, function (error, word) {
    if (error || !word) {
      console.error(error)
      res.send({
        success: false,
        message: 'Error'
      })
      return
    }
    if (answer.toLowerCase() === word.en) { // correct
      Word.update({ _id: word }, { $inc: { accept: 1, submit: 1 } }, function (err, user) {
        if (err) console.log(err)
      }) // add 1 ac/sb to word
      User.update({ _id: userId }, { $inc: { points: 1, accept: 1, submit: 1 } }, function (err, user) {
        if (err) {
          console.log(err)
          res.send({
            success: false,
            message: 'Error'
          })
        } else {
          res.send({
            success: true
          })
        }
      }) // give points to user
    } else { // wrong
      Word.update({ _id: word }, { $inc: { submit: 1 } }, function (err, user) {
        if (err) console.log(err)
      }) // add 1 sb to word
      User.update({ _id: userId }, { $inc: { submit: 1 } }, function (err, user) {
        if (err) console.log(err)
        res.send({
          success: false,
          message: 'Wrong'
        })
      })
    }
  })
})

module.exports = router
