import express from 'express';
import userController from './../../../app/controllers/v1/userController';
import IsAuthenticated from './../../middleware/isAuthenticated';
import IsAdmin from './../../middleware/isAdmin';
const routes = express();
routes.get('/', userController.getUserV1);
routes.post('/login', userController.login);
routes.post('/signup', userController.signup);

routes.get('/getUser/:id?', IsAuthenticated, userController.getUser);

routes.put('/updateUser/:id?', IsAuthenticated, IsAdmin, userController.updateUser);

export default routes;