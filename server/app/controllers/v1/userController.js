import passport from 'passport';
import userService from './../../services/userService';
import Success from './../../../config/constants/success';
import Response from './../../../config/responses/response';

const userController = {
  getUserV1 : (req, res) => {
    res.status(200).send({
      name: "Nodejs Express es6 API User",
      version: 1.0
    });
  },
  login : (req, res) => {
    passport.authenticate('local', { session: false }, (result) => {
      Response.response(res, result);
    })(req, res);
  },
  signup: async (req, res) => {
    const _userService = new userService(req.body, req.connection.remoteAddress);
    const user = await _userService.createUser();
    console.log(user,'user');
    Response.response(res,user);
  },
  getUser: (req, res) => {
    Response.response(res, { 
      status: true,
      success: Success.S_OK,
      data: req.user
    });
  }
};
export default userController;