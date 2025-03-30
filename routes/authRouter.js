const { Router } = require("express");
const authRouter = Router();
const authController = require("../controllers/authController");


authRouter.get("/sign-up",authController.renderSignUpPage)
authRouter.post("/sign-up", authController.createUser)

authRouter.get("/login", authController.renderLoginPage)
authRouter.post("/login", authController.handleLogin);

authRouter.get("/log-out", authController.handleLogout)

module.exports = authRouter;