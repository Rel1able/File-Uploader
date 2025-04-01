const { Router } = require("express");
const foldersController = require("../controllers/foldersContoller");
const filesController = require("../controllers/filesController");
const foldersRouter = Router();

foldersRouter.get("/create-folder", foldersController.renderCreateFolderForm)
foldersRouter.post("/create-folder", foldersController.createFolder)


foldersRouter.get("/folders/:id", foldersController.renderFolderData)

foldersRouter.post("/folders/:id/upload-file", filesController.handleUpload);


module.exports = foldersRouter;