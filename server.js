const express = require("express");
const app = express();
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.send("Hi");
});

app.listen(3000);