const pool = require("../../db/db");
const Status_respone = require("./constant");

class converController {
  //[GET] get one conversation by id
  async getOne(req, res) {
    try {
      const id = req.query.c;

      const query = await pool.query(
        "SELECT * FROM conversations WHERE conver_id = $1",
        [id]
      );
      if (query.rowCount > 0)
        res
          .status(200)
          .json({ message: Status_respone.suscess, data: query.rows });
      else
        res
          .status(200)
          .json({ message: Status_respone.notFound, data: query.rows });
    } catch (err) {
      console.log(err);
      res.json({ message: err.message });
    }
  }

  //[GET] get all conversation by user_id
  async getAll(req, res) {
    try {
      const id = req.query.u;

      const query = await pool.query(
        "SELECT * FROM conversations c WHERE c.user_id = $1",
        [id]
      );

      if (query.rowCount > 0)
        res
          .status(200)
          .json({ message: Status_respone.suscess, data: query.rows });
      else res.status(200).json({ message: Status_respone.notFound, data: [] });
    } catch (err) {
      console.log(err);
      res.json({ message: err.message });
    }
  }

  //[POST] create new conversation by user_id
  async create(req, res) {
    try {
      const id = req.query.u;
      const { title } = req.body;

      const query = await pool.query(
        "INSERT INTO Conversations (user_id, title) VALUES ($1, $2) RETURNING *",
        [id, title]
      );
      if (query.rowCount > 0)
        res.status(200).json({
          message: Status_respone.suscess,
          conversation: query.rows[0],
        });
      else
        res.json({
          message: Status_respone.fail,
        });
    } catch (err) {
      console.log(err);
      res.json({ message: err.message });
    }
  }

  //[POST] edit conversation by id
  async update(req, res) {
    try {
      const id = req.query.c;
      const { title } = req.body;

      const query = await pool.query(
        "UPDATE Conversations SET  title = $1 WHERE conver_id = $2 RETURNING *",
        [title, id]
      );
      if (query.rowCount > 0)
        res.json({
          message: Status_respone.suscess,
          conversation: query.rows[0],
        });
      else
        res.json({
          message: Status_respone.fail,
        });
    } catch (err) {
      console.log(err);
      res.json({ message: err.message });
    }
  }

  //[DELETE]
  async delete(req, res) {
    try {
      const id = req.query.c;
      const deleteMessage = await pool.query(
        "DELETE FROM messages WHERE conver_id = $1",
        [id]
      );
      const query = await pool.query(
        "DELETE FROM conversations WHERE conver_id = $1 RETURNING *",
        [id]
      );
      if (query.rowCount > 0)
        res
          .status(200)
          .json({ message: Status_respone.suscess, data: query.rows[0] });
      else res.json({ message: Status_respone.fail });
    } catch (err) {
      console.log(err);
      res.json({ message: err.message });
    }
  }
}

module.exports = new converController();
