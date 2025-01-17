var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var testRouter = require('./routes/test');
var serRouter = require('./routes/series');
var autRouter = require('./routes/authors');
var catRouter = require('./routes/categories');
var addSeries = require('./routes/addSeries');
var addCategory = require('./routes/addCategory');
var addAuthor = require('./routes/addAuthor');
var submitItem = require('./routes/submitItem');

var cors = require('cors');
const { kMaxLength } = require('buffer');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(cors()) // corsを有効に

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/api/v1/test', testRouter);
app.use('/api/v1/series', serRouter);
app.use('/api/v1/authors', autRouter);
app.use('/api/v1/categories', catRouter);
app.use('/api/v1/addSeries', addSeries);
app.use('/api/v1/addCategory', addCategory);
app.use('/api/v1/addAuthor', addAuthor);
app.use('/api/v1/submitItem', submitItem);

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

module.exports = app;
