import mongoose from 'mongoose';
import UserHelper from './../helpers/userHelper';
import Errors from './../../config/constants/errors';
import Success from './../../config/constants/success';
import JwtService from './jwtService';
const User = mongoose.model('User');
class userService {
    constructor(user, ip){
        this.user = user;
        this.ip = ip;
    }
    async createUser(){
        try{
            var user = await UserHelper.checkUserExistance(this.user.email);
            if(user){
                if(!user.active)
                    user.active = true;
                else if (user.active)
                    throw Errors.E_DUPLICATE_USER;
            }
            else
                user = new User(this.user);
            user.ips.push({
                ip: this.ip,
                at: new Date().toISOString()
            });
            user = await user.save();
            const token = JwtService.createToken(user);
            return {
                status: true,
                success: Success.S_USER_CREATED,
                token: token,
                data: user
            }
        }catch(err){
            return {
                status: false,
                error: err
            }
        }
    }

}
export default userService;