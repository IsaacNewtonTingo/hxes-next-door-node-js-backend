const express = require("express");
const app = express();
const bodyParser = require("body-parser").json;
const cors = require("cors");
require("dotenv").config();

app.use(cors());
app.use(bodyParser());

let port = process.env.PORT;

app.listen(port, (err, live) => {
  if (err) {
    console.log(err);
  }
  console.log(`Server running on port ${port}`);
});

require("./config/db");

const UserRouter = require("./routes/user");

app.use("/user", UserRouter);
