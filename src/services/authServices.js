const pool = require("../db/db");

class authService {
  async selectAllUser() {
    try {
      const query = `SELECT * FROM users`;
      const result = await pool.query(query);
      return result;
    } catch (err) {
      console.error("Error fetching all user authService:", err);
      throw err;
    }
  }

  async selectOneUser(user_id) {
    try {
      const query = `SELECT * FROM users WHERE user_id = $1`;
      const result = await pool.query(query, [user_id]);
      return result;
    } catch (err) {
      console.error("Error fetching one user authService:", err);
      throw err;
    }
  }

  async insert(username, password, phone, email) {
    try {
      const query = `INSERT INTO Users (username, password, phone, email) VALUES ($1, $2, $3, $4) RETURNING *;1`;
      const result = await pool.query(query, [
        username,
        password,
        phone,
        email,
      ]);
      return result;
    } catch (err) {
      console.error("Error fetching insert user authService:", err);
      throw err;
    }
  }

  async update(username, password, phone, email, user_id) {
    try {
      const query = `UPDATE users SET  username = $1, password = $2, phone = $3, email = $4 WHERE user_id = $5 RETURNING *;`;
      const result = await pool.query(query, [
        username,
        password,
        phone,
        email,
        user_id,
      ]);
      return result;
    } catch (err) {
      console.error("Error fetching update user authService:", err);
      throw err;
    }
  }

  async delete(user_id) {
    try {
      const query = `DELETE FROM users WHERE user_id = $1 RETURNING *;`;
      const result = await pool.query(query, [user_id]);
      return result;
    } catch (err) {
      console.error("Error fetching delete user authService:", err);
      throw err;
    }
  }
}

module.exports = new authService();
