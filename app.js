const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const session = require('express-session');
const passport = require("passport");
const passportLocalMongoose = require('passport-local-mongoose');
const MongoStore = require('connect-mongo');
const flash = require('connect-flash'); // Add this line
const bcrypt = require('bcrypt');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const fs = require('fs'); 
const saltRounds = 13;




// Initialize Express app
const app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set('trust proxy', 1); // If using a reverse proxy (e.g., Heroku)
app.use(cors());
app.use(express.json())


// MongoDB connection
mongoose.connect('mongodb+srv://PingOfDeathSA:Ronald438@cluster0.kqlfkdc.mongodb.net/Drving_school')
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.error('MongoDB connection error:', error));

// Set up session management with MongoDB
app.use(session({
  secret: 'THeTerminatorIsHere',
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({
    mongoUrl: 'mongodb+srv://PingOfDeathSA:Ronald438@cluster0.kqlfkdc.mongodb.net/Drving_school',
    collectionName: 'sessions',
    ttl: 60 * 60 // 1 hour
  })
}));
app.use(flash()); // Add this line

// Define user schema and passport-local-mongoose for authentication
const userSchema = new mongoose.Schema({
  username: { type: String, unique: true },
  password: String,
  role: { type: String, default: "user" }
});

// define schema for packages
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

// adding user-oder-package schema
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
const profOfPaymentSchema = new mongoose.Schema({
  username: String,
  Image: Buffer, // Store image data as a Buffer
  packagename: String,
  packageid: String,
  date: { type: Date, default: Date.now },
});


userSchema.plugin(passportLocalMongoose, { usernameField: 'username' });
// Check if the model already exists to avoid OverwriteModelError
const Usermodel = mongoose.models.Usermodel || mongoose.model("User", userSchema);
const Packagemodel = mongoose.models.Packagemodel || mongoose.model("Package", packageSchema);
const UserOrdermodel = mongoose.models.UserOrdermodel || mongoose.model("UserOrder", userOrderSchema);
const ProfOfPaymentmodel = mongoose.models.ProfOfPaymentmodel || mongoose.model("ProfOfPayment",profOfPaymentSchema );

const packages = [
  {
    Image: 'https://www.522drivingschool.co.za/wp-content/uploads/2020/03/cropped-logo.jpg',
    name: 'PACKAGE 01 – Learners Licence (For any Code)',
    price: 775.00,
    title : 'PACKAGE 01 – Learners Licence (For any Code)',
    description: `10 hours/lessons, K53 driving training.
    E-natis pre-booking.
    Transport from our office for booking confirmation at the Traffic Department.
    Transportation from our office for test day.
    Pre-trip inspection.
    Explore the test route.
    Instructor assistance.
    Explanation of yard before test.
    Use of vehicle for test.
    WHAT IS NOT INCLUDED
    ID Book/card and copy, proof of residence and 2 ID photos
    DLTC (Traffic Department) booking and issuing fee`,
    on_sale: true,
    sale_price: 600.00,
      subCourses: [

      ]
  },
  {
    Image: 'https://www.522drivingschool.co.za/wp-content/uploads/2020/03/cropped-logo.jpg',
    name: 'PACKAGE 02 – Learners Licence + 5 Driving Lessons',
    price: 1525.00,
    title : 'PACKAGE 02 – Learners Licence + 5 Driving Lessons',
    description: `10 hours/lessons, K53 driving training.
    E-natis pre-booking.
    Transport from our office for booking confirmation at the Traffic Department.
    Transportation from our office for test day.
    Pre-trip inspection.
    Explore the test route.
    Instructor assistance.
    Explanation of yard before test.
    Use of vehicle for test.
    WHAT IS NOT INCLUDED
    ID Book/card and copy, proof of residence and 2 ID photos
    DLTC (Traffic Department) booking and issuing fee`,
    on_sale: false,
    sale_price: null
  },
  {
    Image: 'https://www.522drivingschool.co.za/wp-content/uploads/2020/03/cropped-logo.jpg',
    name: 'PACKAGE 03 – BRUSH UP COURSE (CODE 08)',
    price: 750.00,
    title : 'PACKAGE 03 – BRUSH UP COURSE (CODE 08)',
    description: `10 hours/lessons, K53 driving training.
    E-natis pre-booking.
    Transport from our office for booking confirmation at the Traffic Department.
    Transportation from our office for test day.
    Pre-trip inspection.
    Explore the test route.
    Instructor assistance.
    Explanation of yard before test.
    Use of vehicle for test.
    WHAT IS NOT INCLUDED
    ID Book/card and copy, proof of residence and 2 ID photos
    DLTC (Traffic Department) booking and issuing fee`,
    on_sale: false,
    sale_price: null,

    subCourses: [
      {
        learson: 'Lesson 1',
        title: 'Introduction to the vehicle',
        description: 'Introduction to the vehicle and its controls, including the clutch, brake, accelerator, and gear lever.'

      },
      {
        learson: 'Lesson 2',
        title: 'Pre-trip inspection',
        description: 'How to inspect the vehicle before driving, including checking the lights, indicators, and brakes.'
      },
      {
        learson: 'Lesson 3',
        title: 'Moving off and stopping',
        description: 'How to move off from a stationary position and stop safely.'
      },
      {
        learson: 'Lesson 4',
        title: 'Changing gears',
        description: 'How to change gears smoothly and safely, including when to change up and down.'
      },
      {
        learson: 'Lesson 5',
        title: 'Steering and turning',
        description: 'How to steer the vehicle and turn safely, including how to use the mirrors and signals.'
      },
      {
        learson: 'Lesson 6',
        title: 'Reversing',
        description: 'How to reverse the vehicle safely, including parallel parking and reversing around a corner.'
      },
      {
        learson: 'Lesson 7',
        title: 'Hill starts',
        description: 'How to start the vehicle on a hill, including using the handbrake and clutch control.'
      },
      {
        learson: 'Lesson 8',
        title: 'Emergency stops',
        description: 'How to stop the vehicle quickly and safely in an emergency.'
      },
      {
        learson: 'Lesson 9',
        title: 'Roundabouts',
        description: 'How to approach and navigate roundabouts safely, including when to give way to other vehicles.'
      },
      {
        learson: 'Lesson 10',
        title: 'Traffic signs and signals',
        description: 'How to recognize and respond to traffic signs and signals, including speed limits and road markings.'
      }


    ]
  },
  
 
];

// save packages to the database
// Packagemodel.insertMany(packages)
//   .then(() => {
//     console.log('Dummy data inserted successfully.');
//     mongoose.connection.close();
//   })
//   .catch((error) => {
//     console.error('Error inserting dummy data:', error);
//     mongoose.connection.close();
//   });

// async function findPackages() {
//   try {
//     const packages = await Packagemodel.find({});
//     console.log(packages);
//   } catch (err) {
//     console.log(err);
//   }
// }
// findPackages();
const storage = multer.memoryStorage(); // Store file in memory
const upload = multer({ storage: storage });






app.get('/packages', async (req, res) => {
  try {
    const packages = await Packagemodel.find({});
    res.json(packages);
  } catch (err) {
    console.log(err);
  }
});

app.post('/user-package-order', async (req, res) => {
  console.log(req.body);
  

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
    // Save the user order to the database
    const newUserOrder = await userOrder.save();
    // Send a success response with status 200
    res.status(200).json({ message: 'Order placed successfully', order: newUserOrder });
  } catch (err) {
    console.log(err);
    // Send an error response with status 500 if there's an issue
    res.status(500).json({ message: 'Failed to place order', error: err.message });
  }
});


app.get('/user-orders', async (req, res) => {
  const { username } = req.query;
  
  try {
    const orders = await UserOrdermodel.find({
      username: username
    });
    
    if (orders.length > 0) {
      // Send the orders back if found
      res.status(200).json({
        message: 'Order(s) found successfully',
        orders: orders
      });
    } else {
      // If no orders are found
      res.status(404).json({
        message: 'No orders found for this user',
        orders: []
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Something went wrong' });
  }
});




// Initialize passport and session handling
app.use(passport.initialize());
app.use(passport.session());

// Passport configuration
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





app.get("/register", (req, res) => {
  res.render("register");
});





// mobile app
app.post("/user-register", async function(req, res) {
  console.log("Registering user:", req.body);
  try {
    // Check if the user already exists
    const existingUser = await Usermodel.findOne({ username: req.body.username });
    if (existingUser) {
      console.log("User already exists");
      return res.status(400).send("User already exists");
    } else {
      // Register the user
      Usermodel.register(new Usermodel({ username: req.body.username }), req.body.password, function(err, user) {
        if (err) {
          console.log("Error in Registering User:", err); // Log the exact error
          return res.status(400).send("Error registering user");
        } else {
     

        }
      });
    }
  } catch (err) {
    console.log("Error in finding user:", err);
    return res.status(500).send("Error in finding user");
  }
});

app.post("/user-login", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    console.log("Authenticating user:", user);
    if (err) {
      return next(err); // Handle any server error during authentication
    }
    if (!user) {
      return res.status(400).send("Invalid username or password"); // Return 400 status if user not found
    }

    // Log the user in if authentication is successful
    req.logIn(user, (err) => {
      if (err) {
        return next(err);
      }

      // Redirect based on user role
      if (user.username === "amin@test.com") {
        return res.status(200).json({ message: "Login successful", role: "admin" });
      } else {
        return res.status(200).json({ message: "Login successful", role: "user" });
      }
    });
  })(req, res, next);
});



// end mobile app

// Registration endpoint
app.post("/register", async function(req, res) {
  console.log("Registering user:", req.body);
  try {
    // Check if the user already exists
    const existingUser = await Usermodel.findOne({ username: req.body.username });
    if (existingUser) {
      console.log("User already exists");
      return res.status(400).send("User already exists");
    } else {
      // Register the user
      Usermodel.register(new Usermodel({ username: req.body.username }), req.body.password, function(err, user) {
        if (err) {
          console.log("Error in Registering User:", err); // Log the exact error
          return res.status(400).send("Error registering user");
        } else {
          passport.authenticate("local")(req, res, function() {
            console.log("User Registered");
            if (user.username === "amin@test.com") {
              return res.redirect("/dashboard");
            } else {
              return res.redirect("/user-dashboard");
console.log("Basic user registered");
            }
           
          });
        }
      });
    }
  } catch (err) {
    console.log("Error in finding user:", err);
    return res.status(500).send("Error in finding user");
  }
});

app.get("/", (req, res) => {
  res.render("login");
});



app.get('/user-dashboard', async (req, res) => {
  if (req.isAuthenticated()) {
    const user = req.user;
    console.log("Logged-in user:", user);
    try {
      const foundUser = await Usermodel.findOne({ username: user.username });
      if (foundUser) {
        res.render("user-dashboard", { user: foundUser });
        console.log("Logged-in user username:", foundUser.username);
      } else {
        console.log("No user found with username:", user.username);
      }
    } catch (err) {
      console.log(err);
    }
  } else {
    res.redirect("/")
  }
});

app.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    console.log("Authenticating user:", user);
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.redirect("/login"); // User not found, redirect to login
    }
    
    // If user exists, log them in
    req.logIn(user, (err) => {
      if (err) {
        return next(err);
      }

      // Check if user is an admin and redirect accordingly
      if (user.username === "amin@test.com") {
        return res.redirect("/dashboard");
      }

      // Otherwise, redirect to normal user dashboard
      return res.redirect("/user-dashboard");
    });
  })(req, res, next);
});




app.get('/dashboard', async (req, res) => {
  if (req.isAuthenticated()) {
    const user = req.user;
    console.log("Logged-in user:", user);
    try {
      const foundUser = await Usermodel.findOne({ username: user.username });
      const OrdersUsers = await UserOrdermodel.find({});
      if (foundUser) {

        res.render("dashboard", { user: foundUser,   Oders: OrdersUsers  });
        console.log("Logged-in user username:", foundUser.username);
      } else {
        console.log("No user found with username:", user.username);
      }
    } catch (err) {
      console.log(err);
    }
  } else {
    res.redirect("/")
  }
});


app.get('/learners', async (req, res) => {
  if (req.isAuthenticated()) {
    const user = req.user;
    console.log("Logged-in user:", user);
    try {
      const foundUser = await Usermodel.findOne({ username: user.username });
      const OrdersUsers = await UserOrdermodel.find({});
      if (foundUser) {
        res.render("learners", { user: foundUser,
          Orders: OrdersUsers 
         });
        console.log("Logged-in user username:", foundUser.username);
      } else {
        console.log("No user found with username:", user.username);
      }
    } catch (err) {
      console.log(err);
    }
  } else {
    res.redirect("/")
  }
});

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





// Start the server
app.listen(3000, () => {
  console.log("Server started on port 3000");
});
