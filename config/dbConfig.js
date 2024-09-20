const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect('mongodb+srv://PingOfDeathSA:Ronald438@cluster0.kqlfkdc.mongodb.net/Drving_school');
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('MongoDB connection error:', error);
  }
};

module.exports = connectDB;
