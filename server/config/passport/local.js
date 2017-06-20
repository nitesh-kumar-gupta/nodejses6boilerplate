import passportLocal from 'passport-local';
import User from './../../app/models/User';
import Errors from './../constants/errors';
import Success from './../constants/success';
import HashService from './../../app/services/hashService';
import JwtService from './../../app/services/jwtService';
const LocalStrategy = passportLocal.Strategy;
const LOCAL_STRATEGY_CONFIG = {
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
};

function _onLocalStrategyAuth(req, email, password, next) {
    let user = User.findOne({ 'email': email });
    user.exec((err, user) => {
        try{
            if(err)
            throw { status: false, error:Errors.E_USER_NOT_FOUND };
            else if(!user)
                throw { status: false, error:Errors.E_USER_NOT_FOUND };
            else if(!user.active)
                throw { status: false, error:Errors.E_USER_ACCOUNT_DEACTIVATED };
            else if(!isValidPassword(user, password))
                throw { status: false, error: Errors.E_INVALID_PASSWORD };
            user.ips.push({
                ip: req.connection.remoteAddress,
                at: new Date().toISOString()
            });
            user.save();
            return next({
                status: true,
                success: Success.S_OK,
                token: JwtService.createToken(user),
                data: user
            });
        }catch(err){
            return next(err);
        }
    });
}

function isValidPassword(user, password) {
    return HashService.compare(password, user.password);
}

const localStrategy = new LocalStrategy(LOCAL_STRATEGY_CONFIG, _onLocalStrategyAuth);

module.exports = {
    strategy: localStrategy
};
