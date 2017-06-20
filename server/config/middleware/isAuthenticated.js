'use strict';
const passport = require('passport');
import Errors from './../constants/errors';
import Success from './../constants/success';
import Response from './../responses/response';

var ExtractJwt = require('passport-jwt').ExtractJwt;  

module.exports = (req, res, next) => {
    passport.authenticate('jwt', function (error, user, info){
        if (error)
            Response.response(res, { status: false, error: Errors.E_INTERNAL_SERVER_ERROR });
        else if (info.name === 'TokenExpiredError')
            Response.response(res, { status: false, error: Errors.E_AUTH_TOKEN_EXPIRED });
        else if (!user)
            Response.response(res, { status: false, error: Errors.E_INVALID_AUTH_TOKEN });
        else
            req.user = user;
        next();
    })(req, res);
};