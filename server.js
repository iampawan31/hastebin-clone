const express = require("express");
const app = express();
app.set("view engine", "ejs");
app.use(express.static("public"));

app.get("/", (req, res) => {
  const code = `Welcome to Hastebin!

Use the commands in the top right corner
to create a new file to share with others`;

  res.render("code-display", { title: "Hastebin Clone", code });
});

app.listen(3000);
