const db = require("../config/queries");

async function renderIndexPage(req, res) {
    const folders = await db.getFolders();
    const files = await db.getFiles();
    res.render("index", {
        user: req.user,
        folders: folders,
        files: files
    })
}

module.exports = {
    renderIndexPage
}