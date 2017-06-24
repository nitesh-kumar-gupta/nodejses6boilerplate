'use strict';
import User from './../../app/models/User';
import Errors from './../constants/errors';
import Response from './../responses/response';

module.exports = (req, res, next) => {
    User.findOne({ _id: req.user.id, type:{ $in:['ADMIN', 'SUSER'] }})
        .then((admin) => {
            if(!admin)
                Response.response(res, { status: false, error: Errors.E_UNAUTHORISED });
            next();
        })
        .catch((err) => {
            Response.response(res, { status: false, error: Errors.E_INTERNAL_SERVER_ERROR });
        });
};
