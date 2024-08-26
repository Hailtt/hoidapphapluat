const express = require("express");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const app = express();
const PORT = 3000;

app.use(express.json());

// Mock Login Route - Tạo JWT Token
app.post("/mockapi/login", (req, res) => {
  const { username, password } = req.body;

  // Kiểm tra thông tin đăng nhập giả lập
  if (username === "admin" && password === "admin") {
    // Tạo token
    const token = jwt.sign({ username }, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: "1m",
    });
    res.json({ token });
  } else {
    res.status(401).json({ message: "Login failed" });
  }
});

// Middleware xác thực Token
function authenticateToken(req, res, next) {
  const token = req.headers.authorization.split(" ")[1];

  if (!token) return res.sendStatus(401);

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}

// Mock API Route cần xác thực token
app.get("/data", authenticateToken, (req, res) => {
  res.json({
    message: "Here is your data",
    user: req.user,
  });
});

app.listen(PORT, () => {
  console.log(`Mock API is running on http://localhost:${PORT}`);
});
