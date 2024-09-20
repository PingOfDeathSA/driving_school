const express = require('express');
const router = express.Router();
const Usermodel = require('../models/user'); // Adjust the path as necessary
const passport = require('passport');

// Register Page
router.get("/register", (req, res) => {
  res.render("register");
});

// User Registration
router.post("/user-register", async function(req, res) {
  console.log("Registering user:", req.body);
  try {
    const existingUser = await Usermodel.findOne({ username: req.body.username });
    if (existingUser) {
      console.log("User already exists");
      return res.status(400).send("User already exists");
    } else {
      Usermodel.register(new Usermodel({ username: req.body.username }), req.body.password, function(err, user) {
        if (err) {
          console.log("Error in Registering User:", err);
          return res.status(400).send("Error registering user");
        }
      });
    }
  } catch (err) {
    console.log("Error in finding user:", err);
    return res.status(500).send("Error in finding user");
  }
});

// User Login
router.post("/user-login", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    console.log("Authenticating user:", user);
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.status(400).send("Invalid username or password");
    }
    req.logIn(user, (err) => {
      if (err) {
        return next(err);
      }
      if (user.username === "amin@test.com") {
        return res.status(200).json({ message: "Login successful", role: "admin" });
      } else {
        return res.status(200).json({ message: "Login successful", role: "user" });
      }
    });
  })(req, res, next);
});

// Registration Endpoint
router.post("/register", async function(req, res) {
  console.log("Registering user:", req.body);
  try {
    const existingUser = await Usermodel.findOne({ username: req.body.username });
    if (existingUser) {
      console.log("User already exists");
      return res.status(400).send("User already exists");
    } else {
      Usermodel.register(new Usermodel({ username: req.body.username }), req.body.password, function(err, user) {
        if (err) {
          console.log("Error in Registering User:", err);
          return res.status(400).send("Error registering user");
        } else {
          passport.authenticate("local")(req, res, function() {
            console.log("User Registered");
            if (user.username === "amin@test.com") {
              return res.redirect("/dashboard");
            } else {
              return res.redirect("/user-dashboard");
            }
          });
        }
      });
    }
  } catch (err) {
    console.log("Error in finding user:", err);
    return res.status(500).send("Error in finding user");
  }
});

// Login Page
router.get("/", (req, res) => {
  res.render("login");
});

module.exports = router;
