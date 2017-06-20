import express from 'express';
import userController from './../../../app/controllers/v1/userController';
import IsAuthenticated from './../../middleware/isAuthenticated';
const routes = express();
routes.get('/', userController.getUserV1);
routes.post('/login', userController.login);
routes.post('/signup', userController.signup);

routes.get('/getUser', IsAuthenticated, userController.getUser);

export default routes;