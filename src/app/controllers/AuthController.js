const pool = require("../../db/db");

class authController {
  // [GET] get list User
  async getlists(req, res) {
    try {
      const allUsers = await pool.query("SELECT * FROM users");
      console.log(allUsers.rows);
      res.json(allUsers.rows);
    } catch (err) {
      console.log(err.message);
      res.json({ message: err.message });
    }
  }

  // [GET] get User by ID
  async getOne(req, res) {
    try {
      const id = req.query.u;
      const user = await pool.query(
        "SELECT * FROM users WHERE users.user_id = $1",
        [id]
      );
      console.log(user.rows);
      res.json(user.rows);
    } catch (err) {
      console.log(err.message);
      res.json({ message: err.message });
    }
  }

  //[POST]
  async create(req, res) {
    try {
      const { username, password, phone, email } = req.body;

      const query = await pool.query(
        "INSERT INTO Users (username, password, phone, email) VALUES ($1, $2, $3, $4);",
        [username, password, phone || "", email || ""]
      );
      res.json({
        message: "Create new User successfully !",
      });
    } catch (err) {
      console.log(err);
      res.json({ message: err.message });
    }
  }

  //[POSS]
  async update(req, res) {
    try {
      const id = req.query.u;
      const { username, password, phone, email } = req.body;
      const query = await pool.query(
        "UPDATE Users SET  username = $1, password = $2, phone = $3, email = $4 WHERE users.user_id = $5;",
        [username, password, phone, email, id]
      );
      res.json({
        message: "Update User successfully !",
      });
    } catch (err) {
      console.log(err);
      res.json({ message: err.message });
    }
  }

  //[POSS]
  async delete(req, res) {
    try {
      const id = req.query.u;
      const deleteMessage = pool.query(
        " DELETE FROM messages WHERE user_id = $1",
        [id]
      );
      const deleteConver = pool.query(
        " DELETE FROM conversations WHERE user_id = $1",
        [id]
      );
      const query = await pool.query(" DELETE FROM users WHERE user_id = $1", [
        id,
      ]);
      if (query.rowCount > 0)
        res.json({
          message: "DELETE User successfully !",
        });
      else
        res.json({
          message: "DELETE User Fail !",
        });
    } catch (err) {
      console.log(err);
      res.json({ message: err.message });
    }
  }
}

module.exports = new authController();
