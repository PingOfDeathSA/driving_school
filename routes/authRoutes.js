const express = require("express");
const passport = require("passport");
const Usermodel = require("../models/User");
const router = express.Router();

router.post("/user-register", async (req, res) => {
  try {
    const existingUser = await Usermodel.findOne({ username: req.body.username });
    if (existingUser) {
      return res.status(400).send("User already exists");
    } else {
      Usermodel.register(new Usermodel({ username: req.body.username }), req.body.password, function(err, user) {
        if (err) {
          return res.status(400).send("Error registering user");
        }
      });
    }
  } catch (err) {
    return res.status(500).send("Error in finding user");
  }
});

router.post("/user-login", (req, res, next) => {
  passport.authenticate("local", (err, user) => {
    if (err) return next(err);
    if (!user) return res.status(400).send("Invalid username or password");

    req.logIn(user, (err) => {
      if (err) return next(err);
      return res.status(200).json({ message: "Login successful", role: user.username === "amin@test.com" ? "admin" : "user" });
    });
  })(req, res, next);
});

module.exports = router;
