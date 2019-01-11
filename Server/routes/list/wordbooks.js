var express = require('express')
var router = express.Router()
var Wordbook = require('../../models/wordbooks.js')

router.get('/', function (req, res, next) { // list of wordbooks
  var page = req.query.page
  if (!page || page < 1) page = 1
  Wordbook.paginate({}, { page: page, lean: true, limit: 9, sort: { _id: -1 } }, function (error, pageCount, paginatedResults) {
    if (error) {
      res.send({ success: false, error: 'error' })
    } else {
      pageCount.docs.forEach(function (wordbook, idx) {
        pageCount.docs[idx].len = wordbook.words.length
        pageCount.docs[idx].words = wordbook.words.slice(0, 5)
      })
      res.send({ success: true, result: pageCount })
    }
  })
})

module.exports = router
