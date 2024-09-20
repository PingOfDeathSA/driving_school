const express = require("express");
const Packagemodel = require("../models/packageModel");
const router = express.Router();

router.get('/packages', async (req, res) => {
  try {
    const packages = await Packagemodel.find({});
    res.json(packages);
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
