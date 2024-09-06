const pool = require("../../db/db");
const conversationService = require("../../services/ConverServices");
const messageServices = require("../../services/MessageServices");
const Status_respone = require("./constant");

class converController {
  //[GET] get one conversation by id
  async getOne(req, res) {
    try {
      const id = req.query.c;
      const query = await conversationService.selectOneConverByConverId(id);

      //handle respone
      if (query.rowCount > 0) {
        console.log(`Found ${query.rowCount} conversation by Conver_id: ${id}`);
        res
          .status(200)
          .json({ message: Status_respone.suscess, data: query.rows });
      } else {
        console.log(`Found ${query.rowCount} conversation by Conver_id: ${id}`);
        res
          .status(200)
          .json({ message: Status_respone.notFound, data: query.rows });
      }
    } catch (err) {
      console.error("Error converController Get one conversation:", err);
      res.json({ message: err.message });
    }
  }

  //[GET] get all conversation by user_id
  async getAll(req, res) {
    try {
      const id = req.query.u;

      const query = await conversationService.selectAllConverByUserId(id);

      //handle respone
      if (query.rowCount > 0) {
        console.log(`Found ${query.rowCount} conversation by User_id: ${id}`);
        res
          .status(200)
          .json({ message: Status_respone.suscess, data: query.rows });
      } else {
        console.log(`Found ${query.rowCount} conversation by User_id: ${id}`);
        res.status(200).json({ message: Status_respone.notFound, data: [] });
      }
    } catch (err) {
      console.error("Error converController Get all conversation:", err);
      res.status(500).json({ message: err.message });
    }
  }

  //[POST] create new conversation by user_id
  async create(req, res) {
    try {
      const id = req.query.u;
      const { title } = req.body;
      const query = await conversationService.insert(id, title);

      //handle respone
      if (query.rowCount > 0) {
        console.log(`Insert ${query.rowCount} new conversation!`);
        res.status(200).json({
          message: Status_respone.suscess,
          conversation: query.rows[0],
        });
      } else {
        console.error(`Error converController create new conversation!`, err);
        res.json({
          message: Status_respone.fail,
        });
      }
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: err.message });
    }
  }

  //[POST] edit conversation by id
  async update(req, res) {
    try {
      const id = req.query.c;
      const { title } = req.body;
      const query = await conversationService.update(id, title);

      //handle respone
      if (query.rowCount > 0) {
        console.log(
          `Update ${query.rowCount} conversation! by conver_id = ${id}`,
          err
        );
        res.json({
          message: Status_respone.suscess,
          conversation: query.rows[0],
        });
      } else {
        console.error(`Error converController Update conversation!`);
        res.json({
          message: Status_respone.fail,
        });
      }
    } catch (err) {
      console.error(`Error converController Update conversation!`, err);
      res.status(500).json({ message: err.message });
    }
  }

  //[DELETE]
  async delete(req, res) {
    try {
      const id = req.query.c;
      const deleteMessage = await messageServices.deleteByConverId(id);

      //handle respone
      console.log(
        `Deleted ${deleteMessage.rowCount} mesasge in conver_id: ${id}`
      );

      const query = await conversationService.delete(id);

      //handle respone
      if (query.rowCount > 0) {
        console.log(
          `Deleted ${query.rowCount} conversation in conver_id: ${id}`
        );
        res
          .status(200)
          .json({ message: Status_respone.suscess, data: query.rows[0] });
      } else {
        console.error(`Error delete conversation converController`);
        res.status(500).json({ message: Status_respone.fail });
      }
    } catch (err) {
      console.error(`Error delete conversation converController,`, err);
      res.json({ message: err.message });
    }
  }
}

module.exports = new converController();
