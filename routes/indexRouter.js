const { Router } = require("express");
const indexRouter = Router();
const indexController = require("../controllers/indexController");

indexRouter.get("/",indexController.renderIndexPage);


module.exports = indexRouter;


