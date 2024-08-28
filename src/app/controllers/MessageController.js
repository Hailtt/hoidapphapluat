const pool = require("../../db/db");
const axios = require("axios");
const Status_respone = require("./constant");

class messagesContreller {
  //[GET] get all message in conversation by conver_id
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
      if (query.rowCount > 0)
        res.json({ message: Status_respone.suscess, data: query.rows });
      else res.json({ message: Status_respone.notFound, data: query.rows });
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: err.message });
    }
  }
  //[POST] create new message
  async create(req, res) {
    try {
      const user_id = req.query.u;
      const conver_id = req.query.c;
      const { content } = req.body;

      //save question of user
      const query = pool.query(
        "INSERT INTO Messages (conver_id, user_id, content, platform) VALUES ($1, $2, $3, 'SIGNET_MINI_APP');",
        [conver_id, user_id, content]
      );

      //get answer base on user question
      const response = await axios.post(process.env.BOTCHAT_API, {
        request_id: user_id,
        question: content,
      });
      const { answer } = await response.data.data;

      //save answer into DB with user_id = US0000 is BOT
      const queryBot = pool.query(
        "INSERT INTO Messages (conver_id, user_id, content, platform) VALUES ($1, $2, $3, 'SIGNET_MINI_APP');",
        [conver_id, "US0000", answer]
      );
      if (!queryBot) res.json({ message: Status_respone.fail, data: {} });
      //respone answer
      res.json({ message: Status_respone.suscess, botchat: response.data });
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: err.message });
    }
  }
}

module.exports = new messagesContreller();
