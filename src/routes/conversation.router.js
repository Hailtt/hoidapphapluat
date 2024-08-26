const express = require("express");
const Router = express.Router();
const converController = require("../app/controllers/ConverController");
const authMiddleware = require("../middleWares/auth");

Router.get("/getOne", converController.getOne);
Router.get("/getAll", converController.getAll);
Router.post("/create", converController.create);
Router.post("/update", converController.update);
Router.delete("/delete", converController.delete);

module.exports = Router;
