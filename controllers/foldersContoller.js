const db = require("../config/queries");
const { body, validationResult } = require("express-validator");


async function renderCreateFolderForm(req, res) {
    const folders = await db.getFolders();
    res.render("createFolderForm", {
        folders: folders
    })
}

const validateCreateFolderForm = [
    body("foldername")
        .trim()
        .isLength({min: 5, max: 12}).withMessage("Folder name must be between 5 and 12 characters long")
]

async function createFolder(req, res) {
    const folders = await db.getFolders();
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400).render("createFolderForm", {
            folders: folders,
            errors: errors.array(),
        })
    } else {
            await db.createFolder(req.body.foldername);
            res.redirect("/");
    }

    
}

async function renderFolderData(req, res) {
    const folderId = req.params.id;
    const folder = await db.getFolderById(folderId);
    const files = await db.getFilesByFolder(folderId);
    const folders = await db.getFolders();
    res.render("folder", {
        folder: folder,
        files: files,
        folders: folders
    })
    console.log("Folder data", folder)
    console.log("Files", files);
    
}

async function renderEditFolderForm(req, res) {
    const folderId = req.params.id;
    const folder = await db.getFolderById(folderId);
    const folders = await db.getFolders();
    console.log("FOLDER", folder)
    res.render("editFolder",{
        folder: folder,
        folders: folders
    })
}

async function saveEditedFolder(req, res) {
    const folderId = req.params.id;
    const folder = await db.getFolderById(folderId);
    const folders = await db.getFolders();
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(404).render("editFolder",{
            folder: folder,
            folders: folders,
            errors: errors.array(),
        })
    } else {
        await db.updateFolderById(folderId, req.body.foldername);
        res.redirect("/");
    }
    
}

async function deleteFolder(req, res) {
    const folderId = req.params.id;
    await db.deleteFolder(folderId);
    res.redirect("/");
}

module.exports = {
    renderCreateFolderForm,
    createFolder,
    renderFolderData,
    renderEditFolderForm,
    saveEditedFolder,
    deleteFolder,
    validateCreateFolderForm
}