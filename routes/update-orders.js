
function update_orders ( ) {
    app.post('/update-order-status/:id', async (req, res) => {
        const orderId = req.params.id;
        const packageId = req.body.packageId; // Get the packageId from the form data
      
        try {
          // Log the request parameters
          console.log(`Received packageId: ${packageId} for orderId: ${orderId}`);
      
          // Fetch the package with the given package ID
          const package = await Packagemodel.findOne({ _id: packageId });
      
          if (!package) {
            console.log("No package found with ID:", packageId);
            return res.status(404).send("Package not found"); // Handle package not found
          }
      
          // Get the subCourses from the package
          const subCourses = package.subCourses;
      
          // Update the order status
          const updatedOrder = await UserOrdermodel.findByIdAndUpdate(
            orderId,
            { status: true, subCourses: subCourses }, // Set the status to true and update subCourses
            { new: true } // Return the updated document
          );
      
          if (updatedOrder) {
            // Fetch the user again to pass it to the view
            const user = req.user;
            const foundUser = await Usermodel.findOne({ username: user.username });
            const ordersUsers = await UserOrdermodel.find({});
      
            // Render the view with updated data
            res.render("learners", {
              user: foundUser,
              Orders: ordersUsers 
            });
            console.log("Order status updated for:", foundUser.username);
          } else {
            console.log("No order found with ID:", orderId);
            res.status(404).send("Order not found"); // Handle order not found
          }
        } catch (err) {
          console.error(err);
          res.status(500).send("Internal Server Error"); // Handle server error
        }
      });
      
}

module.exports = update_orders;