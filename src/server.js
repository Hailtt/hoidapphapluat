const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const port = process.env.PORT;

const route = require("./routes");

//middleware
app.use(cors());
app.use(express.json());

//Router
route(app);

app.listen(port, () => {
  console.log(`Server has started on port ${port}`);
});
