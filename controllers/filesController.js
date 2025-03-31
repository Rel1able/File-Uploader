const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function handleUpload(req, res, next) {
    console.log(req.file);
    await prisma.files.create({
        data: {
            filename: req.file.filename,
            size: (req.file.size/1024),
        }
    })
    res.redirect("/");
}

module.exports = {
    handleUpload
}