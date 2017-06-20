import mongoose from 'mongoose';
import passportJWT from 'passport-jwt';

const JwtStrategy = passportJWT.Strategy;
const ExtractJwt = passportJWT.ExtractJwt;

const config = {
    expiresIn: '1m',
    algorithm: 'HS256',
    secret: 'ghO/I-uYjYTM[>n7hQ;a|nJl&`/*-ut[uQ-wR33G#Dk$X}Me&g3tg~0_*.7WIK~M',
    issuer: "api.myapi.com",
    audience: "app.myapp.com"
};

const JWT_STRATEGY_CONFIG = {
    secretOrKey: config.secret,
    issuer: config.issuer,
    audience: config.audience,
    passReqToCallback: false,
    jwtFromRequest: ExtractJwt.fromAuthHeader()
};

function _onJwtStrategyAuth(payload, next){
    console.log(payload);
    let user = payload.user;
    return next(null, user, {});
}

const jwtStrategy = new JwtStrategy(JWT_STRATEGY_CONFIG, _onJwtStrategyAuth);

module.exports = {
    strategy: jwtStrategy,
    config: config
};