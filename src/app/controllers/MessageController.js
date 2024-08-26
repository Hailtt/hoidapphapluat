const pool = require("../../db/db");

class messagesContreller {
  //[GET]
  async getAllMess(req, res) {
    try {
      const conver_id = req.query.c;
      const query = await pool.query(
        `
            SELECT 
                m.*
            FROM 
                messages m
            INNER JOIN 
                conversations c ON m.conver_id = c.conver_id
            WHERE 
                 c.conver_id = $1
    `,
        [conver_id]
      );
      res.json({ data: query.rows });
      console.log(query.rows);
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: err.message });
    }
  }

  //[POST]
  async changeLike(req, res) {
    try {
      const { id, isLike } = req.body;
      const query = await pool.query(
        `UPDATE messages
           SET "like" = $2
           WHERE mes_id = $1`,
        [id, isLike]
      );
      console.log("Message updated successfully");
      res.json({
        message: "Message updated successfully",
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: err.message });
    }
  }
}

module.exports = new messagesContreller();
