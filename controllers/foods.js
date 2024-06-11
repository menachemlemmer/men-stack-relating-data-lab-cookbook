const User = require("../models/user");

async function index(req, res) {
  try {
    console.log(req.params);
    const currentUser = await User.findById(req.params.userId);
    res.render("foods/index.ejs", {
      user: currentUser,
      pantry: currentUser.pantry,
    });
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
    console.log(req.params);
    const currentUser = await User.findById(req.params.userId);
    const item = currentUser.pantry.id(req.params.foodId);
    console.log(currentUser.pantry);
    res.render(`foods/show.ejs`, { searchedUser: currentUser, item });
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

async function update(req, res) {
  try {
    const currentUser = await User.findById(req.session.user._id);
    const food = await currentUser.pantry.id(req.params.foodId);
    food.set(req.body);
    await currentUser.save();
    res.redirect(`/users/${currentUser._id}/foods/${food._id}`);
  } catch (error) {
    console.log(error);
    res.redirect("/");
  }
}

module.exports = {
  index,
  new: newPage,
  create,
  delete: deleteItem,
  show,
  edit,
  update,
};
