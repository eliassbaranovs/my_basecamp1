const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const { isAuthenticated, isAdmin } = userController;

// User registration route
router.post("/register", userController.registerUser);

// User login route
router.post("/login", userController.loginUser);

// User logout route
router.get("/logout", userController.logoutUser);

// Get current user details
router.get("/me", isAuthenticated, userController.getCurrentUser);

// Get all users (admin only)
router.get("/all", isAuthenticated, isAdmin, userController.getAllUsers);

// Promote a user to admin (only admins can perform this action)
router.post("/admin/:id", isAuthenticated, isAdmin, userController.setAdmin);

// Remove admin privileges from a user (only admins can perform this action)
router.post(
  "/removeAdmin/:id",
  isAuthenticated,
  isAdmin,
  userController.removeAdmin
);

// Delete a user (only admins or the user themselves can delete the account)
router.delete("/delete/:id", isAuthenticated, userController.deleteUser);

module.exports = router;
