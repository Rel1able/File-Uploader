const { Router } = require("express");
const foldersController = require("../controllers/foldersContoller");
const filesController = require("../controllers/filesController");
const foldersRouter = Router();
const authMiddleware = require("../middlewares/authMiddleware");

foldersRouter.get("/create-folder",authMiddleware, foldersController.renderCreateFolderForm)
foldersRouter.post("/create-folder", foldersController.createFolder)


foldersRouter.get("/edit-folder/:id",authMiddleware, foldersController.renderEditFolderForm)
foldersRouter.post("/edit-folder/:id", foldersController.saveEditedFolder)

foldersRouter.post("/delete-folder/:id", foldersController.deleteFolder)
foldersRouter.get("/folders/:id", foldersController.renderFolderData)

foldersRouter.post("/folders/:id/upload-file", filesController.handleUpload);


module.exports = foldersRouter;