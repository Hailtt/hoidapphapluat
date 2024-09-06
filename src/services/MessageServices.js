// services/MessageService.js
const pool = require("../db/db");

class messageService {
  async selectAllMessagesByConverId(conver_id) {
    try {
      const query = `
            SELECT 
               m.*,
			         u.username
            FROM 
                messages m
            INNER JOIN 
                conversations c ON m.conver_id = c.conver_id
            INNER JOIN
              users u on u.user_id = c.user_id
                  WHERE 
                      c.conver_id = $1
            `;
      const result = await pool.query(query, [conver_id]);
      return result;
    } catch (err) {
      console.error("Error fetching messagesService:", err);
      throw err;
    }
  }

  async insert(conver_id, user_id, data) {
    try {
      const query = `INSERT INTO messages (conver_id, user_id, data, platform) VALUES ($1, $2, $3, 'SIGNET_MINI_APP')`;

      const result = await pool.query(query, [conver_id, user_id, data]);
      return result;
    } catch (err) {
      console.error("Error Insert messagesService:", err);
      throw err;
    }
  }

  async deleteById(mes_id) {
    try {
      const query = `DELETE FROM messages WHERE mes_id = $1 RETURNING *`;

      const result = await pool.query(query, [mes_id]);
      return result;
    } catch (err) {
      console.error("Error delete by mes_id messagesService:", err);
      throw err;
    }
  }

  async deleteByConverId(conver_id) {
    try {
      const query = `DELETE FROM messages WHERE conver_id = $1 RETURNING *`;
      const result = await pool.query(query, [conver_id]);
      return result;
    } catch (err) {
      console.error("Error delete by mes_id messagesService:", err);
      throw err;
    }
  }

  async deleteByUserId(user_id) {
    try {
      const query = `DELETE FROM messages WHERE user_id = $1 RETURNING *`;
      const result = await pool.query(query, [user_id]);
      return result;
    } catch (err) {
      console.error("Error delete by user_id messagesService:", err);
      throw err;
    }
  }

  async setLike(mess_id, data) {
    try {
      const query = `Update messages SET islike = $1 WHERE mes_id = $2 RETURNING *`;
      const result = await pool.query(query, [data, mess_id]);
      return result;
    } catch (err) {
      console.error("Error Insert messagesService:", err);
      throw err;
    }
  }
}

module.exports = new messageService();
