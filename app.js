var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors')
var multer = require('multer')
var mongoose = require('mongoose');
var bodyParser = require('body-parser');


//multer
const multerStorage = multer.diskStorage({
  destination: path.join(__dirname, './public/uploads'),
  filename: (req, file, cb) => {
    const date = Date.now();
    const image = date + path.extname(file.originalname)
    cb(null, image);
  }
})
const upload = multer({ storage: multerStorage });

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var categoriesRouter = require('./routes/categories');
const ratingRouter = require('./routes/rating');
var offersRouter = require('./routes/offers')(upload);

var app = express();
app.use(cors())

require('dotenv').config()

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

try {
  mongoose.connect(process.env.CONNECTIONSSTRING, {
    dbName: process.env.dbnam,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  });
} catch (e) {
  console.log(e);
}

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/categories', categoriesRouter);
app.use('/offers', offersRouter);
app.use('/rating', ratingRouter);



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

module.exports = app;
