import express from 'express';
import morgan from 'morgan';
import parser from 'body-parser';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import csrf from 'csurf';
import dotenv from 'dotenv';
import passport from 'passport';
import Config from './../config/config';
import routesV1 from './../config/routes/v1/routes-v1';
import userV1 from './../config/routes/v1/user-v1';
dotenv.load();

require('./../config/passport/passport')(passport);
const csrfProtection = csrf({ cookie: true });
const app = express();

Config.connectMongoDb(process.env.DB);
if (process.env.RESET_DB === 'RESET')
    Config.resetMongoDb();
    
app.use(cookieParser());// get information from html forms
app.use(session({secret: process.env.SECRET, resave: false, saveUninitialized:false}));
app.use(parser.json({ limit: '50mb' }));
app.use(parser.urlencoded({ extended: false }));
app.use(passport.initialize());
app.use(morgan('dev'));// log every request to the console
app.use(csrfProtection);
app.use(function (err, req, res, next) {
    res.locals._csrf = req.csrfToken();
    if(err.code === 'EBADCSRFTOKEN')
        Config.invalidCSRF(res);
    else
        next();
});
app.use('/api/v1', routesV1);
app.use('/api/v1/user', userV1);
export default app;