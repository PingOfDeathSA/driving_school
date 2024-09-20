const passport = require("passport");
const Usermodel = require("../models/User");

passport.use(Usermodel.createStrategy());
passport.serializeUser(Usermodel.serializeUser());
passport.deserializeUser(Usermodel.deserializeUser());

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(async function(id, done) {
  try {
    const user = await Usermodel.findById(id).exec();
    done(null, user);
  } catch (err) {
    done(err);
  }
});
