const User = require("../models/user");

async function index(req, res) {
  try {
    const users = await User.find();
    res.locals.users = users;
    res.render("users/index.ejs");
  } catch (error) {
    console.log(error);
    res.redirect("/");
  }
}

async function show(req, res) {
  res.render("users/show.ejs");
}

module.exports = { index, show };
