'use strict';

const local = require('./local');
const jwt = require('./jwt');

module.exports = (passport) => {
    passport.use(jwt.strategy);
    passport.use(local.strategy);
};
