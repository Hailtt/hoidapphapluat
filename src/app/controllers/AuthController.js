const pool = require("../../db/db");
const Status_respone = require("./constant");

class authController {
  // [GET] get list User
  async getlists(req, res) {
    try {
      const allUsers = await pool.query("SELECT * FROM users");
      console.log(allUsers.rows);
      if (allUsers.rowCount > 0)
        res
          .status(200)
          .json({ data: allUsers.rows, message: Status_respone.suscess });
      else
        res
          .status(200)
          .json({ data: allUsers.rows, message: Status_respone.notFound });
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

      if (user.rowCount > 0)
        res
          .status(200)
          .json({ data: user.rows, message: Status_respone.suscess });
      else
        res
          .status(200)
          .json({ data: user.rows, message: Status_respone.notFound });
    } catch (err) {
      console.log(err.message);
      res.json({ message: err.message });
    }
  }

  //[POST] create new User
  async create(req, res) {
    try {
      const { username, password, phone, email } = req.body;

      if (!username || !password)
        res.json({
          message: Status_respone.missing,
        });
      const query = await pool.query(
        "INSERT INTO Users (username, password, phone, email) VALUES ($1, $2, $3, $4) RETURNING *;",
        [username, password, phone || "", email || ""]
      );
      if (query.rowCount > 0)
        res.status(200).json({
          message: Status_respone.suscess,
          data: query.rows[0],
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

  //[POSS] Edit user information by id
  async update(req, res) {
    try {
      const id = req.query.u;
      const { user_id, username, password, phone, email } = req.body;

      const queryMeesage = await pool.query(
        "UPDATE messages SET user_id = $1 WHERE messages.user_id = $2 RETURNING *;",
        [user_id, id]
      );
      const queryConver = await pool.query(
        "UPDATE conversations SET user_id = $1 WHERE conversations.user_id = $2 RETURNING *;",
        [user_id, id]
      );
      const query = await pool.query(
        "UPDATE users SET  user_id = $6, username = $1, password = $2, phone = $3, email = $4 WHERE users.user_id = $5 RETURNING *;",
        [username, password, phone, email, id, user_id]
      );
      console.log(query);
      if (query.rowCount > 0)
        res.status(200).json({
          message: Status_respone.suscess,
          data: query.rows[0],
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

  //[POSS] delete user by id
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
      const query = await pool.query(
        " DELETE FROM users WHERE user_id = $1 RETURNING *",
        [id]
      );
      if (query.rowCount > 0)
        res.status(200).json({
          message: Status_respone.suscess,
          data: query.rows[0],
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
}

module.exports = new authController();
