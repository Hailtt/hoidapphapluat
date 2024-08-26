const authRouter = require("./auth.router");
const converRouter = require("./conversation.router");
const messageRouter = require("./message.router");
function route(app) {
  app.use("/botchatv1/auth", authRouter);
  app.use("/botchatv1/conver", converRouter);
  app.use("/botchatv1/mess", messageRouter);

  /*
  app.get("/botchatv1/auth", async (req, res) => {
    try {
      const allUsers = await pool.query("SELECT * FROM users");
      res.json(allUsers.rows);
    } catch (err) {
      console.log(err.message);
    }
  });


  //Get one usser
  app.get("/botchatv1/getuser/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const user = await pool.query("SELECT * FROM users WHERE user_id = $1", [
        id,
      ]);
      console.log(user);
      if (user.rowCount == 0) {
        console.log("Khoong tim thay User");
        res.json("Khoong tim thay User");
      }
      res.json(user.rows[0]);
    } catch (err) {
      console.log(err);
    }
  });

  // Update User
  app.put("/botchatv1/updateuser/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const { username, phone, email } = req.body;

      const query =
        "UPDATE users SET username = $1, phone = $2, email = $3 WHERE user_id = $4";
      const values = [username, phone, email, id];
      await pool.query(query, values);

      res.json({ message: "User updated successfully" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Failed to update user" });
    }
  });

  */
}

module.exports = route;
