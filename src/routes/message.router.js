const express = require("express");
const Router = express.Router();
const messageController = require("../app/controllers/MessageController");

Router.get("/get", messageController.getAllMess);
Router.post("/like", messageController.changeLike);
//Router.post("/create", messageController.create);
//Router.delete("/delete/:id", messageController.delete);

module.exports = Router;
