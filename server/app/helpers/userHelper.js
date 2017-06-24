import User from './../models/User';
import Errors from './../../config/constants/errors';

class UserHelper {    
    static checkUserExistance(email) {
        if (!this.validateEmail(email))
            throw Errors.E_INVALID_EMAIL;
        var user = User.findOne({ email: email });
        return user.exec((err, usr)=>{
            if(err)
                throw err;
            return usr;
        });
    }

    static validateEmail(email) {
        const emailRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return emailRegex.test(email);
    }

    static getUser(id){
        if (id.match(/^[0-9a-fA-F]{24}$/))
            return User.findById(id);
        return null;
    }
}
export default UserHelper;