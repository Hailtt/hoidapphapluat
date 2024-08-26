const express = require("express");
const Router = express.Router();
const converController = require("../app/controllers/ConverController");
const authMiddleware = require("../middleWares/auth");

Router.get("/get", converController.Get);
Router.post("/create", converController.create);
Router.delete("/delete/:id", converController.delete);

module.exports = Router;
