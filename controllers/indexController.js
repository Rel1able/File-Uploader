const db = require("../config/queries");

async function renderIndexPage(req, res) {
    let folders = [];
        if (req.user) {
            folders = await db.getFolders(req.user.id);
        }
    let files = [];
    if (req.user) {
        const userId = req.user.id;
        files = await db.getFilesWithoutFolder(userId);
    }
    
    
    res.render("index", {
        user: req.user,
        folders: folders,
        files: files
    })
}

module.exports = {
    renderIndexPage
}