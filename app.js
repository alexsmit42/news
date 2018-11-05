let createError = require('http-errors');
let express = require('express');
let path = require('path');
let bodyParser = require('body-parser');
let cookieParser = require('cookie-parser');
let fileUpload = require('express-fileupload');
let logger = require('morgan');
let config = require('config');

let firebase = require('firebase');
firebase.initializeApp(config.get('firebase'));

let indexRouter = require('./routes/index');
let adminRouter = require('./routes/admin');

let app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'twig');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(fileUpload({
    limits: { fileSize: 50 * 1024 * 1024 },
  }));
app.use(express.static(path.join(__dirname, 'public')));

let auth = require('./utils/auth');
app.use('/admin', auth.isAuthenticated, adminRouter);
app.use('/admin', adminRouter);
app.use('/', indexRouter);

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
