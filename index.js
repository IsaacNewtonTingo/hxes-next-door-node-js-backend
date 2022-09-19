const express = require("express")
const app = express()

require('dotenv').config()



let port = process.env.PORT

app.listen(port, (err, live) => {
  if (err) {
    console.log(err);
  }
  console.log(`Server running on port ${port}`);
})

require("./config/db")