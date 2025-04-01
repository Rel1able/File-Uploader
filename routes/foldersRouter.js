const { Router } = require("express");
const foldersController = require("../controllers/foldersContoller");
const foldersRouter = Router();

foldersRouter.get("/create-folder", foldersController.renderCreateFolderForm)
foldersRouter.post("/create-folder", foldersController.createFolder)


module.exports = foldersRouter;