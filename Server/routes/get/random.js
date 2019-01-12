var express = require('express')
var router = express.Router()
var Word = require('../../models/words.js')

router.get('/:size', function (req, res, next) { 
  const size = Number(req.params.size)
  Word.aggregate([{ $sample: { size: size } }], function (error, result) {
    if (error) {
      console.error(error)
      res.send({
        success: false,
        message: 'Error'
      })
      return
    }
    var words = []
    result.forEach(word => {
      words.push(word.ko[0])
    })
    res.send({
      success: true,
      result: words
    })
  })
})

module.exports = router
