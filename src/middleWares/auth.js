const jwt = require("jsonwebtoken");
require("dotenv").config();
const axios = require("axios");

class authMiddleware {
  async checkToken(req, res, next) {
    try {
      // Lấy thông tin xác thực từ request
      // const token = await req.headers.authorization.split(" ")[1];
      // const authEndpoint = process.env.DB_PASS;
      // const response = await axios
      //   .get(`${authEndpoint}/data`, {
      //     headers: {
      //       Authorization: `Bear ${token}`, // Đặt token trong headers
      //     },
      //   })
      //   .then(() => {
      //     next();
      //   })
      //   .catch((error) => {
      //     console.error(
      //       "Error fetching user data:",
      //       error.response ? error.response.data : error.message
      //     );
      //   });
      req.userId = "4c31fbbc-6fef-4171-adfe-a2c5370cb6b6";
      next();
    } catch (err) {
      return res.status(503);
    }
  }
}

module.exports = new authMiddleware();
