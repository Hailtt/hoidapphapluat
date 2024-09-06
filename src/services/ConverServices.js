const pool = require("../db/db");

class conversationService {
  async selectOneConverByConverId(conver_id) {
    try {
      const query = "SELECT * FROM conversations WHERE conver_id = $1";
      const result = await pool.query(query, [conver_id]);
      return result;
    } catch (err) {
      console.error("Error fetching One conversationService:", err);
      throw err;
    }
  }

  async selectAllConverByUserId(user_id) {
    try {
      const query = "SELECT * FROM conversations c WHERE c.user_id = $1";
      const result = await pool.query(query, [user_id]);
      return result;
    } catch (err) {
      console.error("Error fetching One conversationService:", err);
      throw err;
    }
  }

  async insert(user_id, title) {
    try {
      const query = `INSERT INTO Conversations (user_id, title) VALUES ($1, $2) RETURNING *`;
      const result = await pool.query(query, [user_id, title]);
      return result;
    } catch (err) {
      console.error("Error Insert new conversationService:", err);
      throw err;
    }
  }

  async update(conver_id, title) {
    try {
      const query = `UPDATE Conversations SET  title = $1 WHERE conver_id = $2 RETURNING *`;
      const result = await pool.query(query, [title, conver_id]);
      return result;
    } catch (err) {
      console.error("Error Insert update conversationService:", err);
      throw err;
    }
  }

  async delete(conver_id) {
    try {
      const query = `DELETE FROM conversations WHERE conver_id = $1 RETURNING *`;
      const result = await pool.query(query, [conver_id]);
      return result;
    } catch (err) {
      console.error("Error Insert delete conversationService:", err);
      throw err;
    }
  }

  async deleteByUserId(user_id) {
    try {
      const query = `DELETE FROM conversations WHERE user_id = $1 RETURNING *`;
      const result = await pool.query(query, [user_id]);
      return result;
    } catch (err) {
      console.error(
        "Error Insert delete by User_ids conversationService:",
        err
      );
      throw err;
    }
  }
}

module.exports = new conversationService();
