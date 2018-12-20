var createError = require('http-errors');
var express = require('express');
var path = require('path');
var logger = require('morgan');
var bodyParser = require('body-parser');
var cors = require('cors')

var indexRouter = require('./routes/index');
var wordsRouter = require('./routes/words');
var wordbookRouter = require('./routes/wordbook');
var newWordRouter = require('./routes/newWord');
var newWordbookRouter = require('./routes/newWordbook');
var newUserRouter = require('./routes/newUser');

var loginRouter = require('./routes/auth/login');

var secret = require('./secret.json');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(logger('dev'));;
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api', indexRouter); // /api
app.use('/api/words', wordsRouter); // /api/words
app.use('/api', wordbookRouter); // /api/{id\}
app.use('/api/new', newWordRouter) // /api/new/word
app.use('/api/new', newWordbookRouter) // /api/new/wordbook
app.use('/api/new', newUserRouter) // /api/new/user

app.use('/api/auth', loginRouter) // /api/auth/login

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

var mongoose = require('mongoose');
mongoose.connect(secret.mongo, { useNewUrlParser: true });

var db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error"));

db.once("open", function(callback){
  console.log("Connection Succeeded");
});

module.exports = app;
