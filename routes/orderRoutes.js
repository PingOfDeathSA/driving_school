const express = require("express");
const UserOrdermodel = require("../models/user");
const router = express.Router();

router.post('/user-package-order', async (req, res) => {
  const userOrder = new UserOrdermodel({
    username: req.body.username,
    fullNames: req.body.fullNames,
    idNumber: req.body.idNumber,
    phoneNumber: req.body.phone,
    homeAddress: req.body.homeAddress,
    Location: req.body.location,
    package: req.body.packageName,
    price: req.body.packagePrice,
    packageId: req.body.packageId,
    status: false
  });

  try {
    const newUserOrder = await userOrder.save();
    res.status(200).json({ message: 'Order placed successfully', order: newUserOrder });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Failed to place order', error: err.message });
  }
});

module.exports = router;
