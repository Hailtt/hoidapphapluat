const express = require("express");
const Router = express.Router();
const authController = require("../app/controllers/AuthController");
const authMiddleware = require("../middleWares/auth");

Router.get("/getAllUser", authMiddleware.checkToken, authController.getAll);
Router.get("/getOne", authMiddleware.checkToken, authController.getOne);
Router.post("/create", authMiddleware.checkToken, authController.create);
Router.post("/update", authMiddleware.checkToken, authController.update);
Router.delete("/delete", authMiddleware.checkToken, authController.delete);

module.exports = Router;
