const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient(); 


async function createUser(username, password) {
    await prisma.user.create({
            data: {
                username: username,
                password: password
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

async function createFile(filename, size) {
    await prisma.file.create({
        data: {
            filename: filename,
            size: (size/1024),
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

module.exports = {
    createUser,
    getUserByUsername,
    createFile,
    getFiles,
    getFolders
}