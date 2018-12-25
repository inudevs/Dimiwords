var express = require('express')
var router = express.Router()
var Wordbook = require('../../models/wordbooks.js')

router.get('/:id', function (req, res, next) { // wordbook infomation
  var id = req.params.id
  Wordbook.findById(id, function (error, wordbook) {
    if (error) { console.error(error) }
    res.send({ wordbook })
  })
})

module.exports = router
