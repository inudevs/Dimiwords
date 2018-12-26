var createError = require('http-errors')
var express = require('express')
var path = require('path')
var logger = require('morgan')
var bodyParser = require('body-parser')
var cors = require('cors')
var fs = require('fs')
var https = require('https')

var router = require('./routes')

var secret = require('./secret.json')

var app = express()

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'jade')

app.use(cors())

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use(logger('dev'))
app.use(express.static(path.join(__dirname, 'public')))

app.use('/api', router)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404))
})

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

var mongoose = require('mongoose')
mongoose.connect(secret.mongo, { useNewUrlParser: true })

var db = mongoose.connection

db.on('error', console.error.bind(console, 'connection error'))

db.once('open', function (callback) {
  console.log('Connection Succeeded')
})

var options = {
  key: fs.readFileSync(path.resolve(__dirname, 'config/ssl/private.key')),
  cert: fs.readFileSync(path.resolve(__dirname, 'config/ssl/certificate.crt')),
  ca: fs.readFileSync(path.resolve(__dirname, 'config/ssl/ca_bundle.crt'))
}

var port = 5000
https.createServer(options, app).listen(port, function () {
  console.log('API server listening on port ' + port)
})

module.exports = app
