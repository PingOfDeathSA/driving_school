const mongoose = require("mongoose");

const packageSchema = new mongoose.Schema({
  Image: String,
  name: String,
  price: Number,
  title: String,
  description: String,
  on_sale: Boolean,
  sale_price: Number,
  subCourses: [{
    learson: String,
    title: String,
    description: String,
  }],
});

module.exports = mongoose.models.Packagemodel || mongoose.model("Package", packageSchema);
