const User = require("../models/User"); // Import the User model
const bcrypt = require("bcrypt");

// Register a new user
exports.registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Check if the email is already in use
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ error: "User already exists" });
    }

    // Create a new user
    user = new User({
      username,
      email,
      password, // The password will be hashed automatically by the pre-save middleware
    });

    await user.save();

    // Return a success message
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Server error, please try again later" });
  }
};

// Login user
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await User.findOne({ email });

    // If user doesn't exist
    if (!user) {
      return res.status(400).json({ error: "User not found" });
    }

    // Compare entered password with the hashed password in DB
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    // Save user ID in session
    req.session.userId = user._id;
    req.session.role = user.role; // Save role (user/admin) in session

    // Return success message
    res.status(200).json({ message: "Logged in successfully" });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Server error, please try again later" });
  }
};

// Logout user
exports.logoutUser = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ error: "Failed to logout" });
    }
    res.status(200).json({ message: "Logged out successfully" });
  });
};

// Set a user as admin
exports.setAdmin = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    if (user.role === "admin") {
      return res.status(400).json({ error: "User is already an admin" });
    }

    user.role = "admin";
    await user.save();

    res.status(200).json({ message: "User promoted to admin" });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Server error, please try again later" });
  }
};

// Remove admin role from a user
exports.removeAdmin = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    if (user.role !== "admin") {
      return res.status(400).json({ error: "User is not an admin" });
    }

    user.role = "user";
    await user.save();

    res.status(200).json({ message: "Admin role removed from user" });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Server error, please try again later" });
  }
};

// Middleware to check if the user is authenticated (logged in)
exports.isAuthenticated = (req, res, next) => {
  if (req.session && req.session.userId) {
    return next(); // Proceed if user is logged in
  }
  return res.status(401).json({ error: "You must be logged in" });
};

// Middleware to check if the user is an admin
exports.isAdmin = async (req, res, next) => {
  const user = await User.findById(req.session.userId);
  if (user && user.role === "admin") {
    return next(); // Proceed if user is an admin
  }
  return res.status(403).json({ error: "Admin privileges required" });
};

// Delete a user (only admins or the user themselves can delete an account)
exports.deleteUser = async (req, res) => {
    try {
        const userId = req.params.id;
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Only allow deletion if the logged-in user is an admin or is deleting their own account
        if (req.session.userId === user._id.toString() || req.session.role === 'admin') {
            await user.remove();  // Remove the user from the database
            return res.status(200).json({ message: 'User deleted successfully' });
        } else {
            return res.status(403).json({ error: 'You are not authorized to delete this account' });
        }
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: 'Server error, please try again later' });
    }
};