const pool = require("../../db/db");

class authController {
  // [GET] get list User
  async getlists(req, res) {
    try {
      console.log("Làm gì đó tiếp theo");
      const allUsers = await pool.query("SELECT * FROM users");
      console.log(allUsers.rows);
      res.json(allUsers.rows);
    } catch (err) {
      console.log(err.message);
      res.json({ message: err.message });
    }
  }

  /*



  // [POST] /register
  async register(req, res) {
    try {
      const newUser = [
        req.body.username,
        req.body.password,
        req.body.phone || "",
        req.body.email || "",
      ];
      const respone = await pool.query(
        `INSERT INTO Users (username, password, phone, email) VALUES ($1,$2,$3,$4) RETURNING *`,
        newUser
      );
      console.log("===>>> New User was created successfully!!!");
      res.json(respone.rows[0]);
    } catch (err) {
      console.log(err.message);
    }
  }

  */
}

module.exports = new authController();
