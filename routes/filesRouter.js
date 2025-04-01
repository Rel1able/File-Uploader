const { Router } = require("express");
const filesRouter = Router();
const multer = require("multer");
const upload = multer({ dest: "uploads/" })
const filesController = require("../controllers/filesController");

filesRouter.get("/upload-file", (req, res, next) => {
    res.render("uploadFileForm");
})

filesRouter.post("/upload-file", upload.single("file"), filesController.handleUpload )
filesRouter.post("/folders/:id/upload-file", upload.single("file"), filesController.handleUpload)


module.exports = filesRouter;