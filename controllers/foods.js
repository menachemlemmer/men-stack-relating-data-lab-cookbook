const User = require("../models/user");

async function index(req, res) {
  try {
    const currentUser = await User.findById(req.session.user._id);
    res.locals.pantry = currentUser.pantry;
    res.render("foods/index.ejs");
  } catch (error) {
    console.log(error);
    res.redirect("/");
  }
}

function newPage(req, res) {
  res.render("foods/new.ejs");
}

async function create(req, res) {
  try {
    const currentUser = await User.findById(req.session.user._id);
    currentUser.pantry.push(req.body);
    await currentUser.save();
    res.redirect(`/users/${currentUser._id}/foods`);
  } catch (error) {
    console.log(error);
    res.redirect("/");
  }
}

async function deleteItem(req, res) {
  try {
    const currentUser = await User.findById(req.session.user._id);
    await currentUser.pantry.id(req.params.foodId).deleteOne();
    await currentUser.save();
    res.redirect(`/users/${currentUser._id}/foods`);
  } catch (error) {
    console.log(error);
    res.redirect("/");
  }
}

async function show(req, res) {
  try {
    const currentUser = await User.findById(req.session.user._id);
    const item = currentUser.pantry.id(req.params.foodId);
    res.locals.item = item;
    res.render(`foods/show.ejs`);
  } catch (error) {
    console.log(error);
    res.redirect("/");
  }
}

async function edit(req, res) {
  try {
    const currentUser = await User.findById(req.session.user._id);
    const item = await currentUser.pantry.id(req.params.foodId);
    res.locals.item = item;
    res.render("foods/edit.ejs");
  } catch (error) {
    console.log(error);
    res.redirect("/");
  }
}

async function update(req, res) {}

module.exports = {
  index,
  new: newPage,
  create,
  delete: deleteItem,
  show,
  edit,
  update,
};
