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

module.exports = {
    handleUpload
}