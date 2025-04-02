const db = require("../config/queries");


function renderCreateFolderForm(req, res) {
    res.render("createFolder")
}

async function createFolder(req, res) {
    await db.createFolder(req.body.foldername);
    res.redirect("/");
    
}

async function renderFolderData(req, res) {
    const folderId = req.params.id;
    const folder = await db.getFolderById(folderId);
    const files = await db.getFilesByFolder(folderId);
    res.render("folder", {
        folder: folder,
        files: files
    })
    console.log("Folder data", folder)
    console.log("Files", files);
    
}

async function renderEditFolderForm(req, res) {
    const folderId = req.params.id;
    const folder = await db.getFolderById(folderId);
    console.log("FOLDER", folder)
    res.render("editFolder",{
        folder: folder
    })
}

async function saveEditedFolder(req, res) {
    const folderId = req.params.id;
    await db.updateFolderById(folderId, req.body.foldername);
    res.redirect("/");
}

module.exports = {
    renderCreateFolderForm,
    createFolder,
    renderFolderData,
    renderEditFolderForm,
    saveEditedFolder
}