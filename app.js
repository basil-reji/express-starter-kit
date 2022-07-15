var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var engine = require("express-handlebars");
var session = require("express-session");
var flash = require("express-flash");
var dotenv = require('dotenv');
var passport = require('passport')

dotenv.config()

var db = require('./config/database')
var engineHelper = require("./helper/hbsHelper");

var authRouter = require('./routes/auth');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var adminRouter = require('./routes/admins');

var app = express();

// view engine setup
const hbs = engine.create({
    extname: "hbs",
    defaultLayout: "layout",
    layoutsDir: `${__dirname}/views`,
    partialsDir: `${__dirname}/views/partials`,
    helpers: engineHelper,
});
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.engine("hbs", hbs.engine);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// express-session setup
app.use(session({
    secret: process.env.SESSION_SECRET,
    cookie: { maxAge: parseInt(process.env.SESSION_MAX_AGE) },
    store: db.get(),
    resave: true,
    saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(passport.authenticate('session'));

// express-flash setup
app.use(flash())

//db connection
db.connect((err) => {
    if (err) {
        console.log(err);
    } else {
        // console.log("Data Base Connected...");
    }
});

app.use('/', authRouter);
app.use('/', indexRouter);
app.use('/user', usersRouter);
app.use('/admin', adminRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    let error = {
        code: err.status || 500,
        message: err.message,
        stack: err.stack,
    }
    // console.log(error);
    res.render('error', {
        title: `${error.code} Error | ${process.env.APP_NAME}`,
        error
    });
});

module.exports = app;
