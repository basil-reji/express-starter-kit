const fs = require('fs');
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const engine = require("express-handlebars");
const session = require("express-session");
const flash = require("express-flash");
const dotenv = require('dotenv');
const rateLimit = require('express-rate-limit');
const checkUser = require('./middlewares/checkUser');

dotenv.config();

const engineHelper = require("./helper/hbs");

// Configuring routes
const authRouter = require('./routes/auth');
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const adminRouter = require('./routes/admins');

// defining the app
const app = express();

// Middleware to implement rate limiting (express-rate-limit)
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
});
app.use(limiter);

const setNonce = require("./middlewares/setNonce")
app.use(setNonce);

//configuring the helmet
const configHelmet = require("./middlewares/helmet");
app.use(configHelmet);

// database configuration
const db = require('./config/database');

// database connection
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

// express-flash setup
app.use(flash());

app.use('*', checkUser)
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