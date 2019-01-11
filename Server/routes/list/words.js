var express = require('express')
var router = express.Router()
var Word = require('../../models/words.js')

router.get('/', function (req, res, next) { // list of all words
  var page = req.query.page
  if (!page || page < 1) page = 1
  Word.paginate({}, { 
    page: page, 
    limit: 9, 
    sort: { _id: -1 } 
  }, function (error, pageCount, paginatedResults) {
    if (error) {
      res.send({ success: false, error: 'error' })
    } else {
      res.send({ success: true, result: pageCount })
    }
  })
})

module.exports = router
