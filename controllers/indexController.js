const db = require("../config/queries");

async function renderIndexPage(req, res) {
    const folders = await db.getFolders();
    const files = await db.getFilesWithoutFolder();
    console.log("filews sss", files)
    res.render("index", {
        user: req.user,
        folders: folders,
        files: files
    })
}

module.exports = {
    renderIndexPage
}