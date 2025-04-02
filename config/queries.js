const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient(); 


async function createUser(username, password) {
    await prisma.user.create({
            data: {
                username: username,
                password: password,
            }
           
        })
}


async function getUserByUsername(username) {
    const user = await prisma.user.findUnique({
                where: {
                    username: username
                }
    })
    return user
}

async function createFile(filename, size, folderId = null) {
    await prisma.file.create({
        data: {
            filename: filename,
            size: (size / 1024),
            folderId: folderId
        }
    })
}

async function getFiles() {
    const files = await prisma.file.findMany();
    return files;
}

async function getFolders() {
    const folders = await prisma.folder.findMany();
    return folders;
}

async function createFolder(foldername) {
    await prisma.folder.create({
        data: {
            foldername: foldername
        }
    })
}

async function getFolderById(folderId) {
    const folder = await prisma.folder.findUnique({
        where: {
            id: parseInt(folderId)
        }
    })
    return folder
}

async function getFilesByFolder(folderId) {
    const files = await prisma.file.findMany({
        where: {
            folderId: parseInt(folderId)
        }
    })
    return files;
}

async function updateFolderById(folderId, newName) {
    await prisma.folder.update({
        where: {
            id: parseInt(folderId)
        },
        data: {
            foldername: newName
        }
    })
}

module.exports = {
    createUser,
    getUserByUsername,
    createFile,
    getFiles,
    getFolders,
    createFolder,
    getFolderById,
    getFilesByFolder,
    updateFolderById
}