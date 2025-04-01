const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient(); 
const bcrypt = require("bcryptjs");
const passport = require("passport");
const { body, validationResult } = require("express-validator");

function renderLoginPage(req, res, next) {
    res.render("login");
}

const handleLogin = passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login",
});


function renderSignUpPage(req, res) {
    res.render("signup");
} 

const validateSignUpForm = [
    body("username")
        .trim()
        .isLength({ min: 5 }).withMessage("Username must be at least 5 characters long")
        .custom(async (username) => {
            const user = await prisma.user.findFirst({
                where: {
                    username: username
                }
            })
            if (user) {
                throw new Error("Username is already taken");
            }
        }),
    body("password").isLength({ min: 5 }).withMessage("Password must be at least 5 characters long"),
    body("confPassword").custom((value, { req }) => {
        if (value !== req.body.password) {
            throw new Error("Passwords doesn't match")
        }
        return true
    })
]

async function createUser(req, res, next) {
    const errors = validationResult(req);
    if (errors) {
        return res.status(404).render("signup", {
            errors: errors.array()
        })
    }
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

function handleLogout(req, res, next) {
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
    handleLogin,
    validateSignUpForm
}