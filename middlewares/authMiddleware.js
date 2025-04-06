function isAuth(req, res, next) {
    if (req.isAuthenticated()) {
        next();
    } else {
        res.render("noAuth");
    }
    
}

module.exports = isAuth