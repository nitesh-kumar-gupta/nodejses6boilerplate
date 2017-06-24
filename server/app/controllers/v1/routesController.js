const routesController = {
  getRouteV1 : (req, res) => {
    res.status(200).send({
      name: "Nodejs Express es6 API",
      version: 1.0
    });
  },
  getCsrfToken : (req, res) => {
    res.status(200).send({
      csrfToken: req.csrfToken()
    });
  }
};
export default routesController;