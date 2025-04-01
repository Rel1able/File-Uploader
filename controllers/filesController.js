const db = require("../config/queries")

async function handleUpload(req, res, next) {
    console.log(req.file);
    await db.createFile(req.file.originalname, req.file.size)
    res.redirect("/");
}

module.exports = {
    handleUpload
}