const express = require('express');
const router = express.Router();
const Usermodel = require('../models/user');
const UserOrdermodel = require('../models/user');

// User Dashboard
router.get('/user-dashboard', async (req, res) => {
  if (req.isAuthenticated()) {
    const user = req.user;
    console.log("Logged-in user:", user);
    try {
      const foundUser = await Usermodel.findOne({ username: user.username });
      if (foundUser) {
        res.render("user-dashboard", { user: foundUser });
        console.log("Logged-in user username:", foundUser.username);
      } else {
        console.log("No user found with username:", user.username);
      }
    } catch (err) {
      console.log(err);
    }
  } else {
    res.redirect("/");
  }
});

// Dashboard Page
router.get('/dashboard', async (req, res) => {
  if (req.isAuthenticated()) {
    const user = req.user;
    console.log("Logged-in user:", user);
    try {
      const foundUser = await Usermodel.findOne({ username: user.username });
      const OrdersUsers = await UserOrdermodel.find({});
      if (foundUser) {
        res.render("dashboard", { user: foundUser, Orders: OrdersUsers });
        console.log("Logged-in user username:", foundUser.username);
      } else {
        console.log("No user found with username:", user.username);
      }
    } catch (err) {
      console.log(err);
    }
  } else {
    res.redirect("/");
  }
});

// Learners Page
router.get('/learners', async (req, res) => {
  if (req.isAuthenticated()) {
    const user = req.user;
    console.log("Logged-in user:", user);
    try {
      const foundUser = await Usermodel.findOne({ username: user.username });
      const OrdersUsers = await UserOrdermodel.find({});
      if (foundUser) {
        res.render("learners", { user: foundUser, Orders: OrdersUsers });
        console.log("Logged-in user username:", foundUser.username);
      } else {
        console.log("No user found with username:", user.username);
      }
    } catch (err) {
      console.log(err);
    }
  } else {
    res.redirect("/");
  }
});

module.exports = router;
