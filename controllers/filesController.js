const path = require("node:path");
const db = require("../config/queries")
const formatDate = require("../utils/formatDate");
const supabase = require("../config/supabase");



async function handleUpload(req, res) {
    const folderId = parseInt(req.params.id);
    const userId = req.user.id;

    const filePath = `${req.file.originalname}`
    const { data, error } = await supabase.storage.from("uploads").upload(filePath, req.file.buffer, {
        upsert: true
    })


    if (folderId) {
        await db.createFile(req.file.originalname, data.fullPath, req.file.size, folderId, userId);
        res.redirect(`/folders/${folderId}`);
    } else {
        await db.createFile(req.file.originalname, data.fullPath, req.file.size, null, userId);
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
    let folders = [];
    if (req.user) {
        folders = await db.getFolders(req.user.id);
    }
   
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
    let path = file.fileUrl;
    path = path.slice("uploads/".length);
    const { data, error } = await supabase.storage.from("uploads").download(path);

    if (error) {
        throw error;
    }

    const buffer = Buffer.from(await data.arrayBuffer());
    res.attachment(path);
    res.send(buffer);

}

async function renderUploadFileForm(req, res) {
    let folders = [];
    if (req.user) {
        folders = await db.getFolders(req.user.id);
    }
    res.render("uploadFileForm", {
        folders: folders
    });
}

async function renderUploadFileInsideFolderForm(req, res) {
    let folders = [];
    if (req.user) {
        folders = await db.getFolders(req.user.id);
    }
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