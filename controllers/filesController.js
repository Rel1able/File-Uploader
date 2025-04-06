const path = require("node:path");
const db = require("../config/queries")
const formatDate = require("../utils/formatDate");


async function handleUpload(req, res) {
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
    const folders = await db.getFolders();
    const date = formatDate(file.uploadTime);
    res.render("file", {
        file: file,
        folders: folders,
        date: date
    })
}

async function handleDownload(req, res) {
    const fileId = req.params.id;
    const file = await db.getFileById(fileId);
    console.log("Your file is ", file)

    res.download(path.join(__dirname, "..", `uploads/${file.filename}`))
}

async function renderUploadFileForm(req, res) {
    const folders = await db.getFolders();
    res.render("uploadFileForm", {
        folders: folders
    });
}

async function renderUploadFileInsideFolderForm(req, res) {
    const folders = await db.getFolders();
    const folderId = req.params.id;
    const folder = await db.getFolderById(folderId);
    res.render("uploadFileInsideFolderForm", {
        folder: folder,
        folders: folders
    });
}

module.exports = {
    handleUpload,
    deleteFile,
    renderFileData,
    handleDownload,
    renderUploadFileForm,
    renderUploadFileInsideFolderForm
}