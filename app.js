const expressSession = require("express-session");
const { PrismaSessionStore } = require("@quixo3/prisma-session-store");
const { PrismaClient } = require("@prisma/client");
const path = require("node:path");
const express = require("express");
const passport = require("./config/passportConfig");
const authRouter = require("./routes/authRouter");
require("dotenv").config();


const app = express();
const PORT = process.env.PORT || 3000;
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));

app.use(expressSession({
    cookie: {
        maxAge: 7 * 24 * 60 * 60 * 1000
    },
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: new PrismaSessionStore(
        new PrismaClient(),
        {
            checkPeriod: 2 * 60 * 1000,
            dbRecordIdIsSessionId: true,
            dbRecordIdFunction: undefined 
        }
    )
}))
app.use(passport.session());
app.use(express.urlencoded({ extended: false }))
app.use(authRouter);

app.get("/", (req, res) => {
    res.render("index", {
        user: req.user
    })
});

app.listen(PORT, () => console.log(`App listening on port ${PORT}`))