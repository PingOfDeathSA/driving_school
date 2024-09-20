const Packagemodel = require('../models/packageModel');

// Get all packages
exports.getAllPackages = async (req, res) => {
  try {
    const packages = await Packagemodel.find({});
    res.json(packages);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Something went wrong' });
  }
};
