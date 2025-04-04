const path = require("node:path");
const db = require("../config/queries")


async function handleUpload(req, res, next) {
    const folderId = parseInt(req.params.id);
    console.log("Your folderid is ", folderId)
    console.log("Your file data:",req.file);
    const originalName = Buffer.from(req.file.originalname, "latin1").toString("utf8");

    if (folderId) {
        await db.createFile(req.file.filename, originalName, req.file.size, folderId);
        res.redirect(`/folders/${folderId}`);
    } else {
        await db.createFile(req.file.filename, originalName, req.file.size);
        res.redirect("/");
    }
}

async function deleteFile(req, res) {
    const fileId = req.params.id;
    await db.deleteFile(fileId);
    res.redirect("/");
}

async function renderFileData(req, res) {
    const fileId = req.params.id;
    const file = await db.getFileById(fileId);
    console.log("Your file is ", file)
    res.render("file", {
        file: file
    })
}

async function handleDownload(req, res) {
    const fileId = req.params.id;
    const file = await db.getFileById(fileId);
    console.log("Your file is ", file)

    res.download(path.join(__dirname, "..", `uploads/${file.filename}`))
}

async function renderUploadFileForm(req, res) {
    res.render("uploadFileForm");
}

module.exports = {
    handleUpload,
    deleteFile,
    renderFileData,
    handleDownload,
    renderUploadFileForm
}