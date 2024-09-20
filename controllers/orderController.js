const UserOrdermodel = require('../models/userOrder');

// Place an order
exports.placeOrder = async (req, res) => {
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
};

// Get user orders
exports.getUserOrders = async (req, res) => {
  const { username } = req.query;
  
  try {
    const orders = await UserOrdermodel.find({ username: username });
    if (orders.length > 0) {
      res.status(200).json({ message: 'Order(s) found successfully', orders: orders });
    } else {
      res.status(404).json({ message: 'No orders found for this user', orders: [] });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Something went wrong' });
  }
};
