const mongoose = require("mongoose");

const userOrderSchema = new mongoose.Schema({
  username: String,
  fullNames: String,
  idNumber: String,
  phoneNumber: String,
  homeAddress: String,
  Location: String,
  package: String,
  price: Number,
  packageId: String,
  status: Boolean,
  subCourses: [{
    learson: String,
    title: String,
    description: String,
  }],
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.models.UserOrdermodel || mongoose.model("UserOrder", userOrderSchema);
