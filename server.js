require("dotenv").config();

const express = require("express");
const app = express();
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

const mongoose = require("mongoose");
const Document = require("./models/Document");

mongoose.connect(process.env.MONGO_URL, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});

app.get("/", (req, res) => {
  const code = `Welcome to Hastebin!

Use the commands in the top right corner
to create a new file to share with others`;

  res.render("code-display", {
    language: "plaintext",
    code,
  });
});

app.get("/new", (req, res) => {
  res.render("new", { title: "New" });
});

app.get("/:id/duplicate", async (req, res) => {
  const id = req.params.id;

  try {
    const { value } = await Document.findById(id);

    res.render("new", {
      value: value,
    });
  } catch (error) {
    res.redirect(`/${id}`);
  }
});

app.get("/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const { value } = await Document.findById(id);

    res.render("code-display", {
      code: value,
      id,
    });
  } catch (error) {
    res.redirect("/");
  }
});

app.post("/save", async (req, res) => {
  const value = req.body.value;

  try {
    const document = await Document.create({ value });
    res.redirect(`/${document.id}`);
  } catch (error) {
    res.render("new", { value });
  }
});

app.listen(3000);
