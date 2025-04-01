const {PrismaClient} = require("@prisma/client")
const prisma = new PrismaClient();

function renderCreateFolderForm(req, res) {
    res.render("createFolder")
}

async function createFolder(req, res) {
    await prisma.folder.create({
        data: {
            foldername: req.body.foldername
        }
    })
    res.redirect("/");
    
}

module.exports = {
    renderCreateFolderForm,
    createFolder
}