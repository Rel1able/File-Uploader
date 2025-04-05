function isAuth(req, res, next) {
    if (req.isAuthenticated()) {
        next();
    }
    res.render("noAuth");
}

module.exports = isAuth