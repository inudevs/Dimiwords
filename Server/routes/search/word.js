var express = require('express')
var router = express.Router()
var auth = require('../../auth.js')
var Word = require('../../models/words.js')

router.post('/', function (req, res, next) { // list of all words
  var query = req.body.query
  var page = req.query.page
  var token = req.body.token

  if (!token || !query) {
    res.send({
      success: false,
      message: 'No token or query provided'
    })
    return
  }
  try {
    var userId = auth.verify(token).id
  } catch (err) {
    res.send({
      success: false,
      message: 'failed to verify token',
      error: err
    })
    return
  }
  if (!page || page < 1) page = 1
  Word.paginate({
    'en': { '$regex': query, '$options': 'i' }
  }, { page: page, limit: 10, sort: { _id: -1 } }, function (error, pageCount, paginatedResults) {
    if (error) {
      res.send({ success: false, error: 'error' })
    } else {
      res.send({ success: true, result: pageCount })
    }
  })
})

module.exports = router
