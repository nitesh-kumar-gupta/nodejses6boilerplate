import express from 'express';
import routesController from './../../../app/controllers/v1/routesController';
const routes = express();
routes.get('/', routesController.getRouteV1);
routes.get('/csrf', routesController.getCsrfToken);
export default routes;