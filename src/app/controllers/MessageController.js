const pool = require("../../db/db");

class messagesContreller {
  //[GET]
  async getAllByConver(req, res) {
    try {
      const conver_id = req.query.c;
      const query = await pool.query(
        `
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
  async create(req, res) {
    try {
      const user_id = req.query.u;
      const conver_id = req.query.c;
      const { content } = req.body;
      const query = pool.query(
        "INSERT INTO Messages (conver_id, user_id, content, platform) VALUES ($1, $2, $3, 'SIGNET_MINI_APP');",
        [conver_id, user_id, content]
      );

      console.log(query);
      res.json({ message: "Create new message successfully!" });
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
