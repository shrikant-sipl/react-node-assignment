var createError = require('http-errors');
var multer = require('multer');
var http = require('http');
var passport = require('passport');
var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
let cors = require('cors')

var customRouter = require('./routes/index');
const mongoose = require('mongoose')
var dbConfig = require('./config/db');

mongoose.connect(dbConfig, { useNewUrlParser: true })
var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

var collections = mongoose.connections[0].collections;
var names = [];

db.once('open', function () {
  console.log("Connection Successful!");

  Object.keys(collections).forEach(function (k) {
    names.push(k);
  });
  console.log(names);
});

var app = express();
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static('public'));

app.use(cors());

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");


  // res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Methods', ['PATCH', 'POST', 'GET', 'DELETE', 'PUT']);
  res.setHeader('Access-Control-Allow-Headers', ['Content-Type']);
  res.setHeader('Access-Control-Expose-Headers', ['Content-Type']);

  next();
})

app.use('/', customRouter);


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
http.createServer(app, function (req, res) {
  console.log("server created sucessfully ")
}).listen(8080)

// module.exports = app;
