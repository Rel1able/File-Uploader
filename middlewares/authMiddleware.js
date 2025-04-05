function isAuth(req, res, next) {
    if (req.isAuthenticated()) {
        next();
    }
    res.json("You are now allowed to see this file")
}

module.exports = isAuth