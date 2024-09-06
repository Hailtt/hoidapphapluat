const pool = require("../../db/db");
const axios = require("axios");
const Status_respone = require("./constant");
const MessageServices = require("../../services/MessageServices");

class messagesContreller {
  //[GET] get all message in conversation by conver_id
  async getAllByConver(req, res) {
    try {
      const conver_id = req.query.c;
      const query = await MessageServices.selectAllMessagesByConverId(
        conver_id
      );
      if (query.rowCount > 0) {
        console.log(
          `Found ${query.rowCount} messages for conversation ${conver_id}`
        );
        res
          .status(200)
          .json({ message: Status_respone.suscess, data: query.rows });
      } else {
        console.log(`No messages found for conversation ${conver_id}`);
        res
          .status(200)
          .json({ message: Status_respone.notFound, data: query.rows });
      }
    } catch (err) {
      console.error("Error in mesasageController getAllByConver :", err);
      res.status(500).json({ message: err.message });
    }
  }

  //[POST] create new message
  async create(req, res) {
    try {
      const user_id = req.query.u;
      const conver_id = req.query.c;
      const { content } = req.body;
      const dataUser = {
        content: content,
        metadata: {},
      };

      //save question of user
      const query = await MessageServices.insert(conver_id, user_id, dataUser);

      //get answer base on user question
      const response = await axios.post(process.env.BOTCHAT_API, {
        request_id: user_id,
        question: content,
      });

      const dataBotAi = await response.data.data;
      console.log("dataBotAi: ", dataBotAi);
      if (!dataBotAi.metadata) {
        console.error("Error in Get answer from BOT AI:", err);
        res.json({ message: Status_respone.fail, data: {} });
      }

      //save answer into DB with user_id = US0000000001 is BOT
      const queryBot = await MessageServices.insert(
        conver_id,
        "US00000001",
        dataBotAi
      );

      if (queryBot.rowCount > 0) {
        console.log(
          `Insert ${query.rowCount} messages for conversation ${conver_id}`
        );
        //respone answer
        res
          .status(200)
          .json({ message: Status_respone.suscess, botchat: response.data });
      } else {
        res.json({ message: Status_respone.fail, data: {} });
      }
    } catch (err) {
      console.error("Error in mesasageController Insert :", err);
      res.status(500).json({ message: err.message });
    }
  }

  //[POST] change like by mess_id
  async islike(req, res) {
    try {
      const mess_id = req.query.m;
      const { islike } = req.body;
      console.log("Hello:", mess_id);

      const query = await MessageServices.setLike(mess_id, islike);
      if (query.rowCount > 0) {
        console.log(`Update  like = ${islike}  for message_id: ${mess_id}`);
        res
          .status(200)
          .json({ message: Status_respone.suscess, data: query.rows[0] });
      } else {
        res.status(500).json({ message: err.message });
      }
    } catch (err) {
      console.error("Error in mesasageController setLike :", err);
      res.status(500).json({ message: Status_respone.fail, data: {} });
    }
  }
}

module.exports = new messagesContreller();
