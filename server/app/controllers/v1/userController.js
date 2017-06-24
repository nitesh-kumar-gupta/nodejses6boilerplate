import passport from 'passport';
import userService from './../../services/userService';
import userHelper from './../../helpers/userHelper';
import Success from './../../../config/constants/success';
import Errors from './../../../config/constants/errors';
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
    Response.response(res,user);
  },
  getUser: async (req, res) => {
    let user = await userHelper.getUser(req.params.id ? req.params.id : req.user.id);
    let data = {
      status: false,
      error: Errors.E_USER_NOT_FOUND
    };
    if(user)
      data = {
        status: true,
        success: Success.S_OK,
        data: user
      };
    Response.response(res,data);
  },
  updateUser: async (req, res) => {
    const _userService = new userService();
    let user = await _userService.updateUser(req.params.id ? req.params.id : req.user.id, req.body);
    let data = {
      status: false,
      error: Errors.E_USER_NOT_FOUND
    };
    if(user)
      data = {
        status: true,
        success: Success.S_OK,
        data: user
      };
    Response.response(res,data);
  }
};
export default userController;