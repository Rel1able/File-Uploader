const { Router } = require("express");
const filesRouter = Router();
const authMiddleware = require("../middlewares/authMiddleware");
const filesController = require("../controllers/filesController");
const upload = require("../middlewares/storage");
filesRouter.get("/upload-file", authMiddleware, filesController.renderUploadFileForm)

filesRouter.post("/upload-file", upload.single("file"), filesController.handleUpload )

filesRouter.post("/delete-file/:id", filesController.deleteFile)

filesRouter.get("/file-details/:id", filesController.renderFileData)
filesRouter.post("/file-details/:id", filesController.handleDownload)

filesRouter.get("/folders/:id/upload-file",authMiddleware, filesController.renderUploadFileInsideFolderForm)
filesRouter.post("/folders/:id/upload-file", upload.single("file"), filesController.handleUpload)


module.exports = filesRouter;