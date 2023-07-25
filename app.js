var fs = require('fs');
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

var engineHelper = require("./helper/hbs");

var authRouter = require('./routes/auth');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var adminRouter = require('./routes/admins');

var app = express();

const db = require('./config/database');
// const Session = require('./database/schema/session');

//database connection
db.on('error', (e) => {
    console.log("Data Base Error")
    console.log(e.message)
});

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
    store: new session.MemoryStore(),
    resave: true,
    saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(passport.authenticate('session'));

// express-flash setup
app.use(flash());

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
        noFooter: true,
        noHeader: true,
        error
    });
});

module.exports = app;