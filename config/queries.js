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

async function createFile(filename, originalFilename, size, folderId = null) {
    await prisma.file.create({
        data: {
            filename: filename,
            originalFilename: originalFilename,
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

async function deleteFolder(folderId) {
    await prisma.folder.delete({
        where: {
            id: parseInt(folderId)
        }
    })
}

async function deleteFile(fileId) {
    await prisma.file.delete({
        where: {
            id: parseInt(fileId)
        }
    })
}

async function getFileById(fileId) {
    const file = await prisma.file.findUnique({
        where: {
            id: parseInt(fileId)
        }
    })
    return file;
}

async function getFilesWithoutFolder() {
    const files = await prisma.file.findMany({
        where: {
            folderId: null
        }
    })
    return files
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
    updateFolderById,
    deleteFolder,
    deleteFile,
    getFileById,
    getFilesWithoutFolder
}