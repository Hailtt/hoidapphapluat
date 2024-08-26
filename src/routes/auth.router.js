const express = require("express");
const Router = express.Router();
const authController = require("../app/controllers/AuthController");
const authMiddleware = require("../middleWares/auth");

// Router.post("/register", authController.register);
//Router.get("/getUser", authMiddleware.checkToken, authController.getlists);
Router.get("/getlists", authMiddleware.checkToken, authController.getlists);

module.exports = Router;
