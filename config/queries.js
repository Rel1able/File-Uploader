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

async function createFile(filename, fileUrl, size, folderId = null, userId) {
    await prisma.file.create({
        data: {
            filename: filename,
            fileUrl: fileUrl,
            size: (size / 1024),
            folderId: folderId,
            userId: userId
        }
    })
}

async function getFiles(userId) {
    const files = await prisma.file.findMany({
        where: {
            userId: userId
        }
    });
    return files;
}

async function getFolders(userId) {
    const folders = await prisma.folder.findMany({
        where: {
            userId: userId
        }
    });
    return folders;
}

async function createFolder(foldername, userId) {
    await prisma.folder.create({
        data: {
            foldername: foldername,
            userId: userId
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

async function getFilesWithoutFolder(userId) {
    const files = await prisma.file.findMany({
        where: {
            folderId: null,
            userId: parseInt(userId)
        }
    })
    return files
}

async function deleteFilesInsideFolder(folderId) {
    await prisma.file.deleteMany({
        where: {
            folderId: parseInt(folderId)
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
    updateFolderById,
    deleteFolder,
    deleteFile,
    getFileById,
    getFilesWithoutFolder,
    deleteFilesInsideFolder
}