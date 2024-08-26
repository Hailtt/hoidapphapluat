const pool = require("../../db/db");

class converController {
  //[GET]
  async getOne(req, res) {
    try {
      const id = req.query.c;

      const query = await pool.query(
        "SELECT * FROM conversations WHERE conver_id = $1",
        [id]
      );

      console.log(query.rows);
      res.json({ data: query.rows });
    } catch (err) {
      console.log(err);
      res.json({ message: err.message });
    }
  }

  //[GET]
  async getAll(req, res) {
    try {
      const id = req.query.u;

      const query = await pool.query(
        "SELECT * FROM conversations c WHERE c.user_id = $1",
        [id]
      );
      console.log(query.rows);
      res.json({ data: query.rows });
    } catch (err) {
      console.log(err);
      res.json({ message: err.message });
    }
  }

  //[POST]
  async create(req, res) {
    try {
      const id = req.query.u;
      const { title } = req.body;

      const query = await pool.query(
        "INSERT INTO Conversations (user_id, title) VALUES ($1, $2)",
        [id, title]
      );
      res.json({
        message: "Create new conversation successfully !",
      });
    } catch (err) {
      console.log(err);
      res.json({ message: err.message });
    }
  }

  //[POST]
  async update(req, res) {
    try {
      const id = req.query.u;
      const { title } = req.body;

      const query = await pool.query(
        "UPDATE Conversations SET  title = $1 WHERE conver_id = $2",
        [title, id]
      );
      res.json({
        message: "Create new conversation successfully !",
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
        "DELETE FROM conversations WHERE conver_id = $1",
        [id]
      );
      if (query.rowCount > 0)
        res.json({ message: "Delete new conversation successfully !" });
      else res.json({ message: "Xóa không thành công!" });
    } catch (err) {
      console.log(err);
      res.json({ message: err.message });
    }
  }
}

module.exports = new converController();
