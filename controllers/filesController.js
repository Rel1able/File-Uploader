const path = require("node:path");
const db = require("../config/queries")


async function handleUpload(req, res, next) {
    const folderId = parseInt(req.params.id);
    console.log("Your folderid is ", folderId)
    console.log(req.file);
    if (folderId) {
        await db.createFile(req.file.originalname, req.file.size, folderId)
        res.redirect(`/folders/${folderId}`)
    } else {
        await db.createFile(req.file.originalname, req.file.size)
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
    res.download(path.join(__dirname, "..", `uploads/${file.filename}`))
}

module.exports = {
    handleUpload,
    deleteFile,
    renderFileData,
    handleDownload
}