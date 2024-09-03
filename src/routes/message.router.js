const express = require("express");
const Router = express.Router();
const messageController = require("../app/controllers/MessageController");

Router.get("/getAllByConver", messageController.getAllByConver);
Router.post("/create", messageController.create);
Router.post("/islike", messageController.islike);

module.exports = Router;
