const pool = require("../../db/db");
const authServices = require("../../services/authServices");
const ConverServices = require("../../services/ConverServices");
const MessageServices = require("../../services/MessageServices");
const Status_respone = require("./constant");

class authController {
  // [GET] get list User
  async getAll(req, res) {
    try {
      const query = await authServices.selectAllUser();
      if (query.rowCount > 0) {
        console.log(`Found ${query.rowCount} User!`);
        res
          .status(200)
          .json({ data: query.rows, message: Status_respone.suscess });
      } else {
        console.log(`Found ${query.rowCount} User!`);
        res
          .status(200)
          .json({ data: query.rows, message: Status_respone.notFound });
      }
    } catch (err) {
      console.error(`Err AuthController get all `, err);
      res.json({ message: err.message });
    }
  }

  // [GET] get User by ID
  async getOne(req, res) {
    try {
      const id = req.query.u;
      const query = await authServices.selectOneUser(id);

      if (query.rowCount > 0) {
        console.log(`Found ${query.rowCount} User!`);
        res
          .status(200)
          .json({ data: query.rows, message: Status_respone.suscess });
      } else {
        console.log(`Found ${query.rowCount} User!`);
        res
          .status(200)
          .json({ data: query.rows, message: Status_respone.notFound });
      }
    } catch (err) {
      console.error(`Err AuthController get one `, err);
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

      const query = await authServices.insert(
        username,
        password,
        phone || "",
        email || ""
      );

      if (query.rowCount > 0) {
        console.log(`Inserted ${query.rowCount} User!`);
        res.status(200).json({
          message: Status_respone.suscess,
          data: query.rows[0],
        });
      } else {
        console.error(`Error UserController create!`);
        res.json({
          message: Status_respone.fail,
        });
      }
    } catch (err) {
      console.error(`Error UserController create! `, err);
      res.json({ message: err.message });
    }
  }

  //[POSS] Edit user information by id
  async update(req, res) {
    try {
      const id = req.query.u;
      const { username, password, phone, email } = req.body;

      const query = await authServices.update(
        username,
        password,
        phone,
        email,
        id
      );

      if (query.rowCount > 0) {
        console.log(`UPDATED ${query.rowCount} User at user_id: ${id}`);
        res.status(200).json({
          message: Status_respone.suscess,
          data: query.rows[0],
        });
      } else {
        console.error(`ERROR UPDATED User at user_id: ${id}`);
        res.json({
          message: Status_respone.fail,
        });
      }
    } catch (err) {
      console.error(`ERROR UPDATED User`, err);
      res.json({ message: err.message });
    }
  }

  //[POSS] delete user by id
  async delete(req, res) {
    try {
      const id = req.query.u;
      const deleteMessage = await MessageServices.deleteByUserId(id);
      const deleteConver = await ConverServices.deleteByUserId(id);
      const query = await authServices.delete(id);

      console.log(
        `Deleted ${deleteMessage.rowCount} message at user_id: ${id}`
      );
      console.log(
        `Deleted ${deleteConver.rowCount} conversation at user_id: ${id}`
      );

      if (query.rowCount > 0) {
        console.log(`Deleted ${query.rowCount} User`);
        res.status(200).json({
          message: Status_respone.suscess,
          data: query.rows[0],
        });
      } else {
        console.log(`ERROR Deleted ${query.rowCount} User`);
        res.json({
          message: Status_respone.fail,
        });
      }
    } catch (err) {
      console.error(`ERROR DELETE User`, err);

      res.json({ message: err.message });
    }
  }
}

module.exports = new authController();
