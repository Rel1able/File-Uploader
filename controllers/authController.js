const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient(); 
const bcrypt = require("bcryptjs");
const passport = require("passport");

async function renderLoginPage(req, res, next) {
    res.render("login");
}

const handleLogin = passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login",
});

async function renderSignUpPage(req, res) {
    res.render("signup");
} 

async function createUser(req, res, next) {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        await prisma.users.create({
            data: {
                username: req.body.username,
                password: hashedPassword
            }
           
        })
        res.redirect("/");
    } catch (err) {
        console.error(err);
        next(err);
    }
}

async function handleLogout(req, res, next) {
    req.logout((err) => {
        if(err) {
            return next(err);
        }
        res.redirect("/");
    })
}

module.exports = {
    renderLoginPage,
    renderSignUpPage,
    createUser,
    handleLogout,
    handleLogin
}