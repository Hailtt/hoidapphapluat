const pool = require("../../db/db");

class converController {
  //[GET]
  async Get(req, res) {
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
      const { title, sendtime } = req.body;

      const user = await pool.query(
        "INSERT INTO Conversations (user_id, title, sendtime) VALUES ($1, $2, $3)",
        [id, title, sendtime]
      );

      console.log("Da tao moi Conversation");
      res.json({ message: "Create new conversation successfully !" });
    } catch (err) {
      console.log(err);
      res.json({ message: err.message });
    }
  }

  //[DELETE]
  async delete(req, res) {
    try {
      const { id } = req.params;
      const user = await pool.query(
        "DELETE FROM conversations WHERE conversations.conver_id = $1",
        [id]
      );
      console.log("Da xoa thanh cong");
      res.json({ message: "Delete new conversation successfully !" });
    } catch (err) {
      console.log(err);
      res.json({ message: err.message });
    }
  }
}

module.exports = new converController();
